<?php
/**
 * Arora Tech Solutions - Navigation Data & Mega-Menu Helper
 */

declare(strict_types=1);

require_once __DIR__ . '/helpers.php';

function render_desktop_mega_menu(): string
{
    $roles = get_role_catalog();
    $html = '<div class="mega-menu" id="hire-mega-menu" role="region" aria-label="Developer Roles Menu">';
    $html .= '<div class="mega-menu-inner container">';
    $html .= '<div class="mega-menu-header">';
    $html .= '<div>';
    $html .= '<span class="mega-menu-badge">12 Dedicated Disciplines</span>';
    $html .= '<h3 class="mega-menu-title">Explore Specialized Engineering & Design Roles</h3>';
    $html .= '</div>';
    $html .= '<p class="mega-menu-sub">Every developer is thoroughly vetted for production-ready architecture, clean code standards, and agile communication.</p>';
    $html .= '</div>';

    $html .= '<div class="mega-menu-grid">';
    foreach ($roles as $slug => $role) {
        $icon = render_svg_icon($role['icon'], 'role-card-icon');
        $html .= '<a href="' . url('hire/' . $slug) . '" class="mega-menu-item" style="--item-accent: ' . e($role['accent']) . ';">';
        $html .= '<div class="mega-menu-icon" style="background: ' . e($role['bg_tint']) . '; color: ' . e($role['accent']) . ';">' . $icon . '</div>';
        $html .= '<div class="mega-menu-content">';
        $html .= '<div class="mega-menu-role-title">' . e($role['nav_title']) . '</div>';
        $html .= '<div class="mega-menu-role-desc">' . e($role['short_desc']) . '</div>';
        $html .= '</div>';
        $html .= '</a>';
    }
    $html .= '</div>'; // mega-menu-grid

    $html .= '<div class="mega-menu-footer">';
    $html .= '<div class="mega-menu-footer-left">';
    $html .= render_svg_icon('shield-check', 'icon-sm text-secondary') . ' <span>100% Quote-based custom engagements &bull; Hourly, Weekly, Monthly</span>';
    $html .= '</div>';
    $html .= '<a href="' . url('contact') . '" class="mega-menu-footer-link">Talk to our solutions team ' . render_svg_icon('arrow-right', 'icon-xs') . '</a>';
    $html .= '</div>';

    $html .= '</div>'; // container
    $html .= '</div>'; // mega-menu

    return $html;
}

function render_mobile_drawer(): string
{
    $roles = get_role_catalog();
    $mainSiteUrl = brand('main_site_url', 'https://aroratechsolutions.com');
    $brandName = brand('company_name', 'Arora Tech Solutions');

    $html = '<div class="mobile-drawer" id="mobile-drawer" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Mobile Navigation">';
    $html .= '<div class="mobile-drawer-backdrop" data-close-drawer></div>';
    $html .= '<div class="mobile-drawer-panel">';
    
    // Header
    $html .= '<div class="mobile-drawer-header">';
    $html .= '<a href="' . url('') . '" class="site-logo-link" aria-label="' . e($brandName) . '">';
    $html .= '<span class="logo-text">Arora<span class="logo-accent">Tech</span></span>';
    $html .= '</a>';
    $html .= '<button type="button" class="drawer-close-btn" data-close-drawer aria-label="Close navigation menu">&times;</button>';
    $html .= '</div>';

    // Body
    $html .= '<div class="mobile-drawer-body">';
    $html .= '<div class="mobile-menu-section">';
    $html .= '<div class="mobile-menu-label">Main Navigation</div>';
    $html .= '<ul class="mobile-nav-list">';
    $html .= '<li><a href="' . url('') . '" class="mobile-nav-link">Home</a></li>';
    $html .= '<li><a href="' . $mainSiteUrl . '" class="mobile-nav-link external-link" target="_blank" rel="noopener">Visit Main Website (WordPress) ' . render_svg_icon('arrow-right', 'icon-xs') . '</a></li>';
    $html .= '<li><a href="' . url('contact') . '" class="mobile-nav-link">Contact & Inquiries</a></li>';
    $html .= '</ul>';
    $html .= '</div>';

    $html .= '<div class="mobile-menu-section">';
    $html .= '<div class="mobile-menu-label">Hire Developers (12 Disciplines)</div>';
    $html .= '<div class="mobile-roles-list">';
    foreach ($roles as $slug => $role) {
        $html .= '<a href="' . url('hire/' . $slug) . '" class="mobile-role-item">';
        $html .= '<span class="mobile-role-icon" style="color: ' . e($role['accent']) . ';">' . render_svg_icon($role['icon'], 'icon-sm') . '</span>';
        $html .= '<span class="mobile-role-name">' . e($role['title']) . '</span>';
        $html .= '</a>';
    }
    $html .= '</div>';
    $html .= '</div>';
    $html .= '</div>'; // body

    // Footer
    $html .= '<div class="mobile-drawer-footer">';
    $html .= '<a href="#enquiry-section" class="btn btn-primary btn-block" data-close-drawer>Get a Quote</a>';
    $html .= '<div class="mobile-drawer-contact">';
    $html .= '<a href="mailto:' . e(brand('contact.email_hire')) . '">' . e(brand('contact.email_hire')) . '</a>';
    $html .= '</div>';
    $html .= '</div>';

    $html .= '</div>'; // panel
    $html .= '</div>'; // drawer

    return $html;
}
