import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, ChevronRight, Menu, X, ArrowRight, ShieldCheck, Mail, Phone 
} from 'lucide-react';
import { BRAND } from '../data/brandConfig';
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
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
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
    setMobileDrawerOpen(false);
    if (onSelectRole) onSelectRole(slug);
  };

  const handleHireClick = () => {
    setActiveMenu(null);
    if (onHireNowClick) {
      onHireNowClick();
    } else {
      const el = document.getElementById('enquiry-section') || document.getElementById('quote');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    if (onTalkToTeamClick) {
      onTalkToTeamClick();
    } else {
      handleHireClick();
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

          {/* Mobile Menu Hamburger */}
          <button 
            type="button" 
            className="pill-mobile-toggle"
            onClick={() => setMobileDrawerOpen(true)}
            aria-label="Open mobile navigation"
          >
            <Menu size={20} />
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

      {/* ====================================================================
          MOBILE DRAWER NAVIGATION
          ==================================================================== */}
      {mobileDrawerOpen && (
        <div className="mobile-drawer-overlay" role="dialog" aria-modal="true">
          <div className="mobile-drawer-backdrop" onClick={() => setMobileDrawerOpen(false)} />
          <div className="mobile-drawer-panel">
            <div className="drawer-top">
              <img 
                src="/assets/images/arora-logo.webp" 
                alt="Arora Tech Solutions" 
                style={{ height: 32, width: 'auto' }} 
              />
              <button 
                type="button" 
                onClick={() => setMobileDrawerOpen(false)} 
                aria-label="Close menu"
                style={{ color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={22} />
              </button>
            </div>

            <div className="drawer-scroll-body">
              <div className="drawer-group-title">Main Navigation</div>
              <div className="drawer-nav-list">
                <a href={`${BRAND.mainSiteUrl}/`} className="drawer-nav-item" target="_blank" rel="noopener noreferrer">
                  <span style={{ fontWeight: 700 }}>Home</span>
                </a>
                <a href={`${BRAND.mainSiteUrl}/about-us/`} className="drawer-nav-item" target="_blank" rel="noopener noreferrer">
                  <span style={{ fontWeight: 700 }}>About us</span>
                </a>
                <a href={`${BRAND.mainSiteUrl}/case-studies/`} className="drawer-nav-item" target="_blank" rel="noopener noreferrer">
                  <span style={{ fontWeight: 700 }}>Our Work</span>
                </a>
                <a href={`${BRAND.mainSiteUrl}/career/`} className="drawer-nav-item" target="_blank" rel="noopener noreferrer">
                  <span style={{ fontWeight: 700 }}>Career</span>
                </a>
                <a href={`${BRAND.mainSiteUrl}/insights/`} className="drawer-nav-item" target="_blank" rel="noopener noreferrer">
                  <span style={{ fontWeight: 700 }}>Blog & Insights</span>
                </a>
              </div>

              <div className="drawer-group-title">Hiring Solutions & Staffing</div>
              <div className="drawer-nav-list">
                {[...HIRING_SOLUTIONS_MENU.col1, ...HIRING_SOLUTIONS_MENU.col2].map((item, idx) => (
                  <button 
                    key={idx}
                    type="button" 
                    className="drawer-nav-item"
                    style={{ textAlign: 'left', width: '100%', color: '#00A6FF', background: 'none', border: 'none', cursor: 'pointer' }}
                    onClick={() => handleRoleSelect(item.slug)}
                  >
                    <span style={{ fontWeight: 700 }}>{item.name}</span>
                  </button>
                ))}
              </div>

              <div className="drawer-group-title">Services</div>
              <div className="drawer-nav-list">
                {[...SERVICES_MENU.col1, ...SERVICES_MENU.col2].map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.link || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="drawer-nav-item"
                    style={{ color: '#E2E8F0' }}
                  >
                    <span style={{ fontWeight: 700 }}>{item.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="drawer-footer-action">
              <div className="btn-border-wrap" style={{ width: '100%' }}>
                <button
                  type="button"
                  className="universal-btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    handleHireClick();
                  }}
                >
                  <span className="btn-text-content">
                    <span>Speak to an expert</span>
                  </span>
                </button>
              </div>

              {/* Mobile Quick Contact Row */}
              <div className="drawer-contact-row">
                <a href={`mailto:${BRAND.contact.email}`} className="drawer-contact-chip">
                  <Mail size={14} />
                  <span>{BRAND.contact.email}</span>
                </a>
                <a href={`tel:${BRAND.contact.phoneRaw}`} className="drawer-contact-chip">
                  <Phone size={14} />
                  <span>{BRAND.contact.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
