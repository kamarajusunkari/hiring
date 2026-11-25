export const ROLES_DATA = {
  'full-stack-developers': {
    slug: 'full-stack-developers',
    title: 'Full Stack Developers',
    h1: 'Hire Dedicated Full Stack Developers',
    badge: 'End-to-End Architecture',
    shortDesc: 'Engineers mastering frontend fluidity, backend APIs, distributed databases, and cloud infrastructure.',
    longDesc: 'Bridge the gap between frontend fluidity and backend scalability. Our full stack engineers architect, build, and deploy production-grade software across modern client frameworks, high-throughput APIs, and optimized databases.',
    accent: '#3B82F6',
    bgTint: 'rgba(59, 130, 246, 0.12)',
    icon: 'Layers',
    defaultTech: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'GraphQL', 'Python', 'AWS', 'Redis'],
    ecosystemTiers: [
      { id: 'tier-1', name: 'Client & UI', subtitle: 'Dynamic, accessible interfaces built with React & Next.js.', tech: ['React 18', 'Next.js', 'Tailwind', 'TypeScript'], detail: 'Architecting component-driven interfaces with sub-second time-to-interactive, client-side caching (React Query / SWR), and accessible semantic HTML5.' },
      { id: 'tier-2', name: 'API Gateway', subtitle: 'Routing, auth validation, and typed API contracts.', tech: ['REST', 'GraphQL', 'JWT/OAuth', 'Zod'], detail: 'Orchestrating microservice communication, rate limiting, token validation, and unified OpenAPI / GraphQL schemas between clients and server clusters.' },
      { id: 'tier-3', name: 'Server Logic', subtitle: 'Resilient domain microservices & background queues.', tech: ['Node.js', 'Python', 'FastAPI', 'BullMQ'], detail: 'Designing asynchronous job processing, event dispatchers, and domain-driven business logic services built for continuous horizontal scaling.' },
      { id: 'tier-4', name: 'Persistence', subtitle: 'ACID data modeling, transactions & caching.', tech: ['PostgreSQL', 'Redis', 'Prisma', 'MongoDB'], detail: 'Relational data modeling, zero-downtime migration scripts, composite query indexing, connection pooling, and sub-millisecond Redis memory caching.' }
    ],
    stackTabs: [
      { category: 'Frontend', items: [{ name: 'React & Next.js', desc: 'SSR, SSG, hydration tuning, and Jamstack rendering architectures.' }, { name: 'TypeScript', desc: 'End-to-end typed contracts bridging database models directly to UI states.' }, { name: 'Tailwind & Tokens', desc: 'Atomic design tokens, responsive breakpoints, and strict WCAG 2.2 AA contrast.' }] },
      { category: 'Backend', items: [{ name: 'Node.js & Express / Nest', desc: 'Asynchronous event loops, RESTful endpoints, and enterprise NestJS DI.' }, { name: 'Python (FastAPI / Django)', desc: 'High-speed async APIs, Pydantic validations, and background worker queues.' }, { name: 'REST & GraphQL', desc: 'Federated schemas, query deduplication, and backward-compatible versioning.' }] },
      { category: 'Databases', items: [{ name: 'PostgreSQL & MySQL', desc: 'Relational schema architecture, composite index tuning, and connection pooling.' }, { name: 'Redis', desc: 'Distributed session caches, pub/sub event channels, and rate-limit storage.' }, { name: 'MongoDB', desc: 'Document stores for semi-structured payloads and high-velocity ingestion.' }] },
      { category: 'Cloud & CI/CD', items: [{ name: 'Docker Containers', desc: 'Multi-stage container builds and deterministic local-to-cloud parity.' }, { name: 'AWS & Cloud Infrastructure', desc: 'Deployments on AWS ECS, Lambda serverless, S3 assets, and CloudFront CDN.' }, { name: 'GitHub Actions', desc: 'Automated test execution, linting, preview environments, and release tags.' }] }
    ],
    projectTypes: [
      { num: '01', title: 'End-to-End SaaS Platforms', desc: 'Designing multi-tenant cloud software with role-based access control (RBAC), subscription billing webhooks, workspace partitioning, and real-time dashboard analytics.', tags: ['Multi-Tenant', 'Stripe Billing', 'RBAC', 'Audit Logs'] },
      { num: '02', title: 'MVP Rapid Prototyping', desc: 'Turning product specifications into working software within compressed sprint schedules without accumulating architectural technical debt that hinders future scaling.', tags: ['Rapid Delivery', 'Clean Architecture', 'Extensible Schemas'] },
      { num: '03', title: 'Legacy Refactoring & Decoupling', desc: 'Modernizing monolithic codebases by breaking tightly-coupled views into decoupled headless API services with modern React frontends and zero production downtime.', tags: ['Strangler Fig', 'Headless Migration', 'Zero Downtime'] },
      { num: '04', title: 'API & Microservice Integrations', desc: 'Connecting CRM platforms, ERP backends, payment gateways, and external vendor APIs with resilient webhook handlers, retry queues, and idempotent processing.', tags: ['Webhooks', 'Idempotency', 'Error Backoff'] }
    ],
    faqs: [
      { q: 'What technical proficiencies do your full stack developers possess?', a: 'Our full stack engineers are experienced across both modern frontend frameworks (React, Next.js, Vue, TypeScript) and robust server ecosystems (Node.js, Python, Go, PHP/Laravel), along with relational databases (PostgreSQL, MySQL), caching systems (Redis), and containerized deployments (Docker, AWS).' },
      { q: 'How does Arora Tech Solutions vet full stack developer candidates?', a: 'Every developer undergoes a multi-stage evaluation: architecture design interviews, live code refactoring assessments, database query optimization drills, and practical communication checks before being presented for client selection.' },
      { q: 'Can a full stack developer take an application from concept to deployment?', a: 'Yes. Our full stack developers excel at owning end-to-end features—from designing relational database schemas and writing API endpoints to building responsive, accessible UI components and configuring automated CI/CD pipelines.' },
      { q: 'How does billing work without public fixed rates?', a: 'All engagements are quote-based. We assess your required senior level, expected commitment (hourly, weekly sprints, or dedicated monthly retainers), and tech complexity to provide a transparent, single-tier quote with zero hidden surcharges.' },
      { q: 'Do your full stack engineers work in our timezone?', a: 'Yes. We match developers whose working schedules overlap with your core business hours (typically providing 4 to 8 hours of direct daily collaboration) regardless of whether your team is in North America, Europe, or APAC.' },
      { q: 'Who retains ownership of the code and intellectual property?', a: 'You do. 100% of all source code, architecture designs, documentation, and intellectual property created during the engagement belongs entirely to your company upon invoicing.' }
    ],
    related: ['frontend-developers', 'backend-developers', 'react-developers']
  },
  'frontend-developers': {
    slug: 'frontend-developers',
    title: 'Frontend Developers',
    h1: 'Hire Expert Frontend Developers',
    badge: 'Pixel-Perfect User Experience',
    shortDesc: 'Engineers crafting blazing fast, pixel-perfect, accessible web interfaces across modern JavaScript ecosystems.',
    longDesc: 'Elevate your product aesthetics and user engagement. Our frontend engineers specialize in responsive layout architecture, design system implementation, sub-second Core Web Vitals optimization, and seamless REST/GraphQL client integration.',
    accent: '#06B6D4',
    bgTint: 'rgba(6, 182, 212, 0.12)',
    icon: 'Layout',
    defaultTech: ['HTML5/CSS3', 'JavaScript ES6+', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Vue.js', 'Figma Tokens'],
    ecosystemTiers: [
      { id: 'tier-1', name: 'Design Tokens', subtitle: 'Figma to CSS Custom Properties synchronisation.', tech: ['Design Tokens', 'Tailwind', 'CSS Grid'], detail: 'Translating design specifications into fluid typography, strict spacing grids, dark/light themes, and WCAG AA contrast compliance.' },
      { id: 'tier-2', name: 'Component Architecture', subtitle: 'Reusable, headless, and accessible UI libraries.', tech: ['React', 'Radix UI', 'Storybook'], detail: 'Building modular, composable component systems with zero CSS bloat, keyboard navigability, and ARIA live announcements.' },
      { id: 'tier-3', name: 'Client State & Cache', subtitle: 'Optimistic updates, state stores & pagination.', tech: ['TanStack Query', 'Zustand', 'Redux'], detail: 'Handling asynchronous query caching, infinite scrolling, client-side filtering, and instant optimistic state mutations.' },
      { id: 'tier-4', name: 'Performance & Vitals', subtitle: 'Sub-second LCP, zero CLS, and asset minimization.', tech: ['Vite', 'Code Splitting', 'WebP/AVIF'], detail: 'Aggressive bundle analysis, tree-shaking, lazy-loaded routes, dynamic image optimization, and 95+ Google Lighthouse tuning.' }
    ],
    stackTabs: [
      { category: 'Core Libraries', items: [{ name: 'React & Next.js', desc: 'Component lifecycles, server components, and responsive layout shells.' }, { name: 'Vue 3 & Nuxt', desc: 'Composition API, reactive ref structures, and lightweight hydration.' }, { name: 'TypeScript', desc: 'Strict interface contracts preventing UI prop mismatches at compile time.' }] },
      { category: 'Styling & Systems', items: [{ name: 'Tailwind CSS', desc: 'Utility-first rapid prototyping with zero runtime bundle overhead.' }, { name: 'CSS Modules & SASS', desc: 'Scoped style encapsulation for large-scale enterprise web apps.' }, { name: 'Figma Tokens', desc: 'Continuous sync between product design mockups and codebase tokens.' }] },
      { category: 'State Management', items: [{ name: 'TanStack Query', desc: 'Automated background refetching, deduping, and offline cache resilience.' }, { name: 'Zustand & Redux Toolkit', desc: 'Lightweight global store architectures for multi-step workflows.' }, { name: 'React Hook Form', desc: 'High-performance uncontrolled form validations with Zod schema verification.' }] },
      { category: 'Quality & Testing', items: [{ name: 'Vitest & Jest', desc: 'Unit testing of utility functions, reducers, and rendering hooks.' }, { name: 'Playwright & Cypress', desc: 'End-to-end user journey automation across Chrome, Safari, and Firefox.' }, { name: 'Lighthouse CI', desc: 'Automated performance and accessibility regression assertions on every PR.' }] }
    ],
    projectTypes: [
      { num: '01', title: 'Complex Web Application UIs', desc: 'Building dense, data-rich dashboards with interactive charts, configurable drag-and-drop tables, and instant keyboard shortcuts.', tags: ['Dashboards', 'Data Grids', 'Keyboard Shortcuts'] },
      { num: '02', title: 'Design System Engineering', desc: 'Translating design team Figma libraries into production-ready, documented React component packages used across multiple internal projects.', tags: ['Storybook', 'Figma Sync', 'NPM Package'] },
      { num: '03', title: 'Core Web Vitals Optimization', desc: 'Auditing and revamping sluggish web apps to score 90+ on Lighthouse by eliminating render-blocking resources and reducing Largest Contentful Paint.', tags: ['Lighthouse 90+', 'Asset Bundling', 'Critical CSS'] },
      { num: '04', title: 'Mobile-First Responsive Portals', desc: 'Ensuring fluid usability across all device widths from 320px smartphones to 4K ultra-wide monitors without layout shift.', tags: ['Responsive', 'Touch-Friendly', 'Fluid Clamp'] }
    ],
    faqs: [
      { q: 'Do your frontend developers work directly with our Figma designs?', a: 'Yes. Our frontend engineers work closely with design teams, inspecting Figma/Sketch files, matching spacing tokens, typography scales, and hover states with pixel precision.' },
      { q: 'How do you ensure accessibility (WCAG) compliance?', a: 'We build with semantic HTML landmarks, verified 4.5:1 color contrast ratios, full keyboard navigation support, and automated axe-core accessibility checks.' },
      { q: 'Can your frontend developers connect to our existing backend APIs?', a: 'Absolutely. Whether your backend is built in Node.js, Python, Ruby, PHP, or Java with REST or GraphQL, our frontend engineers integrate smoothly with typed client contracts.' },
      { q: 'What is the onboarding timeline for a frontend specialist?', a: 'We typically match and present vetted candidate profiles within 24 to 48 hours, ready to integrate into your daily standups and sprint boards within days.' },
      { q: 'Can we hire frontend talent on an hourly basis for small tweaks?', a: 'Yes. Our flexible hourly model allows you to tackle specific UI upgrades, responsive bug remediation, or accessibility audits without long-term lock-in.' }
    ],
    related: ['react-developers', 'full-stack-developers', 'ui-ux-designers']
  },
  'backend-developers': {
    slug: 'backend-developers',
    title: 'Backend Developers',
    h1: 'Hire Scalable Backend Developers',
    badge: 'Distributed High-Throughput Systems',
    shortDesc: 'Architects of high-throughput APIs, distributed microservices, fault-tolerant queues, and resilient databases.',
    longDesc: 'Ensure your server infrastructure can handle massive concurrency, data consistency, and enterprise security. Our backend engineers design scalable REST and GraphQL APIs, optimize database queries, and automate cloud container deployment.',
    accent: '#10B981',
    bgTint: 'rgba(16, 185, 129, 0.12)',
    icon: 'Server',
    defaultTech: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'RabbitMQ', 'AWS'],
    ecosystemTiers: [
      { id: 'tier-1', name: 'API Gateway', subtitle: 'Edge traffic routing, rate limiting & SSL offloading.', tech: ['Kong', 'Nginx', 'OAuth2', 'JWT'], detail: 'Terminating client connections, validating bearer credentials, enforcing IP throttling, and distributing upstream traffic.' },
      { id: 'tier-2', name: 'Microservice Domain', subtitle: 'Business domain logic & synchronous RPC.', tech: ['Node.js', 'Go', 'gRPC', 'NestJS'], detail: 'Implementing domain-driven design, transaction boundaries, strict idempotency keys, and decoupled service layers.' },
      { id: 'tier-3', name: 'Event Queue & Bus', subtitle: 'Asynchronous event streaming & backpressure.', tech: ['Kafka', 'RabbitMQ', 'Celery', 'Redis'], detail: 'Decoupling compute-heavy workflows, background emails, PDF generation, and webhook dispatching from main HTTP cycles.' },
      { id: 'tier-4', name: 'Persistence & Sharding', subtitle: 'Partitioned storage, replicas & indexing.', tech: ['PostgreSQL', 'Elasticsearch', 'DynamoDB'], detail: 'Designing high-concurrency read-replicas, write masters, connection pools, and full-text search indexing with zero downtime.' }
    ],
    stackTabs: [
      { category: 'Languages & Frameworks', items: [{ name: 'Node.js (Express / NestJS)', desc: 'Asynchronous event loops, modular controllers, and enterprise architectural patterns.' }, { name: 'Python (FastAPI / Django)', desc: 'Type-hinted async endpoints, automated OpenAPI generation, and data tasks.' }, { name: 'Go (Golang)', desc: 'High-concurrency microservices, lightweight memory footprints, and raw network speed.' }] },
      { category: 'Databases & Storage', items: [{ name: 'PostgreSQL & MySQL', desc: 'Complex joins, partition tables, EXPLAIN ANALYZE query profiling, and ACID safety.' }, { name: 'Redis & Memcached', desc: 'Distributed caching, locks, sliding-window rate limiters, and session storage.' }, { name: 'Elasticsearch / OpenSearch', desc: 'Inverted index configuration, autocomplete suggestions, and log aggregation.' }] },
      { category: 'Queues & Messaging', items: [{ name: 'RabbitMQ & Kafka', desc: 'Message routing, pub/sub consumer groups, and high-volume event streaming.' }, { name: 'BullMQ & Celery', desc: 'Scheduled recurring cron jobs, retry backoff strategies, and dead-letter queues.' }] },
      { category: 'Security & DevOps', items: [{ name: 'Docker & Kubernetes', desc: 'Container orchestration, horizontal pod autoscaling, and secret injection.' }, { name: 'API Security & OAuth2', desc: 'Role-based authorization, OWASP Top 10 mitigation, and HMAC webhook verification.' }] }
    ],
    projectTypes: [
      { num: '01', title: 'High-Throughput REST & GraphQL APIs', desc: 'Architecting versioned endpoints capable of processing thousands of requests per second with low latency and automated documentation.', tags: ['Microservices', 'GraphQL', 'Rate Limiting'] },
      { num: '02', title: 'Database Optimization & Migration', desc: 'Refactoring slow SQL queries, restructuring schema indexes, and performing zero-downtime database table migrations on live production databases.', tags: ['PostgreSQL Tuning', 'Zero Downtime', 'Indexing'] },
      { num: '03', title: 'Third-Party Integration Middleware', desc: 'Building secure bridges to payment processors (Stripe), CRMs (Salesforce, HubSpot), ERP systems, and cloud providers with retry queues.', tags: ['Stripe', 'Webhooks', 'Idempotency'] },
      { num: '04', title: 'Background Job & Queue Processing', desc: 'Isolating long-running operations like document generation, data exports, and batch email dispatch into asynchronous worker pools.', tags: ['Queues', 'Workers', 'Redis'] }
    ],
    faqs: [
      { q: 'How do your backend engineers handle database scaling?', a: 'Through composite query indexing, read-replica routing, connection pooling (PgBouncer), efficient caching layers in Redis, and automated query execution plan analysis.' },
      { q: 'Do your engineers adhere to security standards like OWASP?', a: 'Yes. All API code implements strict input validation, sanitized database queries via prepared statements, parameterized ORMs, timing-safe auth comparisons, and TLS encryption.' },
      { q: 'Can you assist in migrating our monolith to microservices?', a: 'Yes. We apply proven patterns like the Strangler Fig approach to safely decouple monolithic services into standalone microservices without service interruption.' }
    ],
    related: ['full-stack-developers', 'python-developers', 'php-developers']
  },
  'react-developers': {
    slug: 'react-developers',
    title: 'React Developers',
    h1: 'Hire Senior React.js & Next.js Developers',
    badge: 'Modern Component Systems',
    shortDesc: 'Specialists in React 18, Next.js App Router, Redux, Zustand, modular component systems, and Jamstack apps.',
    longDesc: 'Harness the full power of modern React architecture. Our senior engineers specialize in React 18 Concurrent features, Next.js App Router, server-side rendering, and scalable global state management.',
    accent: '#6366F1',
    bgTint: 'rgba(99, 102, 241, 0.12)',
    icon: 'Atom',
    defaultTech: ['React 18', 'Next.js App Router', 'TypeScript', 'Redux Toolkit', 'Zustand', 'Tailwind CSS', 'TanStack Query', 'Jest'],
    ecosystemTiers: [
      { id: 'tier-1', name: 'Server Components', subtitle: 'Next.js App Router & zero-bundle server logic.', tech: ['RSC', 'Next.js 14', 'Streaming'], detail: 'Rendering critical components on the edge server to deliver immediate HTML payloads with minimal client JavaScript burden.' },
      { id: 'tier-2', name: 'Client Hydration', subtitle: 'Interactive component trees & island architecture.', tech: ['React 18', 'Suspense', 'Lazy'], detail: 'Selective hydration with Suspense boundaries, preventing UI freezes while background chunks load asynchronously.' },
      { id: 'tier-3', name: 'Global State & Sync', subtitle: 'Predictable state stores & remote data hooks.', tech: ['Zustand', 'TanStack Query', 'Context'], detail: 'Separating server state from local UI state, eliminating prop-drilling, and managing multi-step client workflows.' },
      { id: 'tier-4', name: 'UI Systems & Motion', subtitle: 'Design consistency & accessible interaction.', tech: ['Tailwind', 'Framer Motion', 'Radix'], detail: 'Smooth micro-interactions, spring physics transitions, and headless accessible primitives with full keyboard navigation.' }
    ],
    stackTabs: [
      { category: 'Frameworks', items: [{ name: 'Next.js (App Router)', desc: 'Server Actions, Route Handlers, nested layouts, and ISR.' }, { name: 'Vite React', desc: 'Ultra-fast HMR local development for Single Page Applications.' }, { name: 'Remix / React Router 6', desc: 'Nested route data loaders and declarative layout nesting.' }] },
      { category: 'State & Data', items: [{ name: 'TanStack Query (React Query)', desc: 'Server data cache, window focus revalidation, and optimistic mutations.' }, { name: 'Zustand', desc: 'Minimalist, boilerplate-free client state store for complex UI states.' }, { name: 'Redux Toolkit', desc: 'Structured predictable state containers for enterprise applications.' }] },
      { category: 'Styling & Animation', items: [{ name: 'Tailwind CSS', desc: 'Utility classes and modular token configuration.' }, { name: 'Framer Motion', desc: 'Performant spring-based UI transitions and gesture animations.' }, { name: 'Radix UI / Shadcn', desc: 'Unstyled, accessible primitives fully customized for your brand.' }] }
    ],
    projectTypes: [
      { num: '01', title: 'Enterprise Next.js SaaS Portals', desc: 'Multi-tenant dashboards with Server Actions, authenticated session cookies, and sub-second page transitions.', tags: ['Next.js', 'App Router', 'SaaS'] },
      { num: '02', title: 'Real-Time Interactive Dashboards', desc: 'Financial tickers, analytics charts, and collaborative canvases utilizing WebSockets and optimistic state updates.', tags: ['WebSockets', 'Charts', 'Real-Time'] },
      { num: '03', title: 'React Performance Auditing', desc: 'Diagnosing unnecessary re-renders with React Profiler, implementing useMemo/useCallback boundaries, and code-splitting.', tags: ['Profiling', 'Re-Renders', 'Bundle Split'] }
    ],
    faqs: [
      { q: 'Are your React developers proficient with the Next.js App Router?', a: 'Yes. Our developers are deeply experienced with Server Components (RSC), Client Components, Server Actions, streaming with Suspense, and metadata generation.' },
      { q: 'How do you prevent state bloat and unnecessary re-renders?', a: 'By separating server cache (via TanStack Query) from client store (via Zustand) and profiling component trees to place memoization boundaries accurately.' }
    ],
    related: ['frontend-developers', 'full-stack-developers', 'ui-ux-designers']
  },
  'python-developers': {
    slug: 'python-developers',
    title: 'Python Developers',
    h1: 'Hire Senior Python & Django Developers',
    badge: 'Backend, Automation & Data',
    shortDesc: 'Engineers building high-speed FastAPI backends, robust Django apps, automated pipelines, and AI orchestrations.',
    longDesc: 'Accelerate your backend architecture, workflow automation, and data operations with our senior Python developers. Skilled in FastAPI, Django, Celery asynchronous processing, and cloud deployment.',
    accent: '#F59E0B',
    bgTint: 'rgba(245, 158, 11, 0.12)',
    icon: 'Code',
    defaultTech: ['Python 3.12+', 'FastAPI', 'Django / DRF', 'PostgreSQL', 'Celery', 'Redis', 'Pandas', 'Docker', 'AWS'],
    ecosystemTiers: [
      { id: 'tier-1', name: 'API Layer', subtitle: 'FastAPI async routes & Pydantic typing.', tech: ['FastAPI', 'Pydantic', 'Uvicorn'], detail: 'Asynchronous non-blocking endpoints with automated Swagger documentation and strict runtime request validation.' },
      { id: 'tier-2', name: 'Application Logic', subtitle: 'Django ORM, authentication & permissions.', tech: ['Django', 'DRF', 'JWT'], detail: 'Enterprise admin portals, robust database ORM queries, role permissions, and signal dispatchers.' },
      { id: 'tier-3', name: 'Task Orchestration', subtitle: 'Distributed Celery workers & task queues.', tech: ['Celery', 'Redis', 'Flower'], detail: 'Asynchronous workers handling scraping, bulk emails, audio/image processing, and recurring cron schedules.' },
      { id: 'tier-4', name: 'Data & Analytics', subtitle: 'ETL pipelines, data cleaning & warehousing.', tech: ['Pandas', 'SQLAlchemy', 'Postgres'], detail: 'Processing large tabular datasets, generating automated CSV/Excel reports, and synchronizing external data feeds.' }
    ],
    stackTabs: [
      { category: 'Frameworks', items: [{ name: 'FastAPI', desc: 'Asynchronous REST APIs with ASGI servers and Pydantic schema validation.' }, { name: 'Django & Django REST Framework', desc: 'Full-featured enterprise web framework with built-in admin and ORM.' }, { name: 'Flask', desc: 'Lightweight microframework for targeted utility services and webhook endpoints.' }] },
      { category: 'Data & ETL', items: [{ name: 'Pandas & NumPy', desc: 'High-speed vector calculations, data transformation, and cleaning.' }, { name: 'SQLAlchemy', desc: 'Expressive SQL toolkit and Object Relational Mapper for Python.' }, { name: 'BeautifulSoup / Scrapy', desc: 'Automated data extraction and web content parsing pipelines.' }] }
    ],
    projectTypes: [
      { num: '01', title: 'High-Performance Asynchronous APIs', desc: 'Building microservices in FastAPI capable of managing concurrent requests with low memory footprints.', tags: ['FastAPI', 'AsyncIO', 'OpenAPI'] },
      { num: '02', title: 'Automated Business Data Pipelines', desc: 'Automating multi-step ETL scripts that fetch, sanitize, and load partner data feeds into centralized warehouses.', tags: ['ETL', 'Pandas', 'Automation'] }
    ],
    faqs: [
      { q: 'Can your Python developers handle both web backends and data tasks?', a: 'Yes. Our developers are proficient in both web development (FastAPI, Django) and data/automation scripting (Pandas, Celery, web scrapers).' }
    ],
    related: ['ai-automation-developers', 'backend-developers', 'full-stack-developers']
  },
  'php-developers': {
    slug: 'php-developers',
    title: 'PHP & Laravel Developers',
    h1: 'Hire Dedicated PHP & Laravel Developers',
    badge: 'Enterprise Web & Laravel',
    shortDesc: 'Experts in modern PHP 8.x, robust Laravel applications, secure REST APIs, and legacy system refactoring.',
    longDesc: 'From high-traffic Laravel applications to legacy PHP modernization, our developers write clean, maintainable, Object-Oriented code adhering to PSR standards and enterprise security guidelines.',
    accent: '#8B5CF6',
    bgTint: 'rgba(139, 92, 246, 0.12)',
    icon: 'Terminal',
    defaultTech: ['PHP 8.2+', 'Laravel 11', 'MySQL', 'Livewire', 'Redis', 'Docker', 'REST APIs', 'PHPUnit'],
    ecosystemTiers: [
      { id: 'tier-1', name: 'Routing & Middleware', subtitle: 'Kernel pipelines & authentication guards.', tech: ['Laravel Routing', 'Sanctum', 'Breeze'], detail: 'Secure session handling, API token management, CORS, and request throttling.' },
      { id: 'tier-2', name: 'Eloquent ORM', subtitle: 'Clean models, relationships & query builder.', tech: ['Eloquent', 'MySQL', 'Migrations'], detail: 'Eager loading to prevent N+1 queries, automated database migrations, and model scopes.' },
      { id: 'tier-3', name: 'Queues & Events', subtitle: 'Background horizon workers & event listeners.', tech: ['Laravel Horizon', 'Redis', 'Queues'], detail: 'Asynchronous notifications, report generation, and third-party webhook handling.' },
      { id: 'tier-4', name: 'Testing & Deploy', subtitle: 'Automated PHPUnit suites & zero downtime.', tech: ['PHPUnit', 'Pest', 'Forge'], detail: 'Comprehensive feature and unit testing suites ensuring zero regressions during code releases.' }
    ],
    stackTabs: [
      { category: 'Frameworks', items: [{ name: 'Laravel 10 / 11', desc: 'Eloquent ORM, Blade templating, Queue workers, and Artisan tooling.' }, { name: 'Symfony Components', desc: 'Decoupled, reusable components for enterprise web applications.' }, { name: 'Modern PHP 8.3', desc: 'Readonly classes, enums, match expressions, and fiber concurrency.' }] }
    ],
    projectTypes: [
      { num: '01', title: 'Custom Laravel Enterprise Portals', desc: 'CRM and ERP solutions with role permissions, billing, and reporting.', tags: ['Laravel', 'SaaS', 'MySQL'] },
      { num: '02', title: 'Legacy PHP 5/7 to PHP 8 Upgrades', desc: 'Safely refactoring deprecated syntax, updating dependencies, and boosting server performance.', tags: ['Refactoring', 'Security', 'Modernization'] }
    ],
    faqs: [
      { q: 'Are your PHP developers experienced with modern PHP 8.x standards?', a: 'Yes. We strictly follow modern PHP 8.x paradigms including typed properties, constructor promotion, enums, match expressions, and PSR standards.' }
    ],
    related: ['wordpress-developers', 'backend-developers', 'full-stack-developers']
  },
  'wordpress-developers': {
    slug: 'wordpress-developers',
    title: 'WordPress Developers',
    h1: 'Hire Custom WordPress & WooCommerce Developers',
    badge: 'Custom Themes & Plugins',
    shortDesc: 'Bespoke theme builders, custom plugin architects, ACF Pro masters, and WooCommerce speed specialists.',
    longDesc: 'Transform WordPress into an enterprise-grade digital experience. Our developers build tailored, lightweight themes and custom plugins without relying on bloated page builder plugins that slow down your website.',
    accent: '#2563EB',
    bgTint: 'rgba(37, 99, 235, 0.12)',
    icon: 'Globe',
    defaultTech: ['WordPress', 'WooCommerce', 'PHP 8.x', 'Custom Post Types', 'ACF Pro', 'REST API', 'JavaScript', 'MySQL'],
    ecosystemTiers: [
      { id: 'tier-1', name: 'Bespoke Theme Engine', subtitle: 'Bloat-free, semantic templates & block patterns.', tech: ['FSE', 'ACF Blocks', 'Tailwind'], detail: 'Clean code templates avoiding heavy plugins, ensuring rapid sub-second page loads.' },
      { id: 'tier-2', name: 'Custom Plugins & CPTs', subtitle: 'Tailored business logic & custom data schemas.', tech: ['Custom Plugins', 'Hooks/Filters', 'CPT'], detail: 'Extending WordPress core cleanly using native action and filter hooks with zero core file modifications.' },
      { id: 'tier-3', name: 'WooCommerce Storefront', subtitle: 'Conversion-optimized checkouts & inventory sync.', tech: ['WooCommerce', 'Payment Gateways', 'APIs'], detail: 'Custom payment gateway integration, shipping calculators, and ERP inventory synchronization.' },
      { id: 'tier-4', name: 'Speed & Hardening', subtitle: 'Database cleanup, caching & security audits.', tech: ['Redis Object Cache', 'Cloudflare', 'Security'], detail: 'Object caching, asset minification, database query indexing, and security hardening against brute-force attacks.' }
    ],
    stackTabs: [
      { category: 'CMS Core', items: [{ name: 'Custom Theme Development', desc: 'Lightweight bespoke themes built from custom design specifications.' }, { name: 'ACF Pro & Custom Blocks', desc: 'Flexible content editors giving marketing teams structured control.' }] }
    ],
    projectTypes: [
      { num: '01', title: 'High-Converting WooCommerce Stores', desc: 'Customized product layouts, one-page checkouts, and custom subscription flows.', tags: ['WooCommerce', 'E-Commerce', 'Checkout'] }
    ],
    faqs: [
      { q: 'Do your developers use pre-made bloated templates?', a: 'No. We specialize in bespoke, clean-coded custom themes and ACF Pro implementations tailored to your exact design and performance targets.' }
    ],
    related: ['shopify-developers', 'php-developers', 'frontend-developers']
  },
  'shopify-developers': {
    slug: 'shopify-developers',
    title: 'Shopify Developers',
    h1: 'Hire Certified Shopify & Liquid Developers',
    badge: 'E-Commerce Growth & Headless',
    shortDesc: 'Custom Liquid storefronts, headless Hydrogen builds, checkout extensibility, and custom app integrations.',
    longDesc: 'Maximize conversion rates and order value. Our Shopify engineers develop custom Liquid themes, private Shopify apps, seamless ERP integrations, and modern headless commerce storefronts using Hydrogen.',
    accent: '#10B981',
    bgTint: 'rgba(16, 185, 129, 0.12)',
    icon: 'ShoppingBag',
    defaultTech: ['Shopify Liquid', 'Hydrogen / Oxygen', 'Shopify Plus', 'GraphQL Storefront API', 'Tailwind CSS', 'JavaScript'],
    ecosystemTiers: [
      { id: 'tier-1', name: 'Liquid Storefront', subtitle: 'Modular sections, custom schemas & cart drawers.', tech: ['Liquid', 'Theme 2.0', 'JSON Templates'], detail: 'Custom responsive storefront architecture giving merchants drag-and-drop customization.' },
      { id: 'tier-2', name: 'Checkout Extensions', subtitle: 'Shopify Plus checkout UI & post-purchase upsells.', tech: ['Checkout UI Extensions', 'Shopify Functions'], detail: 'Custom discount rules, field validations, and upsell logic integrated into native Shopify Checkout.' },
      { id: 'tier-3', name: 'Custom Shopify Apps', subtitle: 'Private backend apps & warehouse sync.', tech: ['Remix', 'Shopify API', 'Node.js'], detail: 'Private apps communicating via Admin GraphQL API to synchronize inventory and fulfillments with external ERPs.' },
      { id: 'tier-4', name: 'Headless Hydrogen', subtitle: 'Blazing fast React storefronts on Oxygen edge.', tech: ['Hydrogen', 'Oxygen Edge', 'GraphQL'], detail: 'Sub-second page navigation, global edge caching, and headless flexibility for enterprise brands.' }
    ],
    stackTabs: [
      { category: 'Storefront', items: [{ name: 'Shopify Theme 2.0', desc: 'Custom sections, app blocks, and clean Liquid coding.' }, { name: 'Hydrogen & Oxygen', desc: 'React-based headless e-commerce deployed on Shopify edge servers.' }] }
    ],
    projectTypes: [
      { num: '01', title: 'Custom Shopify Plus Upgrades', desc: 'Building custom theme sections, currency switchers, and high-converting cart drawers.', tags: ['Shopify Plus', 'Liquid', 'Cart Drawer'] }
    ],
    faqs: [
      { q: 'Can your Shopify developers build private apps for ERP synchronization?', a: 'Yes. We build secure private and custom public Shopify apps using Node.js or Remix communicating through the Shopify Admin GraphQL API.' }
    ],
    related: ['wordpress-developers', 'frontend-developers', 'ui-ux-designers']
  },
  'flutter-developers': {
    slug: 'flutter-developers',
    title: 'Flutter Mobile Developers',
    h1: 'Hire Cross-Platform Flutter Developers',
    badge: 'iOS & Android Single Codebase',
    shortDesc: 'Single-codebase iOS and Android native performance, sleek 60fps animations, and offline-first mobile apps.',
    longDesc: 'Ship to both Apple App Store and Google Play Store simultaneously. Our Flutter developers engineer high-performance, offline-capable mobile applications using Dart, BLoC/Riverpod, and clean architecture.',
    accent: '#0284C7',
    bgTint: 'rgba(2, 132, 199, 0.12)',
    icon: 'Smartphone',
    defaultTech: ['Flutter 3.x', 'Dart', 'BLoC / Riverpod', 'Firebase', 'REST / GraphQL', 'SQLite / Hive', 'App Store / Play Store'],
    ecosystemTiers: [
      { id: 'tier-1', name: 'UI & Widget Tree', subtitle: 'Pixel-perfect 60fps native performance.', tech: ['Custom Paint', 'Material / Cupertino', 'Gestures'], detail: 'Hardware-accelerated Skia/Impeller rendering providing silky-smooth animations across all screen sizes.' },
      { id: 'tier-2', name: 'State Architecture', subtitle: 'Predictable reactive state with BLoC & Riverpod.', tech: ['flutter_bloc', 'Riverpod', 'Freezed'], detail: 'Decoupling presentation widgets from business logic, ensuring straightforward testability and maintenance.' },
      { id: 'tier-3', name: 'Offline & Local Cache', subtitle: 'Local SQLite databases & data sync.', tech: ['Hive', 'Isar', 'SQLite'], detail: 'Offline-first persistence that caches user actions and synchronizes with cloud servers when connectivity resumes.' },
      { id: 'tier-4', name: 'Native Bridges & Push', subtitle: 'Platform channels, push notifications & stores.', tech: ['MethodChannel', 'FCM', 'Fastlane'], detail: 'Connecting native iOS/Android camera, biometric auth, GPS sensors, and automating release pipelines.' }
    ],
    stackTabs: [
      { category: 'Mobile Stack', items: [{ name: 'Flutter & Dart', desc: 'Cross-platform compilation to ARM native machine code.' }, { name: 'BLoC & Riverpod', desc: 'Enterprise reactive state management frameworks.' }] }
    ],
    projectTypes: [
      { num: '01', title: 'Cross-Platform Consumer Apps', desc: 'Deploying feature-rich apps for iOS and Android with unified design and native speed.', tags: ['iOS', 'Android', 'Flutter'] }
    ],
    faqs: [
      { q: 'Does Flutter deliver native performance on both iOS and Android?', a: 'Yes. Flutter compiles directly into native ARM machine code without a JavaScript bridge, rendering with its own Impeller engine at consistent 60 to 120 FPS.' }
    ],
    related: ['react-developers', 'frontend-developers', 'qa-testers']
  },
  'ai-automation-developers': {
    slug: 'ai-automation-developers',
    title: 'AI & Automation Developers',
    h1: 'Hire AI Integration & Automation Engineers',
    badge: 'LLMs & Autonomous Workflows',
    shortDesc: 'LLM API integrations, autonomous agent workflows, n8n/Zapier orchestration, and intelligent business pipelines.',
    longDesc: 'Supercharge your operations with intelligent automation. Our engineers integrate OpenAI, Anthropic, and Gemini models, construct RAG search architectures, and build automated multi-system workflows using n8n and Python.',
    accent: '#00A6FF',
    bgTint: 'rgba(0, 166, 255, 0.12)',
    icon: 'Cpu',
    defaultTech: ['OpenAI / Anthropic APIs', 'LangChain / LlamaIndex', 'Python', 'n8n', 'FastAPI', 'Vector DBs (Pinecone/pgvector)', 'Zapier'],
    ecosystemTiers: [
      { id: 'tier-1', name: 'Trigger & Ingestion', subtitle: 'Webhooks, document uploads & email triggers.', tech: ['Webhooks', 'n8n', 'Zapier'], detail: 'Capturing business events across CRMs, inbox streams, forms, and cloud storage triggers in real time.' },
      { id: 'tier-2', name: 'Intelligent Processing', subtitle: 'LLM orchestration, prompt engineering & RAG.', tech: ['OpenAI', 'Claude', 'LangChain'], detail: 'Parsing unstructured text, classifying documents, extracting key entities, and querying proprietary vector knowledge bases.' },
      { id: 'tier-3', name: 'Vector Knowledge Store', subtitle: 'Embeddings & similarity search.', tech: ['pgvector', 'Pinecone', 'ChromaDB'], detail: 'Storing embedded company documentation for grounded retrieval-augmented generation without hallucinations.' },
      { id: 'tier-4', name: 'Action Dispatcher', subtitle: 'Database updates, notifications & alerts.', tech: ['Slack API', 'HubSpot API', 'Postgres'], detail: 'Executing downstream business actions across your CRM, updating relational tables, and notifying teams.' }
    ],
    stackTabs: [
      { category: 'AI & Orchestration', items: [{ name: 'LLM APIs & Prompt Tuning', desc: 'Structured JSON outputs, function calling, and token cost optimization.' }, { name: 'n8n Workflow Automation', desc: 'Self-hosted visual orchestration integrating hundreds of business APIs.' }, { name: 'RAG & Vector Search', desc: 'Grounded question-answering systems using company documentation.' }] }
    ],
    projectTypes: [
      { num: '01', title: 'Internal Knowledge Assistant (RAG)', desc: 'Custom AI assistant that indexes internal PDFs, Notion pages, and docs to provide grounded instant answers.', tags: ['RAG', 'Vector Search', 'LLMs'] },
      { num: '02', title: 'Multi-App Autonomous Workflow Automation', desc: 'Connecting lead capture, CRM qualification, quote generation, and Slack alerts automatically using n8n.', tags: ['n8n', 'Automation', 'CRM'] }
    ],
    faqs: [
      { q: 'How do you prevent AI models from hallucinating in business applications?', a: 'We employ Retrieval-Augmented Generation (RAG) with vector databases, strict system prompting, few-shot examples, and validation schemas like Pydantic.' }
    ],
    related: ['python-developers', 'backend-developers', 'full-stack-developers']
  },
  'ui-ux-designers': {
    slug: 'ui-ux-designers',
    title: 'UI/UX Designers',
    h1: 'Hire Product Designers & UI/UX Specialists',
    badge: 'Design Systems & Prototyping',
    shortDesc: 'Design system architects, Figma interactive prototypers, user research specialists, and conversion optimizers.',
    longDesc: 'Transform complex user requirements into elegant, intuitive digital products. Our product designers create complete design systems, high-fidelity interactive prototypes in Figma, and user journey maps that boost retention.',
    accent: '#EC4899',
    bgTint: 'rgba(236, 72, 153, 0.12)',
    icon: 'Figma',
    defaultTech: ['Figma', 'Design Systems', 'Interactive Prototyping', 'User Research', 'Wireframing', 'Responsive Design', 'Tokens'],
    ecosystemTiers: [
      { id: 'tier-1', name: 'Research & Wireframes', subtitle: 'User journeys, flowcharts & low-fi layouts.', tech: ['User Flows', 'Wireframing', 'Interviews'], detail: 'Mapping user journeys, discovering pain points, and validating information hierarchy before aesthetic design begins.' },
      { id: 'tier-2', name: 'Design System Tokens', subtitle: 'Colors, typography scales & atomic components.', tech: ['Figma Variables', 'Design Tokens', 'Auto Layout'], detail: 'Building scalable Figma component libraries with auto-layout, variable states, and developer handoff specs.' },
      { id: 'tier-3', name: 'High-Fidelity UI', subtitle: 'Pixel-perfect views, responsive modes & dark theme.', tech: ['UI Design', 'Micro-interactions', 'Iconography'], detail: 'Crafting polished, accessible interfaces with clear visual hierarchy, iconography, and responsive variants.' },
      { id: 'tier-4', name: 'Interactive Prototypes', subtitle: 'Clickable user testing prototypes in Figma.', tech: ['Figma Smart Animate', 'User Testing'], detail: 'Producing realistic prototypes for stakeholder sign-off and user testing prior to engineering sprint kickoff.' }
    ],
    stackTabs: [
      { category: 'Design Tools', items: [{ name: 'Figma & Variables', desc: 'Component variants, auto layout 5.0, design tokens, and shared libraries.' }, { name: 'Interactive Prototyping', desc: 'Smart animate transitions, micro-interactions, and usability testing flows.' }] }
    ],
    projectTypes: [
      { num: '01', title: 'SaaS Product Redesigns', desc: 'Revamping complex B2B applications with clean typography, modern cards, and intuitive navigation.', tags: ['SaaS UI', 'Redesign', 'Figma'] }
    ],
    faqs: [
      { q: 'How do your designers hand off work to frontend engineers?', a: 'Our designers structure Figma files using variables, named color tokens, auto-layout, and explicit state variants (hover, active, disabled) to ensure seamless engineering handoff.' }
    ],
    related: ['frontend-developers', 'react-developers', 'full-stack-developers']
  },
  'qa-testers': {
    slug: 'qa-testers',
    title: 'QA & Automation Testers',
    h1: 'Hire Dedicated QA & Software Testers',
    badge: 'Automated & Manual Quality Assurance',
    shortDesc: 'Automated end-to-end regression suites, Playwright/Cypress pipelines, API validation, and performance benchmarking.',
    longDesc: 'Prevent critical bugs from reaching production. Our QA engineers establish automated test suites, execute thorough manual exploratory testing, validate API contracts, and perform cross-browser regression testing.',
    accent: '#14B8A6',
    bgTint: 'rgba(20, 184, 166, 0.12)',
    icon: 'CheckCircle',
    defaultTech: ['Playwright', 'Cypress', 'Selenium', 'Postman', 'Jest / Vitest', 'GitHub Actions', 'Cross-Browser Testing'],
    ecosystemTiers: [
      { id: 'tier-1', name: 'Test Planning', subtitle: 'Test strategy, matrices & edge case maps.', tech: ['TestRail', 'Jira', 'Edge Case Mapping'], detail: 'Deconstructing user stories into concrete acceptance test criteria, positive and negative test paths.' },
      { id: 'tier-2', name: 'API Contract Tests', subtitle: 'Automated endpoint assertion & schema checks.', tech: ['Postman', 'REST', 'Newman'], detail: 'Validating HTTP response statuses, JSON schema compliance, authentication tokens, and rate limit boundaries.' },
      { id: 'tier-3', name: 'End-to-End Automation', subtitle: 'Headless browser automation with Playwright.', tech: ['Playwright', 'Cypress', 'TypeScript'], detail: 'Scripting reliable automated journeys covering checkout, login, form submission, and responsive layouts.' },
      { id: 'tier-4', name: 'CI/CD Regression Gate', subtitle: 'Automated test suites on pull requests.', tech: ['GitHub Actions', 'Docker', 'Allure Reports'], detail: 'Blocking faulty PRs from merging with fast, parallelized test execution and automated visual diff reports.' }
    ],
    stackTabs: [
      { category: 'Automation Tools', items: [{ name: 'Playwright', desc: 'Fast, parallel cross-browser end-to-end automation with trace viewer.' }, { name: 'Cypress', desc: 'Developer-friendly frontend component and integration testing.' }, { name: 'Postman & Newman', desc: 'Automated API collection execution and CI pipeline integration.' }] }
    ],
    projectTypes: [
      { num: '01', title: 'Automated Regression Suites', desc: 'Building comprehensive Playwright/Cypress suites that run automatically on every pull request.', tags: ['Playwright', 'CI/CD', 'Automation'] }
    ],
    faqs: [
      { q: 'Do your QA engineers write automated code or only manual tests?', a: 'Our QA engineers specialize in both: writing automated test scripts in TypeScript/JavaScript (Playwright, Cypress) and executing exploratory manual testing.' }
    ],
    related: ['full-stack-developers', 'frontend-developers', 'backend-developers']
  }
};
