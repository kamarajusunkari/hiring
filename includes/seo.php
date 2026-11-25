<?php
/**
 * Arora Tech Solutions - SEO & Structured Data (JSON-LD) Helper
 */

declare(strict_types=1);

require_once __DIR__ . '/helpers.php';

class SEO
{
    private static array $meta = [
        'title'       => 'Hire Dedicated Developers | Arora Tech Solutions',
        'description' => 'Hire top-tier on-demand developers on flexible hourly, weekly, and monthly engagement models. Full Stack, Frontend, Backend, Python, React, and AI talent.',
        'canonical'   => '',
        'og_type'     => 'website',
        'og_image'    => '/assets/images/og-default.png',
        'robots'      => 'index, follow',
        'keywords'    => 'hire developers, hire full stack developers, hire react developers, hire python developers, dedicated engineers, on demand developers',
        'breadcrumbs' => [],
        'faqs'        => [],
        'service'     => null,
    ];

    public static function set(array $customMeta): void
    {
        self::$meta = array_merge(self::$meta, $customMeta);
    }

    public static function renderTags(): string
    {
        $brandName = brand('company_name', 'Arora Tech Solutions');
        $siteUrl   = brand('hire_site_url', 'https://hire.aroratechsolutions.com');
        $canonical = self::$meta['canonical'] ? self::$meta['canonical'] : (rtrim($siteUrl, '/') . ($_SERVER['REQUEST_URI'] ?? '/'));
        // Clean canonical url (strip query params)
        $cleanCanonical = strtok($canonical, '?');

        $html = [];
        $html[] = '<title>' . e(self::$meta['title']) . '</title>';
        $html[] = '<meta name="description" content="' . e(self::$meta['description']) . '">';
        $html[] = '<meta name="robots" content="' . e(self::$meta['robots']) . '">';
        $html[] = '<link rel="canonical" href="' . e($cleanCanonical) . '">';

        // OpenGraph
        $html[] = '<meta property="og:site_name" content="' . e($brandName) . '">';
        $html[] = '<meta property="og:title" content="' . e(self::$meta['title']) . '">';
        $html[] = '<meta property="og:description" content="' . e(self::$meta['description']) . '">';
        $html[] = '<meta property="og:type" content="' . e(self::$meta['og_type']) . '">';
        $html[] = '<meta property="og:url" content="' . e($cleanCanonical) . '">';
        $html[] = '<meta property="og:image" content="' . e(rtrim($siteUrl, '/') . self::$meta['og_image']) . '">';

        // Twitter Card
        $html[] = '<meta name="twitter:card" content="summary_large_image">';
        $html[] = '<meta name="twitter:title" content="' . e(self::$meta['title']) . '">';
        $html[] = '<meta name="twitter:description" content="' . e(self::$meta['description']) . '">';
        $html[] = '<meta name="twitter:image" content="' . e(rtrim($siteUrl, '/') . self::$meta['og_image']) . '">';

        // JSON-LD Schemas
        $html[] = self::renderJsonLd($cleanCanonical);

        return implode("\n    ", $html);
    }

    private static function renderJsonLd(string $canonicalUrl): string
    {
        $brandName = brand('company_name', 'Arora Tech Solutions');
        $siteUrl   = brand('hire_site_url', 'https://hire.aroratechsolutions.com');
        $mainUrl   = brand('main_site_url', 'https://aroratechsolutions.com');
        $schemas   = [];

        // 1. Organization Schema (always present)
        $schemas[] = [
            '@context'    => 'https://schema.org',
            '@type'       => 'Organization',
            '@id'         => $siteUrl . '/#organization',
            'name'        => $brandName,
            'url'         => $siteUrl,
            'sameAs'      => [
                $mainUrl,
                brand('social.linkedin', ''),
                brand('social.twitter', ''),
                brand('social.github', '')
            ],
            'logo'        => [
                '@type' => 'ImageObject',
                'url'   => $siteUrl . '/assets/images/logo.png',
            ],
            'contactPoint' => [
                '@type'             => 'ContactPoint',
                'telephone'         => brand('contact.phone_tel', '+180055527672'),
                'contactType'       => 'customer service',
                'email'             => brand('contact.email_hire', 'hire@aroratechsolutions.com'),
                'availableLanguage' => ['English']
            ]
        ];

        // 2. Breadcrumbs Schema
        if (!empty(self::$meta['breadcrumbs'])) {
            $itemList = [];
            $pos = 1;
            $itemList[] = [
                '@type'    => 'ListItem',
                'position' => $pos++,
                'name'     => 'Home',
                'item'     => $siteUrl . '/'
            ];
            foreach (self::$meta['breadcrumbs'] as $crumb) {
                $itemList[] = [
                    '@type'    => 'ListItem',
                    'position' => $pos++,
                    'name'     => $crumb['name'],
                    'item'     => $siteUrl . rtrim($crumb['url'], '/') . '/'
                ];
            }
            $schemas[] = [
                '@context'        => 'https://schema.org',
                '@type'           => 'BreadcrumbList',
                'itemListElement' => $itemList
            ];
        }

        // 3. FAQPage Schema
        if (!empty(self::$meta['faqs'])) {
            $faqItems = [];
            foreach (self::$meta['faqs'] as $faq) {
                $faqItems[] = [
                    '@type'          => 'Question',
                    'name'           => $faq['q'],
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text'  => $faq['a']
                    ]
                ];
            }
            $schemas[] = [
                '@context'   => 'https://schema.org',
                '@type'      => 'FAQPage',
                'mainEntity' => $faqItems
            ];
        }

        // 4. Service / ProfessionalService Schema
        if (!empty(self::$meta['service'])) {
            $srv = self::$meta['service'];
            $schemas[] = [
                '@context'    => 'https://schema.org',
                '@type'       => 'Service',
                '@id'         => $canonicalUrl . '#service',
                'serviceType' => $srv['name'] ?? 'Software Engineering Staffing',
                'provider'    => [
                    '@type' => 'Organization',
                    'name'  => $brandName,
                    'url'   => $siteUrl
                ],
                'description' => $srv['description'] ?? self::$meta['description'],
                'areaServed'  => 'Worldwide',
                'offers'      => [
                    '@type'         => 'Offer',
                    'priceCurrency' => 'USD',
                    'price'         => '0',
                    'description'   => 'Quote-based custom hourly, weekly, or monthly engagement models'
                ]
            ];
        }

        return '<script type="application/ld+json">' . json_encode($schemas, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>';
    }
}
