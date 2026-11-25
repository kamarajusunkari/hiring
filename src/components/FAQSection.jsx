import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, MessageSquare, ArrowUpRight } from 'lucide-react';
import { openWhatsApp } from '../data/brandConfig';
import '../styles/faqSection.css';

/**
 * FAQ Section matching user requirements:
 * - 100% Pure Crisp White Background (#FFFFFF)
 * - 1400px Max-Width Layout
 * - Two Side-by-Side Compact Accordion Columns
 * - Tactile DROP animation & gentle ambient floating for sticker question pills
 * - Single "All Questions" indicator
 * - Sleek reduced-height accordion cards
 * - "You asked. We answered." editorial headline
 * - Mini consultation CTA
 */

const FAQ_ITEMS = [
  {
    id: 'vetting',
    q: 'How are Arora developers vetted and selected?',
    a: 'Every engineer undergoes a rigorous 4-tier screening process: (1) Computer science fundamentals & architectural evaluation, (2) Live pair-programming and refactoring assessment, (3) Real-world system design simulation, and (4) Communication & cultural alignment interview. Only the top 1% of applicants pass to our active talent roster.'
  },
  {
    id: 'speed',
    q: 'How fast can we onboard and start working with a developer?',
    a: 'Because our developers are pre-vetted and actively maintained in our talent network, we typically match you with 2–3 pre-screened candidate profiles within 24 to 48 hours. Once you conduct a final interview and approve your engineer, they can commence sprint onboarding within 2 to 3 business days.'
  },
  {
    id: 'billing',
    q: 'How does quote-based billing work without public fixed rates?',
    a: 'Every software engagement has distinct architectural requirements. We provide transparent, custom quotes tailored to developer seniority (Mid, Senior, Lead/Staff), technology complexity, and your chosen engagement model (hourly bucket, weekly agile sprint, or dedicated full-time monthly retainer). There are zero hidden setup fees or surprise surcharges.'
  },
  {
    id: 'scale',
    q: 'Can I scale the team up or down on demand?',
    a: 'Yes, full elasticity is built into our engagement models. You can seamlessly add specialized developers (e.g., adding an AI engineer or QA automation tester during crunch releases) or ramp down capacity as milestone phases conclude with just 14 days prior notice.'
  },
  {
    id: 'ip-nda',
    q: 'Who owns the intellectual property and source code?',
    a: 'You retain 100% full intellectual property ownership. Every line of source code, technical documentation, architectural diagram, and Git repository created during your engagement belongs exclusively to your company. All engineers sign strict bilateral non-disclosure agreements (NDAs) prior to client introductions.'
  },
  {
    id: 'timezone',
    q: 'How do your developers handle timezone differences?',
    a: 'We guarantee a minimum of 4 to 8 hours of direct daily working overlap with your core time zone, whether your team is based in North America (EST/PST), the United Kingdom (GMT), Europe (CET), the GCC (GST), or Asia-Pacific. Daily standups, Slack syncs, and PR reviews occur smoothly during your business hours.'
  },
  {
    id: 'trial',
    q: 'What happens if a developer is not the right fit for our project?',
    a: 'We offer a risk-free 2-week trial period. If you feel the matched specialist does not meet your technical expectations or workflow velocity, we will replace them immediately at zero additional recruitment cost, or refund the unused balance with no questions asked.'
  },
  {
    id: 'tooling',
    q: 'Can Arora developers work within our existing tools and CI/CD pipelines?',
    a: 'Yes. Our engineers integrate directly as seamless extensions of your internal team. They use your Slack or Microsoft Teams, Jira/Linear boards, GitHub/GitLab repositories, Docker environments, and cloud deployment pipelines (AWS, GCP, Azure) from Day 1.'
  },
  {
    id: 'communication',
    q: 'How do you evaluate English fluency and remote collaboration skills?',
    a: 'All developers are tested for CEFR C1/C2 advanced professional English proficiency. They participate comfortably in sprint planning, lead technical retrospectives, write concise documentation, and communicate proactively in daily asynchronous and synchronous workflows.'
  },
  {
    id: 'stacks',
    q: 'What tech stacks and frameworks does Arora support?',
    a: 'We cover end-to-end modern stacks: Frontend (React, Next.js, Vue, Angular, TypeScript), Backend (Node.js, Python, Go, Java, PHP/Laravel), Mobile (Flutter, React Native, Swift, Kotlin), Cloud & DevOps (AWS, Docker, Kubernetes, Terraform), and AI/ML (LLM integration, PyTorch, LangChain, RAG pipelines).'
  },
  {
    id: 'convert',
    q: 'Can we convert a contract developer to full-time internal staff?',
    a: 'Yes. We support hire-to-direct-hire contract-to-hire pathways after an agreed engagement duration. This gives you the flexibility to thoroughly evaluate work quality, code architecture, and cultural fit before extending a permanent employment offer.'
  },
  {
    id: 'security',
    q: 'What workstation security and data privacy measures are enforced?',
    a: 'Our developers operate on company-approved encrypted workstations with hardware-level BitLocker/FileVault, mandatory 2FA on all repos, and VPN access when required. They strictly adhere to SOC 2 Type II, ISO 27001, HIPAA, and GDPR best practices without retaining any client data on local drives.'
  }
];

