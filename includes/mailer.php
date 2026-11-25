<?php
/**
 * Arora Tech Solutions - Mailer & Lead Notification System
 */

declare(strict_types=1);

require_once __DIR__ . '/helpers.php';

/**
 * Log mail messages to dedicated log file
 */
function log_mail_event(string $message): void
{
    $logDir = dirname(__DIR__) . '/logs';
    if (!is_dir($logDir)) {
        @mkdir($logDir, 0755, true);
    }
    $entry = sprintf("[%s] %s\n", date('Y-m-d H:i:s'), $message);
    @file_put_contents($logDir . '/mail.log', $entry, FILE_APPEND);
}

/**
 * Send an email via configured SMTP (PHPMailer / socket) or native mail fallback
 */
function send_email(string $to, string $subject, string $htmlBody, string $plainTextBody = '', array $headers = []): bool
{
    $smtp = config('smtp', []);
    $fromEmail = $smtp['from_email'] ?? 'hire@hire.aroratechsolutions.com';
    $fromName  = $smtp['from_name'] ?? 'Arora Tech Solutions';

    // If plain text body was not supplied, generate it from HTML
    if (empty($plainTextBody)) {
        $plainTextBody = strip_tags(str_replace(['<br>', '<br/>', '</p>', '</div>'], "\n", $htmlBody));
    }

    // 1. Try PHPMailer if vendor/autoload.php exists
    $autoloadPath = dirname(__DIR__) . '/vendor/autoload.php';
    if (file_exists($autoloadPath) && !empty($smtp['enabled']) && !empty($smtp['host'])) {
        try {
            require_once $autoloadPath;
            if (class_exists('PHPMailer\\PHPMailer\\PHPMailer')) {
                $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
                $mail->isSMTP();
                $mail->Host       = $smtp['host'];
                $mail->SMTPAuth   = !empty($smtp['auth']);
                $mail->Username   = $smtp['user'] ?? '';
                $mail->Password   = $smtp['pass'] ?? '';
                $mail->SMTPSecure = $smtp['secure'] === 'ssl' ? \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS : \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port       = (int) ($smtp['port'] ?? 587);
                $mail->CharSet    = 'UTF-8';

                $mail->setFrom($fromEmail, $fromName);
                $mail->addAddress($to);
                $mail->isHTML(true);
                $mail->Subject = $subject;
                $mail->Body    = $htmlBody;
                $mail->AltBody = $plainTextBody;

                $mail->send();
                log_mail_event("SUCCESS (PHPMailer SMTP) sent to {$to} with subject '{$subject}'");
                return true;
            }
        } catch (\Throwable $e) {
            log_mail_event("ERROR (PHPMailer SMTP) failed to {$to}: " . $e->getMessage());
            // Fall through to native mail
        }
    }

    // 2. Native mail() fallback (standard cPanel / shared hosting)
    try {
        $boundary = md5((string) time());
        $allHeaders = array_merge([
            'MIME-Version' => '1.0',
            'From' => sprintf('"%s" <%s>', addslashes($fromName), $fromEmail),
            'Reply-To' => sprintf('"%s" <%s>', addslashes($fromName), $fromEmail),
            'X-Mailer' => 'PHP/' . phpversion(),
            'Content-Type' => 'multipart/alternative; boundary="boundary_' . $boundary . '"',
        ], $headers);

        $headerStr = '';
        foreach ($allHeaders as $key => $val) {
            $headerStr .= "{$key}: {$val}\r\n";
        }

        $multipartBody  = "--boundary_{$boundary}\r\n";
        $multipartBody .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $multipartBody .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
        $multipartBody .= $plainTextBody . "\r\n\r\n";
        $multipartBody .= "--boundary_{$boundary}\r\n";
        $multipartBody .= "Content-Type: text/html; charset=UTF-8\r\n";
        $multipartBody .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
        $multipartBody .= $htmlBody . "\r\n\r\n";
        $multipartBody .= "--boundary_{$boundary}--";

        $success = @mail($to, $subject, $multipartBody, $headerStr);
        if ($success) {
            log_mail_event("SUCCESS (Native mail) sent to {$to} with subject '{$subject}'");
            return true;
        } else {
            log_mail_event("FAILED (Native mail) could not dispatch to {$to}");
            return false;
        }
    } catch (\Throwable $e) {
        log_mail_event("ERROR (Native mail exception): " . $e->getMessage());
        return false;
    }
}

/**
 * Dispatch admin notification and client confirmation for hiring enquiries
 */
