<?php
/**
 * Arora Tech Solutions - Developer Hiring Solutions
 * Homepage (Phase 3 Implementation)
 */

declare(strict_types=1);

$pageSlug = 'home';
$roleSlug = null;

require_once dirname(__DIR__) . '/includes/helpers.php';
require_once dirname(__DIR__) . '/includes/seo.php';

$roles = get_role_catalog();

// Set Homepage SEO & Structured Data
SEO::set([
    'title'       => 'Hire Dedicated Developers | On-Demand Tech Talent | Arora Tech Solutions',
    'description' => 'Hire pre-vetted on-demand software developers on flexible hourly, weekly, and monthly engagement models. Full Stack, React, Python, Mobile, and AI engineering talent.',
    'canonical'   => 'https://hire.aroratechsolutions.com/',
    'keywords'    => 'hire developers, hire dedicated engineers, hire full stack developers, hire react developers, hire python developers, staff augmentation, arora tech solutions',
    'faqs'        => [
        [
            'q' => 'How does Arora Tech Solutions differ from freelancer marketplaces?',
            'a' => 'We are a dedicated engineering solutions partner, not an open freelancer marketplace or bidding directory. Our software developers are pre-vetted technical professionals who integrate directly into your sprint rituals with dedicated accountability and non-disclosure guarantees.'
        ],
        [
            'q' => 'How does your quote-based pricing model work?',
            'a' => 'Rather than publishing generic public rate cards, we assess your required seniority level, expected commitment (hourly, weekly sprints, or dedicated monthly retainers), and tech stack complexity to provide a transparent, fixed quote tier tailored to your budget.'
        ],
        [
            'q' => 'How quickly can a developer onboard and start working?',
            'a' => 'Depending on your stack requirements and candidate availability, we typically introduce hand-picked engineer profiles within 24 to 48 hours <!-- VERIFY: SLA -->, allowing kickoff within days rather than the months required for traditional recruiting.'
        ],
        [
            'q' => 'Can we switch engagement models during a project?',
            'a' => 'Yes. Many clients start on an hourly engagement for an initial architecture audit or proof-of-concept, then seamlessly transition to weekly sprints or dedicated monthly retainers as roadmap scope expands.'
        ],
        [
            'q' => 'What if a developer is not the right fit for our team?',
            'a' => 'We provide a satisfaction guarantee: if a developer does not meet your technical expectations during the initial onboarding period, we promptly assign a replacement engineer with zero downtime or duplicated onboarding fees.'
        ],
        [
            'q' => 'Who owns the intellectual property and code written by your developers?',
            'a' => 'You retain 100% full legal ownership of all code, assets, documentation, and intellectual property developed during the engagement.'
        ]
    ]
]);

require_once dirname(__DIR__) . '/includes/header.php';
?>

