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
                <strong>STIC ({COMMUNITY_INFO.fullName})</strong> is a community run entirely by students at Samrat Ashoka Rajkiya Engineering College, Mirzapur. We started the club to make coding and software development practical, accessible, and fun for everyone on campus.
              </p>

              <p className="about-text">
                We focus on learning by doing—practicing <strong>Data Structures &amp; Algorithms</strong>, building <strong>full-stack web apps</strong>, and creating <strong>practical open-source projects</strong>. Whether you have never written a line of code or you already love building projects, you will find support and collaborators here.
              </p>

              <div className="initiative-highlight-box">
                <p className="initiative-text">
                  We frequently organize workshops, coding sessions, and hackathon teams. Up next, we are hosting <strong>Open Source Day</strong> in collaboration with <strong>WikiClub Tech</strong> and <strong>GDG Prayagraj</strong> to help students make their first open-source contributions.
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
                <span className="meta-val">1st to 4th Year (All Branches)</span>
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
                <span>See How We Learn &amp; Build Together</span>
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
              A community where members learn by actually writing code, teaming up across college branches, and building cool things together.
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
                <h4 className="callout-title">New to coding?</h4>
                <p className="callout-desc">
                  You don't need any prior experience. We help everyone install their developer tools, learn Git basics, and connect with senior students who can help whenever you're stuck.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
