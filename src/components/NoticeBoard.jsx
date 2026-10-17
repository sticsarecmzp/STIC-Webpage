import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  ExternalLink,
  ArrowRight,
  Sparkles,
  History,
  Newspaper,
  Camera,
  Maximize2,
  X,
  UserCheck,
  Users,
  Terminal
} from 'lucide-react';
import { NOTICES_AND_EVENTS } from '../data/communityData';

export default function NoticeBoard() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState({});
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePhotoSelect = (noticeId, index) => {
    setActivePhotoIndex((prev) => ({
      ...prev,
      [noticeId]: index
    }));
  };

  const filteredNotices = NOTICES_AND_EVENTS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  const upcomingCount = NOTICES_AND_EVENTS.filter((n) => n.type === 'upcoming').length;
  const pastCount = NOTICES_AND_EVENTS.filter((n) => n.type === 'past').length;
  const newsCount = NOTICES_AND_EVENTS.filter((n) => n.type === 'news').length;

  return (
    <section id="notices" className="section-padding notices-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Official Bulletin &amp; Activities</span>
          <h2 className="section-title">Notices, Events &amp; Gallery</h2>
          <p className="section-subtitle">
            Authentic records of STIC campus initiatives &bull; Upcoming Open Source Day sprint, milestone Build With AI masterclass with GDG Prayagraj, and community roadmaps.
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
            <span>Past Events &amp; Photos</span>
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

        {/* HORIZONTAL NOTICES & EVENTS LIST */}
        <div className="notices-horizontal-list">
          {filteredNotices.map((notice) => {
            const isUpcoming = notice.type === 'upcoming';
            const currentPhotoIdx = activePhotoIndex[notice.id] || 0;
            const hasPhotos = notice.photos && notice.photos.length > 0;
            const activePhoto = hasPhotos ? notice.photos[currentPhotoIdx] : null;

            return (
              <div
                key={notice.id}
                className={`neo-card notice-horizontal-card ${isUpcoming ? 'notice-upcoming-glow' : ''}`}
              >
                {/* LEFT COLUMN: Media Showcase (Real Photos or Tech Banner) */}
                <div className="notice-card-visual">
                  {hasPhotos ? (
                    <div className="horizontal-media-box">
                      <div className="horizontal-media-header">
                        <div className="media-header-left">
                          <Camera size={13} className="media-cam-icon" />
                          <span>Event Photos &bull; {notice.photos.length} Verified</span>
                        </div>
                        <span className="media-counter">
                          Photo {currentPhotoIdx + 1} of {notice.photos.length}
                        </span>
                      </div>

                      {/* Main Featured Photo Preview */}
                      <div
                        className="horizontal-photo-preview"
                        onClick={() => setLightboxPhoto(activePhoto)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setLightboxPhoto(activePhoto);
                          }
                        }}
                        title="Click to expand full resolution image"
                      >
                        <img
                          src={activePhoto.url}
                          alt={activePhoto.alt}
                          className="horizontal-preview-img"
                          loading="lazy"
                        />
                        <div className="horizontal-photo-overlay">
                          <p className="horizontal-photo-caption">{activePhoto.caption}</p>
                          <span className="expand-pill">
                            <Maximize2 size={12} />
                            <span>Expand</span>
                          </span>
                        </div>
                      </div>

                      {/* Horizontal Thumbnail Slider Row */}
                      <div className="horizontal-thumbs-track">
                        {notice.photos.map((photo, pIdx) => {
                          const isThumbSelected = currentPhotoIdx === pIdx;
                          return (
                            <button
                              key={pIdx}
                              type="button"
                              className={`horizontal-thumb-btn ${isThumbSelected ? 'active' : ''}`}
                              onClick={() => handlePhotoSelect(notice.id, pIdx)}
                              aria-label={`View photo ${pIdx + 1}: ${photo.caption}`}
                            >
                              <img
                                src={photo.url}
                                alt=""
                                className="horizontal-thumb-img"
                                loading="lazy"
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    /* Tech Visual Card for Upcoming / News Without Photo Array */
                    <div className="horizontal-banner-box">
                      <div className="banner-top-badge-row">
                        <span className="banner-partner-badge">
                          <Terminal size={12} />
                          <span>STIC &bull; WIKICLUB &bull; GDG</span>
                        </span>
                        <span className="banner-live-indicator">
                          <span className="pulse-dot" />
                          <span>{notice.badge}</span>
                        </span>
                      </div>

                      <div className="banner-highlight-body">
                        <div className="banner-date-stamp">
                          <span className="stamp-month">FEB</span>
                          <span className="stamp-day">2026</span>
                          <span className="stamp-sub">SAREC MIRZAPUR</span>
                        </div>

                        <div className="banner-topics-list">
                          <span className="banner-topic-chip">Git Workflows</span>
                          <span className="banner-topic-chip">GitHub PRs</span>
                          <span className="banner-topic-chip">Open Source Sprints</span>
                          <span className="banner-topic-chip">SIH &amp; GSoC Prep</span>
                        </div>
                      </div>

                      <div className="banner-footer-quote">
                        <span>"Building genuine open-source contributors from Day 1 on campus."</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT COLUMN: Full Notice Information & Actions */}
                <div className="notice-card-content">
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

                  <h3 className="horizontal-notice-title">{notice.title}</h3>

                  {/* Speaker & Coordinator details */}
                  {notice.speaker && (
                    <div className="notice-speaker-row">
                      <UserCheck size={14} className="speaker-icon" />
                      <span>
                        <strong>Speaker:</strong> {notice.speaker}
                      </span>
                    </div>
                  )}
                  {notice.coordinators && (
                    <div className="notice-speaker-row">
                      <Users size={14} className="speaker-icon" />
                      <span>
                        <strong>Coordination:</strong> {notice.coordinators}
                      </span>
                    </div>
                  )}

                  {/* Venue and Timing */}
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

                  {/* Description */}
                  <p className="notice-desc">{notice.description}</p>

                  {/* Eligibility or Recap Box */}
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
                    {notice.actions &&
                      notice.actions.map((act, aIdx) => {
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
              </div>
            );
          })}
        </div>

        {/* Community Submission / Propose Event Box */}
        <div className="notices-footer-note">
          <div className="footer-note-left">
            <Sparkles size={16} className="note-sparkle-icon" />
            <span>Have an idea for a technical workshop or want to collaborate with STIC?</span>
          </div>
          <button
            type="button"
            className="btn-link"
            onClick={() => scrollToSection('contact')}
          >
            <span>Reach Out to Student Council</span>
            <ArrowRight size={13} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Lightbox Modal for Photo Inspection */}
      {lightboxPhoto && (
        <div
          className="lightbox-backdrop"
          onClick={() => setLightboxPhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setLightboxPhoto(null)}
              aria-label="Close photo"
            >
              <X size={18} />
            </button>
            <div className="lightbox-image-wrapper">
              <img
                src={lightboxPhoto.url}
                alt={lightboxPhoto.alt}
                className="lightbox-full-img"
              />
            </div>
            <div className="lightbox-caption">
              <p>{lightboxPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