<!-- Section 1: Hero -->
<section class="home-hero" aria-labelledby="home-hero-heading">
    <div class="container">
        <div class="home-hero-grid">
            <!-- Left Hero Content -->
            <div class="home-hero-content">
                <div class="hero-pill">
                    <?= render_svg_icon('zap', 'icon-xs'); ?>
                    <span>On-Demand Software Engineering</span>
                </div>
                <h1 id="home-hero-heading" class="home-hero-title">
                    Your Next Developer Is <span class="title-highlight">Just One Step Away.</span>
                </h1>
                <p class="home-hero-sub">
                    Scale your engineering capacity without hiring overhead. Arora Tech Solutions provides pre-vetted full stack, frontend, backend, mobile, and AI developers on flexible hourly, weekly, and monthly engagement models.
                </p>
                <div class="home-hero-actions">
                    <a href="#roles" class="btn btn-primary btn-lg">
                        <span>Explore Developers</span>
                        <?= render_svg_icon('arrow-right', 'icon-sm'); ?>
                    </a>
                    <a href="#enquiry-section" class="btn btn-outline-light btn-lg">
                        <span>Talk to Our Team</span>
                    </a>
                </div>
                <div class="home-hero-metrics">
                    <div class="metric-item">
                        <span class="metric-value">12</span>
                        <span class="metric-label">Specialized Disciplines</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-value">100%</span>
                        <span class="metric-label">Quote-Based Transparency</span>
                    </div>
                    <div class="metric-item">
                        <span class="metric-value">3</span>
                        <span class="metric-label">Flexible Hiring Models</span>
                    </div>
                </div>
            </div>

            <!-- Right Hero Visual: Floating Glass Cards Stack -->
            <div class="hero-glass-stack" aria-hidden="true">
                <a href="<?= url('hire/full-stack-developers'); ?>" class="glass-card-item" style="--card-accent: #3B82F6; --card-glow: rgba(59, 130, 246, 0.3);">
                    <div class="glass-card-left">
                        <div class="glass-card-icon" style="background: rgba(59, 130, 246, 0.15); color: #60A5FA;">
                            <?= render_svg_icon('layers', 'icon-sm'); ?>
                        </div>
                        <div>
                            <div class="glass-card-title">Full Stack Developers</div>
                            <div class="glass-card-tag">React &bull; Node.js &bull; PostgreSQL</div>
                        </div>
                    </div>
                    <span class="glass-card-cta">Explore &rarr;</span>
                </a>

                <a href="<?= url('hire/react-developers'); ?>" class="glass-card-item" style="--card-accent: #6366F1; --card-glow: rgba(99, 102, 241, 0.3);">
                    <div class="glass-card-left">
                        <div class="glass-card-icon" style="background: rgba(99, 102, 241, 0.15); color: #818CF8;">
                            <?= render_svg_icon('atom', 'icon-sm'); ?>
                        </div>
                        <div>
                            <div class="glass-card-title">React & Next.js Developers</div>
                            <div class="glass-card-tag">Next.js &bull; TypeScript &bull; Redux</div>
                        </div>
                    </div>
                    <span class="glass-card-cta">Explore &rarr;</span>
                </a>

                <a href="<?= url('hire/python-developers'); ?>" class="glass-card-item" style="--card-accent: #F59E0B; --card-glow: rgba(245, 158, 11, 0.3);">
                    <div class="glass-card-left">
                        <div class="glass-card-icon" style="background: rgba(245, 158, 11, 0.15); color: #FBBF24;">
                            <?= render_svg_icon('code', 'icon-sm'); ?>
                        </div>
                        <div>
                            <div class="glass-card-title">Python Developers</div>
                            <div class="glass-card-tag">FastAPI &bull; Django &bull; Automation</div>
                        </div>
                    </div>
                    <span class="glass-card-cta">Explore &rarr;</span>
                </a>

                <a href="<?= url('hire/ai-automation-developers'); ?>" class="glass-card-item" style="--card-accent: #D946EF; --card-glow: rgba(217, 70, 239, 0.3);">
                    <div class="glass-card-left">
                        <div class="glass-card-icon" style="background: rgba(217, 70, 239, 0.15); color: #E879F9;">
                            <?= render_svg_icon('cpu', 'icon-sm'); ?>
                        </div>
                        <div>
                            <div class="glass-card-title">AI & Automation Engineers</div>
                            <div class="glass-card-tag">LLM APIs &bull; n8n &bull; Autonomous Workflows</div>
                        </div>
                    </div>
                    <span class="glass-card-cta">Explore &rarr;</span>
                </a>

                <a href="<?= url('hire/flutter-developers'); ?>" class="glass-card-item" style="--card-accent: #0284C7; --card-glow: rgba(2, 132, 199, 0.3);">
                    <div class="glass-card-left">
                        <div class="glass-card-icon" style="background: rgba(2, 132, 199, 0.15); color: #38BDF8;">
                            <?= render_svg_icon('smartphone', 'icon-sm'); ?>
                        </div>
                        <div>
                            <div class="glass-card-title">Flutter Mobile Developers</div>
                            <div class="glass-card-tag">iOS & Android Single Codebase</div>
                        </div>
                    </div>
                    <span class="glass-card-cta">Explore &rarr;</span>
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Section 2: Capability / Technology Strip -->
<section class="tech-strip-section" aria-label="Core Technologies Strip">
    <div class="container">
        <div class="tech-strip-inner">
            <span class="tech-strip-label">Production Toolchains:</span>
            <div class="tech-badges-list">
                <span class="tech-badge-item"><?= render_svg_icon('atom', 'icon-xs'); ?> React / Next.js</span>
                <span class="tech-badge-item"><?= render_svg_icon('code', 'icon-xs'); ?> TypeScript</span>
                <span class="tech-badge-item"><?= render_svg_icon('terminal', 'icon-xs'); ?> Node.js</span>
                <span class="tech-badge-item"><?= render_svg_icon('code', 'icon-xs'); ?> Python</span>
                <span class="tech-badge-item"><?= render_svg_icon('server', 'icon-xs'); ?> PostgreSQL</span>
                <span class="tech-badge-item"><?= render_svg_icon('layers', 'icon-xs'); ?> Docker / AWS</span>
                <span class="tech-badge-item"><?= render_svg_icon('smartphone', 'icon-xs'); ?> Flutter</span>
                <span class="tech-badge-item"><?= render_svg_icon('shopping-bag', 'icon-xs'); ?> Shopify Liquid</span>
                <span class="tech-badge-item"><?= render_svg_icon('cpu', 'icon-xs'); ?> AI / LLMs</span>
            </div>
        </div>
    </div>
