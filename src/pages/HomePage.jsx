import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, ArrowRight, ShieldCheck, CheckCircle, Clock, Layers, 
  Code, Terminal, Atom, Layout, Server, Globe, ShoppingBag, 
  Smartphone, Cpu, Figma 
} from 'lucide-react';
import { ROLES_DATA } from '../data/rolesData';
import Accordion from '../components/Accordion';
import EnquiryForm from '../components/EnquiryForm';

const ICON_MAP = {
  Layers, Layout, Server, Atom, Code, Terminal, Globe,
  ShoppingBag, Smartphone, Cpu, Figma, CheckCircle
};

const HOME_FAQS = [
  {
    q: 'How does Arora Tech Solutions differ from freelancer marketplaces?',
    a: 'We are a dedicated engineering solutions partner, not an open freelancer marketplace or bidding directory. Our software developers are pre-vetted technical professionals who integrate directly into your sprint rituals with dedicated accountability and non-disclosure guarantees.'
  },
  {
    q: 'How does your quote-based pricing model work?',
    a: 'Rather than publishing generic public rate cards, we assess your required seniority level, expected commitment (hourly, weekly sprints, or dedicated monthly retainers), and tech stack complexity to provide a transparent, fixed quote tier tailored to your budget.'
  },
  {
    q: 'How quickly can a developer onboard and start working?',
    a: 'Depending on your stack requirements and candidate availability, we typically introduce hand-picked engineer profiles within 24 to 48 hours, allowing kickoff within days rather than the months required for traditional recruiting.'
  },
  {
    q: 'Can we switch engagement models during a project?',
    a: 'Yes. Many clients start on an hourly engagement for an initial architecture audit or proof-of-concept, then seamlessly transition to weekly sprints or dedicated monthly retainers as roadmap scope expands.'
  },
  {
    q: 'What if a developer is not the right fit for our team?',
    a: 'We provide a satisfaction guarantee: if a developer does not meet your technical expectations during the initial onboarding period, we promptly assign a replacement engineer with zero downtime or duplicated onboarding fees.'
  },
  {
    q: 'Who owns the intellectual property and code written by your developers?',
    a: 'You retain 100% full legal ownership of all code, assets, documentation, and intellectual property developed during the engagement.'
  }
];

