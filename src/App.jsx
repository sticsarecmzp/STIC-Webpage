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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('stic_theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSelectClub = (clubTrack) => {
    setSelectedClub(clubTrack);
  };

  return (
    <div className="app-layout">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main id="main-content">
        <Hero onSelectClub={handleSelectClub} />
        <InstitutionStrip />
        <Clubs selectedClub={selectedClub} onSelectClub={handleSelectClub} />
        <WhyStic />
        <Events />
        <Projects />
        <Team />
        <JoinForm selectedClub={selectedClub} />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