</section>

<!-- Section 3: 12 Developer Category Cards -->
<section class="roles-section" id="roles" aria-labelledby="roles-heading">
    <div class="container">
        <div class="section-header">
            <span class="section-badge">12 Specialized Disciplines</span>
            <h2 id="roles-heading" class="section-title">Explore Specialized Engineering Roles</h2>
            <p class="section-sub">Every developer is thoroughly vetted for production-ready architecture, clean code standards, and agile communication.</p>
        </div>

        <div class="roles-catalog-grid">
            <?php foreach ($roles as $slug => $role): ?>
                <a href="<?= url('hire/' . $slug); ?>" class="role-catalog-card" style="--card-accent: <?= e($role['accent']); ?>; --card-tint: <?= e($role['bg_tint']); ?>;">
                    <div class="role-card-top">
                        <div class="role-card-icon-wrap">
                            <?= render_svg_icon($role['icon'], 'icon-md'); ?>
                        </div>
                        <span class="role-card-action">Explore role <?= render_svg_icon('arrow-right', 'icon-xs'); ?></span>
                    </div>
                    <h3 class="role-card-title"><?= e($role['title']); ?></h3>
                    <p class="role-card-desc"><?= e($role['short_desc']); ?></p>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Section 4: Why Arora -->
<section class="why-section" id="why-arora" aria-labelledby="why-heading">
    <div class="container">
        <div class="section-header">
            <span class="section-badge">Why Arora Tech Solutions</span>
            <h2 id="why-heading" class="section-title">Built for Engineering Leaders Who Value Predictability</h2>
            <p class="section-sub">We eliminate the friction, unvetted risks, and inflated margins typical of traditional tech recruiting and marketplace platforms.</p>
        </div>

        <div class="why-grid">
            <div class="why-card">
                <div class="why-icon-wrap"><?= render_svg_icon('shield-check', 'icon-md'); ?></div>
                <h3 class="why-title">Quote-Based Precision</h3>
                <p class="why-desc">No generic rate cards or hidden markups. We assess your exact technology scope and deliver transparent pricing tailored to your roadmap.</p>
            </div>

            <div class="why-card">
                <div class="why-icon-wrap"><?= render_svg_icon('check-circle', 'icon-md'); ?></div>
                <h3 class="why-title">Rigorous Multi-Stage Vetting</h3>
                <p class="why-desc">Every engineer passes deep architectural evaluations, live code refactoring exercises, and communication reviews before joining our roster.</p>
            </div>

            <div class="why-card">
                <div class="why-icon-wrap"><?= render_svg_icon('clock', 'icon-md'); ?></div>
                <h3 class="why-title">Seamless Timezone Alignment</h3>
                <p class="why-desc">Work with developers providing guaranteed 4 to 8 hours daily overlap with your internal leads across North American, European, or APAC hours.</p>
            </div>

            <div class="why-card">
                <div class="why-icon-wrap"><?= render_svg_icon('layers', 'icon-md'); ?></div>
                <h3 class="why-title">Zero Freelancer Risk</h3>
                <p class="why-desc">Eliminate disappearing contractors. Our talent works with structured accountability, clear progress reporting, and consistent code reviews.</p>
            </div>

            <div class="why-card">
                <div class="why-icon-wrap"><?= render_svg_icon('code', 'icon-md'); ?></div>
                <h3 class="why-title">100% IP & Code Ownership</h3>
                <p class="why-desc">All source code, git commits, documentation, and digital assets developed belong entirely to your company under strict confidentiality.</p>
            </div>

            <div class="why-card">
                <div class="why-icon-wrap"><?= render_svg_icon('zap', 'icon-md'); ?></div>
                <h3 class="why-title">Agile Scalability</h3>
                <p class="why-desc">Ramp up developer capacity for critical feature pushes, and adjust engagement intensity without lengthy lock-in commitments.</p>
            </div>
        </div>
    </div>
