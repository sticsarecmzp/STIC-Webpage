import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight, MessageSquare, Mail, Search, Command } from 'lucide-react';
import { COMMUNITY_INFO } from '../data/communityData';

export default function Navbar({ theme, onToggleTheme, onHome, onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu on resize, track scroll, handle Escape key and body scroll lock
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

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
      // Keyboard shortcut Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (onOpenSearch) onOpenSearch();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onOpenSearch]);

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
      {/* Mobile Backdrop Overlay */}
      <div
        className={`mobile-menu-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <div className="navbar-wrapper">
        <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
          <div className="navbar-inner">
            <a
              href="#top"
              className="brand-link"
              onClick={handleBrandClick}
              aria-label="STIC SAREC Mirzapur Home"
            >
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
              {/* Site Search Button */}
              <button
                type="button"
                className="btn-icon"
                onClick={onOpenSearch}
                aria-label="Search site (Ctrl+K)"
                title="Search (Ctrl+K)"
              >
                <Search size={16} strokeWidth={1.8} />
              </button>

              {/* Theme Toggle Button */}
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

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                className="btn-icon mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {mobileMenuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          <div className={`mobile-nav-panel ${mobileMenuOpen ? 'open' : ''}`}>
            {/* Quick Mobile Search Trigger */}
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                closeMenu();
                if (onOpenSearch) onOpenSearch();
              }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem', width: '100%', marginBottom: '0.5rem' }}
            >
              <Search size={14} strokeWidth={2} />
              <span>Quick Search (Ctrl+K)</span>
            </button>

            <nav className="mobile-nav-links-list" aria-label="Mobile Navigation">
              <a href="#clubs" className="mobile-nav-link" onClick={closeMenu}>
                <span>Clubs &amp; 8 Guilds</span>
              </a>
              <a href="#why-stic" className="mobile-nav-link" onClick={closeMenu}>
                <span>Why STIC Methodology</span>
              </a>
              <a href="#events" className="mobile-nav-link" onClick={closeMenu}>
                <span>Events &amp; Sprints Calendar</span>
              </a>
              <a href="#projects" className="mobile-nav-link" onClick={closeMenu}>
                <span>Student Innovation Projects</span>
              </a>
              <a href="#team" className="mobile-nav-link" onClick={closeMenu}>
                <span>Faculty &amp; Student Leads</span>
              </a>
              <a href="#faq" className="mobile-nav-link" onClick={closeMenu}>
                <span>Frequently Asked Questions</span>
              </a>
            </nav>

            <div className="mobile-drawer-footer">
              <div className="mobile-theme-row">
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Theme: <strong>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</strong>
                </span>
                <button
                  type="button"
                  className="btn-icon"
                  onClick={onToggleTheme}
                  aria-label="Toggle theme in mobile menu"
                >
                  {theme === 'dark' ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
                </button>
              </div>

              <a
                href="#join"
                className="btn btn-primary"
                onClick={closeMenu}
                style={{ width: '100%', marginTop: '0.75rem' }}
              >
                <span>Register for Track</span>
              </a>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
