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
          <span className="section-eyebrow">Community Overview</span>
          <h2 className="section-title">About STIC</h2>
          <p className="section-subtitle">
            {COMMUNITY_INFO.fullName} &bull; The flagship student developer
            ecosystem at SAREC Mirzapur.
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
                  Student Technical Society
                </span>
                <h3 className="college-title">{COMMUNITY_INFO.name}</h3>
                <p className="college-meta-line">{COMMUNITY_INFO.fullName}</p>
              </div>
            </div>

            <div className="about-official-content">
              <p className="about-text">
                <strong>STIC ({COMMUNITY_INFO.fullName})</strong> is the official tech-driven student society of Samrat Ashoka Rajkiya Engineering College, Mirzapur. Built by students for students, STIC bridges the gap between academic curriculum and real-world technology.
              </p>

              <p className="about-text">
                We focus on hands-on growth across core engineering domains: <strong>Data Structures &amp; Algorithms (DSA)</strong>, <strong>Full-Stack Development</strong>, <strong>Machine Learning</strong>, and <strong>Competitive Programming</strong>. From hosting hackathons to community workshops, our mission is to empower developers from ground zero to confident builders.
              </p>

              <div className="initiative-highlight-box">
                <div className="initiative-badge-row">
                  <span className="initiative-badge">FLAGSHIP COLLABORATION</span>
                  <span className="initiative-tag">OPEN SOURCE SPRINT</span>
                </div>
                <p className="initiative-text">
                  Following our milestone <strong>Build with AI</strong> initiative, we are actively driving open-source culture on campus, currently organizing <strong>Open Source Day</strong> in collaboration with <strong>WikiClub Tech</strong> and <strong>GDG Prayagraj</strong>.
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
                    title="View Build With AI event gallery"
                  >
                    <img
                      src="/assets/events/build-with-ai/bwa-02.jpg"
                      alt="Build With AI SAREC team and GDG Prayagraj"
                      className="initiative-photo-thumb"
                      loading="lazy"
                    />
                    <span className="initiative-photo-caption">
                      Build With AI &bull; SAREC &amp; GDG Team
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
                    title="View Build With AI masterclass"
                  >
                    <img
                      src="/assets/events/build-with-ai/bwa-01.jpg"
                      alt="GDE Nitin Tiwari delivering Vision Language Models session"
                      className="initiative-photo-thumb"
                      loading="lazy"
                    />
                    <span className="initiative-photo-caption">
                      GDE Nitin Tiwari &bull; Vision AI Session
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
                <span>How Work Happens in STIC (Step-by-Step)</span>
                <ArrowRight size={14} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Right Column: STIC Community Mission & Pillars */}
          <div className="about-card community-mission-card">
            <span className="card-badge">Our Culture</span>
            <h3 className="community-title">
              Code &bull; Build &bull; Innovate
            </h3>
            <p className="about-text">
              A collaborative, developer-first environment where members learn
              by shipping real software, collaborating across engineering
              branches, and competing on national stages.
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
                <h4 className="callout-title">Complete Beginner?</h4>
                <p className="callout-desc">
                  No previous coding experience required. STIC starts from
                  ground zero with Git setup, basic programming, and algorithm
                  fundamentals. Every newcomer is paired with senior mentors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
