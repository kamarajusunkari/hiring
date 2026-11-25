import React, { useEffect, useRef, useState, useCallback } from 'react';
import { openWhatsApp } from '../data/brandConfig';
import '../styles/processSection.css';

const ASSETS = {
  portrait: 'https://framerusercontent.com/images/7nIpqB1Y0QYgLe70j5NmdtK5Rk.png',
  logo: 'https://framerusercontent.com/images/Fr3jIzrNgNkSo8ZgFFTkpS308.png',
  quote: 'https://framerusercontent.com/images/DmIPflrtvNHr7mnr6k3K5Ayn8w.png',
  star: 'https://framerusercontent.com/images/yi0dRg7NDCZUtTbPxCa115nMU5M.png',
  heroHands: 'https://framerusercontent.com/images/G9ZdWZubRnpc37d5d7uUzqaBqiw.png',
  avatars: 'https://framerusercontent.com/images/l3LBaTwnoXLWZd6axR7m3Q9iWeU.png',
  arrow: 'https://framerusercontent.com/images/zBmfi9e2hdwkTHpcMqbS61FIc3c.png',
  preacher: 'https://framerusercontent.com/images/Q7jLZsObox26xQCiWPAVYWzTsYs.png',
  play: 'https://framerusercontent.com/images/3M0CPgfOsuyRxuRs37KkTOTrUM.png'
};

const MENU_ITEMS = [
  { label: '01. Discovery', target: 'step-1' },
  { label: '02. Matching', target: 'step-2' },
  { label: '03. Interviews', target: 'step-3' },
  { label: '04. Onboarding', target: 'step-4' },
  { label: 'FAQ', target: 'faq' }
];

function TypewriterText({ text, delay = 0, speed = 22, active = true }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setCount(text.length);
      return;
    }
    if (!active) return;

    setCount(0);
    let intervalId;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setCount((prev) => {
          if (prev >= text.length) {
            clearInterval(intervalId);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, delay, speed, active]);

  return <>{text.slice(0, count)}</>;
}

function PhoneHeader({ onOpenMenu }) {
  return (
    <div className="phone-header">
      <div className="phone-header-brand">
        <img src={ASSETS.logo} alt="Arora Hiring Process" className="phone-header-logo" />
        <span className="phone-header-title">Arora Process</span>
      </div>
      <button
        type="button"
        className="phone-hamburger-btn"
        onClick={onOpenMenu}
        aria-label="Open process menu"
      >
        <span className="phone-ham-line long" />
        <span className="phone-ham-line long" />
        <span className="phone-ham-line short" />
      </button>
    </div>
  );
}

function PhoneMenuOverlay({ onClose, onNavigate, onCtaClick }) {
  return (
    <div className="phone-menu-overlay" role="dialog" aria-modal="true" aria-label="Process Steps Menu">
      <div className="phone-header">
        <div className="phone-header-brand">
          <img src={ASSETS.logo} alt="Arora Hiring Process" className="phone-header-logo" />
          <span className="phone-header-title">Arora Process</span>
        </div>
        <button
          type="button"
          className="phone-close-btn"
          onClick={onClose}
          aria-label="Close process menu"
        >
          <span className="phone-close-line one" />
          <span className="phone-close-line two" />
        </button>
      </div>

      <nav className="phone-menu-links" aria-label="Process steps">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.label}
            type="button"
            className="phone-menu-link"
            onClick={() => onNavigate(item.target)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <button type="button" className="phone-menu-cta" onClick={onCtaClick}>
        <span>Start Hiring</span>
        <img src={ASSETS.arrow} alt="" aria-hidden="true" />
      </button>
    </div>
  );
}

