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
          <h2 className="section-title">About STIC</h2>
          <p className="section-subtitle">
            {COMMUNITY_INFO.fullName} &bull; The student developer club at SAREC Mirzapur.
          </p>
        </div>

        {/* Compact 2-Column Grid */}
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
                <p className="college-meta-line">{COMMUNITY_INFO.college}</p>
              </div>
            </div>

            <p className="about-text" style={{ marginBottom: "1.25rem" }}>
              <strong>STIC ({COMMUNITY_INFO.fullName})</strong> is the official student developer community at SAREC Mirzapur. We bridge classroom learning and real-world engineering through open-source software, competitive programming, and peer mentorship across all departments.
            </p>

            <div className="about-meta-pills">
              <span className="meta-pill">100% Free &amp; Open Source</span>
              <span className="meta-pill">1st–4th Year (All Branches)</span>
              <span className="meta-pill">Central Computer Lab, SAREC</span>
            </div>

            <div className="college-card-footer" style={{ marginTop: "auto", paddingTop: "0.5rem" }}>
              <button
                type="button"
                className="btn-link"
                onClick={() => scrollToSection("workflow")}
              >
                <span>How It Works</span>
                <ArrowRight size={13} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Right Column: STIC Community Mission & Pillars */}
          <div className="about-card community-mission-card">
            <div className="community-card-header" style={{ marginBottom: "0.75rem" }}>
              <span className="card-badge">Community Values</span>
              <h3 className="community-title">
                Code &bull; Build &bull; Innovate
              </h3>
            </div>

            <div className="pillars-grid-compact">
              {ABOUT_POINTS.map((pillar, idx) => (
                <div key={idx} className="pillar-item compact">
                  <div className="pillar-dot" aria-hidden="true" />
                  <div>
                    <h4 className="pillar-title">{pillar.title}</h4>
                    <p className="pillar-desc">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-beginner-callout" style={{ marginTop: "auto", padding: "0.75rem 1rem" }}>
              <div className="callout-icon-box">
                <Terminal size={15} strokeWidth={2} />
              </div>
              <div>
                <h4 className="callout-title" style={{ fontSize: "0.85rem", marginBottom: "0.2rem" }}>
                  Beginner Friendly
                </h4>
                <p className="callout-desc" style={{ fontSize: "0.78rem", margin: 0 }}>
                  Zero prerequisites required. We help you install tools, master Git basics, and connect with senior mentors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