export default function HomePage() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Hero Section */}
      <section className="home-hero" aria-labelledby="home-hero-heading">
        <div className="container">
          <div className="home-hero-grid">
            <div className="home-hero-content">
              <div className="hero-pill">
                <Zap size={14} />
                <span>On-Demand Software Engineering</span>
              </div>
              <h1 id="home-hero-heading" className="home-hero-title">
                Your Next Developer Is <span className="title-highlight">Just One Step Away.</span>
              </h1>
              <p className="home-hero-sub">
                Scale your engineering capacity without hiring overhead. Arora Tech Solutions provides pre-vetted full stack, frontend, backend, mobile, and AI developers on flexible hourly, weekly, and monthly engagement models.
              </p>
              <div className="home-hero-actions">
                <button type="button" onClick={() => scrollTo('roles')} className="btn btn-primary btn-lg">
                  <span>Explore Developers</span>
                  <ArrowRight size={18} />
                </button>
                <button type="button" onClick={() => scrollTo('enquiry-section')} className="btn btn-outline-light btn-lg">
                  <span>Talk to Our Team</span>
                </button>
              </div>
              <div className="home-hero-metrics">
                <div className="metric-item">
                  <span className="metric-value">12</span>
                  <span className="metric-label">Specialized Disciplines</span>
                </div>
                <div className="metric-item">
                  <span className="metric-value">100%</span>
                  <span className="metric-label">Quote-Based Transparency</span>
                </div>
                <div className="metric-item">
                  <span className="metric-value">3</span>
                  <span className="metric-label">Flexible Hiring Models</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual: Floating Glass Stack */}
            <div className="hero-glass-stack" aria-hidden="true">
              <Link to="/hire/full-stack-developers" className="glass-card-item" style={{ '--card-accent': '#3B82F6', '--card-glow': 'rgba(59, 130, 246, 0.3)' }}>
                <div className="glass-card-left">
                  <div className="glass-card-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA' }}>
                    <Layers size={18} />
                  </div>
                  <div>
                    <div className="glass-card-title">Full Stack Developers</div>
                    <div className="glass-card-tag">React &bull; Node.js &bull; PostgreSQL</div>
                  </div>
                </div>
                <span className="glass-card-cta">Explore &rarr;</span>
              </Link>

              <Link to="/hire/react-developers" className="glass-card-item" style={{ '--card-accent': '#6366F1', '--card-glow': 'rgba(99, 102, 241, 0.3)' }}>
                <div className="glass-card-left">
                  <div className="glass-card-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818CF8' }}>
                    <Atom size={18} />
                  </div>
                  <div>
                    <div className="glass-card-title">React & Next.js Developers</div>
                    <div className="glass-card-tag">Next.js &bull; TypeScript &bull; Redux</div>
                  </div>
                </div>
                <span className="glass-card-cta">Explore &rarr;</span>
              </Link>

              <Link to="/hire/python-developers" className="glass-card-item" style={{ '--card-accent': '#F59E0B', '--card-glow': 'rgba(245, 158, 11, 0.3)' }}>
                <div className="glass-card-left">
                  <div className="glass-card-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24' }}>
                    <Code size={18} />
                  </div>
                  <div>
                    <div className="glass-card-title">Python Developers</div>
                    <div className="glass-card-tag">FastAPI &bull; Django &bull; Automation</div>
                  </div>
                </div>
                <span className="glass-card-cta">Explore &rarr;</span>
              </Link>

              <Link to="/hire/ai-automation-developers" className="glass-card-item" style={{ '--card-accent': '#D946EF', '--card-glow': 'rgba(217, 70, 239, 0.3)' }}>
                <div className="glass-card-left">
                  <div className="glass-card-icon" style={{ background: 'rgba(217, 70, 239, 0.15)', color: '#E879F9' }}>
                    <Cpu size={18} />
                  </div>
                  <div>
                    <div className="glass-card-title">AI & Automation Engineers</div>
                    <div className="glass-card-tag">LLM APIs &bull; n8n &bull; Autonomous Workflows</div>
                  </div>
                </div>
                <span className="glass-card-cta">Explore &rarr;</span>
              </Link>

              <Link to="/hire/flutter-developers" className="glass-card-item" style={{ '--card-accent': '#0284C7', '--card-glow': 'rgba(2, 132, 199, 0.3)' }}>
                <div className="glass-card-left">
                  <div className="glass-card-icon" style={{ background: 'rgba(2, 132, 199, 0.15)', color: '#38BDF8' }}>
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <div className="glass-card-title">Flutter Mobile Developers</div>
                    <div className="glass-card-tag">iOS & Android Single Codebase</div>
                  </div>
                </div>
                <span className="glass-card-cta">Explore &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Capability / Technology Strip */}
      <section className="tech-strip-section" aria-label="Core Technologies Strip">
        <div className="container">
          <div className="tech-strip-inner">
            <span className="tech-strip-label">Production Toolchains:</span>
            <div className="tech-badges-list">
              <span className="tech-badge-item"><Atom size={14} /> React / Next.js</span>
              <span className="tech-badge-item"><Code size={14} /> TypeScript</span>
              <span className="tech-badge-item"><Terminal size={14} /> Node.js</span>
              <span className="tech-badge-item"><Code size={14} /> Python</span>
              <span className="tech-badge-item"><Server size={14} /> PostgreSQL</span>
              <span className="tech-badge-item"><Layers size={14} /> Docker / AWS</span>
              <span className="tech-badge-item"><Smartphone size={14} /> Flutter</span>
              <span className="tech-badge-item"><ShoppingBag size={14} /> Shopify Liquid</span>
              <span className="tech-badge-item"><Cpu size={14} /> AI / LLMs</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 12 Developer Category Cards */}
      <section className="roles-section" id="roles" aria-labelledby="roles-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">12 Specialized Disciplines</span>
            <h2 id="roles-heading" class="section-title">Explore Specialized Engineering Roles</h2>
            <p className="section-sub">
              Every developer is thoroughly vetted for production-ready architecture, clean code standards, and agile communication.
            </p>
          </div>

          <div className="roles-catalog-grid">
            {Object.values(ROLES_DATA).map(role => {
              const IconComp = ICON_MAP[role.icon] || Code;
              return (
                <Link 
                  key={role.slug}
                  to={`/hire/${role.slug}`}
                  className="role-catalog-card"
                  style={{ '--card-accent': role.accent, '--card-tint': role.bgTint }}
                >
                  <div className="role-card-top">
                    <div className="role-card-icon-wrap">
                      <IconComp size={22} />
                    </div>
                    <span className="role-card-action">Explore role <ArrowRight size={13} /></span>
                  </div>
                  <h3 className="role-card-title">{role.title}</h3>
                  <p className="role-card-desc">{role.shortDesc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Why Arora */}
      <section className="why-section" id="why-arora" aria-labelledby="why-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Why Arora Tech Solutions</span>
            <h2 id="why-heading" className="section-title">Built for Engineering Leaders Who Value Predictability</h2>
            <p className="section-sub">
              We eliminate the friction, unvetted risks, and inflated margins typical of traditional tech recruiting and marketplace platforms.
            </p>
          </div>

          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon-wrap"><ShieldCheck size={24} /></div>
              <h3 className="why-title">Quote-Based Precision</h3>
              <p className="why-desc">No generic rate cards or hidden markups. We assess your exact technology scope and deliver transparent pricing tailored to your roadmap.</p>
            </div>

            <div className="why-card">
              <div className="why-icon-wrap"><CheckCircle size={24} /></div>
              <h3 className="why-title">Rigorous Multi-Stage Vetting</h3>
              <p className="why-desc">Every engineer passes deep architectural evaluations, live code refactoring exercises, and communication reviews before joining our roster.</p>
            </div>

            <div className="why-card">
              <div className="why-icon-wrap"><Clock size={24} /></div>
              <h3 className="why-title">Seamless Timezone Alignment</h3>
              <p className="why-desc">Work with developers providing guaranteed 4 to 8 hours daily overlap with your internal leads across North American, European, or APAC hours.</p>
            </div>

            <div className="why-card">
              <div className="why-icon-wrap"><Layers size={24} /></div>
              <h3 className="why-title">Zero Freelancer Risk</h3>
              <p className="why-desc">Eliminate disappearing contractors. Our talent works with structured accountability, clear progress reporting, and consistent code reviews.</p>
            </div>

            <div className="why-card">
              <div className="why-icon-wrap"><Code size={24} /></div>
              <h3 className="why-title">100% IP & Code Ownership</h3>
              <p className="why-desc">All source code, git commits, documentation, and digital assets developed belong entirely to your company under strict confidentiality.</p>
            </div>

            <div className="why-card">
              <div className="why-icon-wrap"><Zap size={24} /></div>
              <h3 className="why-title">Agile Scalability</h3>
              <p className="why-desc">Ramp up developer capacity for critical feature pushes, and adjust engagement intensity without lengthy lock-in commitments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Hiring Models */}
      <section className="engagement-section" id="hiring-models" style={{ padding: 'var(--space-20) 0', background: 'var(--brand-surface)' }} aria-labelledby="hiring-models-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Engagement Models</span>
            <h2 id="hiring-models-heading" className="section-title">Flexible Developer Hiring Models</h2>
            <p className="section-sub">Select the commitment structure that best fits your product roadmap and engineering budget.</p>
          </div>

          <div className="engagement-models-grid">
            {/* Hourly */}
            <div className="model-card">
              <div className="model-header">
                <h3 className="model-title">Hourly</h3>
                <div className="model-pace">Ad-hoc & Flexible Pace</div>
              </div>
              <div className="model-best-for">
                <strong>Best for:</strong> Code audits, specific feature additions, architecture consulting, or urgent bug remediation.
              </div>
              <ul className="model-features">
                <li className="model-feature-item"><CheckCircle size={14} color="#10B981" /> <span>Dedicated time tracking with transparent task logs</span></li>
                <li className="model-feature-item"><CheckCircle size={14} color="#10B981" /> <span>Scale up or pause hours with minimal notice</span></li>
                <li className="model-feature-item"><CheckCircle size={14} color="#10B981" /> <span>Direct Slack / Teams communication during active sprints</span></li>
              </ul>
              <button type="button" onClick={() => scrollTo('enquiry-section')} className="btn btn-secondary btn-block">
                Request Hourly Quote
              </button>
            </div>

            {/* Weekly */}
            <div className="model-card">
              <div className="model-header">
                <h3 className="model-title">Weekly</h3>
                <div className="model-pace">Sprint-Driven Delivery</div>
              </div>
              <div className="model-best-for">
                <strong>Best for:</strong> Defined milestones, API version launches, refactoring sprints, or scoped module builds.
              </div>
              <ul className="model-features">
                <li className="model-feature-item"><CheckCircle size={14} color="#10B981" /> <span>Pre-agreed sprint backlog and delivery velocity</span></li>
                <li className="model-feature-item"><CheckCircle size={14} color="#10B981" /> <span>Full sprint participation (standups, reviews, demos)</span></li>
                <li className="model-feature-item"><CheckCircle size={14} color="#10B981" /> <span>Predictable weekly quote billing structure</span></li>
              </ul>
              <button type="button" onClick={() => scrollTo('enquiry-section')} className="btn btn-secondary btn-block">
                Request Weekly Quote
              </button>
            </div>

            {/* Monthly (Featured) */}
            <div className="model-card is-featured">
              <span className="model-featured-badge">Most Popular</span>
              <div className="model-header">
                <h3 className="model-title">Monthly</h3>
                <div className="model-pace">Full-Time Dedicated Talent</div>
              </div>
              <div className="model-best-for">
                <strong>Best for:</strong> Long-term product roadmaps, ongoing feature iteration, and embedding a developer as a true team member.
              </div>
              <ul className="model-features">
                <li className="model-feature-item"><CheckCircle size={14} color="#10B981" /> <span>160 hours / month 100% dedicated to your codebase</span></li>
                <li className="model-feature-item"><CheckCircle size={14} color="#10B981" /> <span>Direct daily timezone overlap with your internal leads</span></li>
                <li className="model-feature-item"><CheckCircle size={14} color="#10B981" /> <span>Free candidate replacement guarantee if scope changes</span></li>
              </ul>
              <button type="button" onClick={() => scrollTo('enquiry-section')} className="btn btn-primary btn-block">
                Request Monthly Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. How It Works */}
      <section className="process-section" id="how-it-works" style={{ padding: 'var(--space-20) 0', background: '#FFFFFF' }} aria-labelledby="process-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Matching Process</span>
            <h2 id="process-heading" className="section-title">How It Works: 5 Steps to Your Next Engineer</h2>
            <p className="section-sub">A streamlined hiring pathway designed to get capable developers writing code in your repository quickly.</p>
          </div>

          <div className="process-grid">
            <div className="process-card">
              <div className="process-num">01</div>
              <h3 className="process-title">Requirement</h3>
              <p className="process-desc">Submit your project details, required tech stack, and ideal developer seniority.</p>
            </div>
            <div className="process-card">
              <div className="process-num">02</div>
              <h3 className="process-title">Role Selection</h3>
              <p className="process-desc">Choose from our 12 engineering disciplines and specify your engagement model.</p>
            </div>
            <div className="process-card">
              <div className="process-num">03</div>
              <h3 className="process-title">Discussion & Matching</h3>
              <p className="process-desc">Our technical leads review your specs and present hand-matched candidate profiles within 24 hours.</p>
            </div>
            <div className="process-card">
              <div className="process-num">04</div>
              <h3 className="process-title">Confirmation</h3>
              <p className="process-desc">Interview candidates directly, review sample code, and confirm terms with a clear quote.</p>
            </div>
            <div className="process-card">
              <div className="process-num">05</div>
              <h3 className="process-title">Start</h3>
              <p className="process-desc">Onboard your engineer into your Slack, Jira, and GitHub repositories to begin sprinting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Industries */}
      <section className="industries-section" id="industries" aria-labelledby="industries-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Industry Expertise</span>
            <h2 id="industries-heading" className="section-title">Domain Experience Across Critical Sectors</h2>
            <p className="section-sub">Our developers bring familiarity with industry-specific compliance, transaction patterns, and user expectations.</p>
          </div>

          <div className="industries-grid">
            <div className="industry-card">
              <h3 className="industry-title">FinTech & Payments</h3>
              <p className="industry-desc">PCI-DSS compliance awareness, ledger systems, Stripe/Plaid integrations, and fraud-resistant architectures.</p>
            </div>
            <div className="industry-card">
              <h3 className="industry-title">HealthTech & Telehealth</h3>
              <p className="industry-desc">HIPAA compliance adherence, encrypted patient data stores, video consultations, and EHR/FHIR interoperability.</p>
            </div>
            <div className="industry-card">
              <h3 className="industry-title">E-Commerce & Retail</h3>
              <p className="industry-desc">High-volume Shopify Plus storefronts, headless Hydrogen builds, custom inventory sync, and checkout optimizations.</p>
            </div>
            <div className="industry-card">
              <h3 className="industry-title">SaaS & B2B Platforms</h3>
              <p className="industry-desc">Multi-tenant architecture, role-based access permissions, subscription lifecycle billing, and analytics dashboards.</p>
            </div>
            <div className="industry-card">
              <h3 className="industry-title">Logistics & Supply Chain</h3>
              <p className="industry-desc">Real-time GPS tracking endpoints, warehouse management portals, dispatch optimization, and inventory APIs.</p>
            </div>
            <div className="industry-card">
              <h3 className="industry-title">EdTech & Digital Media</h3>
              <p className="industry-desc">Interactive learning management systems (LMS), video streaming integration, gamified quizzes, and student portals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ Accordion */}
      <section className="faq-section" id="faq" style={{ padding: 'var(--space-20) 0', background: '#FFFFFF' }} aria-labelledby="faq-home-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Got Questions?</span>
            <h2 id="faq-home-heading" className="section-title">Frequently Asked Questions</h2>
            <p className="section-sub">Everything you need to know about partnering with Arora Tech Solutions for developer staff augmentation.</p>
          </div>

          <Accordion items={HOME_FAQS} />
        </div>
      </section>

      {/* 9. Final CTA Band */}
      <section className="cta-band" aria-labelledby="cta-band-heading">
        <div className="container">
          <div className="cta-band-inner">
            <h2 id="cta-band-heading" className="cta-band-title">Accelerate Your Technical Roadmap Today</h2>
            <p className="cta-band-sub">
              Connect with our solutions desk to discuss your team requirements and receive custom quote tiers within one business day.
            </p>
            <div className="cta-band-actions">
              <button type="button" onClick={() => scrollTo('enquiry-section')} className="btn btn-primary btn-lg">
                <span>Request Developer Quote</span>
                <ArrowRight size={18} />
              </button>
              <Link to="/contact" className="btn btn-outline-light btn-lg">
                <span>General Inquiries</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Universal Enquiry Form */}
      <EnquiryForm />
    </>
  );
}
