<?php
/**
 * Arora Tech Solutions - Dynamic XML Sitemap
 * Outputs all public canonical URLs with clean trailing slashes.
 */

declare(strict_types=1);

require_once dirname(__DIR__) . '/includes/helpers.php';

header('Content-Type: application/xml; charset=UTF-8');

$baseUrl = rtrim(brand('hire_site_url', 'https://hire.aroratechsolutions.com'), '/');
$roles   = get_role_catalog();
$today   = date('Y-m-d');

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Homepage -->
    <url>
        <loc><?= $baseUrl; ?>/</loc>
        <lastmod><?= $today; ?></lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>

    <!-- 12 Role Pages -->
    <?php foreach ($roles as $slug => $role): ?>
    <url>
        <loc><?= $baseUrl; ?>/hire/<?= $slug; ?>/</loc>
        <lastmod><?= $today; ?></lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    <?php endforeach; ?>

    <!-- Contact Page -->
    <url>
        <loc><?= $baseUrl; ?>/contact/</loc>
        <lastmod><?= $today; ?></lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
</urlset>
