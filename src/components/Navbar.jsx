import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ExternalLink } from 'lucide-react';
import { COMMUNITY_INFO } from '../data/communityData';

export default function Navbar({ theme, onToggleTheme, onHome }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileMenuOpen(false);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  const handleBrandClick = (e) => {
    closeMenu();
    if (onHome) {
      onHome();
    }
  };

  return (
    <>
      <div
        className={`mobile-menu-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <div className="navbar-wrapper">
        <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
          <div className="navbar-inner container">
            <a
              href="#top"
              className="brand-link"
              onClick={handleBrandClick}
              aria-label="STIC SAREC Mirzapur Home"
            >
              <div className="brand-logo-container">
                <img
                  src="/assets/logos/stic-logo-light.png"
                  alt="STIC Logo"
                  className="brand-logo-img"
                />
              </div>
              <div className="brand-text-block">
                <span className="brand-heading">{COMMUNITY_INFO.name}</span>
                <span className="brand-subheading">{COMMUNITY_INFO.collegeShort}</span>
              </div>
            </a>

            <nav className="nav-links-desktop" aria-label="Main Navigation">
              <a href="#about" className="nav-anchor">About</a>
              <a href="#domains" className="nav-anchor">Focus Areas</a>
              <a href="#departments" className="nav-anchor">Departments</a>
              <a href="#leadership" className="nav-anchor">Leadership</a>
              <a href="#contact" className="nav-anchor">Contact</a>
            </nav>

            <div className="nav-actions">
              <a
                href={COMMUNITY_INFO.collegeWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-link-college"
                title="Official College Portal"
              >
                <span>sarecmzp.ac.in</span>
                <ExternalLink size={13} strokeWidth={2.5} />
              </a>

              <button
                type="button"
                id="theme-toggle-btn"
                className="btn-icon theme-toggle"
                onClick={onToggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              >
                {theme === 'dark' ? <Sun size={17} strokeWidth={2} /> : <Moon size={17} strokeWidth={2} />}
              </button>

              <button
                type="button"
                className="btn-icon mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {mobileMenuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
              </button>
            </div>
          </div>

          <div className={`mobile-nav-panel ${mobileMenuOpen ? 'open' : ''}`}>
            <nav className="mobile-nav-links-list" aria-label="Mobile Navigation">
              <a href="#about" className="mobile-nav-link" onClick={closeMenu}>
                About STIC
              </a>
              <a href="#domains" className="mobile-nav-link" onClick={closeMenu}>
                Technical Focus Areas
              </a>
              <a href="#departments" className="mobile-nav-link" onClick={closeMenu}>
                Engineering Departments
              </a>
              <a href="#leadership" className="mobile-nav-link" onClick={closeMenu}>
                Faculty &amp; Leadership
              </a>
              <a href="#contact" className="mobile-nav-link" onClick={closeMenu}>
                Contact &amp; Connect
              </a>
              <a
                href={COMMUNITY_INFO.collegeWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-nav-link college-link-mobile"
                onClick={closeMenu}
              >
                <span>Visit sarecmzp.ac.in</span>
                <ExternalLink size={14} strokeWidth={2.5} />
              </a>
            </nav>

            <div className="mobile-drawer-footer">
              <div className="mobile-theme-row">
                <span>Theme: <strong>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</strong></span>
                <button
                  type="button"
                  className="btn-icon"
                  onClick={onToggleTheme}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
