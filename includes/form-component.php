<?php
/**
 * Arora Tech Solutions - Universal Hiring Enquiry Form Component
 * 
 * Supports role preselection, multi-select chips, segmented engagement radios,
 * honeypot, time-trap, CSRF protection, and accessible client/server UX.
 * 
 * @param string|null $preselectedRoleSlug Slug of the role being requested (e.g., 'full-stack-developers')
 * @param array|null  $customTechList Optional role-specific technology chips
 */

declare(strict_types=1);

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/csrf.php';

$allRoles = get_role_catalog();
$selectedRoleSlug = $preselectedRoleSlug ?? '';
$selectedRoleData = $allRoles[$selectedRoleSlug] ?? null;
$selectedRoleTitle = $selectedRoleData['title'] ?? 'Dedicated Developer';

// Tech chips list
$techList = $customTechList ?? ($selectedRoleData['default_tech'] ?? [
    'React', 'Node.js', 'Python', 'TypeScript', 'Next.js', 'PostgreSQL', 'Docker', 'AWS'
]);

// Anti-spam tokens
$honeypotField = config('security.honeypot_field', 'ats_verify_hp');
$formRenderTime = time();
?>
<section class="enquiry-section" id="enquiry-section" aria-labelledby="enquiry-heading">
    <div class="container">
        <div class="enquiry-grid">
            <!-- Left Column: Reassurance & Next Steps -->
            <div class="enquiry-reassurance">
                <div class="reassurance-badge">
                    <?= render_svg_icon('zap', 'icon-xs text-primary'); ?>
                    <span>Fast-Track Resource Allocation</span>
                </div>
                <h2 id="enquiry-heading" class="reassurance-title">Ready to Scale Your Team? Get a Tailored Developer Quote.</h2>
                <p class="reassurance-sub">Share your project scope, tech stack, and timeline. We match you with rigorously vetted software engineers ready to start within days.</p>

                <div class="what-happens-next">
                    <h3 class="next-steps-heading">What happens next?</h3>
                    <ol class="next-steps-timeline">
                        <li class="timeline-step">
                            <div class="step-marker">1</div>
                            <div class="step-content">
                                <h4 class="step-title">Technical Review</h4>
                                <p class="step-desc">Our lead architects evaluate your tech stack, project complexity, and team dynamic to identify optimal candidate profiles.</p>
                            </div>
                        </li>
                        <li class="timeline-step">
                            <div class="step-marker">2</div>
                            <div class="step-content">
                                <h4 class="step-title">Discovery Call in 24 Hours</h4>
                                <p class="step-desc">We reach out within one business day <!-- VERIFY: SLA --> to clarify scope, confirm working hours, and present transparent quote tiers.</p>
                            </div>
                        </li>
                        <li class="timeline-step">
                            <div class="step-marker">3</div>
                            <div class="step-content">
                                <h4 class="step-title">Hand-Picked Developer Selection</h4>
                                <p class="step-desc">You interview hand-picked engineers directly. Once confirmed, onboard swiftly with zero bureaucratic drag.</p>
                            </div>
                        </li>
                    </ol>
                </div>

                <div class="trust-highlights">
                    <div class="trust-item">
                        <?= render_svg_icon('shield-check', 'icon-sm text-secondary'); ?>
                        <span>No freelancer bidding or unverified contractors</span>
                    </div>
                    <div class="trust-item">
                        <?= render_svg_icon('clock', 'icon-sm text-secondary'); ?>
                        <span>Flexible hourly, weekly, and monthly commitments</span>
                    </div>
                    <div class="trust-item">
                        <?= render_svg_icon('check-circle', 'icon-sm text-secondary'); ?>
                        <span>Strict non-disclosure (NDA) & IP ownership assigned to you</span>
                    </div>
                </div>
            </div>

            <!-- Right Column: Form Card -->
            <div class="enquiry-form-card">
                <form id="hiring-enquiry-form" action="/forms/hire-submit.php" method="POST" class="hire-form" novalidate>
                    <?= csrf_field(); ?>
                    
                    <!-- Time-trap token -->
                    <input type="hidden" name="form_time" value="<?= $formRenderTime; ?>">
                    <input type="hidden" name="source_page" value="<?= e($_SERVER['REQUEST_URI'] ?? '/'); ?>">

                    <!-- Honeypot Field: Visually hidden, bots fill it out -->
                    <div class="hp-trap" style="position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden;" aria-hidden="true">
                        <label for="<?= e($honeypotField); ?>">Please leave this field empty</label>
                        <input type="text" name="<?= e($honeypotField); ?>" id="<?= e($honeypotField); ?>" tabindex="-1" autocomplete="off">
                    </div>

                    <!-- Role Badge / Selector -->
                    <div class="form-group role-selector-group">
                        <label class="form-label">Selected Developer Discipline</label>
                        <?php if ($selectedRoleData): ?>
                            <div class="selected-role-pill" style="--pill-accent: <?= e($selectedRoleData['accent']); ?>;">
                                <span class="pill-icon"><?= render_svg_icon($selectedRoleData['icon'], 'icon-xs'); ?></span>
                                <span class="pill-text"><?= e($selectedRoleData['title']); ?></span>
                                <input type="hidden" name="developer_role" value="<?= e($selectedRoleData['title']); ?>">
                            </div>
                        <?php else: ?>
                            <select name="developer_role" id="developer_role" class="form-select" required>
                                <option value="">-- Choose Developer Discipline --</option>
                                <?php foreach ($allRoles as $r): ?>
                                    <option value="<?= e($r['title']); ?>"><?= e($r['title']); ?></option>
                                <?php endforeach; ?>
                            </select>
                        <?php endif; ?>
                    </div>

                    <!-- Contact Details: Name & Company -->
                    <div class="form-row-2">
                        <div class="form-group floating-group">
                            <input type="text" name="full_name" id="full_name" class="form-input" placeholder=" " required minlength="2" maxlength="150" autocomplete="name">
                            <label for="full_name" class="floating-label">Your Full Name <span class="required-star">*</span></label>
                            <span class="field-error" aria-live="polite"></span>
                        </div>
                        <div class="form-group floating-group">
                            <input type="text" name="company" id="company" class="form-input" placeholder=" " maxlength="150" autocomplete="organization">
                            <label for="company" class="floating-label">Company / Organization</label>
                        </div>
                    </div>

                    <!-- Contact Details: Email & Phone -->
                    <div class="form-row-2">
                        <div class="form-group floating-group">
                            <input type="email" name="email" id="email" class="form-input" placeholder=" " required autocomplete="email">
                            <label for="email" class="floating-label">Work Email <span class="required-star">*</span></label>
                            <span class="field-error" aria-live="polite"></span>
                        </div>
                        <div class="form-group floating-group">
                            <input type="tel" name="phone" id="phone" class="form-input" placeholder=" " required autocomplete="tel">
                            <label for="phone" class="floating-label">Phone with Country Code <span class="required-star">*</span></label>
                            <span class="field-error" aria-live="polite"></span>
                        </div>
                    </div>

                    <!-- Engagement Model: Segmented Radio Cards -->
                    <div class="form-group engagement-model-group">
                        <label class="form-label">Engagement Model <span class="required-star">*</span></label>
                        <div class="engagement-radios-grid" role="radiogroup" aria-label="Engagement Model Selection">
                            <label class="engagement-radio-card">
                                <input type="radio" name="engagement_model" value="hourly" class="sr-only" required>
                                <span class="radio-card-body">
                                    <span class="radio-title">Hourly</span>
                                    <span class="radio-desc">Ad-hoc bug fixes, audits, small scope</span>
                                </span>
                            </label>
                            <label class="engagement-radio-card">
                                <input type="radio" name="engagement_model" value="weekly" class="sr-only">
                                <span class="radio-card-body">
                                    <span class="radio-title">Weekly</span>
                                    <span class="radio-desc">Targeted sprint delivery, features</span>
                                </span>
                            </label>
                            <label class="engagement-radio-card is-popular">
                                <input type="radio" name="engagement_model" value="monthly" class="sr-only" checked>
                                <span class="radio-card-body">
                                    <span class="popular-tag">Most Popular</span>
                                    <span class="radio-title">Monthly</span>
                                    <span class="radio-desc">Dedicated engineer, full-time pace</span>
                                </span>
                            </label>
                        </div>
                    </div>

                    <!-- Experience Level Segment -->
                    <div class="form-group">
                        <label class="form-label">Desired Seniority Level</label>
                        <div class="pill-options-grid">
                            <label class="pill-option">
                                <input type="radio" name="experience_level" value="Junior" class="sr-only">
                                <span class="pill-box">Junior (1-2 yrs)</span>
                            </label>
                            <label class="pill-option">
                                <input type="radio" name="experience_level" value="Mid" class="sr-only" checked>
                                <span class="pill-box">Mid-Level (3-5 yrs)</span>
                            </label>
                            <label class="pill-option">
                                <input type="radio" name="experience_level" value="Senior" class="sr-only">
                                <span class="pill-box">Senior / Lead (5+ yrs)</span>
                            </label>
                            <label class="pill-option">
                                <input type="radio" name="experience_level" value="Not sure" class="sr-only">
                                <span class="pill-box">Not Sure Yet</span>
                            </label>
                        </div>
                    </div>

                    <!-- Technologies Multi-Select Chips -->
                    <div class="form-group tech-chips-group">
                        <label class="form-label">Select Key Technologies</label>
                        <div class="tech-chips-container" role="group" aria-label="Key Technologies">
                            <?php foreach ($techList as $tech): ?>
                                <label class="tech-chip">
                                    <input type="checkbox" name="technologies[]" value="<?= e($tech); ?>" class="sr-only">
                                    <span class="chip-text"><?= e($tech); ?></span>
                                </label>
                            <?php endforeach; ?>
                            <label class="tech-chip tech-chip-other">
                                <input type="checkbox" name="tech_other_toggle" id="tech_other_toggle" class="sr-only">
                                <span class="chip-text">+ Other</span>
                            </label>
                        </div>
                        <div class="other-tech-wrap" id="other-tech-wrap" style="display: none; margin-top: 10px;">
                            <input type="text" name="technologies_other" id="technologies_other" class="form-input form-input-sm" placeholder="Specify other frameworks, databases, or libraries...">
                        </div>
                    </div>

                    <!-- Duration & Budget Row -->
                    <div class="form-row-2">
                        <div class="form-group floating-group">
                            <input type="text" name="duration_hours" id="duration_hours" class="form-input" placeholder=" ">
                            <label for="duration_hours" class="floating-label">Estimated Duration or Hours (e.g. 3 months, 40h/wk)</label>
                        </div>
                        <div class="form-group floating-group">
                            <input type="text" name="budget" id="budget" class="form-input" placeholder=" ">
                            <label for="budget" class="floating-label">Budget Range (Optional)</label>
                        </div>
                    </div>

                    <!-- Project Details Textarea -->
                    <div class="form-group floating-group">
                        <textarea name="project_details" id="project_details" class="form-textarea" rows="4" placeholder=" " required minlength="10"></textarea>
                        <label for="project_details" class="floating-label">Briefly describe your project, technical goals, or role expectations <span class="required-star">*</span></label>
                        <span class="field-error" aria-live="polite"></span>
                    </div>

                    <!-- Privacy Consent Checkbox -->
                    <div class="form-group consent-group">
                        <label class="checkbox-label">
                            <input type="checkbox" name="privacy_consent" value="1" required class="form-checkbox">
                            <span class="checkbox-custom" aria-hidden="true"></span>
                            <span class="checkbox-text">I agree to Arora Tech Solutions processing my details to deliver a personalized quote. Strict non-disclosure applied. <span class="required-star">*</span></span>
                        </label>
                        <span class="field-error" aria-live="polite"></span>
                    </div>

                    <!-- Form Error Message Banner -->
                    <div class="form-alert form-alert-error" id="form-error-banner" role="alert" style="display: none;"></div>

                    <!-- Submit Button & State -->
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary btn-submit btn-block" id="form-submit-btn">
                            <span class="btn-text">Request Developer Quote</span>
                            <span class="btn-spinner" aria-hidden="true" style="display: none;"></span>
                            <?= render_svg_icon('arrow-right', 'icon-sm btn-icon'); ?>
                        </button>
                    </div>

                    <div class="form-privacy-note">
                        <?= render_svg_icon('shield-check', 'icon-xs text-muted'); ?>
                        <span>Your data is strictly confidential. No spam, ever.</span>
                    </div>
                </form>

                <!-- Success State (Rendered dynamically on AJAX completion) -->
                <div class="form-success-card" id="form-success-card" role="status" aria-live="polite" style="display: none;">
                    <div class="success-icon-wrap">
                        <svg viewBox="0 0 52 52" class="success-check-svg">
                            <circle class="check-circle" cx="26" cy="26" r="25" fill="none"/>
                            <path class="check-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                    </div>
                    <h3 class="success-title">Thank You! Your Request Has Been Received.</h3>
                    <p class="success-desc">Our technical recruitment and architectural leads are reviewing your project scope. We will follow up via email and phone within one business day <!-- VERIFY: SLA --> with matched engineer profiles.</p>
                    
                    <div class="success-summary" id="success-summary-box">
                        <!-- Populated by JS -->
                    </div>

                    <div class="success-actions">
                        <button type="button" class="btn btn-secondary btn-sm" id="reset-form-btn">Submit Another Enquiry</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
