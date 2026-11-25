<?php
/**
 * Arora Tech Solutions - Contact & Inquiries Page
 */

declare(strict_types=1);

$pageSlug = 'contact';
$roleSlug = null;

require_once dirname(__DIR__) . '/includes/helpers.php';
require_once dirname(__DIR__) . '/includes/csrf.php';
require_once dirname(__DIR__) . '/includes/seo.php';

session_start_safe();
$flash = $_SESSION['contact_flash'] ?? null;
unset($_SESSION['contact_flash']);

SEO::set([
    'title'       => 'Contact Our Developer Solutions Desk | Arora Tech Solutions',
    'description' => 'Get in touch with Arora Tech Solutions for developer staffing inquiries, customized enterprise quotes, and partnership discussions.',
    'canonical'   => 'https://hire.aroratechsolutions.com/contact/',
    'breadcrumbs' => [
        ['name' => 'Contact', 'url' => '/contact/']
    ]
]);

$honeypotField = config('security.honeypot_field', 'ats_verify_hp');

require_once dirname(__DIR__) . '/includes/header.php';
?>

<!-- Breadcrumbs Bar -->
<div class="breadcrumbs-bar" aria-label="Breadcrumb">
    <div class="container">
        <ol class="breadcrumbs-list">
            <li class="breadcrumbs-item"><a href="<?= url(''); ?>">Home</a></li>
            <li class="breadcrumbs-separator" aria-hidden="true">/</li>
            <li class="breadcrumbs-item is-active" aria-current="page">Contact</li>
        </ol>
    </div>
</div>

