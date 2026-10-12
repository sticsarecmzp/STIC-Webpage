import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, X } from 'lucide-react';

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(() => {
    try {
      return localStorage.getItem('stic_banner_dismissed_2026') !== 'true';
    } catch {
      return true;
    }
  });

  const handleDismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem('stic_banner_dismissed_2026', 'true');
    } catch {}
  };

  if (!visible) return null;

  return (
    <aside className="announcement-banner" aria-label="Campus Announcement">
      <div className="container announcement-banner-inner">
        <div className="announcement-content">
          <span className="announcement-badge">
            <Sparkles size={12} strokeWidth={2} />
            <span>Active Sprint</span>
          </span>
          <span className="announcement-text">
            <strong>2025–2026 Academic Cohort</strong>: Registrations open across all 8 Guilds &amp; SIH internal qualifiers at SAREC Mirzapur!
          </span>
        </div>

        <div className="announcement-actions">
          <a href="#join" className="announcement-link">
            <span>Register Now</span>
            <ArrowRight size={13} strokeWidth={2} />
          </a>
          <button
            type="button"
            className="announcement-close-btn"
            onClick={handleDismiss}
            aria-label="Dismiss banner"
            title="Dismiss announcement"
          >
            <X size={14} strokeWidth={2} />
          </button>
        </div>
      </div>
    </aside>
  );
}