</section>

<!-- Section 5: Hiring Models -->
<section class="engagement-section" id="hiring-models" style="padding: var(--space-20) 0; background: var(--brand-surface);" aria-labelledby="hiring-models-heading">
    <div class="container">
        <div class="section-header">
            <span class="section-badge">Engagement Models</span>
            <h2 id="hiring-models-heading" class="section-title">Flexible Developer Hiring Models</h2>
            <p class="section-sub">Select the commitment structure that best fits your product roadmap and engineering budget.</p>
        </div>

        <div class="engagement-models-grid">
            <!-- Hourly -->
            <div class="model-card">
                <div class="model-header">
                    <h3 class="model-title">Hourly</h3>
                    <div class="model-pace">Ad-hoc & Flexible Pace</div>
                </div>
                <div class="model-best-for">
                    <strong>Best for:</strong> Code audits, specific feature additions, architecture consulting, or urgent bug remediation.
                </div>
                <ul class="model-features">
                    <li class="model-feature-item">
                        <?= render_svg_icon('check', 'icon-xs'); ?>
                        <span>Dedicated time tracking with transparent task logs</span>
                    </li>
                    <li class="model-feature-item">
                        <?= render_svg_icon('check', 'icon-xs'); ?>
                        <span>Scale up or pause hours with minimal notice</span>
                    </li>
                    <li class="model-feature-item">
                        <?= render_svg_icon('check', 'icon-xs'); ?>
                        <span>Direct Slack / Teams communication during active sprints</span>
                    </li>
                </ul>
                <a href="#enquiry-section" class="btn btn-secondary btn-block">Request Hourly Quote</a>
            </div>

            <!-- Weekly -->
            <div class="model-card">
                <div class="model-header">
                    <h3 class="model-title">Weekly</h3>
                    <div class="model-pace">Sprint-Driven Delivery</div>
                </div>
                <div class="model-best-for">
                    <strong>Best for:</strong> Defined milestones, API version launches, refactoring sprints, or scoped module builds.
                </div>
                <ul class="model-features">
                    <li class="model-feature-item">
                        <?= render_svg_icon('check', 'icon-xs'); ?>
                        <span>Pre-agreed sprint backlog and delivery velocity</span>
                    </li>
                    <li class="model-feature-item">
                        <?= render_svg_icon('check', 'icon-xs'); ?>
                        <span>Full sprint participation (standups, reviews, demos)</span>
                    </li>
                    <li class="model-feature-item">
                        <?= render_svg_icon('check', 'icon-xs'); ?>
                        <span>Predictable weekly quote billing structure</span>
                    </li>
                </ul>
                <a href="#enquiry-section" class="btn btn-secondary btn-block">Request Weekly Quote</a>
            </div>

            <!-- Monthly -->
            <div class="model-card is-featured">
                <span class="model-featured-badge">Most Popular</span>
                <div class="model-header">
                    <h3 class="model-title">Monthly</h3>
                    <div class="model-pace">Full-Time Dedicated Talent</div>
                </div>
                <div class="model-best-for">
                    <strong>Best for:</strong> Long-term product roadmaps, ongoing feature iteration, and embedding a developer as a true team member.
                </div>
                <ul class="model-features">
                    <li class="model-feature-item">
                        <?= render_svg_icon('check', 'icon-xs'); ?>
                        <span>160 hours / month 100% dedicated to your codebase</span>
                    </li>
                    <li class="model-feature-item">
                        <?= render_svg_icon('check', 'icon-xs'); ?>
                        <span>Direct daily timezone overlap with your internal leads</span>
                    </li>
                    <li class="model-feature-item">
                        <?= render_svg_icon('check', 'icon-xs'); ?>
                        <span>Free candidate replacement guarantee if scope changes</span>
                    </li>
                </ul>
                <a href="#enquiry-section" class="btn btn-primary btn-block">Request Monthly Quote</a>
            </div>
        </div>
    </div>