<section class="contact-page-section" style="padding: var(--space-20) 0; background: var(--brand-surface);">
    <div class="container">
        <div class="section-header">
            <span class="section-badge">Get in Touch</span>
            <h1 class="section-title">Talk to Our Solutions Team</h1>
            <p class="section-sub">Have a specific architectural requirement, need an enterprise quote, or want to discuss a customized developer engagement? We are here to help.</p>
        </div>

        <div class="enquiry-grid" style="align-items: stretch;">
            <!-- Left Column: Contact Details & Office -->
            <div class="contact-info-panel" style="background: #090D16; color: #FFFFFF; border-radius: var(--radius-xl); padding: clamp(24px, 5vw, 44px); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span class="reassurance-badge">
                        <?= render_svg_icon('clock', 'icon-xs text-primary'); ?>
                        <span>Fast Response Time</span>
                    </span>
                    <h2 style="font-size: var(--text-2xl); font-weight: 800; color: #FFFFFF; margin-bottom: var(--space-4);">We typically respond within one business day. <!-- VERIFY: SLA --></h2>
                    <p style="font-size: var(--text-sm); color: #94A3B8; line-height: 1.6; margin-bottom: var(--space-8);">
                        Whether you are looking to hire a single specialized engineer or an entire cross-functional team, our technical leads evaluate your requirements and provide transparent guidance.
                    </p>

                    <div style="display: flex; flex-direction: column; gap: var(--space-6); margin-bottom: var(--space-8);">
                        <div style="display: flex; gap: var(--space-3); align-items: flex-start;">
                            <div style="width: 36px; height: 36px; background: rgba(15, 82, 186, 0.2); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; color: #60A5FA; flex-shrink: 0;">
                                <?= render_svg_icon('mail', 'icon-sm'); ?>
                            </div>
                            <div>
                                <div style="font-size: var(--text-xs); color: #94A3B8; text-transform: uppercase; font-weight: 700;">Hiring Desk Email</div>
                                <a href="mailto:<?= e(brand('contact.email_hire')); ?>" style="font-size: var(--text-base); font-weight: 700; color: #FFFFFF;"><?= e(brand('contact.email_hire')); ?></a>
                            </div>
                        </div>

                        <div style="display: flex; gap: var(--space-3); align-items: flex-start;">
                            <div style="width: 36px; height: 36px; background: rgba(15, 82, 186, 0.2); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; color: #60A5FA; flex-shrink: 0;">
                                <?= render_svg_icon('phone', 'icon-sm'); ?>
                            </div>
                            <div>
                                <div style="font-size: var(--text-xs); color: #94A3B8; text-transform: uppercase; font-weight: 700;">Telephone Inquiries</div>
                                <a href="tel:<?= e(brand('contact.phone_tel')); ?>" style="font-size: var(--text-base); font-weight: 700; color: #FFFFFF;"><?= e(brand('contact.phone_display')); ?></a>
                            </div>
                        </div>

                        <div style="display: flex; gap: var(--space-3); align-items: flex-start;">
                            <div style="width: 36px; height: 36px; background: rgba(15, 82, 186, 0.2); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; color: #60A5FA; flex-shrink: 0;">
                                <?= render_svg_icon('clock', 'icon-sm'); ?>
                            </div>
                            <div>
                                <div style="font-size: var(--text-xs); color: #94A3B8; text-transform: uppercase; font-weight: 700;">Operating Hours</div>
                                <div style="font-size: var(--text-sm); font-weight: 600; color: #CBD5E1;"><?= e(brand('contact.hours')); ?></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: var(--space-6);">
                    <div style="font-size: var(--text-xs); color: #94A3B8; margin-bottom: var(--space-2);">Corporate Headquarters:</div>
                    <div style="font-size: var(--text-sm); font-weight: 600; color: #E2E8F0; line-height: 1.5;">
                        <?= e(brand('contact.address_line1')); ?><br>
                        <?= e(brand('contact.address_line2')); ?><br>
                        <?= e(brand('contact.address_city')); ?>, <?= e(brand('contact.address_country')); ?>
                    </div>
                </div>
            </div>

            <!-- Right Column: Contact Form -->
            <div class="enquiry-form-card">
                <?php if ($flash): ?>
                    <div class="form-alert <?= $flash['success'] ? 'form-alert-success' : 'form-alert-error'; ?>" style="background: <?= $flash['success'] ? '#ECFDF5' : '#FEF2F2'; ?>; border: 1px solid <?= $flash['success'] ? '#10B981' : '#EF4444'; ?>; color: <?= $flash['success'] ? '#065F46' : '#B91C1C'; ?>; padding: 14px; border-radius: var(--radius-sm); margin-bottom: var(--space-4);">
                        <?= e($flash['message']); ?>
                    </div>
                <?php endif; ?>

                <form action="/forms/contact-submit.php" method="POST" class="hire-form" id="contact-form">
                    <?= csrf_field(); ?>

                    <div class="hp-trap" style="position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden;" aria-hidden="true">
                        <label for="<?= e($honeypotField); ?>">Please leave this blank</label>
                        <input type="text" name="<?= e($honeypotField); ?>" id="<?= e($honeypotField); ?>" tabindex="-1">
                    </div>

                    <div class="form-row-2">
                        <div class="form-group floating-group">
                            <input type="text" name="name" id="contact_name" class="form-input" placeholder=" " required minlength="2" maxlength="150" autocomplete="name">
                            <label for="contact_name" class="floating-label">Your Name <span class="required-star">*</span></label>
                        </div>
                        <div class="form-group floating-group">
                            <input type="text" name="company" id="contact_company" class="form-input" placeholder=" " maxlength="150" autocomplete="organization">
                            <label for="contact_company" class="floating-label">Company / Organization</label>
                        </div>
                    </div>

                    <div class="form-row-2">
                        <div class="form-group floating-group">
                            <input type="email" name="email" id="contact_email" class="form-input" placeholder=" " required autocomplete="email">
                            <label for="contact_email" class="floating-label">Work Email <span class="required-star">*</span></label>
                        </div>
                        <div class="form-group floating-group">
                            <input type="tel" name="phone" id="contact_phone" class="form-input" placeholder=" " autocomplete="tel">
                            <label for="contact_phone" class="floating-label">Phone Number</label>
                        </div>
                    </div>

                    <div class="form-group floating-group">
                        <input type="text" name="subject" id="contact_subject" class="form-input" placeholder=" " required minlength="3" maxlength="200">
                        <label for="contact_subject" class="floating-label">Subject / Inquiry Topic <span class="required-star">*</span></label>
                    </div>

                    <div class="form-group floating-group">
                        <textarea name="message" id="contact_message" class="form-textarea" rows="5" placeholder=" " required minlength="10"></textarea>
                        <label for="contact_message" class="floating-label">Your Message or Detailed Request <span class="required-star">*</span></label>
                    </div>

                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary btn-block btn-lg">
                            <span>Send Message</span>
                            <?= render_svg_icon('arrow-right', 'icon-sm'); ?>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>

<?php require_once dirname(__DIR__) . '/includes/footer.php'; ?>
