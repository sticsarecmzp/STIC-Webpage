import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Workflow from './components/Workflow';
import FocusAreas from './components/FocusAreas';
import NoticeBoard from './components/NoticeBoard';
import Departments from './components/Departments';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import RegistrationForm from './components/RegistrationForm';
import ScrollProgressBar from './components/ScrollProgressBar';
import BackToTop from './components/BackToTop';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('stic_theme');
      if (saved) return saved;
      return 'dark';
    } catch {
      return 'dark';
    }
  });

  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

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
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
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

      {/* Reading Progress Indicator */}
      <ScrollProgressBar />

      {/* Neo-brutalist Sticky Navbar */}
      <Navbar 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        onHome={handleNavigateHome} 
      />

      <main id="main-content">
        {is404 ? (
          <NotFound onNavigateHome={handleNavigateHome} />
        ) : (
          <>
            <Hero />
            <About />
            <Workflow />
            <FocusAreas />
            <NoticeBoard />
            <Departments />
            <Leadership />
            <Contact />
          </>
        )}
      </main>

      <Footer />

      {/* Back to top button */}
      <BackToTop />
    </div>
  );
}
