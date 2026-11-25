import React from 'react';
import {
  Users,
  Clock,
  Globe,
  CheckCircle2,
  Code2,
  Zap,
  ShieldCheck,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import '../styles/globalMetricsHorizon.css';

const ARORA_METRICS = [
  {
    icon: Users,
    label: 'Vetted Engineers',
    value: '20K+',
    sub: 'Top 1% screened'
  },
  {
    icon: Clock,
    label: 'Match Turnaround',
    value: '48h',
    sub: 'Avg shortlist time'
  },
  {
    icon: Globe,
    label: 'Global Markets',
    value: '35+',
    sub: 'Timezones synced'
  },
  {
    icon: CheckCircle2,
    label: 'Client Retention',
    value: '98.4%',
    sub: '+12% YoY renewal'
  },
  {
    icon: Code2,
    label: 'Tech Disciplines',
    value: '12',
    sub: 'Full-stack to AI'
  },
  {
    icon: Zap,
    label: 'Cost Efficiency',
    value: '60%',
    sub: 'Saved vs local hire'
  },
  {
    icon: ShieldCheck,
    label: 'IP & NDA Coverage',
    value: '100%',
    sub: 'SOC 2 & GDPR ready'
  },
  {
    icon: TrendingUp,
    label: 'Avg Squad Tenure',
    value: '2.8 yrs',
    sub: 'Dedicated teams'
  }
];

export default function GlobalMetricsHorizon({ onHireClick }) {
  const handleCta = () => {
    if (onHireClick) {
      onHireClick();
    } else {
      const el = document.getElementById('enquiry-section') || document.getElementById('quote');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="global-insights"
      className="gmh-section"
      aria-labelledby="gmh-horizon-heading"
    >
      {/* Metrics Grid */}
      <div className="gmh-card-wrap">
        <div className="gmh-metrics-grid">
          {ARORA_METRICS.map((item) => {
            const IconComp = item.icon;
            return (
              <div key={item.label} className="gmh-metric-item">
                <div className="gmh-metric-head">
                  <div className="gmh-metric-label-row">
                    <span className="gmh-metric-icon" aria-hidden="true">
                      <IconComp size={15} strokeWidth={2} />
                    </span>
                    <span className="gmh-metric-label">{item.label}</span>
                  </div>
                </div>
                <div className="gmh-metric-body">
                  <span className="gmh-metric-value">{item.value}</span>
                  <span className="gmh-metric-sub">{item.sub}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Overlapping Glowing Planet Dome + Centered CTA */}
      <div className="gmh-horizon-stage">
        <div className="gmh-planet-dome" aria-hidden="true" />
        <div className="gmh-plumb-line" aria-hidden="true">
          <span className="gmh-plumb-node" />
        </div>

        <div className="gmh-horizon-content">
          <h2 id="gmh-horizon-heading" className="gmh-horizon-title">
            Go further, scale with
            <br />
            pre-vetted engineers
          </h2>
          <p className="gmh-horizon-sub">
            Request a tailored hiring quote and interview matched developers within 48 hours.
          </p>
          <button
            type="button"
            className="gmh-horizon-cta"
            onClick={handleCta}
          >
            <span>Start Hiring Today</span>
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
