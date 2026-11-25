<?php
/**
 * Arora Tech Solutions - Hire Full Stack Developers
 * Reference Page (Phase 4 Reference Implementation)
 */

declare(strict_types=1);

$roleSlug = 'full-stack-developers';
$pageSlug = 'role-full-stack';

require_once dirname(__DIR__, 2) . '/includes/helpers.php';
require_once dirname(__DIR__, 2) . '/includes/seo.php';

// Configure Page Specific SEO & Schemas
SEO::set([
    'title'       => 'Hire Dedicated Full Stack Developers | Arora Tech Solutions',
    'description' => 'Hire vetted full stack developers for end-to-end web apps, SaaS platforms, and enterprise APIs. Flexible hourly, weekly, and monthly quote-based models.',
    'canonical'   => 'https://hire.aroratechsolutions.com/hire/full-stack-developers/',
    'breadcrumbs' => [
        ['name' => 'Hire Developers', 'url' => '/#roles'],
        ['name' => 'Full Stack Developers', 'url' => '/hire/full-stack-developers/'],
    ],
    'faqs' => [
        [
            'q' => 'What technical proficiencies do your full stack developers possess?',
            'a' => 'Our full stack engineers are experienced across both modern frontend frameworks (React, Next.js, Vue, TypeScript) and robust server ecosystems (Node.js, Python, Go, PHP/Laravel), along with relational databases (PostgreSQL, MySQL), caching systems (Redis), and containerized deployments (Docker, AWS).'
        ],
        [
            'q' => 'How does Arora Tech Solutions vet full stack developer candidates?',
            'a' => 'Every developer undergoes a multi-stage evaluation: architecture design interviews, live code refactoring assessments, database query optimization drills, and practical communication checks before being presented for client selection.'
        ],
        [
            'q' => 'Can a full stack developer take an application from concept to deployment?',
            'a' => 'Yes. Our full stack developers excel at owning end-to-end features—from designing relational database schemas and writing API endpoints to building responsive, accessible UI components and configuring automated CI/CD pipelines.'
        ],
        [
            'q' => 'How does billing work without public fixed rates?',
            'a' => 'All engagements are quote-based. We assess your required senior level, expected commitment (hourly, weekly sprints, or dedicated monthly retainers), and tech complexity to provide a transparent, single-tier quote with zero hidden surcharges.'
        ],
        [
            'q' => 'Do your full stack engineers work in our timezone?',
            'a' => 'Yes. We match developers whose working schedules overlap with your core business hours (typically providing 4 to 8 hours of direct daily collaboration) regardless of whether your team is in North America, Europe, or APAC.'
        ],
        [
            'q' => 'Who retains ownership of the code and intellectual property?',
            'a' => 'You do. 100% of all source code, architecture designs, documentation, and intellectual property created during the engagement belongs entirely to your company upon invoicing.'
        ]
    ],
    'service' => [
        'name' => 'Dedicated Full Stack Developer Staff Augmentation',
        'description' => 'Hire senior full stack engineers for custom software development, SaaS products, and enterprise web applications.'
    ]
]);

require_once dirname(__DIR__, 2) . '/includes/header.php';
?>

<!-- Breadcrumbs Bar -->
<div class="breadcrumbs-bar" aria-label="Breadcrumb">
    <div class="container">
        <ol class="breadcrumbs-list">
            <li class="breadcrumbs-item"><a href="<?= url(''); ?>">Home</a></li>
            <li class="breadcrumbs-separator" aria-hidden="true">/</li>
            <li class="breadcrumbs-item"><a href="<?= url(''); ?>#roles">Hire Developers</a></li>
            <li class="breadcrumbs-separator" aria-hidden="true">/</li>
            <li class="breadcrumbs-item is-active" aria-current="page">Full Stack Developers</li>
        </ol>
    </div>
</div>

