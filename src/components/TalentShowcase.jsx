import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';
import '../styles/tidewellShowcase.css';

/**
 * Talent & Services Carousel Section
 * Clean horizontal card carousel driven directly by vertical page scroll (no animations).
 */

const TALENT_CARDS = [
  {
    id: 'frontend',
    slug: 'frontend-developers',
    line1: 'Frontend',
    line2: 'Developer',
    desc: 'Modern web applications with React, Next.js & responsive interactive interfaces.',
    posterImage: '/assets/images/Arora_Tech_12_Service_Poster_Images_3x4/ToWebP%20(33)/front-end.webp'
  },
  {
    id: 'ui-ux',
    slug: 'ui-ux-designers',
    line1: 'UI/UX',
    line2: 'Designer',
    desc: 'Human-centered designs, interactive prototypes & polished design systems.',
    posterImage: '/assets/images/Arora_Tech_12_Service_Poster_Images_3x4/ToWebP%20(33)/107af775-85dc-4726-a198-dbad8d5f6128.webp'
  },
  {
    id: 'backend',
    slug: 'backend-developers',
    line1: 'Backend',
    line2: 'Developer',
    desc: 'Scalable distributed architectures, high-performance APIs & cloud databases.',
    posterImage: '/assets/images/Arora_Tech_12_Service_Poster_Images_3x4/ToWebP%20(33)/Backend-develper.webp'
  },
  {
    id: 'ai-automation',
    slug: 'ai-automation-developers',
    line1: 'AI &',
    line2: 'Automation',
    desc: 'Autonomous AI agents, custom LLM workflows & intelligent enterprise pipelines.',
    posterImage: '/assets/images/Arora_Tech_12_Service_Poster_Images_3x4/ToWebP%20(33)/Ai%20%26%20automation.webp'
  },
  {
    id: 'react',
    slug: 'react-developers',
    line1: 'React',
    line2: 'Developer',
    desc: 'Robust component architecture, state management & responsive interfaces.',
    posterImage: '/assets/images/Arora_Tech_12_Service_Poster_Images_3x4/ToWebP%20(33)/react.webp'
  },
  {
    id: 'flutter',
    slug: 'flutter-developers',
    line1: 'Flutter &',
    line2: 'Mobile App',
    desc: 'High-performance iOS & Android cross-platform mobile apps with native feel.',
    posterImage: '/assets/images/Arora_Tech_12_Service_Poster_Images_3x4/ToWebP%20(33)/flutterrr.webp'
  },
  {
    id: 'python',
    slug: 'python-developers',
    line1: 'Python',
    line2: 'Developer',
    desc: 'Data engineering, FastAPI backends, machine learning & automation scripts.',
    posterImage: '/assets/images/Arora_Tech_12_Service_Poster_Images_3x4/ToWebP%20(33)/python.webp'
  },
  {
    id: 'shopify',
    slug: 'shopify-developers',
    line1: 'Shopify',
    line2: 'Developer',
    desc: 'Custom storefront themes, high-converting checkout flows & Shopify Plus apps.',
    posterImage: '/assets/images/Arora_Tech_12_Service_Poster_Images_3x4/ToWebP%20(33)/shopifyy.webp'
  },
  {
    id: 'php',
    slug: 'php-developers',
    line1: 'PHP &',
    line2: 'Laravel',
    desc: 'Enterprise web applications, modular Laravel architectures & secure REST APIs.',
    posterImage: '/assets/images/Arora_Tech_12_Service_Poster_Images_3x4/ToWebP%20(33)/php.webp'
  },
  {
    id: 'wordpress',
    slug: 'wordpress-developers',
    line1: 'WordPress',
    line2: 'Developer',
    desc: 'Bespoke high-speed themes, custom plugin development & headless CMS setups.',
    posterImage: '/assets/images/Arora_Tech_12_Service_Poster_Images_3x4/ToWebP%20(33)/wordpress.webp'
  },
  {
    id: 'qa-testing',
    slug: 'qa-testing-engineers',
    line1: 'QA &',
    line2: 'Testing',
    desc: 'Automated test suites, cross-browser regression & end-to-end security audits.',
    posterImage: '/assets/images/Arora_Tech_12_Service_Poster_Images_3x4/ToWebP%20(33)/QA%20Testing.webp'
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    line1: 'Digital',
    line2: 'Marketing',
    desc: 'Data-driven SEO strategies, growth marketing & high-ROI conversion campaigns.',
    posterImage: '/assets/images/Arora_Tech_12_Service_Poster_Images_3x4/ToWebP%20(33)/Digital%20marketing.webp'
  }
];