function PhoneFrame({
  stepId,
  stepNumber,
  stepName,
  scale,
  menuOpen,
  onCloseMenu,
  onNavigate,
  onCtaClick,
  darkHomeBar,
  children
}) {
  const scaledWidth = Math.round(420 * scale);
  const scaledHeight = Math.round(654 * scale);

  return (
    <div id={stepId} className="process-phone-slot">
      <div className="process-step-caption">
        <span className="process-step-pill">Step 0{stepNumber}</span>
        <span>{stepName}</span>
      </div>

      <div
        className="process-phone-scale-box"
        style={{ width: `${scaledWidth}px`, height: `${scaledHeight}px` }}
      >
        <div
          className="process-iphone-frame"
          style={scale !== 1 ? { transform: `scale(${scale})` } : undefined}
        >
          <div className="process-iphone-artboard">
            <div className="process-dynamic-island" aria-hidden="true" />

            {children}

            {menuOpen && (
              <PhoneMenuOverlay
                onClose={onCloseMenu}
                onNavigate={onNavigate}
                onCtaClick={onCtaClick}
              />
            )}

            <div
              className={`process-home-indicator ${darkHomeBar ? 'is-dark-bar' : ''}`}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProcessSection({ onStartHiringClick }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [phoneScale, setPhoneScale] = useState(0.79);

  // Trigger Typewriter once section enters the viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scale all 4 cards cleanly across 1400px without horizontal or sticky scroll
  const updateScale = useCallback(() => {
    const vw = window.innerWidth;
    let nextScale;
    if (vw >= 1100) {
      const containerW = Math.min(1400, vw - 48);
      nextScale = Math.min(0.79, (containerW - 60) / (4 * 420));
    } else if (vw >= 640) {
      nextScale = Math.min(0.85, (vw - 68) / (2 * 420));
    } else {
      nextScale = Math.min(0.92, Math.max(260, vw - 36) / 420);
    }
    const rounded = Number(nextScale.toFixed(3));
    setPhoneScale((prev) => (Math.abs(prev - rounded) < 0.005 ? prev : rounded));
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [updateScale]);

  const handleNavigate = (targetId) => {
    setOpenMenuIndex(null);
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleCta = () => {
    setOpenMenuIndex(null);
    if (onStartHiringClick) {
      onStartHiringClick();
    } else {
      openWhatsApp('Hi Arora Tech Solutions, I would like to start hiring pre-vetted engineers.');
    }
  };

  return (
    <section
      ref={containerRef}
      id="process-section"
      className="process-showcase-section"
      aria-label="4-Step Hiring Process"
    >
      <div className="process-showcase-inner">
        <div className="process-showcase-intro">
          <div>
            <p className="process-intro-kicker">How It Works &bull; 4 Steps</p>
            <h2 className="process-intro-title">From Brief to Active Sprint in 48 Hours</h2>
          </div>
          <p className="process-intro-sub">
            Walk through our streamlined 4-step hiring flow engineered for speed, vetting precision, and zero friction.
          </p>
        </div>

        <div className="process-phones-row">
          {/* STEP 01 — SHARE REQUIREMENTS */}
          <PhoneFrame
            stepId="step-1"
            stepNumber={1}
            stepName="Share Requirements"
            scale={phoneScale}
            menuOpen={openMenuIndex === 0}
            onCloseMenu={() => setOpenMenuIndex(null)}
            onNavigate={handleNavigate}
            onCtaClick={handleCta}
            darkHomeBar={true}
          >
            <PhoneHeader onOpenMenu={() => setOpenMenuIndex(0)} />

            <div className="phone-rotated-sidebar" aria-hidden="true">
              <strong>Step 01</strong>
              <span>Discovery Brief</span>
            </div>

            <div className="s1-portrait-wrap">
              <img src={ASSETS.portrait} alt="Technical discovery lead" className="s1-portrait-img" />
            </div>

            <img src={ASSETS.quote} alt="" className="s1-quote-icon" aria-hidden="true" />

            <p className="s1-quote-text">
              <TypewriterText
                text="Tell us your tech stack, seniority level, and daily timezone overlap in a quick 15-minute scope call."
                delay={180}
                speed={18}
                active={isVisible}
              />
            </p>

            <div className="s1-bottom-card">
              <div>
                <h3 className="s1-card-title">
                  <TypewriterText text="Scope & Stack" delay={300} speed={26} active={isVisible} />
                </h3>
                <p className="s1-card-date">Step 01 &bull; Under 15 mins</p>
              </div>

              <button
                type="button"
                className="s1-learn-more-btn"
                onClick={() => handleNavigate('step-2')}
              >
                <span>Next step</span>
                <img src={ASSETS.arrow} alt="" aria-hidden="true" />
              </button>

              <img src={ASSETS.star} alt="" className="s1-star-icon" aria-hidden="true" />
            </div>
          </PhoneFrame>

          {/* STEP 02 — PRE-VETTED MATCHING */}
          <PhoneFrame
            stepId="step-2"
            stepNumber={2}
            stepName="Pre-Vetted Matching"
            scale={phoneScale}
            menuOpen={openMenuIndex === 1}
            onCloseMenu={() => setOpenMenuIndex(null)}
            onNavigate={handleNavigate}
            onCtaClick={handleCta}
            darkHomeBar={false}
          >
            <div className="s2-hero-bg">
              <img src={ASSETS.heroHands} alt="Engineering talent collaboration" className="s2-hero-img" />
              <div className="s2-hero-overlay" />
            </div>

            <PhoneHeader onOpenMenu={() => setOpenMenuIndex(1)} />

            <img src={ASSETS.avatars} alt="Pre-vetted engineers" className="s2-avatars" />

            <h3 className="s2-headline">
              <TypewriterText text="Top 1% vetted in 48h" delay={350} speed={28} active={isVisible} />
            </h3>

            <p className="s2-subtext">
              <TypewriterText
                text="Hand-picked senior engineers matched to your architecture"
                delay={750}
                speed={18}
                active={isVisible}
              />
            </p>

            <button
              type="button"
              className="phone-cream-cta"
              onClick={() => handleNavigate('step-3')}
            >
              <span>See step 03</span>
              <img src={ASSETS.arrow} alt="" aria-hidden="true" />
            </button>
          </PhoneFrame>

          {/* STEP 03 — TECHNICAL INTERVIEWS */}
          <PhoneFrame
            stepId="step-3"
            stepNumber={3}
            stepName="Technical Interviews"
            scale={phoneScale}
            menuOpen={openMenuIndex === 2}
            onCloseMenu={() => setOpenMenuIndex(null)}
            onNavigate={handleNavigate}
            onCtaClick={handleCta}
            darkHomeBar={true}
          >
            <div className="s3-hero-wrap">
              <img src={ASSETS.preacher} alt="Live technical evaluation" className="s3-hero-img" />
              <div className="s3-hero-overlay" />
            </div>

            <PhoneHeader onOpenMenu={() => setOpenMenuIndex(2)} />

            <button
              type="button"
              className="s3-play-btn"
              onClick={handleCta}
              aria-label="Schedule interview"
            >
              <img src={ASSETS.play} alt="" aria-hidden="true" />
            </button>

            <div className="s3-body-white">
              <div className="s3-dark-band">
                <h3 className="s3-section-title">
                  <TypewriterText text="Interviews" delay={450} speed={30} active={isVisible} />
                </h3>
              </div>

              <div className="s3-events-list">
                <div className="s3-event-row is-top-dark">
                  <div className="s3-date-card is-white">
                    <span className="s3-date-day">01</span>
                    <span className="s3-date-month">Round</span>
                  </div>
                  <div className="s3-event-info">
                    <p className="s3-event-title">System Design | Architecture</p>
                    <p className="s3-event-time">45 mins &bull; Live Review</p>
                  </div>
                </div>

                <div className="s3-event-row">
                  <div className="s3-date-card">
                    <span className="s3-date-day">02</span>
                    <span className="s3-date-month">Round</span>
                  </div>
                  <div className="s3-event-info">
                    <p className="s3-event-title">Pair Coding | Code Quality</p>
                    <p className="s3-event-time">60 mins &bull; Hands-On</p>
                  </div>
                </div>

                <div className="s3-event-row">
                  <div className="s3-date-card">
                    <span className="s3-date-day">03</span>
                    <span className="s3-date-month">Round</span>
                  </div>
                  <div className="s3-event-info">
                    <p className="s3-event-title">Team Sync | Timezone Fit</p>
                    <p className="s3-event-time">30 mins &bull; Lead Chat</p>
                  </div>
                </div>

                <div className="s3-event-row is-faded">
                  <div className="s3-date-card">
                    <span className="s3-date-day">04</span>
                    <span className="s3-date-month">Sign</span>
                  </div>
                  <div className="s3-event-info">
                    <p className="s3-event-title">NDA &amp; Quote Confirm</p>
                  </div>
                </div>
              </div>
            </div>
          </PhoneFrame>

          {/* STEP 04 — ONBOARD & SHIP CODE */}
          <PhoneFrame
            stepId="step-4"
            stepNumber={4}
            stepName="Onboard & Ship Code"
            scale={phoneScale}
            menuOpen={openMenuIndex === 3}
            onCloseMenu={() => setOpenMenuIndex(null)}
            onNavigate={handleNavigate}
            onCtaClick={handleCta}
            darkHomeBar={true}
          >
            <PhoneHeader onOpenMenu={() => setOpenMenuIndex(3)} />

            <div className="phone-rotated-sidebar" aria-hidden="true">
              <strong>Step 04</strong>
              <span>Active Sprint</span>
            </div>

            <div className="s4-kickoff-card">
              <p className="s4-kickoff-badge">Day-1 Sprint Integration</p>
              <div className="s4-kickoff-metrics">
                <div className="s4-metric-box">
                  <div className="s4-metric-val">48h</div>
                  <div className="s4-metric-lbl">Onboarding</div>
                </div>
                <div className="s4-metric-box">
                  <div className="s4-metric-val">100%</div>
                  <div className="s4-metric-lbl">IP Ownership</div>
                </div>
              </div>
              <div className="s4-tools-row">
                <span className="s4-tool-chip">GitHub</span>
                <span className="s4-tool-chip">Slack</span>
                <span className="s4-tool-chip">Jira</span>
                <span className="s4-tool-chip">CI/CD</span>
              </div>
            </div>

            <p className="s4-quote-text">
              <TypewriterText
                text="Your engineer joins daily standups, ships clean production code, and scales seamlessly with your roadmap."
                delay={550}
                speed={18}
                active={isVisible}
              />
            </p>

            <div className="s4-bottom-card">
              <div>
                <h3 className="s1-card-title">
                  <TypewriterText text="Ship Faster" delay={700} speed={28} active={isVisible} />
                </h3>
                <p className="s1-card-date" style={{ color: '#5A4C41' }}>
                  Step 04 &bull; 14-Day Risk-Free Trial
                </p>
              </div>

              <button
                type="button"
                className="s1-learn-more-btn"
                onClick={handleCta}
              >
                <span>Start Hiring</span>
                <img src={ASSETS.arrow} alt="" aria-hidden="true" />
              </button>

              <img src={ASSETS.star} alt="" className="s1-star-icon" aria-hidden="true" />
            </div>
          </PhoneFrame>
        </div>
      </div>
    </section>
  );
}
