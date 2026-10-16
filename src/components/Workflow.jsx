import React from 'react';
import { ArrowRight, CheckCircle, Compass, Users, Code2, Rocket } from 'lucide-react';
import { COMMUNITY_WORKFLOW } from '../data/communityData';

const ICONS_MAP = {
  Compass,
  Users,
  Code2,
  Rocket
};

export default function Workflow() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="workflow" className="section-padding workflow-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Operating Model &amp; Roadmap</span>
          <h2 className="section-title">How STIC Works</h2>
          <p className="section-subtitle">
            From your very first line of code to building production software and winning hackathons — here is our 4-step builder journey.
          </p>
        </div>

        <div className="workflow-grid">
          {COMMUNITY_WORKFLOW.map((item, idx) => (
            <div key={item.step} className={`neo-card workflow-card domain-${item.accent}`}>
              <div className="workflow-step-badge-row">
                <span className="workflow-step-num">STEP {item.step}</span>
                <span className="workflow-phase-tag">{item.phase}</span>
              </div>

              <h3 className="workflow-title">{item.title}</h3>
              <span className="workflow-subtitle">{item.subtitle}</span>

              <p className="workflow-desc">{item.description}</p>

              <div className="workflow-footer-pill">
                <CheckCircle size={14} className="workflow-check-icon" />
                <span>Mentored by senior leads &amp; faculty</span>
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Bottom Summary Banner */}
        <div className="workflow-cta-banner">
          <div className="banner-left">
            <h4 className="banner-title">Zero Experience Required to Start</h4>
            <p className="banner-desc">
              Every master coder was once a beginner. Bring your laptop and your curiosity to the Central Computer Lab.
            </p>
          </div>
          <div className="banner-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => scrollToSection('contact')}
            >
              <span>Join WhatsApp Group</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => scrollToSection('domains')}
            >
              <span>Explore 5 Focus Tracks</span>
              <ArrowRight size={14} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