<!-- Section 1: Dark Premium Hero with Workstation Mockup -->
<section class="fs-hero" aria-labelledby="hero-heading">
    <div class="container">
        <div class="fs-hero-grid">
            <!-- Left Hero Content -->
            <div class="fs-hero-content">
                <div class="fs-hero-pill">
                    <?= render_svg_icon('layers', 'icon-xs'); ?>
                    <span>End-to-End Architectural Mastery</span>
                </div>
                <h1 id="hero-heading" class="fs-hero-title">
                    Hire Dedicated <span class="fs-hero-title-gradient">Full Stack Developers</span>
                </h1>
                <p class="fs-hero-sub">
                    Bridge the gap between frontend fluidity and backend scalability. Our full stack engineers architect, build, and deploy production-grade software across modern client frameworks, high-throughput APIs, and optimized databases.
                </p>
                <div class="fs-hero-actions">
                    <a href="#enquiry-section" class="btn btn-primary btn-lg">
                        <span>Get a Developer Quote</span>
                        <?= render_svg_icon('arrow-right', 'icon-sm'); ?>
                    </a>
                    <a href="#ecosystem" class="btn btn-outline-light btn-lg">
                        <span>Inspect Architecture Flow</span>
                    </a>
                </div>
                <div class="fs-hero-specs">
                    <div class="fs-spec-item">
                        <span class="fs-spec-num">Quote-Based</span>
                        <span class="fs-spec-label">Transparent custom tiers</span>
                    </div>
                    <div class="fs-spec-item">
                        <span class="fs-spec-num">Flexible Pace</span>
                        <span class="fs-spec-label">Hourly, weekly or monthly</span>
                    </div>
                    <div class="fs-spec-item">
                        <span class="fs-spec-num">Pre-Vetted</span>
                        <span class="fs-spec-label">Production-ready talent</span>
                    </div>
                </div>
            </div>

            <!-- Right Hero Visual: Developer Workstation with Floating Chips -->
            <div class="fs-workstation-wrap" aria-hidden="true">
                <div class="floating-chip floating-chip-react">
                    <?= render_svg_icon('atom', 'icon-xs'); ?>
                    <span>React / Next.js</span>
                </div>
                <div class="floating-chip floating-chip-node">
                    <?= render_svg_icon('terminal', 'icon-xs'); ?>
                    <span>Node.js / Express</span>
                </div>
                <div class="floating-chip floating-chip-db">
                    <?= render_svg_icon('server', 'icon-xs'); ?>
                    <span>PostgreSQL / Redis</span>
                </div>
                <div class="floating-chip floating-chip-api">
                    <?= render_svg_icon('zap', 'icon-xs'); ?>
                    <span>REST / GraphQL APIs</span>
                </div>

                <!-- Code Terminal Mockup -->
                <div class="fs-terminal-mockup">
                    <div class="fs-terminal-bar">
                        <div class="terminal-dots">
                            <span class="dot dot-red"></span>
                            <span class="dot dot-yellow"></span>
                            <span class="dot dot-green"></span>
                        </div>
                        <span class="terminal-title">ApplicationService.ts</span>
                        <span class="terminal-badge">Compiled: OK</span>
                    </div>
                    <pre class="fs-terminal-body"><code><span class="code-comment">// Full-lifecycle feature implementation</span>
<span class="code-keyword">import</span> { <span class="code-func">Router</span>, <span class="code-prop">Request</span>, <span class="code-prop">Response</span> } <span class="code-keyword">from</span> <span class="code-str">'express'</span>;
<span class="code-keyword">import</span> { <span class="code-func">prismaClient</span> } <span class="code-keyword">from</span> <span class="code-str">'@arora/db'</span>;

