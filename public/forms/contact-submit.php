<?php
/**
 * Arora Tech Solutions - Contact Form Handler
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

function respond_contact(bool $success, string $message, array $extra = [], int $statusCode = 200) use ($isAjax): void {
    http_response_code($statusCode);
    if ($isAjax) {
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode(array_merge([
            'success' => $success,
            'message' => $message,
        ], $extra));
        exit;
    }

    $_SESSION['contact_flash'] = [
        'success' => $success,
        'message' => $message,
    ];
    header('Location: /contact/');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond_contact(false, 'Invalid request method.', [], 405);
}

// CSRF
if (!csrf_verify($_POST['csrf_token'] ?? '')) {
    respond_contact(false, 'Security token validation failed. Please refresh.', [], 403);
}

// Honeypot
$hpField = config('security.honeypot_field', 'ats_verify_hp');
if (!empty($_POST[$hpField])) {
    respond_contact(true, 'Message received.');
}

// Rate limit
$clientIp = get_client_ip();
$ipHash = hash_ip($clientIp);
if (!check_rate_limit($ipHash, 'contact_submit')) {
    respond_contact(false, 'Too many requests. Please wait before submitting again.', [], 429);
}

$name    = trim((string) ($_POST['name'] ?? ''));
$company = trim((string) ($_POST['company'] ?? ''));
$email   = trim((string) ($_POST['email'] ?? ''));
$phone   = trim((string) ($_POST['phone'] ?? ''));
$subject = trim((string) ($_POST['subject'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));

$errors = [];
if (mb_strlen($name) < 2) $errors['name'] = 'Please enter your name.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Valid work email required.';
if (mb_strlen($subject) < 3) $errors['subject'] = 'Please provide a subject.';
if (mb_strlen($message) < 10) $errors['message'] = 'Message must be at least 10 characters.';

if (!empty($errors)) {
    respond_contact(false, 'Please correct highlighted errors.', ['errors' => $errors], 422);
}

$nowUtc = gmdate('Y-m-d H:i:s');
$pdo = db_connect();
if ($pdo) {
    try {
        $stmt = $pdo->prepare("
            INSERT INTO contact_messages (created_at, name, company, email, phone, subject, message, status, ip_hash, user_agent)
            VALUES (:created_at, :name, :company, :email, :phone, :subject, :message, 'new', :ip_hash, :user_agent)
        ");
        $stmt->execute([
            ':created_at' => $nowUtc,
            ':name'       => $name,
            ':company'    => $company ?: null,
            ':email'      => $email,
            ':phone'      => $phone ?: null,
            ':subject'    => $subject,
            ':message'    => $message,
            ':ip_hash'    => $ipHash,
            ':user_agent' => substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 500)
        ]);
    } catch (Throwable $e) {
        error_log("Contact DB error: " . $e->getMessage());
    }
}

// Send notification email to admin
$adminEmail = config('smtp.admin_email', 'hire@aroratechsolutions.com');
$emailSubject = "[CONTACT INQUIRY] {$subject} from {$name}";
$emailBody = "<p><strong>Name:</strong> " . e($name) . "</p>" .
             "<p><strong>Company:</strong> " . e($company) . "</p>" .
             "<p><strong>Email:</strong> " . e($email) . "</p>" .
             "<p><strong>Phone:</strong> " . e($phone) . "</p>" .
             "<p><strong>Subject:</strong> " . e($subject) . "</p>" .
             "<p><strong>Message:</strong><br>" . nl2br(e($message)) . "</p>";

send_email($adminEmail, $emailSubject, $emailBody);

respond_contact(true, 'Your message has been sent successfully. We will be in touch shortly.');
