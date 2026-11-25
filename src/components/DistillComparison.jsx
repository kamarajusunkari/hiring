import React, { useRef, useEffect, useState } from 'react';
import '../styles/distillComparison.css';

/**
 * Distill "Built for people. Read by machines." Comparison Hero Section
 * 
 * Features:
 * - Top: AI Readability hero copy with serif headline and orange action pill
 * - Middle: Continuous conveyor belt of 6 Kessler mini website cards
 * - Center: Glowing orange vertical scanner line at Lx (50% screen width)
 * - Scanner effect:
 *   - Right of line: Live rendered website card
 *   - At the line: Card dissolves into dense cloud of flickering orange pixel particles
 *   - Left of line: Plain HTML code twin revealed exactly where card dissolved
 * - Counter: Floating badge tracking token reduction and percentage
 * - Real-time Canvas 2D particle simulation + sparks
 * - Full dragging with inertia, hover slow-down, and reverse scrubbing
 */

const KESSLER_DATA = [
  {
    id: 'home',
    title: 'Home',
    original: 70411,
    distilled: 6140,
    saved: 64271,
    percent: '91% less',
    url: 'kessler.co/',
    bgImg: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0e201fcd-ffc0-46a0-bd06-faa07bf0e84b.webp',
    htmlCode: `<h1>Kessler — Advanced materials</h1>
<p>
  Advanced materials for a stronger
  tomorrow. Ceramic-matrix alloys made
  with desert sand and solar heat.
</p>
<h2>At a glance</h2>
<ul>
  <li>Strength: 200x steel by weight</li>
  <li>Emissions: 87% lower</li>
  <li>Plants: Nevada, Atacama, Oman</li>
  <li>Founded: 2019</li>
</ul>
<h2>Products</h2>
<ul>
  <li>K-Alloy 7 — structural</li>
  <li>Basalt fibre — tensile</li>
  <li>Ceramic matrix — thermal</li>
</ul>
<a href="/demo">Book a demo</a>`
  },
  {
    id: 'price',
    title: 'Pricing',
    original: 41208,
    distilled: 4960,
    saved: 36248,
    percent: '88% less',
    url: 'kessler.co/pricing',
    bgImg: null,
    htmlCode: `<h1>Kessler — Pricing</h1>
<p>
  Three plans for every scale of
  production. Start small, scale to
  full foundry output.
</p>
<h2>Pilot — $299 / mo</h2>
<ul>
  <li>Sample batches: 4 / mo</li>
  <li>Alloy grades: 2</li>
  <li>Support: email</li>
</ul>
<h2>Industrial — $2,400 / mo</h2>
<ul>
  <li>Tonnage: up to 40 t / mo</li>
  <li>Alloy grades: all</li>
  <li>Certification: ISO 9001</li>
  <li>Support: dedicated engineer</li>
</ul>`
  },
  {
    id: 'case',
    title: 'Case Study',
    original: 98432,
    distilled: 6300,
    saved: 92132,
    percent: '94% less',
    url: 'kessler.co/cases/atlas-rail',
    bgImg: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/2bebad68-8177-446a-9550-d64074166364.webp',
    htmlCode: `<h1>Case study: Atlas Rail</h1>
<p>
  How Atlas Rail cut track weight by
  a third in eighteen months.
</p>
<h2>The challenge</h2>
<p>
  1,200 km of desert line, rails
  warping above 50 °C every summer.
</p>
<h2>The result</h2>
<ul>
  <li>34% lighter track sections</li>
  <li>3.4x longer service life</li>
  <li>0 unplanned closures in 2025</li>
</ul>
<p>
  "We stopped losing summers."
  — Head of Infrastructure
</p>`
  },
  {
    id: 'vision',
    title: 'Vision',
    original: 55870,
    distilled: 8215,
    saved: 47655,
    percent: '85% less',
    url: 'kessler.co/vision',
    tile1: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e80ba08d-d7b6-4b27-b0cd-8d0ad09c788c.webp',
    tile2: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/62b0d7c1-3eb7-44bd-9b19-57b975fb250f.webp',
    htmlCode: `<article>
  <h1>The Kessler vision</h1>
  <p>
    Materials that outlast the people
    who made them.
  </p>
  <p>
    We build where the sun is
    strongest and the sand is free:
    three plants, one closed loop.
  </p>
  <h2>Principles</h2>
  <ol>
    <li>Heat from the sun, not gas</li>
    <li>Sand in, scrap back in</li>
    <li>Publish every number</li>
  </ol>
</article>`
  },
  {
    id: 'alloy',
    title: 'Alloy',
    original: 63904,
    distilled: 5512,
    saved: 58392,
    percent: '91% less',
    url: 'kessler.co/products/k-alloy-7',
    bgImg: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/156ff74d-ee37-4443-8f3a-11ae2095ed4c.webp',
    htmlCode: `<h1>K-Alloy 7</h1>
<p>The carbon-negative alloy.</p>
<h2>Specification</h2>
<ul>
  <li>Tensile strength: 1,940 MPa</li>
  <li>Density: 2.9 g/cm³</li>
  <li>Max service temp: 1,150 °C</li>
  <li>CO₂: −0.4 kg per kg made</li>
</ul>
<h2>Uses</h2>
<ul>
  <li>Rail, bridges, turbine housings</li>
</ul>
<a href="/k-alloy-7.pdf">Datasheet</a>`
  },
  {
    id: 'journal',
    title: 'Journal',
    original: 47316,
    distilled: 7602,
    saved: 39714,
    percent: '84% less',
    url: 'kessler.co/journal',
    post1: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/7b6ad638-89ec-4dec-be74-d36fbff3ea53.webp',
    post2: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/62b0d7c1-3eb7-44bd-9b19-57b975fb250f.webp',
    post3: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0e201fcd-ffc0-46a0-bd06-faa07bf0e84b.webp',
    htmlCode: `<h1>Kessler Journal</h1>
<p>Field notes from the flats.</p>
<article>
  <h2>Mining nothing but light</h2>
  <time>2026-03-14</time>
</article>
<article>
  <h2>Atacama, year one</h2>
  <time>2026-02-02</time>
</article>
<article>
  <h2>Why we melt sand at noon</h2>
  <time>2026-01-09</time>
</article>`
  }
];