const FLOATING_PILLS = [
  { id: 'scale', label: 'Can I scale the team up or down on demand?', cls: 'pill-1' },
  { id: 'speed', label: 'How fast can we start?', cls: 'pill-2' },
  { id: 'vetting', label: 'How are Arora developers vetted?', cls: 'pill-3' },
  { id: 'ip-nda', label: 'What about IP ownership & NDA?', cls: 'pill-4' },
  { id: 'billing', label: 'How does quote-based billing work?', cls: 'pill-5' },
  { id: 'trial', label: "What if a developer isn't the right fit?", cls: 'pill-6' },
  { id: 'timezone', label: 'How do you handle timezone overlap?', cls: 'pill-7' },
  { id: 'tooling', label: 'Do you integrate with our CI/CD & Slack?', cls: 'pill-8' },
  { id: 'stacks', label: 'Which tech stacks do you support?', cls: 'pill-9' },
  { id: 'convert', label: 'Can we hire contract-to-full-time?', cls: 'pill-10' }
];

export default function FAQSection({ onAskQuestionClick }) {
  // All accordions start compact/closed by default
  const [openIds, setOpenIds] = useState([]);
  const [highlightedId, setHighlightedId] = useState(null);
  const [isDropped, setIsDropped] = useState(false);
  const stageRef = useRef(null);
  const itemRefs = useRef({});

  useEffect(() => {
    // Drop animation triggered on scroll intersection or safe mount timeout
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsDropped(true);
        }
      },
      { threshold: 0.15 }
    );

    if (stageRef.current) {
      observer.observe(stageRef.current);
    }

    const timer = setTimeout(() => setIsDropped(true), 200);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const toggleAccordion = (id) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handlePillClick = (targetId) => {
    // 1. Ensure target item is open
    setOpenIds(prev => prev.includes(targetId) ? prev : [...prev, targetId]);

    // 2. Highlight and smoothly scroll into view
    setHighlightedId(targetId);
    setTimeout(() => {
      const el = itemRefs.current[targetId];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);

    setTimeout(() => {
      setHighlightedId(null);
    }, 2000);
  };

  // Split all 12 items evenly into two side-by-side columns (6 on left, 6 on right)
  const col1 = [];
  const col2 = [];
  FAQ_ITEMS.forEach((item, index) => {
    if (index % 2 === 0) {
      col1.push(item);
    } else {
      col2.push(item);
    }
  });

  const renderCard = (item) => {
    const isOpen = openIds.includes(item.id);
    const isHighlighted = highlightedId === item.id;

    return (
      <div
        key={item.id}
        ref={el => itemRefs.current[item.id] = el}
        className={`faq-accordion-card ${isOpen ? 'is-open' : ''} ${isHighlighted ? 'is-highlighted' : ''}`}
      >
        <button
          type="button"
          className="faq-card-button"
          onClick={() => toggleAccordion(item.id)}
          aria-expanded={isOpen}
        >
          <span className="faq-card-question">{item.q}</span>
          <div className="faq-card-icon-badge">
            <ChevronDown size={16} strokeWidth={2.4} />
          </div>
        </button>

        <div className={`faq-card-body-wrapper ${isOpen ? 'is-open' : ''}`}>
          <div className="faq-card-body-inner">
            <p className="faq-card-answer-text">{item.a}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      className="faq-section"
      id="faq"
      style={{
        position: 'relative',
        zIndex: 20,
        backgroundColor: '#FFFFFF',
        background: '#FFFFFF',
        color: '#0F172A'
      }}
    >
      {/* ====================================================================
          1. FULL-SCREEN HERO STAGE (100% Width & 100vh Height)
          - Full-screen continuous falling question pills
          - Centered editorial headline: "You asked. We answered."
          - Category Eyebrow: ALL THINGS ARORA TECH HIRING
          ==================================================================== */}
      <div className="faq-hero-stage" ref={stageRef}>
        <div className="faq-pills-field" aria-label="Featured FAQ questions">
          {FLOATING_PILLS.map((pill) => (
            <button
              key={pill.id}
              type="button"
              className={`faq-sticker-pill ${pill.cls} ${isDropped ? 'dropped' : ''}`}
              onClick={() => handlePillClick(pill.id)}
              title="Click to jump to this question"
            >
              {pill.label}
            </button>
          ))}
        </div>

        <div className="faq-hero-center">
          <h2 className="faq-hero-title">
            <span className="faq-word-italic">You</span> asked.<br />
            <span className="faq-word-italic">We</span> answered.
          </h2>

          <div className="faq-hero-tagline">
            ALL THINGS ARORA TECH HIRING
          </div>
        </div>
      </div>

      <div className="faq-container">

        {/* ====================================================================
            2. SINGLE "ALL QUESTIONS" PILL
            ==================================================================== */}
        <div className="faq-category-nav">
          <span className="faq-category-btn">All Questions</span>
        </div>

        {/* ====================================================================
            3. TWO COMPACT SIDE-BY-SIDE ACCORDION COLUMNS (1400px Grid)
            ==================================================================== */}
        <div className="faq-accordion-grid" role="region" aria-label="FAQ Accordion">
          {/* Column 1 */}
          <div className="faq-accordion-col">
            {col1.map(renderCard)}
          </div>

          {/* Column 2 */}
          <div className="faq-accordion-col">
            {col2.map(renderCard)}
          </div>
        </div>

        {/* ====================================================================
            4. BOTTOM COMPACT CONSULTATION CARD (1400px Wide)
            ==================================================================== */}
        <div className="faq-bottom-cta">
          <div className="faq-cta-text">
            <h4>Have a specific engineering or staffing question?</h4>
            <p>Talk directly with an Arora Technical Hiring Director. We review your tech requirements and recommend candidate profiles in 24 hours.</p>
          </div>
          <button
            type="button"
            className="faq-cta-btn"
            onClick={() => {
              if (onAskQuestionClick) {
                onAskQuestionClick();
              } else {
                openWhatsApp('Hi Arora Tech Solutions, I would like to speak with your technical hiring team.');
              }
            }}
          >
            <MessageSquare size={15} />
            <span>Speak with Our Team</span>
            <ArrowUpRight size={15} />
          </button>
        </div>

      </div>
    </section>
  );
}
