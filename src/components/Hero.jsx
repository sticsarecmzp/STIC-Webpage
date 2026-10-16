import React from 'react';
import { ArrowDown, Bell, Mail } from 'lucide-react';
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
          {/* Left Column: Clear Community Identity */}
          <div className="hero-left-content">
            <div className="institution-pill">
              <span className="live-dot" aria-hidden="true" />
              <span>{COMMUNITY_INFO.collegeShort} &bull; Student Technical Society</span>
            </div>

            <div className="hero-branding-group">
              <h1 className="hero-title-main">
                {COMMUNITY_INFO.name}
              </h1>
              
              <h2 className="hero-tagline-text">
                {COMMUNITY_INFO.fullName}
              </h2>
            </div>

            <p className="hero-tagline-motto">
              &ldquo;{COMMUNITY_INFO.tagline}&rdquo;
            </p>

            <p className="hero-description">
              The official tech-driven student society of Samrat Ashoka Rajkiya Engineering College, Mirzapur. Built by students for students, STIC bridges the gap between academic curriculum and real-world technology across Data Structures &amp; Algorithms (DSA), Full-Stack Development, Machine Learning, and Competitive Programming.
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

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => scrollToSection('workflow')}
              >
                <span>How It Works</span>
                <ArrowDown size={15} strokeWidth={2.5} />
              </button>

              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => scrollToSection('notices')}
              >
                <Bell size={15} strokeWidth={2} />
                <span>Notices &amp; Events</span>
              </button>
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
                <span className="emblem-badge-pill">{COMMUNITY_INFO.name}</span>
                <span className="emblem-tagline">{COMMUNITY_INFO.fullName}</span>
              </div>

              <div className="emblem-meta-line">
                <span>EST. 2023 &bull; SAREC MIRZAPUR</span>
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
