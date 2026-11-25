import React from 'react';

// 5 Unique partner logos specified in prompt
const UNIQUE_LOGOS = [
  {
    id: 1,
    url: "https://polo-pecan-73837341.figma.site/_assets/v11/1e7b0e6fcc016cd28aec5c68990118b8c54c35a5.svg",
    name: "Partner 1",
    fallbackText: "AURORA"
  },
  {
    id: 2,
    url: "https://polo-pecan-73837341.figma.site/_assets/v11/3eac03c183db2ae080d910159211c14843398b61.svg",
    name: "Partner 2",
    fallbackText: "NEXUS"
  },
  {
    id: 3,
    url: "https://polo-pecan-73837341.figma.site/_assets/v11/17705a4c0023a0e5a99154dfb10582adbbf4260b.svg",
    name: "Partner 3",
    fallbackText: "KINETIC"
  },
  {
    id: 4,
    url: "https://polo-pecan-73837341.figma.site/_assets/v11/0e5f442b09dc5c248e3e60d40a65505fb1887228.svg",
    name: "Partner 4",
    fallbackText: "VERTEX"
  },
  {
    id: 5,
    url: "https://polo-pecan-73837341.figma.site/_assets/v11/63f99030ceb459e3c9ab9e429cfa2353491d3816.svg",
    name: "Partner 5",
    fallbackText: "QUANTUM"
  }
];

// Repeated 4x for a continuous seamless 20-logo infinite loop
const TICKER_ITEMS = [
  ...UNIQUE_LOGOS,
  ...UNIQUE_LOGOS,
  ...UNIQUE_LOGOS,
  ...UNIQUE_LOGOS
];

export default function LogoTicker() {
  return (
    <div className="logo-ticker-section">
      <div className="logo-ticker-track-mask">
        <div className="logo-ticker-marquee">
          {/* First track */}
          <div className="logo-ticker-group">
            {TICKER_ITEMS.map((logo, index) => (
              <div key={`track1-${index}`} className="logo-ticker-item">
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="logo-ticker-img"
                  onError={(e) => {
                    // Fallback to stylized SVG text badge if external URL cannot be reached
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'flex';
                    }
                  }}
                />
                <span className="logo-fallback-badge" style={{ display: 'none' }}>
                  {logo.fallbackText}
                </span>
              </div>
            ))}
          </div>

          {/* Duplicate track for seamless infinite scroll */}
          <div className="logo-ticker-group" aria-hidden="true">
            {TICKER_ITEMS.map((logo, index) => (
              <div key={`track2-${index}`} className="logo-ticker-item">
                <img
                  src={logo.url}
                  alt=""
                  className="logo-ticker-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'flex';
                    }
                  }}
                />
                <span className="logo-fallback-badge" style={{ display: 'none' }}>
                  {logo.fallbackText}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
