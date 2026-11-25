import React, { useRef, useEffect, useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Play, X, ArrowUpRight } from 'lucide-react';
import '../styles/industriesArchive.css';

/**
 * Leon Vasari: Curved 3D VHS Archive (Recreated for Arora Tech Industries)
 * 
 * Features:
 * - 3D Curved Arc Shelf receding into depth (P = 1400px, shallow bowl)
 * - 12 Specialized Industry Domains rendered 3 times (36 items total with seamless modulo wrapping)
 * - Center active tape turned 90° facing user with authentic photography & interactive 3D pointer tilt
 * - Spines get smaller, darker and tightly packed toward both edges
 * - Halftone vertical kanji in background (産業 / の記憶)
 * - Floating floor shadow & play ring badge
 * - Dynamic caption with smooth mask slide
 * - Timeline ruler along the bottom with gliding cobalt indicator dot
 * - Interactive full-screen paper detail sheet with ink blot reveal
 */

const INDUSTRIES_DATA = [
  {
    id: 'fintech',
    title: 'FinTech & Payments',
    romaji: 'KINYU KOGAKU',
    kanji: '金融工学',
    year: 2018,
    genre: 'FINANCIAL ARCHITECTURE',
    min: '14 Specialists',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    synopsis: 'PCI-DSS certified payment gateways, real-time banking ledger systems, sub-second transaction routing, and automated fraud-detection architectures for high-growth financial institutions.',
    credit: 'Domain Practice Lead: Arora FinTech Guild · 金融テクノロジー'
  },
  {
    id: 'healthtech',
    title: 'HealthTech & Telehealth',
    romaji: 'ENKAKU IRYO',
    kanji: '遠隔医療',
    year: 2019,
    genre: 'CLINICAL DIGITAL SYSTEMS',
    min: '18 Specialists',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    synopsis: 'HIPAA-compliant telehealth platforms, EHR/FHIR interoperability APIs, encrypted patient video consultation systems, and zero-trust clinical data warehousing.',
    credit: 'Domain Practice Lead: Arora Health Systems · ヘルスケア開発'
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce & Retail',
    romaji: 'DENSHI SHOTORIHI',
    kanji: '電子商取引',
    year: 2020,
    genre: 'HIGH-VOLUME COMMERCE',
    min: '22 Specialists',
    img: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Enterprise Shopify Plus headless Hydrogen storefronts, automated multi-warehouse inventory synchronization, custom checkout extensions, and sub-second Core Web Vitals.',
    credit: 'Domain Practice Lead: Arora Commerce Engineering · 小売ソリューション'
  },
  {
    id: 'saas',
    title: 'SaaS & Enterprise B2B',
    romaji: 'KURAUDO KIBAN',
    kanji: 'クラウド基盤',
    year: 2021,
    genre: 'MULTI-TENANT PLATFORMS',
    min: '26 Specialists',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Resilient multi-tenant cloud architectures, granular role-based access permissions, automated subscription billing, and real-time executive analytics dashboards.',
    credit: 'Domain Practice Lead: Arora Cloud Platforms · エンタープライズ'
  },
  {
    id: 'logistics',
    title: 'Logistics & Supply Chain',
    romaji: 'BUTSURYU JOHO',
    kanji: '物流情報',
    year: 2022,
    genre: 'FLEET & TELEMATICS',
    min: '16 Specialists',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Automated warehouse dispatch management portals, real-time IoT GPS fleet tracking endpoints, dynamic route optimization, and barcode logistics sync pipelines.',
    credit: 'Domain Practice Lead: Arora Supply Systems · 物流エンジニアリング'
  },
  {
    id: 'ai-autonomous',
    title: 'AI & Autonomous Systems',
    romaji: 'JINKO CHINO',
    kanji: '人工知能',
    year: 2023,
    genre: 'NEURAL PIPELINES',
    min: '20 Specialists',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Autonomous multi-agent LLM systems, corporate enterprise RAG pipelines grounded in proprietary data, vector search architectures, and high-throughput inference caching.',
    credit: 'Domain Practice Lead: Arora AI Research Lab · 人工知能研究所'
  },
  {
    id: 'edtech',
    title: 'EdTech & Digital Learning',
    romaji: 'KYOIKU GIJUTSU',
    kanji: '教育技術',
    year: 2023,
    genre: 'KNOWLEDGE PLATFORMS',
    min: '15 Specialists',
    img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Interactive video learning management systems (LMS), gamified student progress tracking, live interactive digital canvases, and high-concurrency exam proctoring engines.',
    credit: 'Domain Practice Lead: Arora EdTech Guild · 教育プラットフォーム'
  },
  {
    id: 'automotive',
    title: 'Automotive & Connected Fleet',
    romaji: 'JIDOSHA GIJUTSU',
    kanji: '自動車技術',
    year: 2024,
    genre: 'VEHICLE TELEMATICS',
    min: '14 Specialists',
    img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Next-generation EV cockpit dashboard interfaces, CAN-bus IoT telemetry ingestion hubs, remote vehicle management apps, and predictive maintenance streaming pipelines.',
    credit: 'Domain Practice Lead: Arora Connected Mobility · モビリティ開発'
  },
  {
    id: 'cybersecurity',
    title: 'CyberSecurity & Zero-Trust',
    romaji: 'JOHO SEKYURITI',
    kanji: '情報セキュリティ',
    year: 2024,
    genre: 'DEFENSE & COMPLIANCE',
    min: '12 Specialists',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Zero-trust enterprise network architectures, SOC-2 / ISO compliance automation, hardware security key authentication, and automated vulnerability scanning pipelines.',
    credit: 'Domain Practice Lead: Arora Security Operations · セキュリティ監査'
  },
  {
    id: 'media',
    title: 'Media & Streaming Platforms',
    romaji: 'EIZO HAISHIN',
    kanji: '映像配信',
    year: 2025,
    genre: 'DIGITAL BROADCAST',
    min: '17 Specialists',
    img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Ultra-low latency HLS/WebRTC streaming video networks, cloud encoding pipelines, digital creator monetization portals, and high-bandwidth DRM protection systems.',
    credit: 'Domain Practice Lead: Arora Media Labs · デジタル映像'
  },
  {
    id: 'hospitality',
    title: 'Hospitality & Real Estate',
    romaji: 'SHUKUHAKU FUDOSAN',
    kanji: '宿泊不動産',
    year: 2025,
    genre: 'SMART BOOKING ENGINES',
    min: '13 Specialists',
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    synopsis: 'Dynamic hotel property pricing engines, interactive 3D virtual tour integrations, multi-channel booking synchronization, and concierge guest management applications.',
    credit: 'Domain Practice Lead: Arora PropTech Group · 不動産システム'
  },
  {
    id: 'government',
    title: 'Government & Public Sector',
    romaji: 'KOKYO SEISAKU',
    kanji: '公共政策',
    year: 2026,
    genre: 'CIVIC INFRASTRUCTURE',
    min: '19 Specialists',
    img: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    synopsis: 'High-security citizen service portals, WCAG AAA accessibility compliance, government identity verification APIs, and resilient multi-cloud public sector infrastructure.',
    credit: 'Domain Practice Lead: Arora Public Sector · 公共ソリューション'
  }
];

