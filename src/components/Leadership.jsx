import React from 'react';
import { Award, UserCheck, Shield, Sparkles } from 'lucide-react';
import { LEADERSHIP } from '../data/communityData';

export default function Leadership() {
  const { faculty, coFounders, executives } = LEADERSHIP;

  return (
    <section id="leadership" className="section-padding leadership-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Governance &amp; Mentorship</span>
          <h2 className="section-title">Faculty Guidance &amp; Executive Team</h2>
          <p className="section-subtitle">
            Student-led execution under academic mentorship at SAREC Mirzapur.
          </p>
        </div>

        {/* Faculty & Co-Founders Row */}
        <div className="leadership-top-grid">
          {/* Faculty Coordinator Card */}
          <div className="neo-card faculty-card">
            <div className="neo-badge-row">
              <span className="neo-badge badge-faculty">
                <Award size={13} strokeWidth={2.5} />
                <span>Faculty Coordinator</span>
              </span>
              <span className="neo-tag">SAREC CSE</span>
            </div>
            <h3 className="leader-name">{faculty.name}</h3>
            <p className="leader-role">{faculty.affiliation}</p>
            <p className="leader-college">{faculty.college}</p>
            <div className="leader-focus-pill">
              <span>{faculty.focus}</span>
            </div>
          </div>

          {/* Co-Founders Cards */}
          <div className="cofounders-subgrid">
            {coFounders.map((cf, idx) => (
              <div key={idx} className="neo-card cofounder-card">
                <div className="neo-badge-row">
                  <span className="neo-badge badge-founder">
                    <Sparkles size={12} strokeWidth={2.5} />
                    <span>Co-Founder</span>
                  </span>
                  <span className="neo-tag">{cf.affiliation}</span>
                </div>
                <h3 className="leader-name">{cf.name}</h3>
                <p className="leader-focus">{cf.focus}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Council Compact Grid */}
        <div className="executives-container">
          <div className="executives-header">
            <span className="neo-badge badge-exec">
              <Shield size={12} strokeWidth={2.5} />
              <span>Executive Council</span>
            </span>
            <span className="exec-count-text">5 Student Leads &bull; IT &amp; CSE</span>
          </div>

          <div className="executives-grid">
            {executives.map((exec, idx) => (
              <div key={idx} className="neo-card exec-mini-card">
                <div className="exec-card-top">
                  <span className="exec-initials-badge">
                    {exec.name.split(' ').map(n => n[0]).join('')}
                  </span>
                  <span className="neo-tag mini-tag">{exec.affiliation}</span>
                </div>
                <h4 className="exec-name">{exec.name}</h4>
                <p className="exec-focus">{exec.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
