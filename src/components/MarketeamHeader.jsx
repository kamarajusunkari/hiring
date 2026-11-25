import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, ChevronRight, Mail, Phone 
} from 'lucide-react';
import { BRAND, openWhatsApp } from '../data/brandConfig';
import { SERVICES_MENU, INDUSTRIES_MENU, HIRING_SOLUTIONS_MENU } from '../data/navigationData';

/**
 * Floating Glassmorphic Pill Header (Digital Gravity Art Direction)
 * - Exact floating pill shape with rounded ends (border-radius: 9999px)
 * - Deep frosted dark glassmorphism (backdrop-filter: blur(28px))
 * - Arora Tech Solutions official logo
 * - Clean white typography navigation
 * - Right actions: "Speak to an expert" / "Hire Now" electric blue gradient CTA, and circular glass Mail & Phone buttons
 * - Mega-dropdowns open directly below the pill navbar
 */
export default function MarketeamHeader({ onHireNowClick, onTalkToTeamClick, onSelectRole }) {
  // 'services' | 'industries' | 'hiring' | null
  const [activeMenu, setActiveMenu] = useState(null);
  const headerRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const toggleMenu = (menuName) => {
    setActiveMenu(prev => prev === menuName ? null : menuName);
  };

  const handleRoleSelect = (slug) => {
    setActiveMenu(null);
    if (onSelectRole) {
      onSelectRole(slug);
    } else {
      openWhatsApp(`Hi Arora Tech Solutions, I am interested in hiring ${slug.replace(/-/g, ' ')}.`);
    }
  };

  const handleHireClick = () => {
    setActiveMenu(null);
    if (onHireNowClick) {
      onHireNowClick();
    } else {
      openWhatsApp('Hi Arora Tech Solutions, I would like to hire top developers & specialists.');
    }
  };

  const handleContactClick = () => {
    if (onTalkToTeamClick) {
      onTalkToTeamClick();
    } else {
      openWhatsApp('Hi Arora Tech Solutions, I would like to speak with your technical hiring team.');
    }
  };

  return (
    <div className="digital-gravity-header-wrapper" ref={headerRef}>
      {/* ====================================================================
          FLOATING GLASSMORPHIC PILL BAR (Matching Reference Image)
          ==================================================================== */}
      <header className="digital-gravity-pill">
        
        {/* 1. Left: Official Arora Tech Solutions Original Logo (Arora-Logo-1 (3).webp) */}
        <a 
          href={BRAND.mainSiteUrl || "/"} 
          className="pill-logo-link" 
          aria-label="Arora Tech Solutions"
        >
          <img
            src="/assets/images/Arora-Logo-1 (3).webp"
            alt="Arora Tech Solutions"
            className="pill-logo-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/images/arora-logo.webp";
            }}
          />
        </a>

        {/* 2. Center: Clean Navigation Links with Dropdowns */}
        <nav className="pill-nav-links" aria-label="Primary Navigation">
          {/* Services Dropdown Trigger */}
          <div className="nav-item-rel">
            <button
              type="button"
              className={`pill-nav-item ${activeMenu === 'services' ? 'active' : ''}`}
              onClick={() => toggleMenu('services')}
              aria-expanded={activeMenu === 'services'}
            >
              <span>Services</span>
              <ChevronDown 
                size={14} 
                className="chevron-arrow" 
                style={{ transform: activeMenu === 'services' ? 'rotate(180deg)' : 'none' }}
              />
            </button>
          </div>

          {/* Hiring Solutions Dropdown Trigger */}
          <div className="nav-item-rel">
            <button
              type="button"
              className={`pill-nav-item highlight-hiring ${activeMenu === 'hiring' ? 'active' : ''}`}
              onClick={() => toggleMenu('hiring')}
              aria-expanded={activeMenu === 'hiring'}
            >
              <span>Hiring Solutions</span>
              <ChevronDown 
                size={14} 
                className="chevron-arrow" 
                style={{ transform: activeMenu === 'hiring' ? 'rotate(180deg)' : 'none' }}
              />
            </button>
          </div>

          {/* Industries Dropdown Trigger */}
          <div className="nav-item-rel">
            <button
              type="button"
              className={`pill-nav-item ${activeMenu === 'industries' ? 'active' : ''}`}
              onClick={() => toggleMenu('industries')}
              aria-expanded={activeMenu === 'industries'}
            >
              <span>Industries</span>
              <ChevronDown 
                size={14} 
                className="chevron-arrow" 
                style={{ transform: activeMenu === 'industries' ? 'rotate(180deg)' : 'none' }}
              />
            </button>
          </div>

          <a href={`${BRAND.mainSiteUrl}/case-studies/`} className="pill-nav-item" target="_blank" rel="noopener noreferrer">
            Our Work
          </a>

          <a href={`${BRAND.mainSiteUrl}/about-us/`} className="pill-nav-item" target="_blank" rel="noopener noreferrer">
            About
          </a>

          <a href={`${BRAND.mainSiteUrl}/insights/`} className="pill-nav-item" target="_blank" rel="noopener noreferrer">
            Blog
          </a>

          <a href={`${BRAND.mainSiteUrl}/career/`} className="pill-nav-item" target="_blank" rel="noopener noreferrer">
            Career
          </a>
        </nav>

        {/* 3. Right: Universal Rotating Conic Button + Circular Glass Mail & Phone */}
        <div className="pill-actions-group">
          
          {/* Universal CTA Button with Rotating Conic-Gradient Border & Sliding Hover Fill */}
          <div className="btn-border-wrap">
            <button
              type="button"
              className="universal-btn-primary"
              onClick={handleHireClick}
            >
              <span className="btn-text-content">
                <span>Speak to an expert</span>
              </span>
            </button>
          </div>

          {/* Circular Glass Mail Button */}
          <button
            type="button"
            className="pill-icon-circle-btn"
            onClick={handleContactClick}
            aria-label="Send Email Enquiry"
            title="Email Arora Team"
          >
            <Mail size={15} />
          </button>

          {/* Circular Glass Phone Button */}
          <button
            type="button"
            className="pill-icon-circle-btn"
            onClick={handleContactClick}
            aria-label="Call Arora Team"
            title="Talk to an Advisor"
          >
            <Phone size={15} />
          </button>
        </div>

      </header>

      {/* ====================================================================
          DIGITAL GRAVITY STYLE MEGA-DROPDOWNS
          - 2 Columns with Glowing Neon Blue Dots, Divider Lines & Chevrons
          - 1 Right Section with Title + 4x4 Boxed Logo Grid
          ==================================================================== */}
      {activeMenu === 'services' && (
        <div className="dg-mega-dropdown" role="region" aria-label="Services Menu">
          <div className="dg-dropdown-columns">
            <div className="dg-dropdown-col">
              {SERVICES_MENU.col1.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="dg-dropdown-item-row"
                >
                  <div className="dg-item-left">
                    <span className="dg-glowing-dot" />
                    <span className="dg-item-name">{item.name}</span>
                  </div>
                  <ChevronRight size={15} className="dg-item-chevron" />
                </a>
              ))}
            </div>

            <div className="dg-dropdown-col">
              {SERVICES_MENU.col2.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="dg-dropdown-item-row"
                >
                  <div className="dg-item-left">
                    <span className="dg-glowing-dot" />
                    <span className="dg-item-name">{item.name}</span>
                  </div>
                  <ChevronRight size={15} className="dg-item-chevron" />
                </a>
              ))}
            </div>
          </div>

            {/* Right Section: Heading + 4x4 Boxed Client Grid */}
            <div className="dg-dropdown-feature">
              <h3 className="dg-feature-title">{SERVICES_MENU.heading}</h3>
              <div className="dg-boxed-logo-grid">
                {SERVICES_MENU.logos.map((logo, lIdx) => {
                  const brandKey = logo.name.toLowerCase().replace(/[^a-z0-9]/g, '');
                  return (
                    <div key={lIdx} className="dg-logo-cell">
                      <span className={`dg-cell-brand-text brand-${brandKey}`}>{logo.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
        </div>
      )}

      {activeMenu === 'hiring' && (
        <div className="dg-mega-dropdown" role="region" aria-label="Hiring Solutions Menu">
          <div className="dg-dropdown-columns">
            <div className="dg-dropdown-col">
              {HIRING_SOLUTIONS_MENU.col1.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleRoleSelect(item.slug)} 
                  className="dg-dropdown-item-row"
                >
                  <div className="dg-item-left">
                    <span className="dg-glowing-dot" />
                    <span className="dg-item-name">{item.name}</span>
                  </div>
                  <ChevronRight size={15} className="dg-item-chevron" />
                </div>
              ))}
            </div>

            <div className="dg-dropdown-col">
              {HIRING_SOLUTIONS_MENU.col2.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleRoleSelect(item.slug)} 
                  className="dg-dropdown-item-row"
                >
                  <div className="dg-item-left">
                    <span className="dg-glowing-dot" />
                    <span className="dg-item-name">{item.name}</span>
                  </div>
                  <ChevronRight size={15} className="dg-item-chevron" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: Heading + 4x4 Boxed Trust Grid */}
          <div className="dg-dropdown-feature">
            <h3 className="dg-feature-title">{HIRING_SOLUTIONS_MENU.heading}</h3>
            <div className="dg-boxed-logo-grid">
              {HIRING_SOLUTIONS_MENU.logos.map((logo, lIdx) => {
                const brandKey = logo.name.toLowerCase().replace(/[^a-z0-9]/g, '');
                return (
                  <div key={lIdx} className="dg-logo-cell">
                    <span className={`dg-cell-brand-text brand-${brandKey}`}>{logo.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeMenu === 'industries' && (
        <div className="dg-mega-dropdown" role="region" aria-label="Industries Menu">
          <div className="dg-dropdown-columns">
            <div className="dg-dropdown-col">
              {INDUSTRIES_MENU.col1.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="dg-dropdown-item-row"
                >
                  <div className="dg-item-left">
                    <span className="dg-glowing-dot" />
                    <span className="dg-item-name">{item.name}</span>
                  </div>
                  <ChevronRight size={15} className="dg-item-chevron" />
                </a>
              ))}
            </div>

            <div className="dg-dropdown-col">
              {INDUSTRIES_MENU.col2.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="dg-dropdown-item-row"
                >
                  <div className="dg-item-left">
                    <span className="dg-glowing-dot" />
                    <span className="dg-item-name">{item.name}</span>
                  </div>
                  <ChevronRight size={15} className="dg-item-chevron" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Section: Heading + 4x4 Boxed Enterprise Compliance Grid */}
          <div className="dg-dropdown-feature">
            <h3 className="dg-feature-title">{INDUSTRIES_MENU.heading}</h3>
            <div className="dg-boxed-logo-grid">
              {INDUSTRIES_MENU.logos.map((logo, lIdx) => {
                const brandKey = logo.name.toLowerCase().replace(/[^a-z0-9]/g, '');
                return (
                  <div key={lIdx} className="dg-logo-cell">
                    <span className={`dg-cell-brand-text brand-${brandKey}`}>{logo.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
