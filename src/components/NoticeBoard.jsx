import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ExternalLink, ArrowRight, Bell, Sparkles, History, Newspaper } from 'lucide-react';
import { NOTICES_AND_EVENTS } from '../data/communityData';

export default function NoticeBoard() {
  const [activeFilter, setActiveFilter] = useState('all');

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredNotices = NOTICES_AND_EVENTS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  const upcomingCount = NOTICES_AND_EVENTS.filter(n => n.type === 'upcoming').length;
  const pastCount = NOTICES_AND_EVENTS.filter(n => n.type === 'past').length;
  const newsCount = NOTICES_AND_EVENTS.filter(n => n.type === 'news').length;

  return (
    <section id="notices" className="section-padding notices-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Official Bulletin &amp; Activities</span>
          <h2 className="section-title">Notices, Events &amp; News</h2>
          <p className="section-subtitle">
            Stay updated with upcoming hackathons, hands-on coding bootcamps, previous session links, and campus announcements.
          </p>
        </div>

        {/* Live Filter Bar */}
        <div className="notices-filter-bar">
          <button
            type="button"
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            <span>All Updates</span>
            <span className="filter-count">{NOTICES_AND_EVENTS.length}</span>
          </button>

          <button
            type="button"
            className={`filter-btn ${activeFilter === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveFilter('upcoming')}
          >
            <span className="filter-live-dot" aria-hidden="true" />
            <span>Upcoming Events</span>
            <span className="filter-count">{upcomingCount}</span>
          </button>

          <button
            type="button"
            className={`filter-btn ${activeFilter === 'past' ? 'active' : ''}`}
            onClick={() => setActiveFilter('past')}
          >
            <History size={13} />
            <span>Past Events &amp; Links</span>
            <span className="filter-count">{pastCount}</span>
          </button>

          <button
            type="button"
            className={`filter-btn ${activeFilter === 'news' ? 'active' : ''}`}
            onClick={() => setActiveFilter('news')}
          >
            <Newspaper size={13} />
            <span>Official News</span>
            <span className="filter-count">{newsCount}</span>
          </button>
        </div>

        {/* Notices Cards Grid */}
        <div className="notices-grid">
          {filteredNotices.map((notice) => {
            const isUpcoming = notice.type === 'upcoming';
            const isPast = notice.type === 'past';

            return (
              <div
                key={notice.id}
                className={`neo-card notice-card domain-${notice.accent} ${isUpcoming ? 'notice-upcoming-glow' : ''}`}
              >
                {/* Notice Top Meta Header */}
                <div className="notice-card-top">
                  <div className="notice-badge-group">
                    <span className={`notice-status-badge badge-${notice.type}`}>
                      {isUpcoming && <span className="pulse-dot" />}
                      <span>{notice.badge}</span>
                    </span>
                    <span className="notice-category-tag">{notice.category}</span>
                  </div>

                  <div className="notice-datetime-tag">
                    <Calendar size={13} />
                    <span>{notice.date}</span>
                  </div>
                </div>

                {/* Main Content */}
                <h3 className="notice-title">{notice.title}</h3>

                <div className="notice-location-row">
                  <div className="notice-loc-item">
                    <MapPin size={13} />
                    <span>{notice.venue}</span>
                  </div>
                  {notice.time && (
                    <div className="notice-loc-item">
                      <Clock size={13} />
                      <span>{notice.time}</span>
                    </div>
                  )}
                </div>

                <p className="notice-desc">{notice.description}</p>

                {/* Optional Eligibility or Recap Box */}
                {notice.eligibility && (
                  <div className="notice-info-box eligibility-box">
                    <span className="info-box-label">ELIGIBILITY:</span>
                    <span className="info-box-val">{notice.eligibility}</span>
                  </div>
                )}

                {notice.recap && (
                  <div className="notice-info-box recap-box">
                    <span className="info-box-label">SESSION RECAP:</span>
                    <span className="info-box-val">{notice.recap}</span>
                  </div>
                )}

                {/* Action Links & Buttons */}
                <div className="notice-card-actions">
                  {notice.actions && notice.actions.map((act, aIdx) => {
                    if (act.isInternal) {
                      return (
                        <button
                          key={aIdx}
                          type="button"
                          className={`btn btn-sm ${act.primary ? 'btn-primary' : 'btn-secondary'}`}
                          onClick={() => scrollToSection(act.url.replace('#', ''))}
                        >
                          <span>{act.label}</span>
                          <ArrowRight size={13} strokeWidth={2} />
                        </button>
                      );
                    }
                    return (
                      <a
                        key={aIdx}
                        href={act.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn btn-sm ${act.primary ? 'btn-primary' : 'btn-secondary'}`}
                      >
                        <span>{act.label}</span>
                        <ExternalLink size={13} strokeWidth={2} />
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Community Submission / Propose Event Box */}
        <div className="notices-footer-note">
          <div className="footer-note-left">
            <Sparkles size={16} className="note-sparkle-icon" />
            <span>Have an idea for a technical workshop or want to lead a coding session?</span>
          </div>
          <button
            type="button"
            className="btn-link"
            onClick={() => scrollToSection('contact')}
          >
            <span>Pitch to STIC Council</span>
            <ArrowRight size={13} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
