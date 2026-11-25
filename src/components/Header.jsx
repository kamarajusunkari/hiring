import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, ChevronRight, Menu, X, ArrowRight, 
  ShieldCheck 
} from 'lucide-react';
import { BRAND } from '../data/brandConfig';
import { SERVICES_MENU, INDUSTRIES_MENU, HIRING_SOLUTIONS_MENU } from '../data/navigationData';

export default function Header({ onSelectRole, onConnectClick }) {
  // Active dropdown: 'services' | 'industries' | 'hiring' | null
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  
  const headerRef = useRef(null);

  // Close dropdown on outside click
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

  const handleRoleClick = (slug) => {
    setActiveMenu(null);
    setMobileDrawerOpen(false);
    if (onSelectRole) onSelectRole(slug);
  };

  const handleConnect = () => {
    setActiveMenu(null);
    if (onConnectClick) {
      onConnectClick();
    } else {
      const el = document.getElementById('enquiry-section') || document.getElementById('quote');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="header-wrapper" ref={headerRef}>
      <header className="floating-nav-bar">
        {/* 1. Left: Official Arora Tech Solutions Logo */}
        <a 
          href={BRAND.mainSiteUrl}
          className="header-brand-link" 
          aria-label="Arora Tech Solutions"
        >
          <img 
            src="/assets/images/arora-logo.webp" 
            alt="Arora Tech Solutions" 
            className="header-logo-img" 
          />
        </a>

        {/* 2. Center: Navigation Items */}
        <nav className="center-nav" aria-label="Main Navigation">
          <a href={`${BRAND.mainSiteUrl}/`} className="nav-item-link" target="_blank" rel="noopener noreferrer">
            Home
          </a>
          
          <a href={`${BRAND.mainSiteUrl}/about-us/`} className="nav-item-link" target="_blank" rel="noopener noreferrer">
            About us
          </a>

          {/* Services Dropdown Trigger */}
          <div className="nav-item-wrap">
            <button 
              type="button" 
              className={`nav-item-link ${activeMenu === 'services' ? 'active' : ''}`}
              onClick={() => toggleMenu('services')}
              aria-expanded={activeMenu === 'services'}
            >
              <span>Services</span>
              <ChevronDown 
                size={14} 
                className="chevron-icon" 
                style={{ transform: activeMenu === 'services' ? 'rotate(180deg)' : 'none' }} 
              />
            </button>
          </div>

          {/* Hiring Solutions Dropdown Trigger */}
          <div className="nav-item-wrap">
            <button 
              type="button" 
              className={`nav-item-link highlight ${activeMenu === 'hiring' ? 'active' : ''}`}
              onClick={() => toggleMenu('hiring')}
              aria-expanded={activeMenu === 'hiring'}
            >
              <span>Hiring Solutions</span>
              <span className="nav-hiring-pill-badge">Staffing</span>
              <ChevronDown 
                size={14} 
                className="chevron-icon" 
                style={{ transform: activeMenu === 'hiring' ? 'rotate(180deg)' : 'none' }} 
              />
            </button>
          </div>

          {/* Industries Dropdown Trigger */}
          <div className="nav-item-wrap">
            <button 
              type="button" 
              className={`nav-item-link ${activeMenu === 'industries' ? 'active' : ''}`}
              onClick={() => toggleMenu('industries')}
              aria-expanded={activeMenu === 'industries'}
            >
              <span>Industries</span>
              <ChevronDown 
                size={14} 
                className="chevron-icon" 
                style={{ transform: activeMenu === 'industries' ? 'rotate(180deg)' : 'none' }} 
              />
            </button>
          </div>

          <a href={`${BRAND.mainSiteUrl}/case-studies/`} className="nav-item-link" target="_blank" rel="noopener noreferrer">
            Case Studies
          </a>

          <a href={`${BRAND.mainSiteUrl}/career/`} className="nav-item-link" target="_blank" rel="noopener noreferrer">
            Career
          </a>

          <a href={`${BRAND.mainSiteUrl}/insights/`} className="nav-item-link" target="_blank" rel="noopener noreferrer">
            Insights
          </a>
        </nav>

        {/* 3. Right: "Connect With Us" Gold Pill Button */}
        <div className="header-right-actions">
          <button 
            type="button" 
            className="btn-connect"
            onClick={handleConnect}
          >
            Connect With Us
          </button>

          {/* Mobile Hamburger Toggle */}
          <button 
            type="button" 
            className="mobile-hamburger-btn"
            onClick={() => setMobileDrawerOpen(true)}
            aria-label="Open mobile navigation"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* ======================================================================
          DROPDOWN 1: SERVICES (Exact Match to User Screenshot 1 with 1-line desc)
          ====================================================================== */}
      {activeMenu === 'services' && (
        <div className="arora-mega-dropdown" role="region" aria-label="Services Menu">
          <div className="mega-layout-flex">
            {/* 3 Columns of Services */}
            <div className="mega-columns-wrap-3">
              {SERVICES_MENU.columns.map((col, cIdx) => (
                <div key={cIdx} className="mega-col">
                  {col.map((item, idx) => (
                    <a 
                      key={idx} 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mega-link-row-card"
                    >
                      <div className="mega-row-text-content">
                        <div className="mega-row-title">{item.name}</div>
                        <div className="mega-row-desc">{item.desc}</div>
                      </div>
                      <ChevronRight size={15} className="arrow-icon" />
                    </a>
                  ))}
                </div>
              ))}
            </div>

            {/* Right Promotional Feature Card */}
            <div className="mega-promo-card promo-card-services">
              <div>
                <div className="promo-services-badge">
                  {SERVICES_MENU.promo.badge}
                </div>
                <div className="promo-services-title">
                  WE MAKE YOUR <span>BUSINESS STRONGER</span> THAN YOU THINK!
                </div>
              </div>

              <div className="promo-services-graphic">
                <svg width="140" height="85" viewBox="0 0 140 85" fill="none">
                  <ellipse cx="70" cy="76" rx="55" ry="7" fill="#E2E8F0" />
                  <path d="M42 66C42 48 62 38 84 43C102 47 112 62 108 71C102 78 52 78 42 66Z" fill="#94A3B8" />
                  <circle cx="94" cy="50" r="13" fill="#64748B" />
                  <path d="M100 56C106 63 110 72 108 77" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
                  <circle cx="97" cy="48" r="2" fill="#FFFFFF" />
                  <circle cx="70" cy="70" r="3" fill="#16A34A" />
                  <line x1="68" y1="70" x2="65" y2="75" stroke="#16A34A" strokeWidth="1.5" />
                  <line x1="72" y1="70" x2="75" y2="75" stroke="#16A34A" strokeWidth="1.5" />
                  <line x1="70" y1="67" x2="70" y2="62" stroke="#16A34A" strokeWidth="2" />
                </svg>
              </div>

              <div>
                <p className="promo-services-sub">
                  {SERVICES_MENU.promo.sub}
                </p>
                <a 
                  href={SERVICES_MENU.promo.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="promo-card-btn"
                  style={{ width: '100%', marginTop: 8 }}
                >
                  <span>{SERVICES_MENU.promo.buttonText}</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================
          DROPDOWN 2: INDUSTRIES (Exact Match to User Screenshot 2 with 1-line desc)
          ====================================================================== */}
      {activeMenu === 'industries' && (
        <div className="arora-mega-dropdown" role="region" aria-label="Industries Menu">
          <div className="mega-layout-flex">
            {/* 3 Columns of Industries */}
            <div className="mega-columns-wrap-3">
              {INDUSTRIES_MENU.columns.map((col, cIdx) => (
                <div key={cIdx} className="mega-col">
                  {col.map((item, idx) => (
                    <a 
                      key={idx} 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mega-link-row-card"
                    >
                      <div className="mega-row-text-content">
                        <div className="mega-row-title">{item.name}</div>
                        <div className="mega-row-desc">{item.desc}</div>
                      </div>
                      <ChevronRight size={15} className="arrow-icon" />
                    </a>
                  ))}
                </div>
              ))}
            </div>

            {/* Right Promotional Feature Card (Blue Gradient) */}
            <div className="mega-promo-card promo-card-industries">
              <div>
                <div style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', color: '#BAE6FD', letterSpacing: '0.05em', marginBottom: 6 }}>
                  {INDUSTRIES_MENU.promo.badge}
                </div>
                <div className="promo-industries-title">
                  WE TURN <span>PROBLEMS</span> INTO POSSIBILITIES.
                </div>
                <p className="promo-industries-desc">
                  {INDUSTRIES_MENU.promo.sub}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0' }}>
                <svg width="120" height="70" viewBox="0 0 120 70" fill="none">
                  <ellipse cx="60" cy="54" rx="28" ry="12" fill="rgba(255,255,255,0.2)" stroke="#FFFFFF" strokeWidth="1.5" />
                  <ellipse cx="60" cy="46" rx="18" ry="4" fill="#38BDF8" opacity="0.6" />
                  <path d="M60 44C65 28 75 18 85 22C88 26 80 38 70 40" stroke="#FBBF24" strokeWidth="3" fill="#F59E0B" strokeLinecap="round" />
                  <line x1="88" y1="8" x2="88" y2="66" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />
                  <line x1="100" y1="8" x2="100" y2="66" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />
                  <line x1="88" y1="18" x2="100" y2="18" stroke="#FFFFFF" strokeWidth="1.5" />
                  <line x1="88" y1="32" x2="100" y2="32" stroke="#FFFFFF" strokeWidth="1.5" />
                  <line x1="88" y1="46" x2="100" y2="46" stroke="#FFFFFF" strokeWidth="1.5" />
                </svg>
              </div>

              <div>
                <a 
                  href={INDUSTRIES_MENU.promo.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="promo-card-btn"
                  style={{ width: '100%' }}
                >
                  <span>{INDUSTRIES_MENU.promo.buttonText}</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================
          DROPDOWN 3: HIRING SOLUTIONS (Developers + Sales/Marketing Staffing)
          ====================================================================== */}
      {activeMenu === 'hiring' && (
        <div className="arora-mega-dropdown" role="region" aria-label="Hiring Solutions Menu">
          <div className="mega-layout-flex">
            {/* 4 Categorized Columns with 1-Line Descriptions */}
            <div className="mega-columns-wrap-4">
              {HIRING_SOLUTIONS_MENU.columns.map((col, cIdx) => (
                <div key={cIdx} className="mega-col">
                  <div className="mega-column-group-header">
                    {col.group}
                  </div>
                  {col.items.map((item, idx) => (
                    <div 
                      key={idx}
                      className="mega-link-row-card"
                      onClick={() => handleRoleClick(item.slug)}
                    >
                      <div className="mega-row-text-content">
                        <div className="mega-row-title">
                          <span>{item.name}</span>
                          {item.isStaffing && <span className="staffing-pill">Staffing</span>}
                        </div>
                        <div className="mega-row-desc">{item.desc}</div>
                      </div>
                      <ChevronRight size={14} className="arrow-icon" />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Right Promotional Feature Card (Arora Cosmic Dark & Gold) */}
            <div className="mega-promo-card promo-card-hiring">
              <div>
                <div style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', color: '#38BDF8', letterSpacing: '0.05em', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <ShieldCheck size={14} color="#00C896" />
                  <span>{HIRING_SOLUTIONS_MENU.promo.badge}</span>
                </div>
                <div className="promo-hiring-title">
                  YOUR NEXT TALENT IS <span>JUST ONE STEP AWAY</span>
                </div>
                <p className="promo-hiring-desc">
                  {HIRING_SOLUTIONS_MENU.promo.sub}
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '10px 12px', fontSize: '0.72rem', color: '#CBD5E1', marginBottom: 12 }}>
                &bull; Pre-Vetted Talent Only<br />
                &bull; Transparent Quote Pricing<br />
                &bull; 100% IP & Code Ownership<br />
                &bull; Zero Placement Markup Fees
              </div>

              <div>
                <button 
                  type="button" 
                  onClick={handleConnect}
                  className="promo-card-btn"
                  style={{ width: '100%' }}
                >
                  <span>{HIRING_SOLUTIONS_MENU.promo.buttonText}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================
          5. MOBILE DRAWER NAVIGATION
          ====================================================================== */}
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
                style={{ color: '#94A3B8' }}
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
                  <span style={{ fontWeight: 700 }}>Case Studies</span>
                </a>
                <a href={`${BRAND.mainSiteUrl}/career/`} className="drawer-nav-item" target="_blank" rel="noopener noreferrer">
                  <span style={{ fontWeight: 700 }}>Career</span>
                </a>
                <a href={`${BRAND.mainSiteUrl}/insights/`} className="drawer-nav-item" target="_blank" rel="noopener noreferrer">
                  <span style={{ fontWeight: 700 }}>Insights</span>
                </a>
              </div>

              <div className="drawer-group-title">Hiring Solutions & Staffing</div>
              <div className="drawer-nav-list">
                {HIRING_SOLUTIONS_MENU.columns.map(col => col.items).flat().map((item, idx) => (
                  <button 
                    key={idx}
                    type="button" 
                    className="drawer-nav-item"
                    style={{ textAlign: 'left', width: '100%', color: '#38BDF8' }}
                    onClick={() => handleRoleClick(item.slug)}
                  >
                    <span style={{ fontWeight: 700 }}>{item.name}</span>
                    <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{item.desc}</span>
                  </button>
                ))}
              </div>

              <div className="drawer-group-title">Services</div>
              <div className="drawer-nav-list">
                {SERVICES_MENU.columns.flat().map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="drawer-nav-item"
                    style={{ color: '#E2E8F0' }}
                  >
                    <span style={{ fontWeight: 700 }}>{item.name}</span>
                    <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{item.desc}</span>
                  </a>
                ))}
              </div>

              <div className="drawer-group-title">Industries</div>
              <div className="drawer-nav-list">
                {INDUSTRIES_MENU.columns.flat().map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="drawer-nav-item"
                    style={{ color: '#E2E8F0' }}
                  >
                    <span style={{ fontWeight: 700 }}>{item.name}</span>
                    <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{item.desc}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="drawer-footer-action">
              <button 
                type="button" 
                className="btn-connect"
                style={{ width: '100%' }}
                onClick={() => {
                  setMobileDrawerOpen(false);
                  handleConnect();
                }}
              >
                Connect With Us
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
