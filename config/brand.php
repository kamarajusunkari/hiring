<?php
/**
 * Arora Tech Solutions - Brand Configuration
 * 
 * Central configuration file for brand assets, styling tokens,
 * contact details, and main WordPress site integration.
 * Edit values here to customize brand presentation across the platform.
 */

return [
    // Core Identity
    'company_name'       => 'Arora Tech Solutions',
    'legal_name'         => 'Arora Tech Solutions Pvt. Ltd.', // <!-- VERIFY: exact legal entity name -->
    'brand_tagline'      => 'Your Next Developer Is Just One Step Away.',
    'brand_subtagline'   => 'On-demand engineering talent on flexible hourly, weekly, and monthly engagement models.',
    
    // Web & Domain URLs
    'main_site_url'      => 'https://aroratechsolutions.com',
    'hire_site_url'      => 'https://hire.aroratechsolutions.com',
    'canonical_base'     => 'https://hire.aroratechsolutions.com',
    'main_site_label'    => 'Visit Main Website',
    
    // Logo & Visual Assets
    // Provide either a path to an SVG/PNG or inline SVG markup
    'logo_path'          => '/assets/images/logo.svg', // <!-- VERIFY: replace with exact Arora Tech Solutions logo asset -->
    'logo_mark_path'     => '/assets/images/logo-mark.svg',
    'logo_alt'           => 'Arora Tech Solutions - Developer Hiring Solutions',
    'favicon_path'       => '/assets/images/favicon.ico',
    
    // Brand Colors (Hex codes matched to existing brand guidelines)
    'colors' => [
        'primary'        => '#0F52BA', // Arora Sapphire / Tech Blue
        'primary_dark'   => '#0A3A85',
        'primary_light'  => '#EBF2FE',
        'secondary'      => '#00C896', // Emerald / Mint Tech Accent
        'ink'            => '#0F172A', // Slate 900
        'ink_light'      => '#334155', // Slate 700
        'ink_muted'      => '#64748B', // Slate 500
        'surface'        => '#F8FAFC', // Slate 50
        'surface_card'   => '#FFFFFF',
        'border'         => 'rgba(226, 232, 240, 0.8)',
        'dark_bg'        => '#090D16', // Deep Dark Ink
        'dark_card'      => '#111827',
    ],
    
    // Typography
    'fonts' => [
        'display'        => "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        'body'           => "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        'mono'           => "'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace",
        'google_fonts_url' => 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap',
    ],
    
    // Contact Information
    'contact' => [
        'email_hire'     => 'hire@aroratechsolutions.com', // <!-- VERIFY: hiring desk email address -->
        'email_support'  => 'info@aroratechsolutions.com',
        'phone_display'  => '+1 (800) 555-ARORA', // <!-- VERIFY: official phone number -->
        'phone_tel'      => '+180055527672',
        'whatsapp'       => '+180055527672', // <!-- VERIFY: WhatsApp business number -->
        'hours'          => 'Monday - Friday: 9:00 AM - 6:00 PM EST', // <!-- VERIFY: operating business hours -->
        'address_line1'  => 'Arora Tech Solutions Headquarters', // <!-- VERIFY: physical office address -->
        'address_line2'  => 'Suite 400, Innovation Drive',
        'address_city'   => 'New York, NY 10001',
        'address_country'=> 'United States',
    ],
    
    // Social Profiles
    'social' => [
        'linkedin'       => 'https://www.linkedin.com/company/arora-tech-solutions', // <!-- VERIFY: LinkedIn URL -->
        'twitter'        => 'https://twitter.com/aroratechsol', // <!-- VERIFY: Twitter/X handle -->
        'github'         => 'https://github.com/arora-tech-solutions', // <!-- VERIFY: GitHub org -->
    ],
    
    // Lead Routing & Notifications
    'notifications' => [
        'admin_lead_recipients' => ['hire@aroratechsolutions.com'], // <!-- VERIFY: inbox for new hiring leads -->
        'email_from_name'       => 'Arora Tech Solutions Hiring Desk',
        'email_from_address'    => 'no-reply@hire.aroratechsolutions.com',
    ],
];