</section>

<!-- Section 6: How It Works -->
<section class="process-section" id="how-it-works" style="padding: var(--space-20) 0; background: #FFFFFF;" aria-labelledby="process-heading">
    <div class="container">
        <div class="section-header">
            <span class="section-badge">Matching Process</span>
            <h2 id="process-heading" class="section-title">How It Works: 5 Steps to Your Next Engineer</h2>
            <p class="section-sub">A streamlined hiring pathway designed to get capable developers writing code in your repository quickly.</p>
        </div>

        <div class="process-grid">
            <div class="process-card">
                <div class="process-num">01</div>
                <h3 class="process-title">Requirement</h3>
                <p class="process-desc">Submit your project details, required tech stack, and ideal developer seniority.</p>
            </div>
            <div class="process-card">
                <div class="process-num">02</div>
                <h3 class="process-title">Role Selection</h3>
                <p class="process-desc">Choose from our 12 engineering disciplines and specify your engagement model.</p>
            </div>
            <div class="process-card">
                <div class="process-num">03</div>
                <h3 class="process-title">Discussion & Matching</h3>
                <p class="process-desc">Our technical leads review your specs and present hand-matched candidate profiles within 24 hours <!-- VERIFY: SLA -->.</p>
            </div>
            <div class="process-card">
                <div class="process-num">04</div>
                <h3 class="process-title">Confirmation</h3>
                <p class="process-desc">Interview candidates directly, review sample code, and confirm terms with a clear quote.</p>
            </div>
            <div class="process-card">
                <div class="process-num">05</div>
                <h3 class="process-title">Start</h3>
                <p class="process-desc">Onboard your engineer into your Slack, Jira, and GitHub repositories to begin sprinting.</p>
            </div>
        </div>
    </div>
</section>

<!-- Section 7: Industries -->
<section class="industries-section" id="industries" aria-labelledby="industries-heading">
    <div class="container">
        <div class="section-header">
            <span class="section-badge">Industry Expertise</span>
            <h2 id="industries-heading" class="section-title">Domain Experience Across Critical Sectors</h2>
            <p class="section-sub">Our developers bring familiarity with industry-specific compliance, transaction patterns, and user expectations.</p>
        </div>

        <div class="industries-grid">
            <div class="industry-card">
                <h3 class="industry-title">FinTech & Payments</h3>
                <p class="industry-desc">PCI-DSS compliance awareness, ledger systems, Stripe/Plaid integrations, and fraud-resistant architectures.</p>
            </div>
            <div class="industry-card">
                <h3 class="industry-title">HealthTech & Telehealth</h3>
                <p class="industry-desc">HIPAA compliance adherence, encrypted patient data stores, video consultations, and EHR/FHIR interoperability.</p>
            </div>
            <div class="industry-card">
                <h3 class="industry-title">E-Commerce & Retail</h3>
                <p class="industry-desc">High-volume Shopify Plus storefronts, headless Hydrogen builds, custom inventory sync, and checkout optimizations.</p>
            </div>
            <div class="industry-card">
                <h3 class="industry-title">SaaS & B2B Platforms</h3>
                <p class="industry-desc">Multi-tenant architecture, role-based access permissions, subscription lifecycle billing, and analytics dashboards.</p>
            </div>
            <div class="industry-card">
                <h3 class="industry-title">Logistics & Supply Chain</h3>
                <p class="industry-desc">Real-time GPS tracking endpoints, warehouse management portals, dispatch optimization, and inventory APIs.</p>
            </div>
            <div class="industry-card">
                <h3 class="industry-title">EdTech & Digital Media</h3>
                <p class="industry-desc">Interactive learning management systems (LMS), video streaming integration, gamified quizzes, and student portals.</p>
            </div>
        </div>
    </div>
</section>

