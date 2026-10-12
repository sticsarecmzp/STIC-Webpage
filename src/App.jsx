import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InstitutionStrip from './components/InstitutionStrip';
import Clubs from './components/Clubs';
import WhyStic from './components/WhyStic';
import Events from './components/Events';
import Projects from './components/Projects';
import Team from './components/Team';
import JoinForm from './components/JoinForm';
import Faq from './components/Faq';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import ScrollProgressBar from './components/ScrollProgressBar';
import AnnouncementBanner from './components/AnnouncementBanner';
import BackToTop from './components/BackToTop';
import FloatingContact from './components/FloatingContact';
import SiteSearchModal from './components/SiteSearchModal';
import SectionDivider from './components/SectionDivider';
import TickerRibbon from './components/TickerRibbon';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('stic_theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [selectedClub, setSelectedClub] = useState('');
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Initialize scroll-driven entrance animations
  useScrollReveal();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('stic_theme', theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('handlePopState', handlePopState);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSelectClub = (clubTrack) => {
    setSelectedClub(clubTrack);
    const target = document.getElementById('join');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateHome = () => {
    window.history.pushState({}, '', '/');
    setCurrentPath('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const is404 = currentPath !== '/' && currentPath !== '' && currentPath !== '/index.html';

  return (
    <div className="app-layout">
      {/* Accessibility: Skip to Main Content */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Reading / Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Top Announcement Banner */}
      <AnnouncementBanner />

      {/* Sticky Header with Frosted Glass */}
      <Navbar 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        onHome={handleNavigateHome} 
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      <main id="main-content">
        {is404 ? (
          <NotFound onNavigateHome={handleNavigateHome} />
        ) : (
          <>
            <Hero onSelectClub={handleSelectClub} />
            <TickerRibbon />
            <InstitutionStrip />

            <SectionDivider index="01" tag="8 GUILDS" targetId="clubs" delayClass="divider-delay-1" />
            <Clubs selectedClub={selectedClub} onSelectClub={handleSelectClub} />

            <SectionDivider index="02" tag="METHODOLOGY" targetId="why-stic" delayClass="divider-delay-2" />
            <WhyStic />

            <SectionDivider index="03" tag="CAMPUS CALENDAR" targetId="events" delayClass="divider-delay-3" />
            <Events />

            <SectionDivider index="04" tag="PROVE WORK" targetId="projects" delayClass="divider-delay-4" />
            <Projects />

            <SectionDivider index="05" tag="LEADERSHIP" targetId="team" delayClass="divider-delay-5" />
            <Team />

            <SectionDivider index="06" tag="ADMISSIONS" targetId="join" delayClass="divider-delay-6" />
            <JoinForm selectedClub={selectedClub} />

            <SectionDivider index="07" tag="KNOWLEDGE VAULT" targetId="faq" delayClass="divider-delay-7" />
            <Faq />
          </>
        )}
      </main>

      <Footer onSelectClub={handleSelectClub} />

      {/* Floating Action Elements */}
      <BackToTop />
      <FloatingContact />

      {/* Global Site Search Modal */}
      <SiteSearchModal 
        isOpen={searchModalOpen} 
        onClose={() => setSearchModalOpen(false)} 
        onSelectClub={handleSelectClub}
      />
    </div>
  );
}