// Color palette for orange dissolve particles
const PALETTE = ['#FF4A12', '#FF5A1F', '#FF6B2C', '#FF8A3D', '#FFB06A', '#FFD9B5', '#FFF3E6'];

// 32-bit Integer Hash
function hash3D(a, b, c) {
  let h = (Math.imul(a, 374761393) + Math.imul(b, 668265263) + Math.imul(c, 2147483647)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

export default function DistillComparison() {
  const containerRef = useRef(null);
  const beltRef = useRef(null);
  const canvasRef = useRef(null);
  const cardRefs = useRef([]);
  const codeRefs = useRef([]);

  // Counter state
  const [tokenDisplay, setTokenDisplay] = useState('−48,193');
  const [percentDisplay, setPercentDisplay] = useState('91% less');

  // Animation & Physics Refs
  const animFrameId = useRef(null);
  const offsetRef = useRef(0);
  const velRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const lastDragTime = useRef(0);
  const lastDragX = useRef(0);
  const hoverWeight = useRef(0);
  const sparksRef = useRef([]);
  const tokenTargetRef = useRef(48193);
  const tokenCurrentRef = useRef(48193);

  useEffect(() => {
    const beltEl = beltRef.current;
    const canvas = canvasRef.current;
    if (!beltEl || !canvas) return;

    const ctx = canvas.getContext('2d');
    let width = beltEl.clientWidth;
    let height = beltEl.clientHeight;

    // Measure geometry
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const handleResize = () => {
      if (!beltEl || !canvas) return;
      width = beltEl.clientWidth;
      height = beltEl.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    };

    window.addEventListener('resize', handleResize);

    // Initial offset: W/2 - 0.62 * cw
    const firstCard = cardRefs.current[0];
    const cw = firstCard ? firstCard.offsetWidth : width * 0.46;
    offsetRef.current = width / 2 - 0.62 * cw;

    // Pointer Events for 1:1 Dragging with Inertia
    const onPointerDown = (e) => {
      isDraggingRef.current = true;
      dragStartX.current = e.clientX;
      dragStartOffset.current = offsetRef.current;
      lastDragX.current = e.clientX;
      lastDragTime.current = performance.now();
      velRef.current = 0;
      if (beltEl.setPointerCapture) {
        beltEl.setPointerCapture(e.pointerId);
      }
      beltEl.classList.add('is-dragging');
    };

    const onPointerMove = (e) => {
      if (!isDraggingRef.current) return;
      const now = performance.now();
      const dt = Math.max(8, now - lastDragTime.current);
      const dx = e.clientX - lastDragX.current;

      velRef.current = (dx / dt) * 1000 * 0.8 + velRef.current * 0.2;
      lastDragX.current = e.clientX;
      lastDragTime.current = now;

      offsetRef.current = dragStartOffset.current + (e.clientX - dragStartX.current);
    };

    const onPointerUpOrCancel = (e) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      beltEl.classList.remove('is-dragging');
      if (beltEl.releasePointerCapture) {
        try { beltEl.releasePointerCapture(e.pointerId); } catch (_) { }
      }
    };

    // Horizontal wheel scrub
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        velRef.current -= e.deltaX * 6;
      }
    };

    beltEl.addEventListener('pointerdown', onPointerDown);
    beltEl.addEventListener('pointermove', onPointerMove);
    beltEl.addEventListener('pointerup', onPointerUpOrCancel);
    beltEl.addEventListener('pointercancel', onPointerUpOrCancel);
    beltEl.addEventListener('wheel', onWheel, { passive: false });

    // Hover slowdown
    const onMouseEnter = () => { hoverWeight.current = 1; };
    const onMouseLeave = () => { hoverWeight.current = 0; };
    beltEl.addEventListener('pointerenter', onMouseEnter);
    beltEl.addEventListener('pointerleave', onMouseLeave);

    // ========================================================================
    // MAIN REQUEST ANIMATION FRAME LOOP
    // ========================================================================
    let lastTime = performance.now();

    const loop = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const innerW = window.innerWidth;
      const Lx = innerW / 2;

      // Card dimensions & spacing
      const sampleCard = cardRefs.current[0];
      const cardW = sampleCard ? sampleCard.offsetWidth : innerW * 0.46;
      const cardH = sampleCard ? sampleCard.offsetHeight : window.innerHeight * 0.52;
      const gap = innerW > 767 ? innerW * 0.0475 : innerW * 0.07;
      const span = cardW + gap;
      const period = span * 6;

      // Velocity & Speed
      const autoSpeed = -0.075 * innerW; // leftwards drift
      const targetSpeed = autoSpeed * (1 - 0.65 * hoverWeight.current);

      if (!isDraggingRef.current) {
        velRef.current += (targetSpeed - velRef.current) * (1 - Math.exp(-2.2 * dt));
        offsetRef.current += velRef.current * dt;
      }

      // Clear Canvas
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      let crossingCardFound = false;

      // Update Cards & Codes Position, Clipping & Particle Dissolve
      for (let i = 0; i < 6; i++) {
        const cardEl = cardRefs.current[i];
        const codeEl = codeRefs.current[i];
        const data = KESSLER_DATA[i];
        if (!cardEl || !codeEl) continue;

        // Modulo wrapping
        let x = (((offsetRef.current + i * span + span) % period) + period) % period - span;

        // cut is how many px of the card are past the scanner line Lx
        const cut = Math.max(0, Math.min(cardW, Lx - x));

        // Position Card & Code
        cardEl.style.transform = `translate3d(${x}px, 0, 0)`;
        codeEl.style.transform = `translate3d(${x}px, 0, 0)`;

        if (cut > 0) {
          // Card is crossing or past the line
          if (cut >= cardW) {
            // Entirely past line: hide card completely
            cardEl.style.clipPath = 'inset(0 100% 0 0)';
            cardEl.style.webkitMaskImage = 'none';
            cardEl.style.maskImage = 'none';
          } else {
            // Cut straight edge at the line, soften over 26px
            cardEl.style.clipPath = `inset(0 0 0 ${cut}px round 0 1.6vw 1.6vw 0)`;
            const maskStr = `linear-gradient(90deg, transparent ${cut}px, #000 ${cut + 26}px)`;
            cardEl.style.webkitMaskImage = maskStr;
            cardEl.style.maskImage = maskStr;
          }

          // Code block revealed where card dissolved
          codeEl.style.clipPath = `inset(0 ${cardW - cut}px 0 0)`;
          codeEl.style.visibility = 'visible';

          // Check if this card is currently crossing the scanner line
          if (cut > 0 && cut < cardW) {
            crossingCardFound = true;
            const progress = cut / cardW;
            tokenTargetRef.current = Math.round((data.original - data.distilled) * progress);
            setPercentDisplay(data.percent);
          }
        } else {
          // Entirely right of the line: live card visible, code hidden
          cardEl.style.clipPath = 'none';
          cardEl.style.webkitMaskImage = 'none';
          cardEl.style.maskImage = 'none';
          codeEl.style.visibility = 'hidden';
        }

        // ====================================================================
        // DISSOLVE FX (Canvas Drawing)
        // ====================================================================
        const cardRight = x + cardW;
        if (cut > 0 && cardRight > Lx) {
          const cardTopInCanvas = 70; // 70px top inside belt
          const hazeW = Math.min(150, cardRight - Lx);

          // 1. Haze
          if (hazeW > 0) {
            const hazeGrad = ctx.createLinearGradient(Lx, 0, Lx + hazeW, 0);
            hazeGrad.addColorStop(0, 'rgba(255, 96, 40, 0.42)');
            hazeGrad.addColorStop(1, 'rgba(255, 96, 40, 0)');
            ctx.fillStyle = hazeGrad;
            ctx.fillRect(Lx, cardTopInCanvas, hazeW, cardH);
          }

          // 2. Dithered Particles fixed to card surface (3px grid in card-local coords)
          const R = 0.3 * cardW;
          const startCol = Math.floor(cut / 3);
          const endCol = Math.min(Math.floor(cardW / 3), Math.floor((cut + R) / 3));
          const numRows = Math.floor(cardH / 3);
          const timeSec = time / 1000;

          for (let gx = startCol; gx <= endCol; gx++) {
            const sx = x + gx * 3;
            const d = sx - Lx;
            if (d < 0 || d > R) continue;

            const p = Math.pow(Math.max(0, 1 - d / R), 1.7);

            for (let gy = -5; gy <= numRows + 5; gy++) {
              // Twinkle skip: about 22% of dots blink 9 times per second
              if (hash3D(gx, gy, Math.floor(timeSec * 9) + 97) < 0.22) continue;

              const isInside = gy >= 0 && gy < numRows;
              const threshold = isInside
                ? p * 0.92
                : p * 0.16 * Math.max(0, 1 - Math.abs(gy < 0 ? -gy : gy - numRows) / 5);

              if (hash3D(gx, gy, i) < threshold) {
                const h2 = hash3D(gy, gx, i + 31);
                let color;
                if (d <= 10) {
                  // White-hot pale color within 10px of line
                  color = PALETTE[4 + Math.floor(h2 * 3)];
                } else {
                  color = PALETTE[Math.min(6, Math.floor(h2 * h2 * 7))];
                }

                const size = 1.1 + h2 * 1.7;
                const jx = (hash3D(gx, gy, 101) - 0.5) * 1.6;
                const jy = (hash3D(gx, gy, 202) - 0.5) * 1.6;
                const sy = cardTopInCanvas + gy * 3;

                ctx.fillStyle = color;
                ctx.fillRect(sx + jx, sy + jy, size, size);
              }
            }
          }

          // 3. Free Sparks Spawning
          if (Math.random() < 0.7) {
            sparksRef.current.push({
              x: Lx + Math.random() * 30,
              y: cardTopInCanvas + Math.random() * cardH,
              vx: -30 + Math.random() * 70 + 0.6 * velRef.current,
              vy: (Math.random() - 0.5) * 50,
              size: 0.8 + Math.random() * 1.8,
              color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
              life: 1.0,
              decay: 0.9 + Math.random() * 1.8
            });
          }
        }
      }

      // Update & Draw Sparks
      for (let sIdx = sparksRef.current.length - 1; sIdx >= 0; sIdx--) {
        const spark = sparksRef.current[sIdx];
        spark.x += spark.vx * dt;
        spark.y += spark.vy * dt;
        spark.life -= spark.decay * dt;

        if (spark.life <= 0) {
          sparksRef.current.splice(sIdx, 1);
          continue;
        }

        const alpha = Math.min(1, spark.life * 2.2);
        ctx.fillStyle = spark.color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(spark.x, spark.y, spark.size, spark.size);
        ctx.globalAlpha = 1.0;
      }

      ctx.restore();

      // Smooth Token Counter Easing
      if (crossingCardFound) {
        tokenCurrentRef.current += (tokenTargetRef.current - tokenCurrentRef.current) * (1 - Math.exp(-14 * dt));
        setTokenDisplay(`−${Math.round(tokenCurrentRef.current).toLocaleString('en-US')}`);
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', handleResize);
      beltEl.removeEventListener('pointerdown', onPointerDown);
      beltEl.removeEventListener('pointermove', onPointerMove);
      beltEl.removeEventListener('pointerup', onPointerUpOrCancel);
      beltEl.removeEventListener('pointercancel', onPointerUpOrCancel);
      beltEl.removeEventListener('wheel', onWheel);
      beltEl.removeEventListener('pointerenter', onMouseEnter);
      beltEl.removeEventListener('pointerleave', onMouseLeave);
    };
  }, []);

  return (
    <section className="distill-section" id="distill-comparison" ref={containerRef}>

      {/* ====================================================================
          1. TOP NAVIGATION BAR (56px)
          ==================================================================== */}
      <nav className="distill-nav" aria-label="Distill Navigation">
        {/* Logo: 19x23 droplet + Distill */}
        <a href="#distill" className="distill-logo">
          <svg className="distill-logo-icon" viewBox="0 0 19 23" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 0C9.5 0 0 11.5 0 16.5C0 20.09 4.25 23 9.5 23C14.75 23 19 20.09 19 16.5C19 11.5 9.5 0 9.5 0Z" />
            <path d="M12.5 13C12.5 16 10.5 18 8 18" stroke="var(--distill-bg)" strokeWidth="1.7" strokeLinecap="round" fill="none" />
          </svg>
          <span className="distill-logo-text">Distill</span>
        </a>

        {/* Links */}
        <div className="distill-nav-links">
          <a href="#product" className="distill-nav-link">
            <span>Product</span>
            <svg className="distill-chevron" width="8" height="5" viewBox="0 0 8 5" fill="none">
              <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#use-cases" className="distill-nav-link">
            <span>Use cases</span>
            <svg className="distill-chevron" width="8" height="5" viewBox="0 0 8 5" fill="none">
              <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#resources" className="distill-nav-link">
            <span>Resources</span>
            <svg className="distill-chevron" width="8" height="5" viewBox="0 0 8 5" fill="none">
              <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#pricing" className="distill-nav-link">
            <span>Pricing</span>
          </a>
        </div>

        {/* Right CTA */}
        <div className="distill-nav-right">
          <a href="#signin" className="distill-signin-link">Sign in</a>
          <button type="button" className="distill-btn-trial">Start a free trial</button>
          <button type="button" className="distill-btn-demo">Book a demo</button>
        </div>
      </nav>

      {/* ====================================================================
          2. HERO COPY (Grid 1fr | 34vw)
          ==================================================================== */}
      <div className="distill-hero-copy">
        <div className="distill-hero-left">
          <span className="distill-eyebrow">AI READABILITY</span>
          <h2 className="distill-headline">
            Built for people. <br />
            <em>Read by machines.</em>
          </h2>
        </div>

        <div className="distill-hero-right">
          <p className="distill-paragraph">
            Distill detects AI agents at the edge and serves them a clean, token&#8209;light version of every page, without changing a pixel of what people see.
          </p>
          <button type="button" className="distill-explore-btn">
            Explore Distill
          </button>
        </div>
      </div>

      {/* ====================================================================
          3. SCANNER LINE & TOKEN REDUCTION BADGE
          ==================================================================== */}
      {/* Floating Counter Badge on Top of Line */}
      <div className="distill-badge" aria-label="Token Reduction Counter">
        <span className="distill-badge-label">Token reduction</span>
        <div className="distill-badge-pill">
          <span className="distill-badge-num">{tokenDisplay}</span>
          <span className="distill-badge-pct">{percentDisplay}</span>
        </div>
      </div>

      {/* Vertical Scanner Line at 50% width */}
      <div className="distill-scan" aria-hidden="true">
        <i className="distill-scan-core" />
        <b className="distill-scan-halo" />
      </div>

      {/* ====================================================================
          4. THE CONVEYOR BELT
          ==================================================================== */}
      <div className="distill-belt" ref={beltRef}>

        {/* Layer 1: The Code Twin Blocks */}
        <div className="distill-codes">
          {KESSLER_DATA.map((card, idx) => (
            <div
              key={`code-${card.id}`}
              className="k-code"
              ref={(el) => (codeRefs.current[idx] = el)}
            >
              <div className="k-code-content">
                <div className="k-code-html">
                  {card.htmlCode}
                </div>
                <div className="k-code-meta">
                  {`<!-- distilled: ${card.distilled.toLocaleString('en-US')} tokens -->\n<!-- original: ${card.original.toLocaleString('en-US')} tokens -->\n<!-- ${card.url} -->`}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Layer 2: The Kessler Website Cards */}
        <div className="distill-cards">
          {KESSLER_DATA.map((card, idx) => (
            <div
              key={`card-${card.id}`}
              className={`k-card k-card-${card.id}`}
              ref={(el) => (cardRefs.current[idx] = el)}
              style={card.bgImg ? { backgroundImage: `url(${card.bgImg})` } : {}}
            >
              {/* Shared Card Header */}
              <div className="k-nav">
                <div className="k-nav-logo">
                  <svg className="k-mountain-mark" viewBox="0 0 54 42" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 39L18 6L33 39H3Z" />
                    <path d="M21 39L36 12L51 39H21Z" />
                  </svg>
                  <span>Kessler</span>
                </div>

                <div className="k-nav-menu">
                  <span className={`k-nav-item ${card.id === 'home' || card.id === 'case' || card.id === 'alloy' ? '' : ''}`}>
                    PRODUCTS
                  </span>
                  <span className={`k-nav-item ${card.id === 'price' ? 'is-active-pill' : card.id === 'vision' ? 'is-active-pill' : card.id === 'journal' ? 'is-active-pill' : ''}`}>
                    {card.id === 'price' ? 'PRICING' : card.id === 'vision' ? 'VISION' : card.id === 'journal' ? 'JOURNAL' : 'IMPACT'}
                  </span>
                  <span className="k-nav-item">
                    {card.id === 'price' ? 'CONTACT' : 'ABOUT'}
                  </span>
                </div>
              </div>

              {/* Card 1: Home Specific */}
              {card.id === 'home' && (
                <div className="k-home-overlay">
                  <div className="k-home-bottom">
                    <div className="k-home-stats">
                      <div className="k-stat-item">
                        <span className="k-stat-num">200x</span>
                        <span className="k-stat-label">stronger</span>
                      </div>
                      <div className="k-stats-split-rule" />
                      <div className="k-stat-item">
                        <span className="k-stat-num">87%</span>
                        <span className="k-stat-label">lower emissions</span>
                      </div>
                    </div>
                    <div className="k-home-tagline">
                      Advanced materials for a stronger tomorrow.
                    </div>
                  </div>
                </div>
              )}

              {/* Card 2: Pricing Specific */}
              {card.id === 'price' && (
                <>
                  <div className="k-price-main">
                    <div className="k-price-val"><sup>$</sup>2,400</div>
                    <div className="k-price-sub">PER MONTH · INDUSTRIAL</div>
                  </div>
                  <div className="k-price-plans">
                    <div className="k-plan-row"><span>Pilot</span><span>$299</span></div>
                    <div className="k-plan-row"><span>Industrial</span><span>$2,400</span></div>
                    <div className="k-plan-row"><span>Foundry</span><span>Custom</span></div>
                  </div>
                  <button type="button" className="k-price-btn">Start a pilot</button>
                </>
              )}

              {/* Card 3: Case Study Specific */}
              {card.id === 'case' && (
                <div className="k-case-overlay">
                  <div className="k-case-kicker">CASE STUDY · ATLAS RAIL</div>
                  <h3 className="k-case-title">How Atlas Rail cut track weight by a third in eighteen months</h3>
                  <div className="k-case-stats">
                    <div className="k-case-stat-col">
                      <div className="k-case-stat-val">34%</div>
                      <div className="k-case-stat-desc">lighter track</div>
                    </div>
                    <div className="k-case-stat-col">
                      <div className="k-case-stat-val">3.4x</div>
                      <div className="k-case-stat-desc">service life</div>
                    </div>
                    <div className="k-case-stat-col">
                      <div className="k-case-stat-val">0</div>
                      <div className="k-case-stat-desc">unplanned closures</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Card 4: Vision Specific */}
              {card.id === 'vision' && (
                <>
                  <div className="k-vision-tiles">
                    <div className="k-tile-img" style={{ backgroundImage: `url(${card.tile1})` }} />
                    <div className="k-tile-img" style={{ backgroundImage: `url(${card.tile2})` }} />
                    <div className="k-tile-quote">
                      The Kessler vision: <em>materials that outlast the people who made them.</em>
                    </div>
                  </div>
                  <div className="k-vision-footer">
                    <span>How Kessler pours alloy / at the edge of the desert</span>
                    <span>Manifesto · 6 min</span>
                  </div>
                </>
              )}

              {/* Card 5: Alloy Specific */}
              {card.id === 'alloy' && (
                <div className="k-alloy-overlay">
                  <div className="k-alloy-bottom">
                    <div className="k-alloy-title">
                      The carbon‑negative <em>alloy.</em>
                    </div>
                    <div className="k-alloy-specs">
                      <div className="k-spec-row"><span>Product</span><span>K-Alloy 7</span></div>
                      <div className="k-spec-row"><span>Tensile</span><span>1,940 MPa</span></div>
                      <div className="k-spec-row"><span>Datasheet</span><span>PDF ↗</span></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Card 6: Journal Specific */}
              {card.id === 'journal' && (
                <>
                  <div className="k-journal-title">
                    Journal <em>field notes from the flats</em>
                  </div>
                  <div className="k-journal-posts">
                    <div className="k-post-col">
                      <div className="k-post-thumb" style={{ backgroundImage: `url(${card.post1})` }} />
                      <div className="k-post-kicker">FIELD NOTES</div>
                      <div className="k-post-heading">Mining nothing but light on the salt flats</div>
                    </div>
                    <div className="k-post-col">
                      <div className="k-post-thumb" style={{ backgroundImage: `url(${card.post2})` }} />
                      <div className="k-post-kicker">PLANTS</div>
                      <div className="k-post-heading">Atacama, year one</div>
                    </div>
                    <div className="k-post-col">
                      <div className="k-post-thumb" style={{ backgroundImage: `url(${card.post3})` }} />
                      <div className="k-post-kicker">PROCESS</div>
                      <div className="k-post-heading">Why we melt sand at noon</div>
                    </div>
                  </div>
                </>
              )}

            </div>
          ))}
        </div>

        {/* Layer 3: Particle Dissolve & Sparks Canvas */}
        <canvas className="distill-canvas" ref={canvasRef} />

      </div>

    </section>
  );
}