<span class="code-keyword">export async function</span> <span class="code-func">syncUserWorkspace</span>(req: <span class="code-prop">Request</span>) {
  <span class="code-keyword">const</span> { <span class="code-prop">tenantId</span>, <span class="code-prop">payload</span> } = req.<span class="code-prop">body</span>;
  
  <span class="code-comment">/* 1. Transactional Database Mutation */</span>
  <span class="code-keyword">const</span> record = <span class="code-keyword">await</span> prismaClient.<span class="code-prop">project</span>.<span class="code-func">create</span>({
    data: { tenantId, ...payload, status: <span class="code-str">'ACTIVE'</span> }
  });
  
  <span class="code-comment">/* 2. Cache Invalidation & Event Dispatch */</span>
  <span class="code-keyword">await</span> redis.<span class="code-func">del</span>(<span class="code-str">`tenant:\${tenantId}:cache`</span>);
  <span class="code-keyword">return</span> { success: <span class="code-keyword">true</span>, id: record.<span class="code-prop">id</span> };
}</code></pre>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Section 2: Interactive Ecosystem Diagram (Frontend -> Gateway -> Backend -> Database) -->
<section class="fs-ecosystem-section" id="ecosystem" aria-labelledby="ecosystem-heading">
    <div class="container">
        <div class="section-header">
            <span class="section-badge">Holistic Engineering</span>
            <h2 id="ecosystem-heading" class="section-title">The Full Stack Delivery Ecosystem</h2>
            <p class="section-sub">
                Our full stack engineers operate with complete context across the entire application hierarchy. Click any tier below to inspect how we architect each boundary for maximum cohesion.
            </p>
        </div>

        <div class="ecosystem-diagram-container">
            <div class="ecosystem-flow-grid" role="tablist" aria-label="Architecture Tiers">
                <!-- Tier 1 -->
                <div class="ecosystem-node is-selected" data-tier="frontend" role="tab" tabindex="0" aria-selected="true">
                    <span class="node-step-tag">Tier 01</span>
                    <h3 class="node-title">Client & UI</h3>
                    <p class="node-summary">Dynamic, accessible user interfaces built with React, Next.js, and TypeScript.</p>
                    <div class="node-tech-tags">
                        <span class="node-tag">React 18</span>
                        <span class="node-tag">Next.js</span>
                        <span class="node-tag">Tailwind</span>
                    </div>
                </div>

                <!-- Tier 2 -->
                <div class="ecosystem-node" data-tier="gateway" role="tab" tabindex="0" aria-selected="false">
                    <span class="node-step-tag">Tier 02</span>
                    <h3 class="node-title">API Gateway</h3>
                    <p class="node-summary">Secure routing, request throttling, auth verification, and typed contracts.</p>
                    <div class="node-tech-tags">
                        <span class="node-tag">GraphQL</span>
                        <span class="node-tag">REST</span>
                        <span class="node-tag">JWT/OAuth</span>
                    </div>
                </div>

                <!-- Tier 3 -->
                <div class="ecosystem-node" data-tier="backend" role="tab" tabindex="0" aria-selected="false">
                    <span class="node-step-tag">Tier 03</span>
                    <h3 class="node-title">Server Logic</h3>
                    <p class="node-summary">Resilient domain microservices, background job queues, and asynchronous workers.</p>
                    <div class="node-tech-tags">
                        <span class="node-tag">Node.js</span>
                        <span class="node-tag">Python</span>
                        <span class="node-tag">BullMQ</span>
                    </div>
                </div>

                <!-- Tier 4 -->
                <div class="ecosystem-node" data-tier="database" role="tab" tabindex="0" aria-selected="false">
                    <span class="node-step-tag">Tier 04</span>
                    <h3 class="node-title">Persistence & Cache</h3>
                    <p class="node-summary">ACID-compliant schemas, query optimization, migrations, and distributed caching.</p>
                    <div class="node-tech-tags">
                        <span class="node-tag">PostgreSQL</span>
                        <span class="node-tag">Redis</span>
                        <span class="node-tag">Prisma</span>
                    </div>
                </div>
            </div>

            <!-- Dynamic Live Insight Display -->
            <div class="ecosystem-live-insight" aria-live="polite">
                <div class="insight-header" id="ecosystem-insight-title">
                    Frontend Tier: Client-Side React / Next.js & State Architecture
                </div>
                <p class="insight-desc" id="ecosystem-insight-desc">
                    Our full stack engineers architect component-driven user interfaces with sub-second time-to-interactive, client-side caching (React Query / SWR), accessible semantic HTML5, and responsive CSS token systems.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- Section 3: Technology Stack Tabs -->
