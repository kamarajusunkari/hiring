<?php
/**
 * Arora Tech Solutions - Hiring Enquiry Form Handler
 * 
 * Secure processing endpoint for developer quote requests.
 */

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/includes/helpers.php';
require_once dirname(__DIR__, 2) . '/includes/database.php';
require_once dirname(__DIR__, 2) . '/includes/csrf.php';
require_once dirname(__DIR__, 2) . '/includes/mailer.php';

session_start_safe();

$isAjax = (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') ||
          (isset($_SERVER['CONTENT_TYPE']) && str_contains($_SERVER['CONTENT_TYPE'], 'application/json')) ||
          (isset($_SERVER['HTTP_ACCEPT']) && str_contains($_SERVER['HTTP_ACCEPT'], 'application/json'));

function respond(bool $success, string $message, array $extra = [], int $statusCode = 200) use ($isAjax): void {
    http_response_code($statusCode);
    if ($isAjax) {
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode(array_merge([
            'success' => $success,
            'message' => $message,
        ], $extra));
        exit;
    }

    // Graceful non-JS fallback: flash to session and redirect back
    $_SESSION['form_flash'] = [
        'success' => $success,
        'message' => $message,
    ];
    $redirect = $_POST['source_page'] ?? '/';
    header('Location: ' . $redirect);
    exit;
}

// 1. Verify Method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Invalid request method.', [], 405);
}

// 2. CSRF Verification
$csrfToken = $_POST['csrf_token'] ?? '';
if (!csrf_verify($csrfToken)) {
    respond(false, 'Security token validation failed. Please refresh the page and try again.', [], 403);
}

// 3. Honeypot Anti-Spam Check
$hpField = config('security.honeypot_field', 'ats_verify_hp');
if (!empty($_POST[$hpField])) {
    // Bot tripped the honeypot: return simulated success to fool automated bots without storing spam
    respond(true, 'Your enquiry has been received.');
}

// 4. Time-Trap Anti-Bot Check
$formTime = (int) ($_POST['form_time'] ?? 0);
$minSeconds = config('security.timetrap_seconds', 3);
if ($formTime > 0 && (time() - $formTime) < $minSeconds) {
    // Submitted suspiciously fast (<3 seconds)
    respond(false, 'Submission processed too quickly. Please take a moment to review your input.', [], 422);
}

// 5. IP Rate Limiting Check
$clientIp = get_client_ip();
$ipHash = hash_ip($clientIp);
if (!check_rate_limit($ipHash, 'hire_submit')) {
    respond(false, 'Too many requests from your IP address. Please wait an hour before submitting again.', [], 429);
}

// 6. Sanitize and Validate Inputs
$name            = trim((string) ($_POST['full_name'] ?? ''));
$company         = trim((string) ($_POST['company'] ?? ''));
$email           = trim((string) ($_POST['email'] ?? ''));
$phone           = trim((string) ($_POST['phone'] ?? ''));
$developerRole   = trim((string) ($_POST['developer_role'] ?? ''));
$engagementModel = strtolower(trim((string) ($_POST['engagement_model'] ?? '')));
$experienceLevel = trim((string) ($_POST['experience_level'] ?? 'Mid'));
$durationHours   = trim((string) ($_POST['duration_hours'] ?? ''));
$budget          = trim((string) ($_POST['budget'] ?? ''));
$projectDetails  = trim((string) ($_POST['project_details'] ?? ''));
$privacyConsent  = !empty($_POST['privacy_consent']);
$sourcePage      = trim((string) ($_POST['source_page'] ?? '/'));
$userAgent       = substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 500);

// Technologies handling (array of chips + other)
$technologies = [];
if (!empty($_POST['technologies']) && is_array($_POST['technologies'])) {
    foreach ($_POST['technologies'] as $tech) {
        $tech = trim((string) $tech);
        if ($tech !== '') {
            $technologies[] = substr($tech, 0, 50);
        }
    }
}
$otherTech = trim((string) ($_POST['technologies_other'] ?? ''));
if ($otherTech !== '') {
    $technologies[] = substr($otherTech, 0, 100);
}
$technologiesStr = implode(', ', array_unique($technologies));

// Validation checks
$errors = [];
if (mb_strlen($name) < 2 || mb_strlen($name) > 150) {
    $errors['full_name'] = 'Please provide your full name (2-150 characters).';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Please enter a valid business email address.';
}

if (mb_strlen($phone) < 6 || mb_strlen($phone) > 50) {
    $errors['phone'] = 'Please enter a valid phone number with country code.';
}

