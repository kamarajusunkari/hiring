import React, { useState } from 'react';
import MarketeamHeader from './components/MarketeamHeader';
import Hero from './components/Hero';
import TalentShowcase from './components/TalentShowcase';
import ProcessSection from './components/ProcessSection';
import WhyChooseArora from './components/WhyChooseArora';
import GlobalMetricsHorizon from './components/GlobalMetricsHorizon';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import './styles/hero.css';

export default function App() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const handleHireNow = () => {
    setModalTitle('Hire Top Developers & Staffing Specialists');
    setModalOpen(true);
  };

  const handleTalkToTeam = () => {
    setModalTitle('Talk to Arora Technical Hiring Team');
    setModalOpen(true);
  };

  const handleStartProject = () => {
    setModalTitle('Start Project with Top Talent');
    setModalOpen(true);
  };

  return (
    <div className="marketeam-app-root">

      {/* ====================================================================
          1. HEADER (Arora Logo + Arora Menu & Dropdowns + "Hire Now" Conic Button)
          ==================================================================== */}
      <MarketeamHeader
        onHireNowClick={handleHireNow}
        onTalkToTeamClick={handleTalkToTeam}
        onSelectRole={(role) => {
          setSelectedRole(role);
          setModalTitle(`Hire ${role.replace(/-/g, ' ')}`);
          setModalOpen(true);
        }}
      />

      {/* ====================================================================
          2. SECTIONS:
             - Hero Section (Cosmic dark navy + Typewriter + Orbital circles)
             - Section 2: Talent Showcase (Scroll-driven card carousel on white bg)
             - Section 3: 4-Step Hiring Process (4 iPhone mockup frames on white bg)
             - Section 4: Why Choose Arora (White bg with blue-tinted 3-card benefits grid)
             - Section 5: Global Talent Insights & Horizon Dome CTA
             - Section 6: FAQ Section ("You asked. We answered." + floating question stickers + interactive accordion)
          ==================================================================== */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Hero onStartProjectClick={handleStartProject} />

        <TalentShowcase
          onSelectRole={(role) => {
            setSelectedRole(role);
            setModalTitle(`Hire ${role.replace(/-/g, ' ')}`);
            setModalOpen(true);
          }}
        />

        <ProcessSection onStartHiringClick={handleHireNow} />

        <WhyChooseArora />

        <GlobalMetricsHorizon onHireClick={handleHireNow} />

        <FAQSection onAskQuestionClick={handleTalkToTeam} />
      </main>

      {/* ====================================================================
          3. FOOTER (Dark Services Grid + Kresna 2-card video footer)
          ==================================================================== */}
      <Footer />

      {/* ====================================================================
          ACTION MODAL (Clean feedback on button clicks)
          ==================================================================== */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: 20
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            style={{
              background: '#040919',
              border: '1px solid rgba(0, 166, 255, 0.35)',
              borderRadius: 24,
              padding: '32px 36px',
              maxWidth: 480,
              width: '100%',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(0, 166, 255, 0.25)',
              textAlign: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: 'inline-flex',
              padding: '10px 18px',
              background: 'rgba(0, 166, 255, 0.15)',
              borderRadius: 50,
              color: '#00A6FF',
              fontWeight: 700,
              fontSize: '13px',
              marginBottom: 16
            }}>
              Arora Tech Solutions &bull; On-Demand Hiring
            </div>

            <h3 style={{
              fontFamily: 'Urbanist, sans-serif',
              fontSize: '26px',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: 12
            }}>
              {modalTitle}
            </h3>

            <p style={{
              fontSize: '14px',
              color: '#94A3B8',
              lineHeight: 1.6,
              marginBottom: 28
            }}>
              Connecting with <strong>20,000+ pre-vetted developers & staffing specialists</strong>. Flexible quote-based hourly, weekly, and monthly models with 100% IP ownership.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center' }}>
              <div className="btn-border-wrap">
                <button
                  type="button"
                  className="universal-btn-primary"
                  onClick={() => setModalOpen(false)}
                >
                  <span className="btn-text-content">
                    <span>Request Quote</span>
                  </span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 50,
                  background: 'transparent',
                  color: '#94A3B8',
                  fontWeight: 500,
                  fontSize: '14px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
