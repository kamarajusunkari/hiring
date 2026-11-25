<?php
/**
 * Arora Tech Solutions - CSRF Protection Utilities
 */

declare(strict_types=1);

require_once __DIR__ . '/helpers.php';

/**
 * Generate or retrieve current CSRF token from session
 */
function csrf_token(): string
{
    session_start_safe();
    if (empty($_SESSION['ats_csrf_token'])) {
        $_SESSION['ats_csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['ats_csrf_token'];
}

/**
 * Output HTML hidden input with current CSRF token
 */
function csrf_field(): string
{
    $token = csrf_token();
    return '<input type="hidden" name="csrf_token" value="' . e($token) . '">';
}

/**
 * Verify submitted CSRF token using constant-time comparison
 */
function csrf_verify(?string $token): bool
{
    session_start_safe();
    if (empty($_SESSION['ats_csrf_token']) || empty($token)) {
        return false;
    }
    return hash_equals($_SESSION['ats_csrf_token'], $token);
}
