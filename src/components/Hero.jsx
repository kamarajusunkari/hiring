import React from 'react';
import TypewriterHeading from './TypewriterHeading';
import CirclesVisualization from './CirclesVisualization';
import { openWhatsApp } from '../data/brandConfig';

export default function Hero({ onStartProjectClick }) {
  const handleStartProject = () => {
    if (onStartProjectClick) {
      onStartProjectClick();
    } else {
      openWhatsApp('Hi Arora Tech Solutions, I would like to start a project with your team.');
    }
  };

  return (
    <section className="hero-section-root">
      <div className="hero-main-container">

        {/* ====================================================================
            HERO LEFT CONTENT
            ==================================================================== */}
        <div className="hero-left-content">
          {/* 1. Typewriter Heading */}
          <TypewriterHeading
            text="Unlock Top Marketing Talent You Thought Was Out of Reach -- Now Just One Click Away!"
            cutoffIndex={67}
            speed={35}
            delay={400}
          />

          {/* 2. "Start Project" Button with Rotating Conic-Gradient Border */}
          <div className="hero-cta-wrapper">
            <div className="btn-border-wrap">
              <button
                type="button"
                className="universal-btn-primary btn-start-project"
                onClick={handleStartProject}
              >
                <span className="btn-text-content">
                  <span>Start Project</span>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="btn-chevron-icon" aria-hidden="true">
                    <path d="M6.75 3.75L12 9L6.75 14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ====================================================================
            HERO RIGHT: CIRCLES VISUALIZATION
            ==================================================================== */}
        <div className="hero-right-visualization">
          <CirclesVisualization />
        </div>

      </div>

      {/* ====================================================================
          SMOOTH MERGE TRANSITION INTO SECOND SECTION
          Seamlessly blends the dark navy cosmic hero into the clean white section
          ==================================================================== */}
      <div className="hero-smooth-merge-container" aria-hidden="true">
        <div className="hero-merge-glow-arc" />
        <svg
          className="hero-merge-curve-svg"
          viewBox="0 0 1440 90"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,35 Q720,90 1440,35 L1440,90 L0,90 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </section>
  );
}