<section class="fs-stack-section" aria-labelledby="stack-heading">
    <div class="container">
        <div class="section-header">
            <span class="section-badge">Technology Capabilities</span>
            <h2 id="stack-heading" class="section-title">Battle-Tested Full Stack Tooling</h2>
            <p class="section-sub">We deploy engineers specialized in modern open-source toolchains designed for stability, high concurrency, and long-term maintainability.</p>
        </div>

        <!-- Tab Controls -->
        <div class="stack-tabs-nav" role="tablist" aria-label="Technology Stack Disciplines">
            <button type="button" class="stack-tab-btn is-active" data-tab="frontend" role="tab" aria-selected="true">Frontend Tech</button>
            <button type="button" class="stack-tab-btn" data-tab="backend" role="tab" aria-selected="false">Backend Tech</button>
            <button type="button" class="stack-tab-btn" data-tab="database" role="tab" aria-selected="false">Databases & Cache</button>
            <button type="button" class="stack-tab-btn" data-tab="devops" role="tab" aria-selected="false">Cloud & CI/CD</button>
        </div>

        <!-- Panels -->
        <!-- Panel 1: Frontend -->
        <div class="stack-tab-panel is-active" id="tab-panel-frontend" role="tabpanel">
            <div class="stack-card">
                <div class="stack-card-icon"><?= render_svg_icon('atom', 'icon-md'); ?></div>
                <h3 class="stack-card-title">React & Next.js</h3>
                <p class="stack-card-desc">Server-side rendering (SSR), static site generation (SSG), incremental static regeneration (ISR), and performant client hydration.</p>
            </div>
            <div class="stack-card">
                <div class="stack-card-icon"><?= render_svg_icon('code', 'icon-md'); ?></div>
                <h3 class="stack-card-title">TypeScript</h3>
                <p class="stack-card-desc">End-to-end type safety connecting backend schemas to frontend UI components, minimizing runtime errors across the stack.</p>
            </div>
            <div class="stack-card">
                <div class="stack-card-icon"><?= render_svg_icon('layout', 'icon-md'); ?></div>
                <h3 class="stack-card-title">Tailwind & CSS Tokens</h3>
                <p class="stack-card-desc">Design token integration, fluid typography scales, strict WCAG 2.2 AA contrast adherence, and zero-runtime bundle efficiency.</p>
            </div>
        </div>

        <!-- Panel 2: Backend -->
        <div class="stack-tab-panel" id="tab-panel-backend" role="tabpanel">
            <div class="stack-card">
                <div class="stack-card-icon"><?= render_svg_icon('terminal', 'icon-md'); ?></div>
                <h3 class="stack-card-title">Node.js & Express / Nest</h3>
                <p class="stack-card-desc">Asynchronous non-blocking I/O architectures, modular controller-service patterns, and enterprise NestJS dependency injection.</p>
            </div>
            <div class="stack-card">
                <div class="stack-card-icon"><?= render_svg_icon('server', 'icon-md'); ?></div>
                <h3 class="stack-card-title">Python (FastAPI & Django)</h3>
                <p class="stack-card-desc">High-speed async endpoints, Pydantic data validation, automated OpenAPI docs, and data transformation pipeline services.</p>
            </div>
            <div class="stack-card">
                <div class="stack-card-icon"><?= render_svg_icon('zap', 'icon-md'); ?></div>
                <h3 class="stack-card-title">RESTful & GraphQL APIs</h3>
                <p class="stack-card-desc">Schema-first API design, Apollo Server federation, rate limiting, and strict versioning strategies for client longevity.</p>
            </div>
        </div>

        <!-- Panel 3: Databases -->
        <div class="stack-tab-panel" id="tab-panel-database" role="tabpanel">
            <div class="stack-card">
                <div class="stack-card-icon"><?= render_svg_icon('server', 'icon-md'); ?></div>
                <h3 class="stack-card-title">PostgreSQL & MySQL</h3>
                <p class="stack-card-desc">Relational schema design, composite index tuning, connection pool configuration, and safe zero-downtime migration scripts.</p>
            </div>
            <div class="stack-card">
                <div class="stack-card-icon"><?= render_svg_icon('zap', 'icon-md'); ?></div>
                <h3 class="stack-card-title">Redis & Memory Stores</h3>
                <p class="stack-card-desc">Sub-millisecond session caching, pub/sub messaging channels, rate-limiting counters, and task queue deduplication.</p>
            </div>
            <div class="stack-card">
                <div class="stack-card-icon"><?= render_svg_icon('layers', 'icon-md'); ?></div>
                <h3 class="stack-card-title">MongoDB & NoSQL</h3>
                <p class="stack-card-desc">Document stores for semi-structured data, high-velocity ingestion events, time-series metrics, and flexible schema iteration.</p>
            </div>
        </div>

        <!-- Panel 4: DevOps -->
        <div class="stack-tab-panel" id="tab-panel-devops" role="tabpanel">
            <div class="stack-card">
                <div class="stack-card-icon"><?= render_svg_icon('cpu', 'icon-md'); ?></div>
                <h3 class="stack-card-title">Docker & Containerization</h3>
                <p class="stack-card-desc">Multi-stage container builds, deterministic local development parity, and production container image hardening.</p>
            </div>
            <div class="stack-card">
                <div class="stack-card-icon"><?= render_svg_icon('globe', 'icon-md'); ?></div>
                <h3 class="stack-card-title">AWS & Cloud Infrastructure</h3>
                <p class="stack-card-desc">Deployments on AWS ECS, Lambda serverless, S3 asset buckets, CloudFront CDN edge caching, and automated SSL orchestration.</p>
            </div>
            <div class="stack-card">
                <div class="stack-card-icon"><?= render_svg_icon('check-circle', 'icon-md'); ?></div>
                <h3 class="stack-card-title">CI/CD Automation</h3>
                <p class="stack-card-desc">GitHub Actions pipelines executing linting, unit test suites, integration tests, preview deployments, and staging rollouts.</p>
            </div>
        </div>
    </div>
