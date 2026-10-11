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
      <Navbar theme={theme} onToggleTheme={toggleTheme} onHome={handleNavigateHome} />
      <main id="main-content">
        {is404 ? (
          <NotFound onNavigateHome={handleNavigateHome} />
        ) : (
          <>
            <Hero onSelectClub={handleSelectClub} />
            <InstitutionStrip />
            <Clubs selectedClub={selectedClub} onSelectClub={handleSelectClub} />
            <WhyStic />
            <Events />
            <Projects />
            <Team />
            <JoinForm selectedClub={selectedClub} />
            <Faq />
          </>
        )}
      </main>
      <Footer onSelectClub={handleSelectClub} />
    </div>
  );
}
