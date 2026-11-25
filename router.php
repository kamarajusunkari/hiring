<?php
/**
 * Local Development Router for PHP Built-In Web Server
 * Simulates Apache .htaccess clean URL rewrites locally.
 * 
 * Usage:
 * php -S localhost:8000 router.php
 */

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$publicDir = __DIR__ . '/public';

// 1. Serve existing static assets directly (CSS, JS, images)
$staticFile = $publicDir . $uri;
if ($uri !== '/' && file_exists($staticFile) && !is_dir($staticFile)) {
    return false; // Built-in server serves the file
}

// 2. Homepage: /
if ($uri === '/' || $uri === '') {
    require $publicDir . '/index.php';
    return true;
}

// 3. Contact page: /contact/ or /contact
if (preg_match('#^/contact/?$#', $uri)) {
    require $publicDir . '/contact.php';
    return true;
}

// 4. Role pages: /hire/<role-slug>/
if (preg_match('#^/hire/([a-zA-Z0-9\-]+)/?$#', $uri, $matches)) {
    $roleFile = $publicDir . '/hire/' . $matches[1] . '.php';
    if (file_exists($roleFile)) {
        require $roleFile;
        return true;
    }
}

// 5. Sitemap XML: /sitemap.xml
if ($uri === '/sitemap.xml') {
    require $publicDir . '/sitemap.xml.php';
    return true;
}

// 6. Direct form submissions
if ($uri === '/forms/hire-submit.php') {
    require $publicDir . '/forms/hire-submit.php';
    return true;
}
if ($uri === '/forms/contact-submit.php') {
    require $publicDir . '/forms/contact-submit.php';
    return true;
}

// 404 Fallback
http_response_code(404);
echo "<h1>404 Not Found</h1><p>The requested URL {$uri} was not found.</p>";
return true;
