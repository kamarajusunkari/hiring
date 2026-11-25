<?php
/**
 * Arora Tech Solutions - Global Site Header & Shell
 */

declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/csrf.php';
require_once __DIR__ . '/seo.php';
require_once __DIR__ . '/navigation.php';

$brandName    = brand('company_name', 'Arora Tech Solutions');
$mainSiteUrl  = brand('main_site_url', 'https://aroratechsolutions.com');
$currentRole  = $roleSlug ?? null;
$bodyClasses  = ['site-body'];

if ($currentRole) {
    $bodyClasses[] = 'page-role';
    $bodyClasses[] = 'role-' . preg_replace('/-developers$|-testers$|-designers$/', '', $currentRole);
    $bodyClasses[] = 'role-' . $currentRole;
} else {
    $bodyClasses[] = 'page-' . ($pageSlug ?? 'home');
}
?>
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="theme-color" content="#0F52BA">
    
    <!-- SEO & Open Graph Tags -->
    <?= SEO::renderTags(); ?>

    <!-- Fonts: Preconnect & Load -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="<?= e(brand('fonts.google_fonts_url')); ?>" rel="stylesheet">

    <!-- Global & Component Stylesheets -->
    <link rel="stylesheet" href="<?= asset('assets/css/global.css'); ?>">
    <link rel="stylesheet" href="<?= asset('assets/css/components.css'); ?>">
    <?php if ($currentRole && file_exists(dirname(__DIR__) . '/public/assets/css/roles/' . $currentRole . '.css')): ?>
    <link rel="stylesheet" href="<?= asset('assets/css/roles/' . $currentRole . '.css'); ?>">
    <?php endif; ?>

    <script>document.documentElement.classList.remove('no-js');</script>
</head>
<body class="<?= implode(' ', $bodyClasses); ?>">
    <!-- Skip to main content landmark for accessibility -->
    <a href="#main-content" class="skip-to-content">Skip to main content</a>

    <!-- Top Announcement Strip: Main WordPress Site Bridge -->
    <div class="top-bridge-strip" role="complementary" aria-label="Network links">
        <div class="container top-bridge-inner">
            <div class="bridge-left">
                <span class="bridge-status-dot" aria-hidden="true"></span>
                <span>Arora Tech Solutions Ecosystem &bull; Lead Generation & Developer Staffing</span>
            </div>
            <div class="bridge-right">
                <a href="<?= e($mainSiteUrl); ?>" class="bridge-link" target="_blank" rel="noopener">
                    <span>Visit Main Company Site (aroratechsolutions.com)</span>
                    <?= render_svg_icon('arrow-right', 'icon-xs'); ?>
                </a>
            </div>
        </div>
    </div>

    <!-- Main Navigation Header -->
    <header class="site-header" id="site-header">
        <div class="container header-container">
            <!-- Brand Logo -->
            <div class="header-brand-wrap">
                <a href="<?= url(''); ?>" class="site-brand" aria-label="<?= e($brandName); ?> - Home">
                    <div class="brand-logo-mark" aria-hidden="true">
                        <svg viewBox="0 0 36 36" fill="none" class="brand-svg-mark">
                            <rect width="36" height="36" rx="10" fill="#0F52BA"/>
                            <path d="M10 26L18 10L26 26H21.5L18 18.5L14.5 26H10Z" fill="#FFFFFF"/>
                            <circle cx="18" cy="14" r="2.5" fill="#00C896"/>
                        </svg>
                    </div>
                    <div class="brand-text-group">
                        <span class="brand-name">Arora<span class="brand-name-accent">Tech</span></span>
                        <span class="brand-sub">Developer Hiring Solutions</span>
                    </div>
                </a>
            </div>

            <!-- Desktop Navigation Links -->
            <nav class="desktop-nav" aria-label="Primary Navigation">
                <ul class="nav-menu">
                    <li class="nav-item has-dropdown">
                        <button type="button" class="nav-link dropdown-toggle" id="mega-menu-trigger" aria-expanded="false" aria-controls="hire-mega-menu">
                            <span>Hire Developers</span>
                            <?= render_svg_icon('chevron-down', 'icon-xs chevron-icon'); ?>
                        </button>
                    </li>
                    <li class="nav-item">
                        <a href="<?= url(''); ?>#hiring-models" class="nav-link">Hiring Models</a>
                    </li>
                    <li class="nav-item">
                        <a href="<?= url(''); ?>#how-it-works" class="nav-link">How It Works</a>
                    </li>
                    <li class="nav-item">
                        <a href="<?= url(''); ?>#faq" class="nav-link">FAQ</a>
                    </li>
                    <li class="nav-item">
                        <a href="<?= url('contact'); ?>" class="nav-link">Contact</a>
                    </li>
                </ul>
            </nav>

            <!-- Header Action CTAs -->
            <div class="header-actions">
                <a href="#enquiry-section" class="btn btn-primary header-cta-btn">
                    <span>Get a Quote</span>
                    <?= render_svg_icon('arrow-right', 'icon-sm'); ?>
                </a>
                <button type="button" class="mobile-menu-toggle" id="mobile-menu-toggle" aria-expanded="false" aria-controls="mobile-drawer" aria-label="Open mobile navigation menu">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
            </div>
        </div>

        <!-- Desktop Mega-Menu Dropdown -->
        <?= render_desktop_mega_menu(); ?>
    </header>

    <!-- Mobile Drawer Navigation -->
    <?= render_mobile_drawer(); ?>

    <!-- Main Content Shell -->
    <main id="main-content" class="site-main" tabindex="-1">