</section>

<!-- Section 4: Project Types & Capabilities -->
<section class="fs-projects-section" aria-labelledby="projects-heading">
    <div class="container">
        <div class="section-header">
            <span class="section-badge">Real-World Engagements</span>
            <h2 id="projects-heading" class="section-title">Where Our Full Stack Developers Excel</h2>
            <p class="section-sub">From ground-up software architecture to solving critical bottleneck issues in mature systems, our engineers adapt immediately to your team's workflow.</p>
        </div>

        <div class="project-types-grid">
            <div class="project-type-card">
                <div class="project-type-header">
                    <span class="project-type-num">01</span>
                    <h3 class="project-type-title">End-to-End SaaS Platforms</h3>
                </div>
                <p class="project-type-desc">
                    Designing multi-tenant cloud software with role-based access control (RBAC), subscription billing webhooks, workspace partitioning, and real-time dashboard analytics.
                </p>
                <div class="project-type-tags">
                    <span class="project-tag">Multi-Tenant</span>
                    <span class="project-tag">Stripe Webhooks</span>
                    <span class="project-tag">RBAC</span>
                    <span class="project-tag">Audit Logs</span>
                </div>
            </div>

            <div class="project-type-card">
                <div class="project-type-header">
                    <span class="project-type-num">02</span>
                    <h3 class="project-type-title">MVP Rapid Prototyping</h3>
                </div>
                <p class="project-type-desc">
                    Turning product specifications into working software within compressed sprint schedules without accumulating architectural technical debt that hinders future scaling.
                </p>
                <div class="project-type-tags">
                    <span class="project-tag">Rapid Delivery</span>
                    <span class="project-tag">Clean Architecture</span>
                    <span class="project-tag">Extensible Schemas</span>
                </div>
            </div>

            <div class="project-type-card">
                <div class="project-type-header">
                    <span class="project-type-num">03</span>
                    <h3 class="project-type-title">Legacy Refactoring & Decoupling</h3>
                </div>
                <p class="project-type-desc">
                    Modernizing monolithic codebases by breaking tightly-coupled views into decoupled headless API services with modern React frontends and zero production downtime.
                </p>
                <div class="project-type-tags">
                    <span class="project-tag">Strangler Fig Pattern</span>
                    <span class="project-tag">Headless Migration</span>
                    <span class="project-tag">Zero Downtime</span>
                </div>
            </div>

            <div class="project-type-card">
                <div class="project-type-header">
                    <span class="project-type-num">04</span>
                    <h3 class="project-type-title">API & Third-Party Integrations</h3>
                </div>
                <p class="project-type-desc">
                    Connecting CRM platforms, ERP backends, payment gateways, and external vendor APIs with resilient webhook handlers, retry queues, and idempotent processing.
                </p>
                <div class="project-type-tags">
                    <span class="project-tag">Webhooks</span>
                    <span class="project-tag">Idempotency</span>
                    <span class="project-tag">Error Backoff</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Section 5: Engagement Models (Hourly / Weekly / Monthly) -->
