import React from 'react';
import useCountUp from '../hooks/useCountUp';

// Fallback high-quality SVG avatars in case external CDN is slow or blocked
const FALLBACK_AVATARS = [
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%236366F1'/%3E%3Ccircle cx='40' cy='32' r='16' fill='%23EDE9FE'/%3E%3Cpath d='M16 68c0-13.25 10.75-24 24-24s24 10.75 24 24' fill='%23EDE9FE'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23F59E0B'/%3E%3Ccircle cx='40' cy='32' r='16' fill='%23FEF3C7'/%3E%3Cpath d='M16 68c0-13.25 10.75-24 24-24s24 10.75 24 24' fill='%23FEF3C7'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23EC4899'/%3E%3Ccircle cx='40' cy='32' r='16' fill='%23FCE7F3'/%3E%3Cpath d='M16 68c0-13.25 10.75-24 24-24s24 10.75 24 24' fill='%23FCE7F3'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%230EA5E9'/%3E%3Ccircle cx='40' cy='32' r='16' fill='%23E0F2FE'/%3E%3Cpath d='M16 68c0-13.25 10.75-24 24-24s24 10.75 24 24' fill='%23E0F2FE'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%2300A6FF'/%3E%3Ccircle cx='40' cy='32' r='16' fill='%23E0F2FE'/%3E%3Cpath d='M16 68c0-13.25 10.75-24 24-24s24 10.75 24 24' fill='%23E0F2FE'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%230284C7'/%3E%3Ccircle cx='40' cy='32' r='16' fill='%23E0F2FE'/%3E%3Cpath d='M16 68c0-13.25 10.75-24 24-24s24 10.75 24 24' fill='%23E0F2FE'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23F97316'/%3E%3Ccircle cx='40' cy='32' r='16' fill='%23FFEDD5'/%3E%3Cpath d='M16 68c0-13.25 10.75-24 24-24s24 10.75 24 24' fill='%23FFEDD5'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23F43F5E'/%3E%3Ccircle cx='40' cy='32' r='16' fill='%23FFE4E6'/%3E%3Cpath d='M16 68c0-13.25 10.75-24 24-24s24 10.75 24 24' fill='%23FFE4E6'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%2300A6FF'/%3E%3Ccircle cx='40' cy='32' r='16' fill='%23E0F2FE'/%3E%3Cpath d='M16 68c0-13.25 10.75-24 24-24s24 10.75 24 24' fill='%23E0F2FE'/%3E%3C/svg%3E",
];

// 9 Avatars precisely specified in the prompt
const AVATARS_DATA = [
  // Orbit 1 (diameter: 353px, radius: 177px, angle: 270deg, spin: left 30s)
  {
    id: 1,
    orbit: 1,
    url: "https://polo-pecan-73837341.figma.site/_assets/v11/aa51718fb3af3637e6d666b6543fc27a175fada6.png",
    fallback: FALLBACK_AVATARS[0],
    angle: 270,
    radius: 177,
    size: 58,
    borderRadius: '20px',
    glowColor: 'rgba(0, 166, 255, 0.75)',
    delay: 0.6,
    alt: "Marketing Specialist 1"
  },
  // Orbit 2 (diameter: 501px, radius: 251px, spin: right 40s)
  {
    id: 2,
    orbit: 2,
    url: "https://polo-pecan-73837341.figma.site/_assets/v11/ca755f7f93c1126fb8bdbf99ab364a33aa9ab272.png",
    fallback: FALLBACK_AVATARS[1],
    angle: 60,
    radius: 251,
    size: 58,
    borderRadius: '50%',
    glowColor: 'rgba(255, 204, 0, 0.7)',
    delay: 0.8,
    alt: "Growth Strategist"
  },
  {
    id: 3,
    orbit: 2,
    url: "https://polo-pecan-73837341.figma.site/_assets/v11/dc01064c7093dcc32674876ee3cf5e41c4a485c6.png",
    fallback: FALLBACK_AVATARS[2],
    angle: 180,
    radius: 251,
    size: 78,
    borderRadius: '50%',
    glowColor: 'rgba(255, 105, 180, 0.7)',
    delay: 1.0,
    alt: "Campaign Lead"
  },
  {
    id: 4,
    orbit: 2,
    url: "https://polo-pecan-73837341.figma.site/_assets/v11/d5470a58b02388336141575048720f19a50de832.png",
    fallback: FALLBACK_AVATARS[3],
    angle: 300,
    radius: 251,
    size: 58,
    borderRadius: '20px',
    glowColor: 'rgba(56, 189, 248, 0.7)',
    delay: 1.2,
    alt: "SEO Specialist"
  },
  // Orbit 3 (diameter: 649px, radius: 325px, spin: right 50s)
  {
    id: 5,
    orbit: 3,
    url: "https://polo-pecan-73837341.figma.site/_assets/v11/018736aa5d0275c4ce56cfebaf2ae3007d81ca1e.png",
    fallback: FALLBACK_AVATARS[4],
    angle: 130,
    radius: 325,
    size: 88,
    borderRadius: '50%',
    glowColor: 'rgba(255, 105, 180, 0.7)',
    delay: 1.4,
    alt: "Creative Director"
  },
  // Orbit 4 (diameter: 797px, radius: 399px, spin: left 60s)
  {
    id: 6,
    orbit: 4,
    url: "https://polo-pecan-73837341.figma.site/_assets/v11/c76d8a0b99676de31c014344bfaf75bad090758d.png",
    fallback: FALLBACK_AVATARS[5],
    angle: 30,
    radius: 399,
    size: 58,
    borderRadius: '50%',
    glowColor: 'rgba(0, 166, 255, 0.75)',
    delay: 1.7,
    alt: "Performance Marketer"
  },
  {
    id: 7,
    orbit: 4,
    url: "https://polo-pecan-73837341.figma.site/_assets/v11/7b1b5f039de7b54cc9913e96c1923c3b15a157fa.png",
    fallback: FALLBACK_AVATARS[6],
    angle: 95,
    radius: 399,
    size: 88,
    borderRadius: '24px',
    glowColor: 'rgba(255, 140, 0, 0.7)',
    delay: 1.9,
    alt: "Brand Strategist"
  },
  {
    id: 8,
    orbit: 4,
    url: "https://polo-pecan-73837341.figma.site/_assets/v11/9ae171d8895199349755c43fbff00e122221a027.png",
    fallback: FALLBACK_AVATARS[7],
    angle: 220,
    radius: 399,
    size: 88,
    borderRadius: '24px',
    glowColor: 'rgba(255, 105, 180, 0.7)',
    delay: 2.1,
    alt: "Content Strategist"
  },
  {
    id: 9,
    orbit: 4,
    url: "https://polo-pecan-73837341.figma.site/_assets/v11/926c9eb7b4bc1df846fa0e39f0b0dc3fefd80671.png",
    fallback: FALLBACK_AVATARS[8],
    angle: 320,
    radius: 399,
    size: 58,
    borderRadius: '50%',
    glowColor: 'rgba(0, 166, 255, 0.75)',
    delay: 2.3,
    alt: "Marketing Automation Lead"
  }
];