function dispatch_hiring_emails(array $data, int $leadId): void
{
    $adminEmail = config('smtp.admin_email', 'hire@aroratechsolutions.com');
    $brandName  = brand('company_name', 'Arora Tech Solutions');
    $mainUrl    = brand('main_site_url', 'https://aroratechsolutions.com');
    $hireUrl    = brand('hire_site_url', 'https://hire.aroratechsolutions.com');

    // 1. Admin Email
    $adminSubject = sprintf('[NEW LEAD #%d] %s for %s - %s', $leadId, $data['developer_role'], $data['company'] ?: $data['name'], $brandName);
    $adminHtml = <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background: #f8fafc; margin: 0; padding: 24px;">
  <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden;">
    <div style="background: #0f172a; padding: 24px 32px; color: #ffffff;">
      <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;">New Developer Hiring Enquiry</h2>
      <p style="margin: 4px 0 0; font-size: 14px; color: #94a3b8;">Lead ID: #{$leadId} &bull; Received: {$data['created_at']}</p>
    </div>
    <div style="padding: 32px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 15px;">
        <tr><td style="padding: 8px 0; color: #64748b; width: 160px; font-weight: 500;">Role Requested:</td><td style="padding: 8px 0; font-weight: 700; color: #0f52ba;">{$data['developer_role']}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 500;">Client Name:</td><td style="padding: 8px 0; font-weight: 600;">{$data['name']}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 500;">Company:</td><td style="padding: 8px 0;">{$data['company']}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 500;">Email:</td><td style="padding: 8px 0;"><a href="mailto:{$data['email']}" style="color: #0f52ba;">{$data['email']}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 500;">Phone:</td><td style="padding: 8px 0;">{$data['phone']}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 500;">Engagement Model:</td><td style="padding: 8px 0; text-transform: capitalize; font-weight: 600;">{$data['engagement_model']}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 500;">Estimated Duration/Hours:</td><td style="padding: 8px 0;">{$data['duration_hours']}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 500;">Experience Tier:</td><td style="padding: 8px 0;">{$data['experience_level']}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 500;">Technologies:</td><td style="padding: 8px 0;">{$data['technologies']}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 500;">Budget Indicator:</td><td style="padding: 8px 0;">{$data['budget']}</td></tr>
        <tr><td style="padding: 8px 0; color: #64748b; font-weight: 500;">Source Page:</td><td style="padding: 8px 0; font-size: 13px; color: #64748b;">{$data['source_page']}</td></tr>
      </table>
      <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; border-left: 4px solid #0f52ba;">
        <h4 style="margin: 0 0 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #475569;">Project Scope & Requirements:</h4>
        <p style="margin: 0; white-space: pre-wrap; font-size: 14px; color: #1e293b;">{$data['project_details']}</p>
      </div>
    </div>
  </div>
</body>
</html>
HTML;

    send_email($adminEmail, $adminSubject, $adminHtml);

    // 2. Client Confirmation Email
    $clientSubject = sprintf('We have received your enquiry for %s - %s', $data['developer_role'], $brandName);
    $clientHtml = <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background: #f8fafc; margin: 0; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden;">
    <div style="background: #0f172a; padding: 28px 32px; color: #ffffff;">
      <h2 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">{$brandName}</h2>
      <p style="margin: 4px 0 0; font-size: 14px; color: #94a3b8;">Your Next Developer Is Just One Step Away.</p>
    </div>
    <div style="padding: 32px;">
      <p style="font-size: 16px; margin: 0 0 16px;">Hello <strong>{$data['name']}</strong>,</p>
      <p style="font-size: 15px; margin: 0 0 16px; color: #334155;">Thank you for reaching out to {$brandName}. We have successfully received your enquiry for <strong>{$data['developer_role']}</strong> on a <strong>{$data['engagement_model']}</strong> engagement model.</p>
      
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 24px 0;">
        <h4 style="margin: 0 0 12px; font-size: 14px; text-transform: uppercase; color: #0f52ba; letter-spacing: 0.05em;">What happens next?</h4>
        <ol style="margin: 0; padding-left: 20px; font-size: 14px; color: #334155; line-height: 1.8;">
          <li><strong>Requirement Review:</strong> Our technical leads review your project requirements and technical stack.</li>
          <li><strong>Discovery Consultation:</strong> We contact you within one business day <!-- VERIFY: SLA --> to discuss timeline, matching criteria, and quote structure.</li>
          <li><strong>Candidate Presentation:</strong> We introduce pre-vetted engineers aligned with your working timezone and specifications.</li>
        </ol>
      </div>

      <p style="font-size: 14px; color: #64748b; margin: 24px 0 0;">If you have any immediate questions, reply directly to this email or reach us at <a href="mailto:hire@aroratechsolutions.com" style="color: #0f52ba;">hire@aroratechsolutions.com</a>.</p>
    </div>
    <div style="background: #f1f5f9; padding: 16px 32px; font-size: 12px; color: #64748b; text-align: center;">
      &copy; {$brandName}. All rights reserved. &bull; <a href="{$mainUrl}" style="color: #64748b;">Visit Main Site</a>
    </div>
  </div>
</body>
</html>
HTML;

    send_email($data['email'], $clientSubject, $clientHtml);
}
