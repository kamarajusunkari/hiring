import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowRight, Layers, Layout, Server, Atom, Code, Terminal, 
  Globe, ShoppingBag, Smartphone, Cpu, Figma, CheckCircle, Check 
} from 'lucide-react';
import { ROLES_DATA } from '../data/rolesData';
import Accordion from '../components/Accordion';
import EnquiryForm from '../components/EnquiryForm';

const ICON_MAP = {
  Layers, Layout, Server, Atom, Code, Terminal, Globe,
  ShoppingBag, Smartphone, Cpu, Figma, CheckCircle
};

export default function RolePage() {
  const { roleSlug } = useParams();
  const role = ROLES_DATA[roleSlug];

  if (!role) {
    return <Navigate to="/" replace />;
  }

  const [activeTier, setActiveTier] = useState(role.ecosystemTiers[0]);
  const [activeTabCat, setActiveTabCat] = useState(role.stackTabs[0]?.category);

  const IconComp = ICON_MAP[role.icon] || Code;

  const scrollToEnquiry = () => {
    const el = document.getElementById('enquiry-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const activeTabObj = role.stackTabs.find(t => t.category === activeTabCat) || role.stackTabs[0];

  return (
    <>
      {/* Breadcrumbs */}
      <div style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', padding: '12px 0', fontSize: '0.8125rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748B' }}>
            <Link to="/" style={{ color: '#334155' }}>Home</Link>
            <span>/</span>
            <a href="/#roles" style={{ color: '#334155' }}>Hire Developers</a>
            <span>/</span>
            <span style={{ color: '#0F172A', fontWeight: 700 }}>{role.title}</span>
          </div>
        </div>
      </div>

      {/* Role Hero */}
      <section style={{ 
        background: '#080C16', 
        color: '#FFFFFF', 
        padding: 'clamp(60px, 8vw, 100px) 0 clamp(50px, 6vw, 90px)',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div style={{
          position: 'absolute',
          top: -120,
          right: -80,
          width: 600,
          height: 600,
          background: `radial-gradient(circle, ${role.accent}2A 0%, transparent 65%)`,
          pointerEvents: 'none'
        }} />

        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48, alignItems: 'center' }}>
            {/* Left Content */}
            <div>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: 8, 
                padding: '6px 14px', 
                background: role.bgTint, 
                border: `1px solid ${role.accent}40`, 
                borderRadius: 9999, 
                fontSize: '0.75rem', 
                fontWeight: 700, 
                textTransform: 'uppercase', 
                color: role.accent,
                marginBottom: 16
              }}>
                <IconComp size={15} />
                <span>{role.badge}</span>
              </div>

              <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15, marginBottom: 20 }}>
                {role.h1}
              </h1>

              <p style={{ fontSize: 'var(--text-lg)', color: '#94A3B8', lineHeight: 1.6, marginBottom: 32, maxWidth: 600 }}>
                {role.longDesc}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 36 }}>
                <button type="button" onClick={scrollToEnquiry} className="btn btn-primary btn-lg" style={{ background: role.accent }}>
                  <span>Get a Developer Quote</span>
                  <ArrowRight size={18} />
                </button>
                <a href="#ecosystem" className="btn btn-outline-light btn-lg">
                  <span>Inspect Architecture</span>
                </a>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div>
                  <div style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: '#FFFFFF' }}>Quote-Based</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Custom single-tier pricing</div>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: '#FFFFFF' }}>Flexible Pace</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Hourly, weekly or monthly</div>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: '#FFFFFF' }}>Pre-Vetted</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Rigorous coding evaluations</div>
                </div>
              </div>
            </div>

            {/* Right Visual: Terminal Mockup */}
            <div>
              <div style={{
                background: '#0E1526',
                border: `1px solid ${role.accent}40`,
                borderRadius: 16,
                boxShadow: `0 25px 60px rgba(0,0,0,0.6), 0 0 30px ${role.accent}20`,
                overflow: 'hidden'
              }}>
                <div style={{ background: '#151D32', padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }}></span>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }}></span>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }}></span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#94A3B8' }}>{role.title.replace(/\s+/g, '')}Service.ts</span>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#00C896', background: 'rgba(0, 200, 150, 0.12)', padding: '2px 8px', borderRadius: 9999 }}>Active Sprint</span>
                </div>
                <div style={{ padding: 24, fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', lineHeight: 1.8, color: '#CBD5E1', background: '#080D1A' }}>
                  <p style={{ color: '#64748B', fontStyle: 'italic' }}>// Production-ready engineering workflow</p>
                  <p><span style={{ color: '#F472B6' }}>export interface</span> <span style={{ color: '#60A5FA' }}>EngineeringDeliverable</span> &#123;</p>
                  <p style={{ paddingLeft: 16 }}><span style={{ color: '#FBBF24' }}>role</span>: <span style={{ color: '#34D399' }}>'{role.title}'</span>;</p>
                  <p style={{ paddingLeft: 16 }}><span style={{ color: '#FBBF24' }}>coverage</span>: <span style={{ color: '#34D399' }}>'100% IP Ownership'</span>;</p>
                  <p style={{ paddingLeft: 16 }}><span style={{ color: '#FBBF24' }}>pricing</span>: <span style={{ color: '#34D399' }}>'Transparent Quote'</span>;</p>
                  <p style={{ paddingLeft: 16 }}><span style={{ color: '#FBBF24' }}>stack</span>: [ {role.defaultTech.slice(0, 4).map(t => `'${t}'`).join(', ')} ];</p>
                  <p>&#125;</p>
                  <p style={{ marginTop: 8 }}><span style={{ color: '#F472B6' }}>export async function</span> <span style={{ color: '#60A5FA' }}>deployTalent</span>() &#123;</p>
                  <p style={{ paddingLeft: 16 }}><span style={{ color: '#64748B' }}>/* Match hand-picked engineers within 24 hours */</span></p>
                  <p style={{ paddingLeft: 16 }}><span style={{ color: '#F472B6' }}>return</span> &#123; status: <span style={{ color: '#34D399' }}>'READY_FOR_SPRINT'</span> &#125;;</p>
                  <p>&#125;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Ecosystem Diagram */}
      <section id="ecosystem" style={{ padding: 'var(--space-20) 0', background: 'var(--brand-surface)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge" style={{ color: role.accent, background: role.bgTint }}>Architecture Flow</span>
            <h2 className="section-title">Interactive Delivery Ecosystem</h2>
            <p className="section-sub">
              Click any tier below to inspect how our {role.title.toLowerCase()} structure, validate, and execute each stage of the technical workflow.
            </p>
          </div>

          <div style={{
            background: '#090E1A',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 24,
            padding: 'clamp(24px, 4vw, 44px)',
            color: '#FFFFFF'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {role.ecosystemTiers.map((tier, idx) => {
                const isSelected = activeTier.id === tier.id;
                return (
                  <div 
                    key={tier.id}
                    onClick={() => setActiveTier(tier)}
                    style={{
                      background: isSelected ? '#16223D' : '#111A2E',
                      border: `1px solid ${isSelected ? role.accent : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: 16,
                      padding: 24,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: isSelected ? `0 10px 25px ${role.accent}30` : 'none'
                    }}
                  >
                    <div style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', color: role.accent, marginBottom: 8 }}>
                      Stage 0{idx + 1}
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>
                      {tier.name}
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: '#94A3B8', lineHeight: 1.5, marginBottom: 16 }}>
                      {tier.subtitle}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {tier.tech.map(t => (
                        <span key={t} style={{ fontSize: '0.6875rem', padding: '2px 8px', background: 'rgba(255,255,255,0.06)', borderRadius: 4, color: '#CBD5E1' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Insight Box */}
            <div style={{
              marginTop: 32,
              background: `${role.accent}15`,
              border: `1px solid ${role.accent}40`,
              borderRadius: 12,
              padding: '20px 24px'
            }}>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: role.accent, marginBottom: 8 }}>
                {activeTier.name}: Technical Execution Details
              </div>
              <p style={{ fontSize: '0.875rem', color: '#E2E8F0', lineHeight: 1.6, margin: 0 }}>
                {activeTier.detail}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Technology Stack Tabs */}
      <section style={{ padding: 'var(--space-20) 0', background: '#FFFFFF' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge" style={{ color: role.accent, background: role.bgTint }}>Toolchains & Stack</span>
            <h2 className="section-title">Production-Tested Technologies</h2>
            <p className="section-sub">We deploy engineers skilled in modern open-source toolchains designed for stability and high concurrency.</p>
          </div>

          {/* Tab Selector Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
            {role.stackTabs.map(tab => {
              const isActive = activeTabCat === tab.category;
              return (
                <button
                  key={tab.category}
                  type="button"
                  onClick={() => setActiveTabCat(tab.category)}
                  style={{
                    padding: '10px 22px',
                    borderRadius: 9999,
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: isActive ? '#0F172A' : '#F8FAFC',
                    color: isActive ? '#FFFFFF' : '#334155',
                    border: `1px solid ${isActive ? '#0F172A' : '#E2E8F0'}`,
                    transition: 'all 0.15s'
                  }}
                >
                  {tab.category}
                </button>
              );
            })}
          </div>

          {/* Active Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {activeTabObj?.items.map((item, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ width: 38, height: 38, borderRadius: 8, background: role.bgTint, color: role.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <IconComp size={18} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>{item.name}</h3>
                <p style={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Real-World Project Types */}
      <section style={{ padding: 'var(--space-20) 0', background: 'var(--brand-surface)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge" style={{ color: role.accent, background: role.bgTint }}>Capabilities</span>
            <h2 className="section-title">Where Our {role.title} Excel</h2>
            <p className="section-sub">From ground-up development to bottleneck resolution in mature production apps.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {role.projectTypes.map(proj => (
              <div key={proj.num} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: role.accent }}>{proj.num}</span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>{proj.title}</h3>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6, marginBottom: 20 }}>{proj.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {proj.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '0.75rem', padding: '4px 10px', background: 'var(--brand-surface)', border: '1px solid #E2E8F0', borderRadius: 9999, color: '#64748B' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Engagement Models */}
      <section style={{ padding: 'var(--space-20) 0', background: '#FFFFFF' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge" style={{ color: role.accent, background: role.bgTint }}>Flexible Models</span>
            <h2 className="section-title">Hiring Models for {role.title}</h2>
            <p className="section-sub">Choose the cadence that matches your sprint timeline and development priorities.</p>
          </div>

          <div className="engagement-models-grid">
            <div className="model-card">
              <div className="model-header">
                <h3 className="model-title">Hourly Model</h3>
                <div className="model-pace">Ad-hoc & Flexible Pace</div>
              </div>
              <div className="model-best-for">
                <strong>Best for:</strong> Feature audits, urgent bugs, or consulting.
              </div>
              <ul className="model-features">
                <li className="model-feature-item"><Check size={14} color="#10B981" /> <span>Transparent time logs & tracking</span></li>
                <li className="model-feature-item"><Check size={14} color="#10B981" /> <span>Scale hours up or down seamlessly</span></li>
                <li className="model-feature-item"><Check size={14} color="#10B981" /> <span>Direct team communication</span></li>
              </ul>
              <button type="button" onClick={scrollToEnquiry} className="btn btn-secondary btn-block">
                Request Hourly Quote
              </button>
            </div>

            <div className="model-card">
              <div className="model-header">
                <h3 className="model-title">Weekly Sprints</h3>
                <div className="model-pace">Sprint-Driven Delivery</div>
              </div>
              <div className="model-best-for">
                <strong>Best for:</strong> Scoped module builds and defined features.
              </div>
              <ul className="model-features">
                <li className="model-feature-item"><Check size={14} color="#10B981" /> <span>Agreed sprint backlog & velocity</span></li>
                <li className="model-feature-item"><Check size={14} color="#10B981" /> <span>Full sprint ceremony participation</span></li>
                <li className="model-feature-item"><Check size={14} color="#10B981" /> <span>Predictable weekly quotes</span></li>
              </ul>
              <button type="button" onClick={scrollToEnquiry} className="btn btn-secondary btn-block">
                Request Weekly Quote
              </button>
            </div>

            <div className="model-card is-featured" style={{ borderColor: role.accent }}>
              <span className="model-featured-badge" style={{ background: role.accent }}>Most Popular</span>
              <div className="model-header">
                <h3 className="model-title">Monthly Dedicated</h3>
                <div className="model-pace">Full-Time Embedded Engineer</div>
              </div>
              <div className="model-best-for">
                <strong>Best for:</strong> Long-term product roadmaps & daily iteration.
              </div>
              <ul className="model-features">
                <li className="model-feature-item"><Check size={14} color="#10B981" /> <span>160 hours / month dedicated to your codebase</span></li>
                <li className="model-feature-item"><Check size={14} color="#10B981" /> <span>Direct daily timezone alignment</span></li>
                <li className="model-feature-item"><Check size={14} color="#10B981" /> <span>Free candidate replacement guarantee</span></li>
              </ul>
              <button type="button" onClick={scrollToEnquiry} className="btn btn-primary btn-block" style={{ background: role.accent }}>
                Request Monthly Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Role FAQs */}
      <section style={{ padding: 'var(--space-20) 0', background: 'var(--brand-surface)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge" style={{ color: role.accent, background: role.bgTint }}>Common Questions</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-sub">Clear answers regarding vetting, working models, timezone alignment, and IP ownership.</p>
          </div>
          <Accordion items={role.faqs} />
        </div>
      </section>

      {/* 7. Related Roles Band */}
      <section style={{ padding: 'var(--space-16) 0', background: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge" style={{ color: role.accent, background: role.bgTint }}>Related Talent</span>
            <h2 className="section-title">Explore Related Engineering Roles</h2>
            <p className="section-sub">Need additional specialists across your product stack? Inspect our related disciplines.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {role.related.map(relSlug => {
              const relRole = ROLES_DATA[relSlug];
              if (!relRole) return null;
              return (
                <Link 
                  key={relSlug}
                  to={`/hire/${relSlug}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 24,
                    background: 'var(--brand-surface)',
                    border: '1px solid #E2E8F0',
                    borderRadius: 12,
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>{relRole.title}</h3>
                  <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.5, marginBottom: 16, flexGrow: 1 }}>{relRole.shortDesc}</p>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0F52BA', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    Explore {relRole.title} &rarr;
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Dedicated Pre-Selected Enquiry Form */}
      <EnquiryForm preselectedRole={role.slug} customTech={role.defaultTech} />
    </>
  );
}