if ($developerRole === '') {
    $errors['developer_role'] = 'Please select a developer discipline.';
}

$validModels = ['hourly', 'weekly', 'monthly'];
if (!in_array($engagementModel, $validModels, true)) {
    $errors['engagement_model'] = 'Please choose a valid engagement model (Hourly, Weekly, or Monthly).';
}

if (mb_strlen($projectDetails) < 10) {
    $errors['project_details'] = 'Please provide at least a brief summary of your project or requirements (minimum 10 characters).';
}

if (!$privacyConsent) {
    $errors['privacy_consent'] = 'You must agree to the privacy policy to proceed.';
}

if (!empty($errors)) {
    respond(false, 'Please correct the highlighted fields.', ['errors' => $errors], 422);
}

// 7. Store in Database via Prepared Statements
$leadId = 0;
$nowUtc = gmdate('Y-m-d H:i:s');

try {
    $pdo = db_connect();
    if ($pdo) {
        $stmt = $pdo->prepare("
            INSERT INTO hiring_enquiries (
                created_at, name, company, email, phone, developer_role,
                technologies, experience_level, engagement_model, duration_hours,
                budget, project_details, status, source_page, ip_hash, user_agent
            ) VALUES (
                :created_at, :name, :company, :email, :phone, :developer_role,
                :technologies, :experience_level, :engagement_model, :duration_hours,
                :budget, :project_details, 'new', :source_page, :ip_hash, :user_agent
            )
        ");

        $stmt->execute([
            ':created_at'       => $nowUtc,
            ':name'             => $name,
            ':company'          => $company ?: null,
            ':email'            => $email,
            ':phone'            => $phone,
            ':developer_role'   => $developerRole,
            ':technologies'     => $technologiesStr ?: null,
            ':experience_level' => $experienceLevel ?: null,
            ':engagement_model' => $engagementModel,
            ':duration_hours'   => $durationHours ?: null,
            ':budget'           => $budget ?: null,
            ':project_details'  => $projectDetails,
            ':source_page'      => $sourcePage,
            ':ip_hash'          => $ipHash,
            ':user_agent'       => $userAgent,
        ]);

        $leadId = (int) $pdo->lastInsertId();
    } else {
        // Fallback file storage if database connection is temporarily unconfigured or down
        $fallbackDir = dirname(__DIR__, 2) . '/logs/leads_fallback';
        if (!is_dir($fallbackDir)) {
            @mkdir($fallbackDir, 0755, true);
        }
        $leadId = time();
        $fallbackData = [
            'lead_id'          => $leadId,
            'created_at'       => $nowUtc,
            'name'             => $name,
            'company'          => $company,
            'email'            => $email,
            'phone'            => $phone,
            'developer_role'   => $developerRole,
            'technologies'     => $technologiesStr,
            'experience_level' => $experienceLevel,
            'engagement_model' => $engagementModel,
            'duration_hours'   => $durationHours,
            'budget'           => $budget,
            'project_details'  => $projectDetails,
            'source_page'      => $sourcePage,
            'ip_hash'          => $ipHash,
        ];
        @file_put_contents($fallbackDir . '/lead_' . $leadId . '.json', json_encode($fallbackData, JSON_PRETTY_PRINT));
        error_log("Database unavailable: Saved lead #{$leadId} to file fallback.");
    }
} catch (Throwable $e) {
    error_log("Database lead insert exception: " . $e->getMessage());
    respond(false, 'A temporary database error occurred. Please contact us directly at ' . brand('contact.email_hire'), [], 500);
}

// 8. Dispatch Emails (Admin Notification + Client Confirmation)
// Crucial: Log failures, but never fail the enquiry if email dispatch fails!
try {
    $emailPayload = [
        'created_at'       => $nowUtc,
        'name'             => $name,
        'company'          => $company,
        'email'            => $email,
        'phone'            => $phone,
        'developer_role'   => $developerRole,
        'technologies'     => $technologiesStr,
        'experience_level' => $experienceLevel,
        'engagement_model' => $engagementModel,
        'duration_hours'   => $durationHours,
        'budget'           => $budget,
        'project_details'  => $projectDetails,
        'source_page'      => $sourcePage,
    ];
    dispatch_hiring_emails($emailPayload, $leadId);
} catch (Throwable $e) {
    error_log("Email dispatch failure for lead #{$leadId}: " . $e->getMessage());
}

// 9. Return Success
respond(true, 'Your hiring enquiry has been successfully submitted! Our team will contact you within one business day.', [
    'lead_id' => $leadId,
    'role'    => $developerRole,
    'model'   => ucfirst($engagementModel),
    'name'    => $name,
]);
