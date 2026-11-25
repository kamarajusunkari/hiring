<?php
/**
 * Application Master Configuration
 * 
 * Loads environment variables from .env if present, otherwise provides
 * fallback configuration defaults.
 */

declare(strict_types=1);

// Load .env file if it exists and variables aren't already set
(function () {
    $envFiles = [
        dirname(__DIR__) . '/.env',
        __DIR__ . '/.env'
    ];

    foreach ($envFiles as $file) {
        if (file_exists($file) && is_readable($file)) {
            $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                $line = trim($line);
                if ($line === '' || str_starts_with($line, '#')) {
                    continue;
                }
                if (str_contains($line, '=')) {
                    [$key, $val] = explode('=', $line, 2);
                    $key = trim($key);
                    $val = trim($val);
                    // Strip surrounding quotes
                    if (
                        (str_starts_with($val, '"') && str_ends_with($val, '"')) ||
                        (str_starts_with($val, "'") && str_ends_with($val, "'"))
                    ) {
                        $val = substr($val, 1, -1);
                    }
                    if (getenv($key) === false && !isset($_ENV[$key])) {
                        putenv("{$key}={$val}");
                        $_ENV[$key] = $val;
                        $_SERVER[$key] = $val;
                    }
                }
            }
            break;
        }
    }
})();

$env = function (string $key, $default = null) {
    $val = getenv($key);
    if ($val === false) {
        $val = $_ENV[$key] ?? $_SERVER[$key] ?? $default;
    }
    if ($val === 'true' || $val === '(true)') return true;
    if ($val === 'false' || $val === '(false)') return false;
    if ($val === 'null' || $val === '(null)') return null;
    return $val;
};

// Base application configuration array
$config = [
    'app' => [
        'env'         => (string) $env('APP_ENV', 'production'),
        'debug'       => (bool) $env('APP_DEBUG', false),
        'url'         => (string) $env('APP_URL', 'https://hire.aroratechsolutions.com'),
        'key'         => (string) $env('APP_KEY', 'default_secret_key_change_in_production'),
        'timezone'    => 'UTC',
    ],
    'database' => [
        'host'        => (string) $env('DB_HOST', '127.0.0.1'),
        'port'        => (int) $env('DB_PORT', 3306),
        'name'        => (string) $env('DB_NAME', 'arora_hire_db'),
        'user'        => (string) $env('DB_USER', 'root'),
        'pass'        => (string) $env('DB_PASS', ''),
        'charset'     => (string) $env('DB_CHARSET', 'utf8mb4'),
    ],
    'smtp' => [
        'enabled'     => (bool) $env('SMTP_ENABLED', false),
        'host'        => (string) $env('SMTP_HOST', 'localhost'),
        'port'        => (int) $env('SMTP_PORT', 587),
        'secure'      => (string) $env('SMTP_SECURE', 'tls'),
        'auth'        => (bool) $env('SMTP_AUTH', false),
        'user'        => (string) $env('SMTP_USER', ''),
        'pass'        => (string) $env('SMTP_PASS', ''),
        'from_email'  => (string) $env('SMTP_FROM_EMAIL', 'hire@hire.aroratechsolutions.com'),
        'from_name'   => (string) $env('SMTP_FROM_NAME', 'Arora Tech Solutions'),
        'admin_email' => (string) $env('ADMIN_NOTIFICATION_EMAIL', 'hire@aroratechsolutions.com'),
    ],
    'security' => [
        'rate_limit_submissions' => (int) $env('RATE_LIMIT_MAX_SUBMISSIONS', 5),
        'rate_limit_window'      => (int) $env('RATE_LIMIT_WINDOW_SECONDS', 3600),
        'honeypot_field'         => (string) $env('HONEYPOT_FIELD_NAME', 'ats_verify_hp'),
        'timetrap_seconds'       => (int) $env('TIMETRAP_MIN_SECONDS', 3),
        'session_lifetime'       => 7200, // 2 hours
    ],
    'brand' => require __DIR__ . '/brand.php',
];

// Error reporting control based on environment
if ($config['app']['debug'] && $config['app']['env'] === 'development') {
    ini_set('display_errors', '1');
    ini_set('display_startup_errors', '1');
    error_reporting(E_ALL);
} else {
    ini_set('display_errors', '0');
    ini_set('display_startup_errors', '0');
    ini_set('log_errors', '1');
    $logDir = dirname(__DIR__) . '/logs';
    if (!is_dir($logDir)) {
        @mkdir($logDir, 0755, true);
    }
    ini_set('error_log', $logDir . '/php_errors.log');
    error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
}

return $config;