export default function TalentShowcase({ onSelectRole }) {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);

  const [scrollX, setScrollX] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(null);

  const updateMetricsAndScroll = useCallback(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!container || !stage || !track) return;

    const overflowX = Math.max(0, track.scrollWidth - stage.clientWidth);
    setSectionHeight(window.innerHeight + overflowX);

    const rect = container.getBoundingClientRect();
    const traveled = Math.max(0, Math.min(overflowX, -rect.top));
    setScrollX(traveled);
  }, []);

  useEffect(() => {
    updateMetricsAndScroll();

    const ro = new ResizeObserver(updateMetricsAndScroll);
    if (stageRef.current) ro.observe(stageRef.current);
    if (trackRef.current) ro.observe(trackRef.current);

    window.addEventListener('scroll', updateMetricsAndScroll, { passive: true });
    window.addEventListener('resize', updateMetricsAndScroll);

    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', updateMetricsAndScroll);
      window.removeEventListener('resize', updateMetricsAndScroll);
    };
  }, [updateMetricsAndScroll]);

  const handleSelect = (e, slug) => {
    e.stopPropagation();
    if (onSelectRole) {
      onSelectRole(slug);
    } else {
      const el = document.getElementById('enquiry-section') || document.getElementById('quote');
      if (el) el.scrollIntoView();
    }
  };

  const handleScrollToNextSection = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const el = document.getElementById('process-section');
    if (el) {
      el.scrollIntoView();
    }
  };

  return (
    <section
      ref={containerRef}
      className="tidewell-scroll-section"
      id="talent-showcase"
      style={sectionHeight ? { height: `${sectionHeight}px` } : undefined}
    >
      <div ref={stageRef} className="tidewell-pinned-stage">
        {/* 1. Header Block */}
        <div className="tidewell-process-block">
          <div className="tidewell-kicker-pill">
            <span className="tidewell-kicker-dot" />
            <span>Top 1% Pre-Vetted Talent &bull; 48-Hour Matching</span>
          </div>

          <h2 className="tidewell-process-headline">
            <span className="tidewell-word-muted">From</span> requirement{' '}
            <span className="tidewell-process-chip" title="Arora Engineering Preview">
              <img
                src="/assets/images/Arora_Tech_12_Service_Poster_Images_3x4/ToWebP%20(33)/front-end.webp"
                alt="Artwork chip"
              />
            </span>{' '}
            <span className="tidewell-word-muted">to</span> delivery, <br />
            built <span className="tidewell-word-muted">through</span> real process
          </h2>

          <p className="tidewell-process-subline">
            Turning technical concepts into working digital products with pre-vetted engineers matched and deployed to your stack in 48 hours.
          </p>

          <button
            type="button"
            className="tidewell-process-cta-btn"
            onClick={handleScrollToNextSection}
            aria-label="View all collections and continue to next section"
          >
            <span>View All Collections</span>
            <span className="tidewell-cta-arrow">
              <ArrowUpRight size={15} strokeWidth={2.4} />
            </span>
          </button>
        </div>

        {/* 2. Scroll-Driven Horizontal Card Carousel */}
        <div className="tidewell-carousel-viewport">
          <div
            ref={trackRef}
            className="tidewell-carousel-track"
            style={{ transform: `translate3d(${-scrollX}px, 0, 0)` }}
          >
            {TALENT_CARDS.map((card) => (
              <div
                key={card.id}
                className="tidewell-card"
                onClick={(e) => handleSelect(e, card.slug)}
                tabIndex={0}
                role="button"
                aria-label={`${card.line1} ${card.line2} service card`}
              >
                <div className="tidewell-card-bg-wrap">
                  <img
                    src={card.posterImage}
                    alt={`${card.line1} ${card.line2}`}
                    className="tidewell-card-img"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                <div className="tidewell-card-blur-mask" />
                <div className="tidewell-card-sheen" aria-hidden="true" />

                <div className="tidewell-card-interior">
                  <div className="tidewell-card-heading-wrap">
                    <h3 className="tidewell-card-title">
                      <span className="tidewell-card-line tidewell-card-line-1">{card.line1}</span>
                      <span className="tidewell-card-line tidewell-card-line-2">{card.line2}</span>
                    </h3>
                    {card.desc && (
                      <p className="tidewell-card-desc">{card.desc}</p>
                    )}
                  </div>

                  <div className="tidewell-card-btn-wrap">
                    <button
                      type="button"
                      className="tidewell-card-action-btn"
                      onClick={(e) => handleSelect(e, card.slug)}
                      aria-label={`Get started with ${card.line1} ${card.line2}`}
                    >
                      <span className="tidewell-card-btn-text">Get Started</span>
                      <span className="tidewell-card-arrow-circle">
                        <ArrowUpRight size={13} strokeWidth={2.6} />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