export default function CirclesVisualization() {
  const { count } = useCountUp(20, 2000, 1200);

  // Group avatars by orbit
  const orbit1Avatars = AVATARS_DATA.filter(a => a.orbit === 1);
  const orbit2Avatars = AVATARS_DATA.filter(a => a.orbit === 2);
  const orbit3Avatars = AVATARS_DATA.filter(a => a.orbit === 3);
  const orbit4Avatars = AVATARS_DATA.filter(a => a.orbit === 4);

  const renderAvatarItem = (avatar, orbitSpinType) => {
    // Determine counter-spin animation class based on parent orbit
    const counterSpinClass = orbitSpinType === 'left' ? 'counter-spin-right-30s' 
      : orbitSpinType === 'right40' ? 'counter-spin-left-40s'
      : orbitSpinType === 'right50' ? 'counter-spin-left-50s'
      : 'counter-spin-right-60s';

    return (
      <div
        key={avatar.id}
        className="orbit-avatar-anchor"
        style={{
          transform: `translate(-50%, -50%) rotate(${avatar.angle}deg) translate(${avatar.radius}px) rotate(-${avatar.angle}deg)`,
        }}
      >
        {/* Counter-rotation to keep the image upright as the orbit rotates */}
        <div className={`orbit-avatar-counter-rotate ${counterSpinClass}`}>
          {/* Staggered fly-in animation container */}
          <div 
            className="orbit-avatar-fly-in"
            style={{ 
              animationDelay: `${avatar.delay}s`,
              width: avatar.size,
              height: avatar.size,
            }}
          >
            <div 
              className="orbit-avatar-card"
              style={{
                borderRadius: avatar.borderRadius,
                boxShadow: `0 0 24px ${avatar.glowColor}, 0 4px 12px rgba(0, 0, 0, 0.5)`,
              }}
            >
              <img
                src={avatar.url}
                alt={avatar.alt}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = avatar.fallback;
                }}
                className="orbit-avatar-img"
                style={{
                  borderRadius: avatar.borderRadius,
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="circles-vis-wrapper">
      <div className="circles-vis-container">
        
        {/* ====================================================================
            Orbit 4: Outermost (797px diameter, spins left 60s)
            ==================================================================== */}
        <div className="orbit-circle orbit-4">
          {orbit4Avatars.map(av => renderAvatarItem(av, 'left60'))}
        </div>

        {/* ====================================================================
            Orbit 3: (649px diameter, spins right 50s)
            ==================================================================== */}
        <div className="orbit-circle orbit-3">
          {orbit3Avatars.map(av => renderAvatarItem(av, 'right50'))}
        </div>

        {/* ====================================================================
            Orbit 2: (501px diameter, spins right 40s)
            ==================================================================== */}
        <div className="orbit-circle orbit-2">
          {orbit2Avatars.map(av => renderAvatarItem(av, 'right40'))}
        </div>

        {/* ====================================================================
            Orbit 1: Innermost (353px diameter, spins left 30s)
            ==================================================================== */}
        <div className="orbit-circle orbit-1">
          {orbit1Avatars.map(av => renderAvatarItem(av, 'left'))}

          {/* Center Circle Content: Count-up 20k+ and Specialists label */}
          <div className="orbit-1-center-counter">
            <div className="orbit-center-count">
              {count}k+
            </div>
            <div className="orbit-center-label">
              Specialists
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
