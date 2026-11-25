import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { openWhatsApp } from '../data/brandConfig';
import '../styles/tidewellShowcase.css';

/**
 * Talent & Services Carousel Section
 * Smooth manual horizontal scroll & draggable card carousel for desktop and mobile.
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

export default function TalentShowcase({ onSelectRole, onExploreClick }) {
  const viewportRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const dragRef = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    hasMoved: false,
    suppressClick: false,
    rafId: null,
  });

  const stopMomentum = () => {
    if (dragRef.current.rafId !== null) {
      cancelAnimationFrame(dragRef.current.rafId);
      dragRef.current.rafId = null;
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const state = dragRef.current;
      const viewport = viewportRef.current;
      if (!state.active || !viewport) return;

      const dx = e.pageX - state.startX;
      if (!state.hasMoved && Math.abs(dx) > 5) {
        state.hasMoved = true;
      }

      if (state.hasMoved) {
        e.preventDefault();
        viewport.scrollLeft = state.startScrollLeft - dx;

        const now = performance.now();
        const dt = Math.max(1, now - state.lastTime);
        const instantVel = (e.pageX - state.lastX) / dt; // px per ms
        state.velocity = state.velocity * 0.65 + instantVel * 0.35;
        state.lastX = e.pageX;
        state.lastTime = now;
      }
    };

    const handleMouseUp = () => {
      const state = dragRef.current;
      const viewport = viewportRef.current;
      if (!state.active) return;

      state.active = false;
      setIsDragging(false);

      if (state.hasMoved) {
        state.suppressClick = true;
        setTimeout(() => {
          dragRef.current.suppressClick = false;
        }, 60);
      }

      // Smooth inertia glide on release
      if (viewport && state.hasMoved && Math.abs(state.velocity) > 0.08) {
        let vel = state.velocity * 16; // scale to px per ~16ms frame
        let lastFrame = performance.now();

        const step = (now) => {
          const dtScale = Math.min(2.5, (now - lastFrame) / 16.67);
          lastFrame = now;

          viewport.scrollLeft -= vel * dtScale;
          vel *= Math.pow(0.94, dtScale);

          const atEdge =
            viewport.scrollLeft <= 0 ||
            viewport.scrollLeft >= viewport.scrollWidth - viewport.clientWidth - 1;

          if (Math.abs(vel) > 0.25 && !atEdge) {
            dragRef.current.rafId = requestAnimationFrame(step);
          } else {
            dragRef.current.rafId = null;
          }
        };

        state.rafId = requestAnimationFrame(step);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('blur', handleMouseUp);

    return () => {
      stopMomentum();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('blur', handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e) => {
    if (e.button !== 0 || !viewportRef.current) return;
    stopMomentum();

    const state = dragRef.current;
    state.active = true;
    state.startX = e.pageX;
    state.startScrollLeft = viewportRef.current.scrollLeft;
    state.lastX = e.pageX;
    state.lastTime = performance.now();
    state.velocity = 0;
    state.hasMoved = false;
    state.suppressClick = false;
    setIsDragging(true);
  };

  const handleViewportClickCapture = (e) => {
    if (dragRef.current.suppressClick) {
      e.preventDefault();
      e.stopPropagation();
      dragRef.current.suppressClick = false;
    }
  };

  const handleSelect = (e, slug) => {
    e.stopPropagation();
    if (onSelectRole) {
      onSelectRole(slug);
    } else {
      const formattedRole = slug ? slug.replace(/-/g, ' ') : 'developers';
      openWhatsApp(`Hi Arora Tech Solutions, I am interested in hiring ${formattedRole}.`);
    }
  };

  const handleExploreCta = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onExploreClick) {
      onExploreClick();
    } else {
      openWhatsApp('Hi Arora Tech Solutions, I would like to explore hiring top pre-vetted developers.');
    }
  };

  return (
    <section className="tidewell-scroll-section" id="talent-showcase">
      <div className="tidewell-pinned-stage">
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
            onClick={handleExploreCta}
            aria-label="Connect on WhatsApp to explore collections"
          >
            <span>View All Collections</span>
            <span className="tidewell-cta-arrow">
              <ArrowUpRight size={15} strokeWidth={2.4} />
            </span>
          </button>
        </div>

        {/* 2. Smooth Manual Scroll & Draggable Horizontal Card Carousel */}
        <div
          ref={viewportRef}
          className={`tidewell-carousel-viewport${isDragging ? ' is-dragging' : ''}`}
          onMouseDown={handleMouseDown}
          onClickCapture={handleViewportClickCapture}
        >
          <div className="tidewell-carousel-track">
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
                    draggable={false}
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
