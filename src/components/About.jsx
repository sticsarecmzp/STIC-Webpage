import React from "react";
import { ArrowRight, Terminal } from "lucide-react";
import { COMMUNITY_INFO, ABOUT_POINTS } from "../data/communityData";

export default function About() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="section-padding about-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Who We Are</span>
          <h2 className="section-title">About STIC</h2>
          <p className="section-subtitle">
            {COMMUNITY_INFO.fullName} &bull; The student developer club at SAREC Mirzapur.
          </p>
        </div>

        {/* 2-Column Grid: Left is Community Identity & Profile, Right is Pillars & Activities */}
        <div className="about-grid">
          {/* Left Column: STIC Identity Card */}
          <div className="about-card college-profile-card">
            <div className="college-profile-header">
              <img
                src="/assets/logos/stic-logo-light.png"
                alt="STIC Community Emblem"
                className="college-seal-img"
              />
              <div>
                <span className="card-badge highlight-badge">
                  Student Developer Club
                </span>
                <h3 className="college-title">{COMMUNITY_INFO.name}</h3>
                <p className="college-meta-line">{COMMUNITY_INFO.fullName}</p>
              </div>
            </div>

            <div className="about-official-content">
              <p className="about-text">
                <strong>STIC ({COMMUNITY_INFO.fullName})</strong> is the student developer community of Samrat Ashoka Rajkiya Engineering College, Mirzapur. We bridge the gap between academic theory and production software engineering through collaborative coding, open-source projects, and peer mentorship.
              </p>

              <p className="about-text">
                From first-year fundamentals to advanced systems and competitive programming, members collaborate across CSE, IT, EL, and EE departments in the campus computer labs.
              </p>

              <div className="initiative-highlight-box">
                <p className="initiative-text">
                  Hands-on workshops, contribution sprints, and hackathons. Currently preparing for <strong>Open Source Day</strong> in collaboration with <strong>WikiClub Tech</strong> and <strong>GDG Prayagraj</strong>.
                </p>

                {/* Real Campus Event Photos Preview */}
                <div className="initiative-photo-preview-grid">
                  <div
                    className="initiative-photo-thumb-card"
                    onClick={() => scrollToSection("notices")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        scrollToSection("notices");
                      }
                    }}
                    title="View STIC community leadership gallery"
                  >
                    <img
                      src="/assets/events/orientation/orientation-01.jpg"
                      alt="STIC student leadership team at SAREC Mirzapur"
                      className="initiative-photo-thumb"
                      loading="lazy"
                    />
                    <span className="initiative-photo-caption">
                      STIC &bull; Student Leadership Team
                    </span>
                  </div>

                  <div
                    className="initiative-photo-thumb-card"
                    onClick={() => scrollToSection("notices")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        scrollToSection("notices");
                      }
                    }}
                    title="View campus technical roadmap session"
                  >
                    <img
                      src="/assets/events/orientation/orientation-02.jpg"
                      alt="Open source and developer roadmap presentation at SAREC Mirzapur"
                      className="initiative-photo-thumb"
                      loading="lazy"
                    />
                    <span className="initiative-photo-caption">
                      Technical Roadmaps &bull; Open Source
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="college-meta-details">
              <div className="meta-row">
                <span className="meta-name">Community</span>
                <span className="meta-val">{COMMUNITY_INFO.fullName}</span>
              </div>
              <div className="meta-row">
                <span className="meta-name">Target Cohort</span>
                <span className="meta-val">1st–4th Year (All Branches)</span>
              </div>
              <div className="meta-row">
                <span className="meta-name">Membership</span>
                <span className="meta-val">100% Free &amp; Open Source</span>
              </div>
              <div className="meta-row">
                <span className="meta-name">Lab &amp; Workspaces</span>
                <span className="meta-val">Central Computer Lab, SAREC</span>
              </div>
            </div>

            <div className="college-card-footer">
              <button
                type="button"
                className="btn-link"
                onClick={() => scrollToSection("workflow")}
              >
                <span>Explore Workflow</span>
                <ArrowRight size={14} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Right Column: STIC Community Mission & Pillars */}
          <div className="about-card community-mission-card">
            <span className="card-badge">Community Values</span>
            <h3 className="community-title">
              Code &bull; Build &bull; Innovate
            </h3>
            <p className="about-text">
              Real software development through practical engineering, cross-discipline teamwork, and open-source contributions.
            </p>

            <div className="pillars-grid">
              {ABOUT_POINTS.map((pillar, idx) => (
                <div key={idx} className="pillar-item">
                  <div className="pillar-dot" aria-hidden="true" />
                  <div>
                    <h4 className="pillar-title">{pillar.title}</h4>
                    <p className="pillar-desc">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-beginner-callout">
              <div className="callout-icon-box">
                <Terminal size={18} strokeWidth={2} />
              </div>
              <div>
                <h4 className="callout-title">Beginner Friendly</h4>
                <p className="callout-desc">
                  Zero prerequisites required. We help you install dev tools, master Git basics, and connect with senior mentors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
