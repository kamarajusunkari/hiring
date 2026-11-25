<?php
/**
 * Arora Tech Solutions - Global Site Footer
 */

declare(strict_types=1);

require_once __DIR__ . '/helpers.php';

$brandName   = brand('company_name', 'Arora Tech Solutions');
$mainSiteUrl = brand('main_site_url', 'https://aroratechsolutions.com');
$roles       = get_role_catalog();
$currentRole = $roleSlug ?? null;
?>
    </main><!-- /#main-content -->

    <!-- Site Footer -->
    <footer class="site-footer" role="contentinfo">
        <!-- Footer Main Grid -->
        <div class="container footer-main-container">
            <div class="footer-grid">
                <!-- Column 1: Brand & Positioning -->
                <div class="footer-col footer-col-brand">
                    <a href="<?= url(''); ?>" class="site-brand footer-brand" aria-label="<?= e($brandName); ?> - Home">
                        <div class="brand-logo-mark" aria-hidden="true">
                            <svg viewBox="0 0 36 36" fill="none" class="brand-svg-mark">
                                <rect width="36" height="36" rx="10" fill="#0F52BA"/>
                                <path d="M10 26L18 10L26 26H21.5L18 18.5L14.5 26H10Z" fill="#FFFFFF"/>
                                <circle cx="18" cy="14" r="2.5" fill="#00C896"/>
                            </svg>
                        </div>
                        <div class="brand-text-group">
                            <span class="brand-name text-white">Arora<span class="brand-name-accent">Tech</span></span>
                            <span class="brand-sub">Developer Hiring Solutions</span>
                        </div>
                    </a>
                    <p class="footer-tagline">"Your Next Developer Is Just One Step Away."</p>
                    <p class="footer-about">Arora Tech Solutions provides pre-vetted, on-demand software engineers, frontend specialists, backend architects, and automation developers on flexible hourly, weekly, and monthly models.</p>
                    
                    <div class="footer-badge-pill">
                        <?= render_svg_icon('shield-check', 'icon-sm text-secondary'); ?>
                        <span>Direct Engineering Partner &bull; Quote-Based</span>
                    </div>

                    <div class="footer-external-hub">
                        <a href="<?= e($mainSiteUrl); ?>" class="btn btn-outline-light btn-sm" target="_blank" rel="noopener">
                            <span>Main Corporate Website</span>
                            <?= render_svg_icon('arrow-right', 'icon-xs'); ?>
                        </a>
                    </div>
                </div>

                <!-- Column 2: Developer Roles (1-6) -->
                <div class="footer-col">
                    <h4 class="footer-heading">Specialized Roles</h4>
                    <ul class="footer-links-list">
                        <?php 
                        $firstSix = array_slice($roles, 0, 6, true);
                        foreach ($firstSix as $slug => $role): ?>
                            <li><a href="<?= url('hire/' . $slug); ?>"><?= e($role['title']); ?></a></li>
                        <?php endforeach; ?>
                    </ul>
                </div>

                <!-- Column 3: Developer Roles (7-12) -->
                <div class="footer-col">
                    <h4 class="footer-heading">Specialized Roles</h4>
                    <ul class="footer-links-list">
                        <?php 
                        $lastSix = array_slice($roles, 6, 6, true);
                        foreach ($lastSix as $slug => $role): ?>
                            <li><a href="<?= url('hire/' . $slug); ?>"><?= e($role['title']); ?></a></li>
                        <?php endforeach; ?>
                    </ul>
                </div>

                <!-- Column 4: Engagement Models & Company -->
                <div class="footer-col">
                    <h4 class="footer-heading">Engagement Models</h4>
                    <ul class="footer-links-list">
                        <li><a href="<?= url(''); ?>#hiring-models">Hourly Engagements (Ad-hoc)</a></li>
                        <li><a href="<?= url(''); ?>#hiring-models">Weekly Sprints (Project-based)</a></li>
                        <li><a href="<?= url(''); ?>#hiring-models">Monthly Retainers (Dedicated)</a></li>
                        <li><a href="<?= url(''); ?>#how-it-works">Our 5-Step Matching Process</a></li>
                        <li><a href="<?= url('contact'); ?>">Contact Our Solutions Desk</a></li>
                    </ul>

                    <h4 class="footer-heading mt-6">Get in Touch</h4>
                    <div class="footer-contact-details">
                        <p class="footer-contact-item">
                            <?= render_svg_icon('mail', 'icon-xs'); ?>
                            <a href="mailto:<?= e(brand('contact.email_hire')); ?>"><?= e(brand('contact.email_hire')); ?></a>
                        </p>
                        <p class="footer-contact-item">
                            <?= render_svg_icon('phone', 'icon-xs'); ?>
                            <a href="tel:<?= e(brand('contact.phone_tel')); ?>"><?= e(brand('contact.phone_display')); ?></a>
                        </p>
                        <p class="footer-contact-item text-muted">
                            <?= render_svg_icon('clock', 'icon-xs'); ?>
                            <span><?= e(brand('contact.hours')); ?></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer Bottom Bar -->
        <div class="footer-bottom-bar">
            <div class="container footer-bottom-inner">
                <div class="footer-disclaimer">
                    <p><strong>Notice:</strong> Arora Tech Solutions is a professional software engineering firm providing dedicated technical staff augmentation and custom development. We do not operate an open freelancer marketplace, public bidding platform, or unvetted directory. All projects and resource allocations are custom-quoted based on validated technical requirements.</p>
                </div>
                <div class="footer-copyright-row">
                    <p>&copy; <?= date('Y'); ?> <?= e($brandName); ?>. All rights reserved.</p>
                    <div class="footer-bottom-links">
                        <a href="<?= e($mainSiteUrl); ?>/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a>
                        <span class="divider">&bull;</span>
                        <a href="<?= e($mainSiteUrl); ?>/terms-of-service" target="_blank" rel="noopener">Terms of Service</a>
                        <span class="divider">&bull;</span>
                        <a href="<?= url('contact'); ?>">Contact Us</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <!-- Global Scripts -->
    <script src="<?= asset('assets/js/global.js'); ?>"></script>
    <script src="<?= asset('assets/js/form.js'); ?>"></script>
    <?php if ($currentRole && file_exists(dirname(__DIR__) . '/public/assets/js/roles/' . $currentRole . '.js')): ?>
    <script src="<?= asset('assets/js/roles/' . $currentRole . '.js'); ?>"></script>
    <?php endif; ?>
</body>
</html>
