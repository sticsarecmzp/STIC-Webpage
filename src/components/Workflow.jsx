import React from 'react';
import { ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';
import { COMMUNITY_WORKFLOW, COMMUNITY_INFO } from '../data/communityData';

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
          <span className="section-eyebrow">How It Works</span>
          <h2 className="section-title">How STIC Works</h2>
          <p className="section-subtitle">
            From writing your first line of code to shipping projects and winning hackathons.
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
                <span>Senior Guided</span>
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Bottom Summary Banner */}
        <div className="workflow-cta-banner">
          <div className="banner-left">
            <h4 className="banner-title">Zero Prerequisites</h4>
            <p className="banner-desc">
              Bring your laptop to the central computer lab and start building alongside peers.
            </p>
          </div>
          <div className="banner-actions">
            <a
              href={COMMUNITY_INFO.whatsappGroup}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              <span>Join WhatsApp</span>
              <ExternalLink size={13} strokeWidth={2} />
            </a>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => scrollToSection('domains')}
            >
              <span>Learning Tracks</span>
              <ArrowRight size={13} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