export default function IndustriesArchive({ onHireSpecialists }) {
  const containerRef = useRef(null);
  const viewportRef = useRef(null);
  const tapesRef = useRef([]);

  // Active state
  const [activeIndex, setActiveIndex] = useState(5);
  const [detailOpen, setDetailOpen] = useState(false);
  const [activeFilm, setActiveFilm] = useState(INDUSTRIES_DATA[5]);

  // Animation Refs
  const animFrameId = useRef(null);
  const sRef = useRef(17); // Start at index 5 + 12 (middle loop)
  const TRef = useRef(17);
  const isDraggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartT = useRef(0);
  const hasDragged = useRef(false);

  // Mouse tilt tracking
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const tiltXRef = useRef(0);
  const tiltYRef = useRef(0);

  // Precomputed XS integral table
  const totalItems = 36;
  const numFilms = INDUSTRIES_DATA.length;

  const handlePrev = () => {
    TRef.current = Math.round(TRef.current) - 1;
  };

  const handleNext = () => {
    TRef.current = Math.round(TRef.current) + 1;
  };

  const handleTapeClick = (tapeIndex) => {
    if (hasDragged.current) return;
    const currentNorm = ((Math.round(TRef.current) % numFilms) + numFilms) % numFilms;
    const targetNorm = tapeIndex % numFilms;
    
    if (currentNorm === targetNorm) {
      // Clicked active center cover -> open detail
      setDetailOpen(true);
    } else {
      // Clicked side spine -> rotate into center
      let diff = targetNorm - currentNorm;
      if (diff > numFilms / 2) diff -= numFilms;
      if (diff < -numFilms / 2) diff += numFilms;
      TRef.current = Math.round(TRef.current) + diff;
    }
  };

  const handleTimelineClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetIdx = Math.round(ratio * (numFilms - 1));
    
    const currentNorm = ((Math.round(TRef.current) % numFilms) + numFilms) % numFilms;
    let diff = targetIdx - currentNorm;
    if (diff > numFilms / 2) diff -= numFilms;
    if (diff < -numFilms / 2) diff += numFilms;
    TRef.current = Math.round(TRef.current) + diff;
  };

  // Pointer move tracking for 3D cover tilt
  const handleMouseMove = (e) => {
    mouseX.current = e.clientX;
    mouseY.current = e.clientY;
  };

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    // Pointer events for dragging
    const onPointerDown = (e) => {
      isDraggingRef.current = true;
      hasDragged.current = false;
      dragStartX.current = e.clientX;
      dragStartT.current = TRef.current;
      vp.classList.add('is-dragging');
    };

    const onPointerMove = (e) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - dragStartX.current;
      if (Math.abs(dx) > 4) hasDragged.current = true;
      
      const W = window.innerWidth;
      const H = Math.min(window.innerHeight * 0.47, W * 0.33);
      const ws = H * 142 / 840;
      const gap = H * 0.035;

      TRef.current = dragStartT.current - dx / (ws + gap);
    };

    const onPointerUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      vp.classList.remove('is-dragging');
      TRef.current = Math.round(TRef.current);
    };

    vp.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // ========================================================================
    // MAIN 3D ARC PHYSICS & RENDERING LOOP
    // ========================================================================
    let lastTime = performance.now();

    // Helper functions
    function B(r) {
      if (Math.abs(r) < 1) {
        return (r + Math.sin(Math.PI * r) / Math.PI) / 2;
      }
      return r > 0 ? 0.5 : -0.5;
    }

    const loop = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const innerW = window.innerWidth;
      const innerH = window.innerHeight;
      const isMobile = innerW <= 767;

      // Dimension tokens
      const H = isMobile 
        ? Math.min(innerW * 0.68, innerH * 0.40)
        : Math.min(innerH * 0.47, innerW * 0.33);

      const ws = H * 142 / 840;
      const d = H * 474 / 900;
      const gap = H * 0.035;
      const U = isMobile ? H * 1.05 : H * 1.3;
      const P = 1400; // perspective

      // Precompute XS integral table (0 to 3U in 2px steps)
      const numSteps = Math.ceil((3 * U) / 2);
      const XS = new Float32Array(numSteps);
      let acc = 0;
      for (let step = 0; step < numSteps; step++) {
        const uVal = step * 2;
        acc += 2 / (1 + Math.pow(uVal / U, 1.6));
        XS[step] = acc;
      }

      const xsc = (u) => {
        const sign = Math.sign(u);
        const idx = Math.min(numSteps - 1, Math.floor(Math.abs(u) / 2));
        return sign * XS[idx];
      };

      // Spring physics toward target T
      const springK = isDraggingRef.current ? 18 : 5.2;
      sRef.current += (TRef.current - sRef.current) * (1 - Math.exp(-springK * dt));

      // Loop wrap maintenance (keep s within bounds)
      if (sRef.current > 24) {
        sRef.current -= 12;
        TRef.current -= 12;
      } else if (sRef.current < 6) {
        sRef.current += 12;
        TRef.current += 12;
      }

      // Active integer index
      const curActive = ((Math.round(sRef.current) % numFilms) + numFilms) % numFilms;
      setActiveIndex(curActive);
      setActiveFilm(INDUSTRIES_DATA[curActive]);

      // 3D Cover tilt interpolation
      const shelfCenterY = innerH * 0.41;
      const dxFromCenter = mouseX.current - innerW / 2;
      const dyFromCenter = mouseY.current - shelfCenterY;
      const isOverCover = Math.abs(dxFromCenter) < 0.55 * d && Math.abs(dyFromCenter) < 0.55 * H;

      let targetTiltY = 0;
      let targetTiltX = 0;

      if (isOverCover && Math.abs(TRef.current - sRef.current) < 0.3 && !detailOpen) {
        targetTiltY = (dxFromCenter / (0.55 * d)) * 8;
        targetTiltX = -(dyFromCenter / (0.5 * H)) * 5;
      } else {
        targetTiltY = (dxFromCenter / innerW) * 4;
        targetTiltX = 0;
      }

      tiltYRef.current += (targetTiltY - tiltYRef.current) * (1 - Math.exp(-7 * dt));
      tiltXRef.current += (targetTiltX - tiltXRef.current) * (1 - Math.exp(-7 * dt));

      // Update each tape in 3D arc
      for (let v = 0; v < totalItems; v++) {
        const tapeEl = tapesRef.current[v];
        if (!tapeEl) continue;

        // Relative index in [-18, 18)
        let r = ((v - sRef.current) % totalItems + totalItems) % totalItems;
        if (r >= 18) r -= totalItems;

        // Open state: 0 for spine, 1 for open cover
        let o = Math.max(0, 1 - Math.abs(r));
        o = o * o * (3 - 2 * o); // smoothstep

        // Arc length from centre
        const u = r * (ws + gap) + (d - ws + 1.4 * gap) * B(r);

        if (Math.abs(u) > U * 1.95) {
          tapeEl.style.display = 'none';
          continue;
        } else {
          tapeEl.style.display = 'block';
        }

        // Screen scale
        const sc = 1 / (1 + Math.pow(Math.abs(u) / U, 1.6));
        const k = 1 / sc;

        // 3D Coordinates
        const z = P * (1 - k) + o * H * 0.1;
        const x = xsc(u) * k;
        const y = (H * 0.5 * (1 - sc) * 0.42 + o * H * 0.012) * k;

        // Rotations
        const rotY = Math.sign(u) * Math.min(1, Math.abs(u) / U) * 26 * (1 - o) - 90 * o + tiltYRef.current * o;
        const rotX = tiltXRef.current * o;

        tapeEl.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
        tapeEl.style.zIndex = Math.round(3000 + z);

        // Face shading
        const spineFace = tapeEl.querySelector('.archive-face-spine');
        const coverFace = tapeEl.querySelector('.archive-face-cover');

        if (spineFace) {
          const spineShade = Math.min(0.6, o * 0.55 + (1 - sc) * 0.32);
          spineFace.style.setProperty('--shade', spineShade.toFixed(3));
          spineFace.style.setProperty('--ws', `${ws.toFixed(1)}px`);
          spineFace.style.transform = `translateZ(${(d / 2).toFixed(1)}px)`;
        }

        if (coverFace) {
          const coverShade = (1 - o) * 0.82;
          coverFace.style.setProperty('--shade', coverShade.toFixed(3));
          coverFace.style.setProperty('--d', `${d.toFixed(1)}px`);
          coverFace.style.transform = `rotateY(90deg) translateZ(${(ws / 2).toFixed(1)}px)`;
        }
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrameId.current);
      vp.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [detailOpen]);

  return (
    <section 
      className="industries-archive-section" 
      ref={containerRef}
      id="industries"
      onMouseMove={handleMouseMove}
      aria-label="Arora Tech Industries VHS Archive"
    >
      {/* ====================================================================
          PAPER GRAIN TEXTURE (Fixed blend layer)
          ==================================================================== */}
      <svg className="archive-paper-grain" xmlns="http://www.w3.org/2000/svg">
        <filter id="archive-grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 .45  0 0 0 0 .42  0 0 0 0 .38  0 0 0 .22 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#archive-grain-filter)" />
      </svg>

      {/* ====================================================================
          1. TOP BAR
          ==================================================================== */}
      <header className="archive-topbar">
        <div className="archive-topbar-left">
          <a href="#industries" className="archive-brand-link">ARORA TECH SOLUTIONS</a>
          <span className="archive-topbar-line" />
          <span className="archive-subbrand">INDUSTRY ARCHIVE</span>
        </div>

        <div className="archive-topbar-right">
          <a href="#talent-showcase" className="archive-nav-link">TALENT</a>
          <a href="#ai-readability" className="archive-nav-link">AI READABILITY</a>
          <button type="button" className="archive-burger-btn" aria-label="Menu">
            <span className="archive-burger-line" />
            <span className="archive-burger-line" />
          </button>
        </div>
      </header>

      {/* ====================================================================
          2. HALFTONE VERTICAL KANJI (Background Layer)
          ==================================================================== */}
      <div className="archive-kanji-col archive-kanji-left" aria-hidden="true">
        産業
      </div>
      <div className="archive-kanji-col archive-kanji-right" aria-hidden="true">
        の記憶
      </div>

      {/* ====================================================================
          3. FLOOR SHADOW
          ==================================================================== */}
      <div className="archive-floor-shadow" aria-hidden="true" />

      {/* ====================================================================
          4. 3D CURVED SHELF VIEWPORT & TAPES
          ==================================================================== */}
      <div className="archive-shelf-viewport" ref={viewportRef}>
        <div className="archive-stage">
          {Array.from({ length: totalItems }).map((_, v) => {
            const filmIdx = v % numFilms;
            const item = INDUSTRIES_DATA[filmIdx];

            return (
              <div 
                key={`tape-${v}`}
                className="archive-tape"
                ref={(el) => (tapesRef.current[v] = el)}
                onClick={() => handleTapeClick(v)}
                role="button"
                tabIndex={0}
                aria-label={`${item.title} industry tape`}
              >
                {/* 1. Spine Face (.sp) */}
                <div className="archive-face archive-face-spine">
                  <div className="spine-inner">
                    <span className="spine-top-badge">{item.genre.split(' ')[0]}</span>
                    <span className="spine-title">{item.title}</span>
                    <div className="spine-bottom-badge">
                      <span className="spine-vhs-box">VHS</span>
                    </div>
                  </div>
                </div>

                {/* 2. Cover Face (.cv) */}
                <div className="archive-face archive-face-cover">
                  {/* Real Industry Photo Background */}
                  <div 
                    className="cover-bg-image" 
                    style={{ backgroundImage: `url(${item.img})` }} 
                  />
                  <div className="cover-duotone-veil" />
                  
                  <div className="cover-inner-content">
                    <div className="cover-header">
                      <span className="cover-brand-kicker">AN ARORA TECH CASE ARCHIVE</span>
                      <span className="cover-badge-vhs">VHS</span>
                    </div>
                    <div className="cover-footer">
                      <h4 className="cover-industry-title">{item.title}</h4>
                      <span className="cover-meta-stats">{item.year} &bull; {item.genre}</span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* ====================================================================
          5. PLAY RING BADGE (Centered on active cover lower-left corner)
          ==================================================================== */}
      {!detailOpen && (
        <div 
          className="archive-play-ring" 
          aria-hidden="true"
          style={{
            left: `calc(50% - min(16.5vw, 237px) * 0.5 - 6px)`,
            top: `calc(var(--cy) + var(--H) * 0.36)`
          }}
        >
          <Play className="play-triangle-icon" />
        </div>
      )}

      {/* ====================================================================
          6. CAPTION UNDER COVER
          ==================================================================== */}
      <div className="archive-caption-row">
        <div className="caption-mask">
          <h3 className="caption-title" key={`title-${activeFilm.id}`}>
            {activeFilm.title}
          </h3>
        </div>

        <div className="caption-mask">
          <span className="caption-subtitle">
            {activeFilm.romaji} / {activeFilm.kanji}
          </span>
        </div>

        <div className="caption-rule" />

        <div className="caption-mask">
          <span className="caption-year-meta">
            {activeFilm.year} &mdash; {activeFilm.genre}
          </span>
        </div>
      </div>

      {/* Left & Right Arrow Buttons */}
      <button 
        type="button" 
        className="archive-arrow-btn archive-arrow-left" 
        onClick={handlePrev}
        aria-label="Previous industry"
      >
        <ChevronLeft size={22} strokeWidth={1.5} />
      </button>

      <button 
        type="button" 
        className="archive-arrow-btn archive-arrow-right" 
        onClick={handleNext}
        aria-label="Next industry"
      >
        <ChevronRight size={22} strokeWidth={1.5} />
      </button>

      {/* ====================================================================
          7. TIMELINE RULER ALONG BOTTOM
          ==================================================================== */}
      <div className="archive-timeline" onClick={handleTimelineClick} aria-label="Timeline navigation">
        <div className="timeline-axis-line" />
        <div className="timeline-ticks-container">
          {INDUSTRIES_DATA.map((ind, idx) => {
            const isMajor = idx % 2 === 0;
            const leftPct = (idx / (numFilms - 1)) * 100;
            return (
              <React.Fragment key={`tick-${ind.id}`}>
                <div 
                  className={`timeline-tick ${isMajor ? 'is-major' : 'is-minor'}`}
                  style={{ left: `${leftPct}%` }}
                />
                {isMajor && (
                  <span 
                    className="timeline-year-label"
                    style={{ left: `${leftPct}%` }}
                  >
                    {ind.year}
                  </span>
                )}
              </React.Fragment>
            );
          })}
          {/* Gliding Cobalt Dot */}
          <div 
            className="timeline-dot" 
            style={{ left: `${(activeIndex / (numFilms - 1)) * 100}%` }} 
          />
        </div>
      </div>

      {/* ====================================================================
          8. FOOTER METADATA
          ==================================================================== */}
      <footer className="archive-footer-bar">
        <span className="archive-lbl">&copy; ARORA TECH SOLUTIONS. ALL RIGHTS RESERVED.</span>
        <span className="archive-lbl">CASE STUDIES / PROVEN INDUSTRY EXPERTISE</span>
      </footer>

      {/* ====================================================================
          9. INTERACTIVE FULL-SCREEN PAPER DETAIL SHEET
          ==================================================================== */}
      <div className={`archive-detail-sheet ${detailOpen ? 'is-open' : ''}`} aria-hidden={!detailOpen}>
        <button 
          type="button" 
          className="detail-close-btn"
          onClick={() => setDetailOpen(false)}
        >
          <X size={14} />
          <span>CLOSE / 閉じる</span>
        </button>

        <span className="detail-brand-badge">ARORA TECH SOLUTIONS &mdash; INDUSTRY CASE ARCHIVE</span>

        <div className="detail-grid">
          {/* Left Column: Synopsis, Metrics & CTA */}
          <div className="detail-col-left">
            <span className="detail-subtitle-lbl">{activeFilm.romaji} / {activeFilm.kanji}</span>
            <h2 className="detail-title">{activeFilm.title}</h2>
            <div className="detail-meta-line">{activeFilm.year} / {activeFilm.genre} / {activeFilm.min}</div>
            <p className="detail-synopsis">{activeFilm.synopsis}</p>
            <span className="detail-credit-italic">{activeFilm.credit}</span>
            
            <button 
              type="button" 
              className="detail-cta-btn"
              onClick={() => {
                setDetailOpen(false);
                if (onHireSpecialists) {
                  onHireSpecialists(activeFilm.id);
                } else {
                  const el = document.getElementById('enquiry-section') || document.getElementById('quote');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span>Hire {activeFilm.title.split('&')[0].trim()} Specialists</span>
              <ArrowUpRight size={15} />
            </button>
          </div>

          {/* Right Column: Real Industry Poster */}
          <div className="detail-col-right">
            <div className="detail-poster-wrap">
              <img 
                src={activeFilm.img} 
                alt={activeFilm.title} 
                className="detail-poster-img"
              />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
