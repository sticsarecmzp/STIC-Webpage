import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';
import { COMMUNITY_INFO } from '../data/communityData';

export default function Navbar({ theme, onToggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu on hash click or resize, track scroll
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileMenuOpen(false);
    };

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div className="navbar-wrapper">
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <a href="#top" className="brand-link" aria-label="STIC Home">
            <img
              src={theme === 'dark' ? '/assets/logos/stic-logo-dark.png' : '/assets/logos/stic-logo-light.png'}
              alt="STIC Logo"
              className="brand-logo-img"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="brand-text-block">
              <span className="brand-heading">{COMMUNITY_INFO.name}</span>
              <span className="brand-subheading">{COMMUNITY_INFO.collegeShort}</span>
            </div>
          </a>

          <nav className="nav-links-desktop" aria-label="Main Navigation">
            <a href="#clubs" className="nav-anchor">Clubs</a>
            <a href="#why-stic" className="nav-anchor">Why STIC</a>
            <a href="#events" className="nav-anchor">Events</a>
            <a href="#projects" className="nav-anchor">Projects</a>
            <a href="#team" className="nav-anchor">Leadership</a>
            <a href="#faq" className="nav-anchor">FAQ</a>
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="btn-icon"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? <Sun size={17} strokeWidth={1.5} /> : <Moon size={17} strokeWidth={1.5} />}
            </button>

            <a href="#join" className="btn btn-primary btn-sm">
              <span>Join Community</span>
            </a>

            <button
              type="button"
              className="btn-icon mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-panel ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#clubs" className="mobile-nav-link" onClick={closeMenu}>Clubs and Guilds</a>
          <a href="#why-stic" className="mobile-nav-link" onClick={closeMenu}>Why STIC</a>
          <a href="#events" className="mobile-nav-link" onClick={closeMenu}>Events and Schedule</a>
          <a href="#projects" className="mobile-nav-link" onClick={closeMenu}>Student Projects</a>
          <a href="#team" className="mobile-nav-link" onClick={closeMenu}>Leadership and Mentors</a>
          <a href="#faq" className="mobile-nav-link" onClick={closeMenu}>Frequently Asked Questions</a>
          <a href="#join" className="btn btn-primary" onClick={closeMenu} style={{ width: '100%', marginTop: '0.5rem' }}>
            <span>Register for Track</span>
          </a>
        </div>
      </header>
    </div>
  );
}
