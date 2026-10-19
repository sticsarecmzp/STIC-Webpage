import React, { useState, useEffect } from 'react';
import { ArrowDown, Bell, Mail, UserPlus, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { COMMUNITY_INFO, COMMUNITY_STATS, NOTICES_AND_EVENTS } from '../data/communityData';

export default function Hero() {
  const upcomingEvents = NOTICES_AND_EVENTS.filter(
    (n) => n.type === 'upcoming' || Boolean(n.poster)
  );

  const [currentNoticeIdx, setCurrentNoticeIdx] = useState(0);

  // Auto-cycle through upcoming announcements if more than one exists
  useEffect(() => {
    if (upcomingEvents.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentNoticeIdx((prev) => (prev + 1) % upcomingEvents.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [upcomingEvents.length]);

  const activeNotice = upcomingEvents[currentNoticeIdx] || NOTICES_AND_EVENTS[0];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegister = () => {
    window.history.pushState({}, '', '/register');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="top" className="hero-section">
      <div className="container">

        {/* Hero Section: Two-Column Layout */}
        <div className="hero-grid-2col">

          {/* Left Column: Headline, Description & Actions */}
          <div className="hero-left-content">

            <div className="institution-pill">
              <span className="live-dot" aria-hidden="true" />
              <span>
                {COMMUNITY_INFO.collegeShort} &bull; Student Developer Club
              </span>
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
              A student-run community at SAREC Mirzapur. We code together, build real software, explore modern tools, and help each other learn from scratch.
            </p>

            {/* Hero Action Buttons */}
            <div className="hero-actions">

              {/* Registration Button */}
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleRegister}
              >
                <UserPlus size={16} strokeWidth={2.5} />
                <span>Join the Community</span>
              </button>

              {/* How It Works Button */}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => scrollToSection('workflow')}
              >
                <span>How It Works</span>
                <ArrowDown size={15} strokeWidth={2.5} />
              </button>

              {/* Notices & Events Button */}
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => scrollToSection('notices')}
              >
                <Bell size={15} strokeWidth={2} />
                <span>Events &amp; Updates</span>
              </button>

              {/* Connect With Us Button */}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => scrollToSection('contact')}
              >
                <Mail size={16} strokeWidth={2} />
                <span>Get in Touch</span>
              </button>

            </div>
          </div>

          {/* Right Column: Featured Upcoming Event Announcement & Poster Card */}
          <div className="hero-right-showcase">
            <div className="neo-card hero-event-notice-card">

              {/* Live Header Bar */}
              <div className="hero-notice-header">
                <div className="hero-notice-live-pill">
                  <span className="live-dot" aria-hidden="true" />
                  <span>Upcoming Event</span>
                </div>
                <span className="hero-notice-badge">
                  {activeNotice.category || 'Workshop'}
                </span>
              </div>

              {/* Announcement Poster Showcase */}
              <div
                className="hero-notice-poster-box"
                onClick={() => scrollToSection('notices')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    scrollToSection('notices');
                  }
                }}
                title="Click to view full notice and event details"
              >
                <img
                  src={activeNotice.poster || '/assets/Poster.jpeg'}
                  alt={`${activeNotice.title} Official Announcement Poster`}
                  className="hero-notice-poster-img"
                  loading="eager"
                />
                <div className="hero-notice-poster-hover-tag">
                  <span>View in Notice Board &rarr;</span>
                </div>
              </div>

              {/* Event Content & Details */}
              <div className="hero-notice-content">
                <h3
                  className="hero-notice-title"
                  onClick={() => scrollToSection('notices')}
                  title="Click to jump to Notice Board"
                >
                  {activeNotice.title}
                </h3>

                <div className="hero-notice-meta-line">
                  <div className="hero-notice-meta-item">
                    <Calendar size={13} strokeWidth={2} />
                    <span>{activeNotice.date}</span>
                  </div>
                  <div className="hero-notice-meta-item">
                    <MapPin size={13} strokeWidth={2} />
                    <span>Central Computer Lab</span>
                  </div>
                </div>

                <div className="hero-notice-action-row">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm hero-notice-btn"
                    onClick={handleRegister}
                  >
                    <UserPlus size={14} strokeWidth={2.2} />
                    <span>Register Now</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary btn-sm hero-notice-btn"
                    onClick={() => scrollToSection('notices')}
                  >
                    <span>Full Notice</span>
                    <ArrowRight size={13} strokeWidth={2.2} />
                  </button>
                </div>
              </div>

              {/* Carousel dots if multiple upcoming announcements */}
              {upcomingEvents.length > 1 && (
                <div className="hero-notice-carousel-dots">
                  {upcomingEvents.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`hero-notice-dot ${idx === currentNoticeIdx ? 'active' : ''}`}
                      onClick={() => setCurrentNoticeIdx(idx)}
                      aria-label={`Show announcement ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Community Statistics */}
        <div className="hero-stats-row">
          {COMMUNITY_STATS.map((stat, idx) => (
            <div key={idx} className="stat-pill-card">
              <span className="stat-pill-val">
                {stat.value}
              </span>

              <span className="stat-pill-label">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
