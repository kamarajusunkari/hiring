import React from 'react';
import MarketeamHeader from './components/MarketeamHeader';
import Hero from './components/Hero';
import TalentShowcase from './components/TalentShowcase';
import ProcessSection from './components/ProcessSection';
import WhyChooseArora from './components/WhyChooseArora';
import GlobalMetricsHorizon from './components/GlobalMetricsHorizon';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import { openWhatsApp } from './data/brandConfig';
import './styles/hero.css';

export default function App() {
  const handleHireNow = () => {
    openWhatsApp('Hi Arora Tech Solutions, I would like to hire top developers & specialists.');
  };

  const handleTalkToTeam = () => {
    openWhatsApp('Hi Arora Tech Solutions, I would like to speak with your technical hiring team.');
  };

  const handleStartProject = () => {
    openWhatsApp('Hi Arora Tech Solutions, I would like to start a project with your team.');
  };

  const handleSelectRole = (role) => {
    const formattedRole = role ? role.replace(/-/g, ' ') : 'developers';
    openWhatsApp(`Hi Arora Tech Solutions, I am interested in hiring ${formattedRole}.`);
  };

  return (
    <div className="marketeam-app-root">

      {/* ====================================================================
          1. HEADER (Arora Logo + Arora Menu & Dropdowns + "Hire Now" Conic Button)
          ==================================================================== */}
      <MarketeamHeader
        onHireNowClick={handleHireNow}
        onTalkToTeamClick={handleTalkToTeam}
        onSelectRole={handleSelectRole}
      />

      {/* ====================================================================
          2. SECTIONS:
             - Hero Section (Cosmic dark navy + Typewriter + Orbital circles)
             - Section 2: Talent Showcase (Manual draggable card carousel on white bg)
             - Section 3: 4-Step Hiring Process (4 iPhone mockup frames on white bg)
             - Section 4: Why Choose Arora (White bg with blue-tinted 3-card benefits grid)
             - Section 5: Global Talent Insights & Horizon Dome CTA
             - Section 6: FAQ Section ("You asked. We answered." + floating question stickers + interactive accordion)
          ==================================================================== */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Hero onStartProjectClick={handleStartProject} />

        <TalentShowcase
          onSelectRole={handleSelectRole}
          onExploreClick={handleHireNow}
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

    </div>
  );
}
