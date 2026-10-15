import React from 'react';
import { ExternalLink, Mail } from 'lucide-react';
import { COMMUNITY_INFO, COMMUNITY_STATS } from '../data/communityData';

export default function Hero() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="top" className="hero-section">
      <div className="container">
        {/* Clean, Spacious 2-Column Layout */}
        <div className="hero-grid-2col">
          {/* Left Column: Clear Identity, College Name & CTAs */}
          <div className="hero-left-content">
            <div className="institution-pill">
              <span className="live-dot" aria-hidden="true" />
              <span>{COMMUNITY_INFO.collegeShort} &bull; {COMMUNITY_INFO.collegeCode}</span>
            </div>

            <h1 className="hero-title-main">
              {COMMUNITY_INFO.fullName}
            </h1>

            <p className="hero-college-name">
              {COMMUNITY_INFO.college}
            </p>

            <p className="hero-description">
              The official student technical community of SAREC Mirzapur (Affiliated to AKTU Lucknow). Empowering engineers across CSE, IT, EL, and EE to build software, master algorithms, and innovate.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => scrollToSection('contact')}
              >
                <Mail size={16} strokeWidth={2.5} />
                <span>Connect With Us</span>
              </button>

              <a
                href={COMMUNITY_INFO.collegeWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <span>College Portal</span>
                <ExternalLink size={15} strokeWidth={2.5} />
              </a>
            </div>
          </div>

          {/* Right Column: Clean, Iconic STIC Emblem Card */}
          <div className="hero-right-showcase">
            <div className="neo-card stic-minimal-card">
              <div className="emblem-circle">
                <img
                  src="/assets/logos/stic-logo-light.png"
                  alt="STIC Official Emblem"
                  className="emblem-img"
                />
              </div>

              <div className="emblem-info">
                <h2 className="emblem-acronym">{COMMUNITY_INFO.name}</h2>
                <span className="emblem-tagline">{COMMUNITY_INFO.tagline}</span>
              </div>

              <div className="emblem-meta-line">
                <span>SAREC MIRZAPUR &bull; CODE 1215</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clean, Minimal Stats Row */}
        <div className="hero-stats-row">
          {COMMUNITY_STATS.map((stat, idx) => (
            <div key={idx} className="stat-pill-card">
              <span className="stat-pill-val">{stat.value}</span>
              <span className="stat-pill-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