<section class="fs-engagement-section" id="engagement-models" style="padding: var(--space-20) 0; background: #FFFFFF;" aria-labelledby="models-heading">
    <div class="container">
        <div class="section-header">
            <span class="section-badge">Flexible Engagements</span>
            <h2 id="models-heading" class="section-title">Flexible Full Stack Hiring Models</h2>
            <p class="section-sub">No rigid contracts or unexpected fees. Choose the cadence that matches your team roadmap and project timeline.</p>
        </div>

        <div class="engagement-models-grid">
            <!-- Hourly -->
            <div class="model-card">
                <div class="model-header">
                    <h3 class="model-title">Hourly Model</h3>
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
                    <h3 class="model-title">Weekly Sprints</h3>
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

            <!-- Monthly (Featured) -->
            <div class="model-card is-featured">
                <span class="model-featured-badge">Most Popular</span>
                <div class="model-header">
                    <h3 class="model-title">Monthly Dedicated</h3>
                    <div class="model-pace">Full-Time Augmented Engineer</div>
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

<!-- Section 6: FAQ Accordion -->
<section class="fs-faq-section" id="faq" style="padding: var(--space-20) 0; background: var(--brand-surface);" aria-labelledby="faq-heading">
    <div class="container">
        <div class="section-header">
            <span class="section-badge">Common Questions</span>
            <h2 id="faq-heading" class="section-title">Frequently Asked Questions: Full Stack Hiring</h2>
            <p class="section-sub">Clear answers regarding vetting, working models, timezone alignment, and intellectual property.</p>
        </div>

        <div class="accordion" role="region" aria-label="Full Stack FAQs">
            <!-- FAQ 1 -->
            <div class="accordion-item is-open">
                <button type="button" class="accordion-button" aria-expanded="true">
                    <span>What technical proficiencies do your full stack developers possess?</span>
                    <?= render_svg_icon('chevron-down', 'accordion-icon'); ?>
                </button>
                <div class="accordion-body">
                    Our full stack engineers are experienced across both modern frontend frameworks (React, Next.js, Vue, TypeScript) and robust server ecosystems (Node.js, Python, Go, PHP/Laravel), along with relational databases (PostgreSQL, MySQL), caching systems (Redis), and containerized deployments (Docker, AWS).
                </div>
            </div>

            <!-- FAQ 2 -->
            <div class="accordion-item">
                <button type="button" class="accordion-button" aria-expanded="false">
                    <span>How does Arora Tech Solutions vet full stack developer candidates?</span>
                    <?= render_svg_icon('chevron-down', 'accordion-icon'); ?>
                </button>
                <div class="accordion-body">
                    Every developer undergoes a multi-stage evaluation: architecture design interviews, live code refactoring assessments, database query optimization drills, and practical communication checks before being presented for client selection.
                </div>
            </div>

            <!-- FAQ 3 -->
            <div class="accordion-item">
                <button type="button" class="accordion-button" aria-expanded="false">
                    <span>Can a full stack developer take an application from concept to deployment?</span>
                    <?= render_svg_icon('chevron-down', 'accordion-icon'); ?>
                </button>
                <div class="accordion-body">
                    Yes. Our full stack developers excel at owning end-to-end features—from designing relational database schemas and writing API endpoints to building responsive, accessible UI components and configuring automated CI/CD pipelines.
                </div>
            </div>

            <!-- FAQ 4 -->
            <div class="accordion-item">
                <button type="button" class="accordion-button" aria-expanded="false">
                    <span>How does billing work without public fixed rates?</span>
                    <?= render_svg_icon('chevron-down', 'accordion-icon'); ?>
                </button>
                <div class="accordion-body">
                    All engagements are quote-based. We assess your required senior level, expected commitment (hourly, weekly sprints, or dedicated monthly retainers), and tech complexity to provide a transparent, single-tier quote with zero hidden surcharges.
                </div>
            </div>

            <!-- FAQ 5 -->
            <div class="accordion-item">
                <button type="button" class="accordion-button" aria-expanded="false">
                    <span>Do your full stack engineers work in our timezone?</span>
                    <?= render_svg_icon('chevron-down', 'accordion-icon'); ?>
                </button>
                <div class="accordion-body">
                    Yes. We match developers whose working schedules overlap with your core business hours (typically providing 4 to 8 hours of direct daily collaboration) regardless of whether your team is in North America, Europe, or APAC.
                </div>
            </div>

            <!-- FAQ 6 -->
            <div class="accordion-item">
                <button type="button" class="accordion-button" aria-expanded="false">
                    <span>Who retains ownership of the code and intellectual property?</span>
                    <?= render_svg_icon('chevron-down', 'accordion-icon'); ?>
                </button>
                <div class="accordion-body">
                    You do. 100% of all source code, architecture designs, documentation, and intellectual property created during the engagement belongs entirely to your company upon invoicing.
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Section 7: Internal Links to 3 Related Roles -->
<section class="fs-related-section" aria-labelledby="related-heading">
    <div class="container">
        <div class="section-header">
            <span class="section-badge">Complementary Disciplines</span>
            <h2 id="related-heading" class="section-title">Explore Related Engineering Roles</h2>
            <p class="section-sub">Need deeper specialization for a particular layer of your application? Inspect our dedicated role teams.</p>
        </div>

        <div class="related-roles-grid">
            <a href="<?= url('hire/frontend-developers'); ?>" class="related-role-card">
                <h3 class="related-role-title">Frontend Developers</h3>
                <p class="related-role-desc">Specialists in high-fidelity UI components, CSS design systems, animations, and cross-browser accessibility.</p>
                <span class="related-role-link">Explore Frontend Role <?= render_svg_icon('arrow-right', 'icon-xs'); ?></span>
            </a>

            <a href="<?= url('hire/backend-developers'); ?>" class="related-role-card">
                <h3 class="related-role-title">Backend Developers</h3>
                <p class="related-role-desc">Architects focusing strictly on high-throughput microservices, distributed queues, data warehousing, and API security.</p>
                <span class="related-role-link">Explore Backend Role <?= render_svg_icon('arrow-right', 'icon-xs'); ?></span>
            </a>

            <a href="<?= url('hire/react-developers'); ?>" class="related-role-card">
                <h3 class="related-role-title">React & Next.js Developers</h3>
                <p class="related-role-desc">Engineers dedicated to complex state management, Jamstack rendering patterns, and enterprise React applications.</p>
                <span class="related-role-link">Explore React Role <?= render_svg_icon('arrow-right', 'icon-xs'); ?></span>
            </a>
        </div>
    </div>
</section>

<!-- Section 8: Universal Hiring Enquiry Form (with Role Preselected) -->
<?php
$preselectedRoleSlug = 'full-stack-developers';
$customTechList = ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'GraphQL', 'Python', 'AWS', 'Redis'];
require dirname(__DIR__, 2) . '/includes/form-component.php';
?>

<?php require_once dirname(__DIR__, 2) . '/includes/footer.php'; ?>
