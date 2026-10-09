import React from 'react';
import { ArrowRight, MapPin, Sparkles, Layers, Users, FolderGit2, Trophy } from 'lucide-react';
import { COMMUNITY_INFO, COMMUNITY_STATS } from '../data/communityData';

const STAT_ICONS = [Layers, Users, FolderGit2, Trophy];

export default function Hero({ onSelectClub }) {
  return (
    <section id="top" className="hero-section">
      <div className="hero-mesh-glow" aria-hidden="true" />
      <div className="container">
        <div className="hero-content">
          {/* Location & Academic Cohort Pill */}
          <div className="hero-live-badge">
            <span className="live-pulse-wrapper">
              <span className="live-pulse-ring" />
              <span className="live-pulse-dot" />
            </span>
            <span>📍 SAREC Mirzapur • Code 1215</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>{COMMUNITY_INFO.academicYear} Cohort</span>
          </div>

          <h1 className="hero-title">
            Innovation Redefined. The student technical community of{' '}
            <span className="hero-title-accent">SAREC Mirzapur</span>.
          </h1>

          <p className="hero-paragraph">
            We build production software, collaborate on open source ecosystems, engineer hardware prototypes, and prepare for national hackathons like Smart India Hackathon (SIH). Driven by students, guided by faculty, and open to all engineering departments.
          </p>

          <div className="hero-cta-group">
            <a href="#join" className="btn btn-primary">
              <span>Join Community</span>
              <ArrowRight size={16} strokeWidth={1.5} />
            </a>

            <a href="#projects" className="btn btn-secondary">
              <span>View Projects</span>
            </a>

            <a href="#clubs" className="btn btn-ghost" style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--btn-radius)' }}>
              <span>Explore 8 Guilds</span>
            </a>
          </div>
        </div>

        {/* Community Stat Counters */}
        <div className="hero-specs-grid" aria-label="Community Specifications and Impact">
          {COMMUNITY_STATS.map((stat, idx) => {
            const Icon = STAT_ICONS[idx] || Sparkles;
            return (
              <div key={idx} className="spec-card">
                <div className="spec-label">
                  <Icon size={14} strokeWidth={1.5} />
                  <span>{stat.label}</span>
                </div>
                <div className="spec-value" style={{ fontSize: 'var(--step-2)', fontWeight: 800, color: 'var(--text)' }}>
                  {stat.value}
                </div>
                <div className="spec-sub">{stat.sub}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
