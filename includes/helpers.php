<?php
/**
 * Arora Tech Solutions - System Helpers & Utilities
 */

declare(strict_types=1);

/**
 * Escape HTML output for defense against XSS
 */
function e(?string $value): string
{
    return htmlspecialchars((string) ($value ?? ''), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/**
 * Return global configuration array or specific key
 */
function config(?string $key = null, $default = null)
{
    static $config = null;
    if ($config === null) {
        $configPath = dirname(__DIR__) . '/config/config.php';
        if (file_exists($configPath)) {
            $config = require $configPath;
        } else {
            $config = [];
        }
    }

    if ($key === null) {
        return $config;
    }

    $segments = explode('.', $key);
    $current = $config;
    foreach ($segments as $segment) {
        if (!is_array($current) || !array_key_exists($segment, $current)) {
            return $default;
        }
        $current = $current[$segment];
    }

    return $current;
}

/**
 * Return brand configuration array or specific key
 */
function brand(?string $key = null, $default = null)
{
    return config('brand' . ($key ? '.' . $key : ''), $default);
}

/**
 * Build an absolute or relative clean URL with trailing slash support
 */
function url(string $path = ''): string
{
    $path = trim($path, '/');
    if ($path === '' || $path === '/') {
        return '/';
    }
    // Static assets or files with extension shouldn't get trailing slash
    if (preg_match('/\.[a-zA-Z0-9]+$/', $path)) {
        return '/' . $path;
    }
    return '/' . $path . '/';
}

/**
 * Build an asset URL with automated filemtime cache-busting
 */
function asset(string $path): string
{
    $cleanPath = ltrim($path, '/');
    $fullPath = dirname(__DIR__) . '/public/' . $cleanPath;
    $v = file_exists($fullPath) ? filemtime($fullPath) : '1.0.0';
    return '/' . $cleanPath . '?v=' . $v;
}

/**
 * Start PHP session safely with strict cookie flags
 */
function session_start_safe(): void
{
    if (session_status() === PHP_SESSION_NONE) {
        $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ||
                   (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443) ||
                   (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https');

        $currentCookieParams = session_get_cookie_params();
        session_set_cookie_params([
            'lifetime' => 7200,
            'path'     => '/',
            'domain'   => $currentCookieParams['domain'] ?? '',
            'secure'   => $isHttps,
            'httponly' => true,
            'samesite' => 'Lax'
        ]);
        session_name('ATS_HIRE_SESSID');
        session_start();
    }
}

/**
 * Get client IP address respecting Cloudflare and reverse proxies
 */
function get_client_ip(): string
{
    $headers = [
        'HTTP_CF_CONNECTING_IP',
        'HTTP_X_FORWARDED_FOR',
        'HTTP_X_REAL_IP',
        'REMOTE_ADDR'
    ];

    foreach ($headers as $header) {
        if (!empty($_SERVER[$header])) {
            $ips = explode(',', (string) $_SERVER[$header]);
            $ip = trim($ips[0]);
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }

    return '127.0.0.1';
}

/**
 * Securely hash client IP address with a salt for rate-limiting & privacy
 */
function hash_ip(string $ip): string
{
    $salt = config('app.key', 'arora_salt_key_default');
    return hash_hmac('sha256', $ip, $salt);
}

/**
 * Check if the current IP has exceeded the submission rate limit
 */
function check_rate_limit(string $ipHash, string $action = 'hire_submit'): bool
{
    $limit = config('security.rate_limit_submissions', 5);
    $window = config('security.rate_limit_window', 3600);

    // Attempt DB check first
    try {
        $pdo = db_connect();
        if ($pdo) {
            $stmt = $pdo->prepare("
                SELECT COUNT(*) FROM rate_limit_logs
                WHERE ip_hash = :ip_hash AND action = :action AND created_at >= (NOW() - INTERVAL :window SECOND)
            ");
            $stmt->bindValue(':ip_hash', $ipHash);
            $stmt->bindValue(':action', $action);
            $stmt->bindValue(':window', $window, PDO::PARAM_INT);
            $stmt->execute();
            $count = (int) $stmt->fetchColumn();

            if ($count >= $limit) {
                return false; // Rate limit exceeded
            }

            // Log attempt
            $insert = $pdo->prepare("INSERT INTO rate_limit_logs (ip_hash, action, created_at) VALUES (:ip_hash, :action, NOW())");
            $insert->execute([':ip_hash' => $ipHash, ':action' => $action]);
            return true;
        }
    } catch (Throwable $e) {
        error_log("Rate limit DB check error: " . $e->getMessage());
    }

    // Fallback: session / file-based rate limit
    session_start_safe();
    $now = time();
    $subKey = 'rate_' . $action . '_times';
    if (!isset($_SESSION[$subKey]) || !is_array($_SESSION[$subKey])) {
        $_SESSION[$subKey] = [];
    }

    // Filter out timestamps outside window
    $_SESSION[$subKey] = array_filter($_SESSION[$subKey], fn($ts) => ($now - $ts) < $window);

    if (count($_SESSION[$subKey]) >= $limit) {
        return false;
    }

    $_SESSION[$subKey][] = $now;
    return true;
}

/**
 * List of the 12 core developer & designer roles with metadata
 */
function get_role_catalog(): array
{
    return [
        'full-stack-developers' => [
            'slug'        => 'full-stack-developers',
            'title'       => 'Full Stack Developers',
            'h1'          => 'Hire Dedicated Full Stack Developers',
            'nav_title'   => 'Full Stack Developers',
            'short_desc'  => 'End-to-end engineers mastering frontend, backend, APIs, and cloud architecture.',
            'accent'      => '#3B82F6', // Royal Blue
            'bg_tint'     => 'rgba(59, 130, 246, 0.08)',
            'icon'        => 'layers',
            'default_tech'=> ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'GraphQL'],
            'related'     => ['frontend-developers', 'backend-developers', 'react-developers']
        ],
        'frontend-developers' => [
            'slug'        => 'frontend-developers',
            'title'       => 'Frontend Developers',
            'h1'          => 'Hire Expert Frontend Developers',
            'nav_title'   => 'Frontend Developers',
            'short_desc'  => 'Engineers crafting blazing fast, pixel-perfect, accessible web interfaces.',
            'accent'      => '#06B6D4', // Electric Cyan
            'bg_tint'     => 'rgba(6, 182, 212, 0.08)',
            'icon'        => 'layout',
            'default_tech'=> ['HTML5/CSS3', 'JavaScript', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vue.js'],
            'related'     => ['react-developers', 'full-stack-developers', 'ui-ux-designers']
        ],
        'backend-developers' => [
            'slug'        => 'backend-developers',
            'title'       => 'Backend Developers',
            'h1'          => 'Hire Scalable Backend Developers',
            'nav_title'   => 'Backend Developers',
            'short_desc'  => 'Architects of high-throughput APIs, distributed systems, and resilient databases.',
            'accent'      => '#10B981', // Emerald / Neon Teal
            'bg_tint'     => 'rgba(16, 185, 129, 0.08)',
            'icon'        => 'server',
            'default_tech'=> ['Node.js', 'Python', 'Go', 'PostgreSQL', 'Redis', 'Microservices'],
            'related'     => ['full-stack-developers', 'python-developers', 'php-developers']
        ],
        'react-developers' => [
            'slug'        => 'react-developers',
            'title'       => 'React Developers',
            'h1'          => 'Hire Senior React.js & Next.js Developers',
            'nav_title'   => 'React Developers',
            'short_desc'  => 'Specialists in React, Next.js, Redux, modular UI systems, and Jamstack apps.',
            'accent'      => '#6366F1', // Indigo / Purple
            'bg_tint'     => 'rgba(99, 102, 241, 0.08)',
            'icon'        => 'atom',
            'default_tech'=> ['React', 'Next.js', 'Redux Toolkit', 'Zustand', 'TypeScript', 'Tailwind'],
            'related'     => ['frontend-developers', 'full-stack-developers', 'ui-ux-designers']
        ],
        'python-developers' => [
            'slug'        => 'python-developers',
            'title'       => 'Python Developers',
            'h1'          => 'Hire Senior Python & Django Developers',
            'nav_title'   => 'Python Developers',
            'short_desc'  => 'Engineers building Django/FastAPI backends, data pipelines, and automation tools.',
            'accent'      => '#F59E0B', // Python Gold / Amber
            'bg_tint'     => 'rgba(245, 158, 11, 0.08)',
            'icon'        => 'code',
            'default_tech'=> ['Python', 'FastAPI', 'Django', 'PostgreSQL', 'Pandas', 'Celery'],
            'related'     => ['ai-automation-developers', 'backend-developers', 'full-stack-developers']
        ],
        'php-developers' => [
            'slug'        => 'php-developers',
            'title'       => 'PHP Developers',
            'h1'          => 'Hire Dedicated PHP & Laravel Developers',
            'nav_title'   => 'PHP & Laravel Developers',
            'short_desc'  => 'Experts in modern PHP 8.x, robust Laravel apps, API architectures, and legacy migrations.',
            'accent'      => '#8B5CF6', // Purple Slate
            'bg_tint'     => 'rgba(139, 92, 246, 0.08)',
            'icon'        => 'terminal',
            'default_tech'=> ['PHP 8.x', 'Laravel', 'MySQL', 'Livewire', 'REST APIs', 'Docker'],
            'related'     => ['wordpress-developers', 'backend-developers', 'full-stack-developers']
        ],
        'wordpress-developers' => [
            'slug'        => 'wordpress-developers',
            'title'       => 'WordPress Developers',
            'h1'          => 'Hire Custom WordPress & WooCommerce Developers',
            'nav_title'   => 'WordPress Developers',
            'short_desc'  => 'Bespoke theme builders, custom plugin architects, and WooCommerce speed specialists.',
            'accent'      => '#2563EB', // Blue
            'bg_tint'     => 'rgba(37, 99, 235, 0.08)',
            'icon'        => 'globe',
            'default_tech'=> ['WordPress', 'WooCommerce', 'Custom Post Types', 'ACF Pro', 'REST API', 'PHP'],
            'related'     => ['shopify-developers', 'php-developers', 'frontend-developers']
        ],
        'shopify-developers' => [
            'slug'        => 'shopify-developers',
            'title'       => 'Shopify Developers',
            'h1'          => 'Hire Certified Shopify & Liquid Developers',
            'nav_title'   => 'Shopify Developers',
            'short_desc'  => 'Custom Liquid storefronts, headless Shopify builds, checkout extensions, and app integrations.',
            'accent'      => '#10B981', // Shopify Green
            'bg_tint'     => 'rgba(16, 185, 129, 0.08)',
            'icon'        => 'shopping-bag',
            'default_tech'=> ['Shopify Liquid', 'Hydrogen / Oxygen', 'Shopify Plus', 'GraphQL', 'Tailwind', 'JavaScript'],
            'related'     => ['wordpress-developers', 'frontend-developers', 'ui-ux-designers']
        ],
        'flutter-developers' => [
            'slug'        => 'flutter-developers',
            'title'       => 'Flutter Developers',
            'h1'          => 'Hire Cross-Platform Flutter Developers',
            'nav_title'   => 'Flutter Developers',
            'short_desc'  => 'Single-codebase iOS and Android native performance, sleek animations, and offline-first mobile apps.',
            'accent'      => '#0284C7', // Sky Blue
            'bg_tint'     => 'rgba(2, 132, 199, 0.08)',
            'icon'        => 'smartphone',
            'default_tech'=> ['Flutter', 'Dart', 'BLoC / Riverpod', 'Firebase', 'REST APIs', 'App Store / Play Store'],
            'related'     => ['react-developers', 'frontend-developers', 'qa-testers']
        ],
        'ai-automation-developers' => [
            'slug'        => 'ai-automation-developers',
            'title'       => 'AI & Automation Developers',
            'h1'          => 'Hire AI Integration & Automation Engineers',
            'nav_title'   => 'AI & Automation Developers',
            'short_desc'  => 'LLM integrations, autonomous agent workflows, n8n/Zapier orchestration, and intelligent business pipelines.',
            'accent'      => '#D946EF', // Fuchsia / Neon Violet
            'bg_tint'     => 'rgba(217, 70, 239, 0.08)',
            'icon'        => 'cpu',
            'default_tech'=> ['LLM APIs (OpenAI/Anthropic/Gemini)', 'LangChain', 'Python', 'n8n', 'FastAPI', 'Vector Databases'],
            'related'     => ['python-developers', 'backend-developers', 'full-stack-developers']
        ],
        'ui-ux-designers' => [
            'slug'        => 'ui-ux-designers',
            'title'       => 'UI/UX Designers',
            'h1'          => 'Hire Product Designers & UI/UX Specialists',
            'nav_title'   => 'UI/UX Designers',
            'short_desc'  => 'Design system builders, Figma interactive prototypers, and user journey optimization experts.',
            'accent'      => '#EC4899', // Pink / Coral
            'bg_tint'     => 'rgba(236, 72, 153, 0.08)',
            'icon'        => 'figma',
            'default_tech'=> ['Figma', 'Design Systems', 'Interactive Prototyping', 'User Research', 'Wireframing', 'Responsive Design'],
            'related'     => ['frontend-developers', 'react-developers', 'full-stack-developers']
        ],
        'qa-testers' => [
            'slug'        => 'qa-testers',
            'title'       => 'QA & Automation Testers',
            'h1'          => 'Hire Dedicated QA & Software Testers',
            'nav_title'   => 'QA Engineers & Testers',
            'short_desc'  => 'Manual testing, automated end-to-end regression suites, API validation, and performance benchmarking.',
            'accent'      => '#14B8A6', // Teal
            'bg_tint'     => 'rgba(20, 184, 166, 0.08)',
            'icon'        => 'check-circle',
            'default_tech'=> ['Cypress', 'Playwright', 'Selenium', 'Postman', 'Jest', 'Cross-Browser Testing'],
            'related'     => ['full-stack-developers', 'frontend-developers', 'backend-developers']
        ],
    ];
}

/**
 * Render standard crisp 1.75px SVG icons
 */
function render_svg_icon(string $name, string $classes = 'icon-default'): string
{
    $icons = [
        'layers' => '<svg class="' . e($classes) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>',
        'layout' => '<svg class="' . e($classes) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>',
        'server' => '<svg class="' . e($classes) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>',
        'atom' => '<svg class="' . e($classes) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="2"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.3"></path><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)"></ellipse><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)"></ellipse></svg>',
        'code' => '<svg class="' . e($classes) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
        'terminal' => '<svg class="' . e($classes) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>',
        'globe' => '<svg class="' . e($classes) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
        'shopping-bag' => '<svg class="' . e($classes) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>',
        'smartphone' => '<svg class="' . e($classes) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>',
        'cpu' => '<svg class="' . e($classes) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>',
        'figma' => '<svg class="' . e($classes) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path></svg>',
        'check-circle' => '<svg class="' . e($classes) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
        'arrow-right' => '<svg class="' . e($classes) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
        'shield-check' => '<svg class="' . e($classes) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>',
        'clock' => '<svg class="' . e($classes) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
        'calendar' => '<svg class="' . e($classes) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
        'briefcase' => '<svg class="' . e($classes) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
        'chevron-down' => '<svg class="' . e($classes) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>',
        'mail' => '<svg class="' . e($classes) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',
        'phone' => '<svg class="' . e($classes) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
        'check' => '<svg class="' . e($classes) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>',
        'zap' => '<svg class="' . e($classes) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
        'sparkles' => '<svg class="' . e($classes) . '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.912 5.885L20 10.8l-4.994 3.63L16.918 20 12 16.385 7.082 20l1.912-5.57L4 10.8l6.088-1.915L12 3z"></path></svg>',
    ];

    return $icons[$name] ?? '<span class="' . e($classes) . '">●</span>';
}