<!-- Section 8: FAQ Accordion -->
<section class="faq-section" id="faq" style="padding: var(--space-20) 0; background: #FFFFFF;" aria-labelledby="faq-home-heading">
    <div class="container">
        <div class="section-header">
            <span class="section-badge">Got Questions?</span>
            <h2 id="faq-home-heading" class="section-title">Frequently Asked Questions</h2>
            <p class="section-sub">Everything you need to know about partnering with Arora Tech Solutions for developer staff augmentation.</p>
        </div>

        <div class="accordion" role="region" aria-label="General FAQs">
            <div class="accordion-item is-open">
                <button type="button" class="accordion-button" aria-expanded="true">
                    <span>How does Arora Tech Solutions differ from freelancer marketplaces?</span>
                    <?= render_svg_icon('chevron-down', 'accordion-icon'); ?>
                </button>
                <div class="accordion-body">
                    We are a dedicated engineering solutions partner, not an open freelancer marketplace or bidding directory. Our software developers are pre-vetted technical professionals who integrate directly into your sprint rituals with dedicated accountability and non-disclosure guarantees.
                </div>
            </div>

            <div class="accordion-item">
                <button type="button" class="accordion-button" aria-expanded="false">
                    <span>How does your quote-based pricing model work?</span>
                    <?= render_svg_icon('chevron-down', 'accordion-icon'); ?>
                </button>
                <div class="accordion-body">
                    Rather than publishing generic public rate cards, we assess your required seniority level, expected commitment (hourly, weekly sprints, or dedicated monthly retainers), and tech stack complexity to provide a transparent, fixed quote tier tailored to your budget.
                </div>
            </div>

            <div class="accordion-item">
                <button type="button" class="accordion-button" aria-expanded="false">
                    <span>How quickly can a developer onboard and start working?</span>
                    <?= render_svg_icon('chevron-down', 'accordion-icon'); ?>
                </button>
                <div class="accordion-body">
                    Depending on your stack requirements and candidate availability, we typically introduce hand-picked engineer profiles within 24 to 48 hours <!-- VERIFY: SLA -->, allowing kickoff within days rather than the months required for traditional recruiting.
                </div>
            </div>

            <div class="accordion-item">
                <button type="button" class="accordion-button" aria-expanded="false">
                    <span>Can we switch engagement models during a project?</span>
                    <?= render_svg_icon('chevron-down', 'accordion-icon'); ?>
                </button>
                <div class="accordion-body">
                    Yes. Many clients start on an hourly engagement for an initial architecture audit or proof-of-concept, then seamlessly transition to weekly sprints or dedicated monthly retainers as roadmap scope expands.
                </div>
            </div>

            <div class="accordion-item">
                <button type="button" class="accordion-button" aria-expanded="false">
                    <span>What if a developer is not the right fit for our team?</span>
                    <?= render_svg_icon('chevron-down', 'accordion-icon'); ?>
                </button>
                <div class="accordion-body">
                    We provide a satisfaction guarantee: if a developer does not meet your technical expectations during the initial onboarding period, we promptly assign a replacement engineer with zero downtime or duplicated onboarding fees.
                </div>
            </div>

            <div class="accordion-item">
                <button type="button" class="accordion-button" aria-expanded="false">
                    <span>Who owns the intellectual property and code written by your developers?</span>
                    <?= render_svg_icon('chevron-down', 'accordion-icon'); ?>
                </button>
                <div class="accordion-body">
                    You retain 100% full legal ownership of all code, assets, documentation, and intellectual property developed during the engagement.
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Section 9: Final CTA Band -->
<section class="cta-band" aria-labelledby="cta-band-heading">
    <div class="container">
        <div class="cta-band-inner">
            <h2 id="cta-band-heading" class="cta-band-title">Accelerate Your Technical Roadmap Today</h2>
            <p class="cta-band-sub">
                Connect with our solutions desk to discuss your team requirements and receive custom quote tiers within one business day.
            </p>
            <div class="cta-band-actions">
                <a href="#enquiry-section" class="btn btn-primary btn-lg">
                    <span>Request Developer Quote</span>
                    <?= render_svg_icon('arrow-right', 'icon-sm'); ?>
                </a>
                <a href="<?= url('contact'); ?>" class="btn btn-outline-light btn-lg">
                    <span>General Inquiries</span>
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Section 10: Universal Enquiry Form -->
<?php
$preselectedRoleSlug = null;
require dirname(__DIR__) . '/includes/form-component.php';
?>

<?php require_once dirname(__DIR__) . '/includes/footer.php'; ?>
