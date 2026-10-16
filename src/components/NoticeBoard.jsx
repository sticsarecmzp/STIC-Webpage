import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ExternalLink, ArrowRight, Sparkles, History, Newspaper, Camera, Maximize2, X, UserCheck, Users } from 'lucide-react';
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

  const upcomingCount = NOTICES_AND_EVENTS.filter(n => n.type === 'upcoming').length;
  const pastCount = NOTICES_AND_EVENTS.filter(n => n.type === 'past').length;
  const newsCount = NOTICES_AND_EVENTS.filter(n => n.type === 'news').length;

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

        {/* Notices Cards Grid */}
        <div className="notices-grid">
          {filteredNotices.map((notice) => {
            const isUpcoming = notice.type === 'upcoming';
            const currentPhotoIdx = activePhotoIndex[notice.id] || 0;
            const hasPhotos = notice.photos && notice.photos.length > 0;
            const activePhoto = hasPhotos ? notice.photos[currentPhotoIdx] : null;

            return (
              <div
                key={notice.id}
                className={`neo-card notice-card domain-${notice.accent} ${isUpcoming ? 'notice-upcoming-glow' : ''} ${hasPhotos ? 'notice-with-gallery' : ''}`}
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

                {/* Main Title */}
                <h3 className="notice-title">{notice.title}</h3>

                {/* Speaker & Coordinator details if applicable */}
                {notice.speaker && (
                  <div className="notice-speaker-row">
                    <UserCheck size={13} className="speaker-icon" />
                    <span><strong>Speaker:</strong> {notice.speaker}</span>
                  </div>
                )}
                {notice.coordinators && (
                  <div className="notice-speaker-row">
                    <Users size={13} className="speaker-icon" />
                    <span><strong>Coordination:</strong> {notice.coordinators}</span>
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

                {/* Real Event Photo Gallery */}
                {hasPhotos && (
                  <div className="notice-gallery-container">
                    <div className="gallery-header-row">
                      <div className="gallery-title-tag">
                        <Camera size={13} />
                        <span>Event Photos ({notice.photos.length} Verified Photos)</span>
                      </div>
                      <span className="gallery-counter">
                        {currentPhotoIdx + 1} / {notice.photos.length}
                      </span>
                    </div>

                    {/* Featured Photo Preview */}
                    <div
                      className="gallery-preview-wrapper"
                      onClick={() => setLightboxPhoto(activePhoto)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setLightboxPhoto(activePhoto);
                        }
                      }}
                      title="Click to view full image"
                    >
                      <img
                        src={activePhoto.url}
                        alt={activePhoto.alt}
                        className="gallery-preview-img"
                        loading="lazy"
                      />
                      <div className="gallery-preview-overlay">
                        <span className="gallery-preview-caption">
                          {activePhoto.caption}
                        </span>
                        <span className="gallery-expand-hint">
                          <Maximize2 size={12} />
                          <span>Expand</span>
                        </span>
                      </div>
                    </div>

                    {/* Thumbnail navigation row */}
                    <div className="gallery-thumbs-row">
                      {notice.photos.map((photo, pIdx) => {
                        const isSelected = currentPhotoIdx === pIdx;
                        return (
                          <button
                            key={pIdx}
                            type="button"
                            className={`gallery-thumb-btn ${isSelected ? 'active' : ''}`}
                            onClick={() => handlePhotoSelect(notice.id, pIdx)}
                            aria-label={`View photo ${pIdx + 1}: ${photo.caption}`}
                          >
                            <img src={photo.url} alt="" className="gallery-thumb-img" loading="lazy" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

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
