
import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Maximize2,
  X,
  UserCheck,
  Users,
  Terminal
} from 'lucide-react';
import { NOTICES_AND_EVENTS } from '../data/communityData';

export default function NoticeBoard() {
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

  return (
    <section id="notices" className="section-padding notices-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">
            Campus Events &amp; Updates
          </span>

          <h2 className="section-title">
            Notices, Events &amp; Gallery
          </h2>

          <p className="section-subtitle">
            Stay updated with upcoming workshops, coding sessions, and photos from our events at SAREC Mirzapur.
          </p>
        </div>

        {/* Horizontal Notices & Events List */}
        <div className="notices-horizontal-list">
          {NOTICES_AND_EVENTS.map((notice) => {
            const isUpcoming = notice.type === 'upcoming';
            const currentPhotoIdx = activePhotoIndex[notice.id] || 0;
            const hasPhotos = notice.photos && notice.photos.length > 0;
            const activePhoto = hasPhotos
              ? notice.photos[currentPhotoIdx]
              : null;

            return (
              <div
                key={notice.id}
                className={`neo-card notice-horizontal-card ${
                  isUpcoming ? 'notice-upcoming-glow' : ''
                }`}
              >
                {/* Left Column: Media */}
                <div className="notice-card-visual">
                  {hasPhotos ? (
                    <div className="horizontal-media-box">
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
                          <p className="horizontal-photo-caption">
                            {activePhoto.caption}
                          </p>

                          <span className="expand-pill">
                            <Maximize2 size={12} />
                            <span>Expand</span>
                          </span>
                        </div>
                      </div>

                      <div className="horizontal-thumbs-track">
                        {notice.photos.map((photo, pIdx) => {
                          const isThumbSelected = currentPhotoIdx === pIdx;

                          return (
                            <button
                              key={pIdx}
                              type="button"
                              className={`horizontal-thumb-btn ${
                                isThumbSelected ? 'active' : ''
                              }`}
                              onClick={() =>
                                handlePhotoSelect(notice.id, pIdx)
                              }
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
                  ) : notice.poster ? (
                    <div className="horizontal-poster-box">
                      <a
                        href={notice.poster || '/assets/Poster.jpeg'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="horizontal-poster-preview"
                        title="Click to view full resolution poster in new tab"
                      >
                        <img
                          src={notice.poster || '/assets/Poster.jpeg'}
                          alt={`${notice.title} Official Poster`}
                          className="horizontal-poster-img"
                          loading="lazy"
                        />
                      </a>
                    </div>
                  ) : (
                    <div className="horizontal-banner-box">
                      <div className="banner-top-badge-row">
                        <span className="banner-partner-badge">
                          <Terminal size={12} />
                          <span>STIC &bull; SAREC MIRZAPUR</span>
                        </span>

                        <span className="banner-live-indicator">
                          <span className="pulse-dot" />
                          <span>{notice.badge}</span>
                        </span>
                      </div>

                      <div className="banner-highlight-body">
                        <h4 className="banner-notice-name">{notice.title}</h4>
                      </div>

                      <div className="banner-footer-quote">
                        <span>
                          "Building genuine technology innovators from Day 1 on campus."
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Notice Information */}
                <div className="notice-card-content">
                  <div className="notice-card-top">
                    <div className="notice-badge-group">
                      <span
                        className={`notice-status-badge badge-${notice.type}`}
                      >
                        {isUpcoming && <span className="pulse-dot" />}
                        <span>{notice.badge}</span>
                      </span>

                      <span className="notice-category-tag">
                        {notice.category}
                      </span>
                    </div>

                    <div className="notice-datetime-tag">
                      <Calendar size={13} />
                      <span>{notice.date}</span>
                    </div>
                  </div>

                  <h3 className="horizontal-notice-title">
                    {notice.title}
                  </h3>

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

                  {notice.eligibility && (
                    <div className="notice-info-box eligibility-box">
                      <span className="info-box-label">Eligible:</span>
                      <span className="info-box-val">
                        {notice.eligibility}
                      </span>
                    </div>
                  )}

                  {notice.recap && (
                    <div className="notice-info-box recap-box">
                      <span className="info-box-label">Highlights:</span>
                      <span className="info-box-val">{notice.recap}</span>
                    </div>
                  )}

                  <div className="notice-card-actions">
                    {notice.actions &&
                      notice.actions.map((act, aIdx) => {
                        if (act.isInternal) {
                          return (
                            <button
                              key={aIdx}
                              type="button"
                              className={`btn btn-sm ${
                                act.primary ? 'btn-primary' : 'btn-secondary'
                              }`}
                              onClick={() => {
                                if (act.url.startsWith('#')) {
                                  scrollToSection(act.url.replace('#', ''));
                                } else {
                                  window.history.pushState({}, '', act.url);
                                  window.dispatchEvent(new PopStateEvent('popstate'));
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                              }}
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
                            className={`btn btn-sm ${
                              act.primary ? 'btn-primary' : 'btn-secondary'
                            }`}
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

        {/* Community Submission Box */}
        <div className="notices-footer-note">
          <div className="footer-note-left">
            <Sparkles size={16} className="note-sparkle-icon" />
            <span>
              Have an idea for a workshop or want to collaborate with STIC?
            </span>
          </div>

          <button
            type="button"
            className="btn-link"
            onClick={() => scrollToSection('contact')}
          >
            <span>Get in Touch With Us</span>
            <ArrowRight size={13} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div
          className="lightbox-backdrop"
          onClick={() => setLightboxPhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="lightbox-modal"
            onClick={(e) => e.stopPropagation()}
          >
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
