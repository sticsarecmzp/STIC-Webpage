import React from 'react';
import { Building, ShieldCheck, Users, Compass, ExternalLink, Award } from 'lucide-react';
import { COMMUNITY_INFO, ABOUT_POINTS } from '../data/communityData';

export default function About() {
  return (
    <section id="about" className="section-padding about-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Institutional Overview</span>
          <h2 className="section-title">About the Community &amp; College</h2>
          <p className="section-subtitle">
            Cultivating an engineering ecosystem grounded in practical development, collaborative problem solving, and technological innovation.
          </p>
        </div>

        {/* 2-Column Grid: Left is Institution & College Profile, Right is Mission & Values */}
        <div className="about-grid">
          {/* Left Column: College Identity Card */}
          <div className="about-card college-profile-card">
            <div className="college-profile-header">
              <img
                src="/assets/logos/sarec-college-seal.webp"
                alt="SAREC College Seal"
                className="college-seal-img"
                onError={(e) => {
                  e.currentTarget.src = '/assets/logos/sarec-college-seal.png';
                }}
              />
              <div>
                <span className="card-badge">Parent Institution</span>
                <h3 className="college-title">{COMMUNITY_INFO.college}</h3>
                <p className="college-meta-line">
                  {COMMUNITY_INFO.institutionType} • {COMMUNITY_INFO.collegeCode}
                </p>
              </div>
            </div>

            <p className="about-text">
              Samrat Ashok Rajkiya Engineering College (SAREC), Mirzapur is a state government engineering college established by the Government of Uttar Pradesh in 2023, affiliated with Dr. A.P.J. Abdul Kalam Technical University (AKTU Lucknow).
            </p>

            <div className="college-meta-details">
              <div className="meta-row">
                <span className="meta-name">Affiliation</span>
                <span className="meta-val">{COMMUNITY_INFO.university}</span>
              </div>
              <div className="meta-row">
                <span className="meta-name">AKTU Code</span>
                <span className="meta-val">{COMMUNITY_INFO.collegeCode}</span>
              </div>
              <div className="meta-row">
                <span className="meta-name">Campus Location</span>
                <span className="meta-val">{COMMUNITY_INFO.location}</span>
              </div>
              <div className="meta-row">
                <span className="meta-name">Established</span>
                <span className="meta-val">{COMMUNITY_INFO.establishedYear}</span>
              </div>
            </div>

            <div className="college-card-footer">
              <a
                href={COMMUNITY_INFO.collegeWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-link"
              >
                <span>Visit Official College Website (sarecmzp.ac.in)</span>
                <ExternalLink size={14} strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Right Column: STIC Community Mission & Pillars */}
          <div className="about-card community-mission-card">
            <span className="card-badge highlight-badge">Student Initiative</span>
            <h3 className="community-title">{COMMUNITY_INFO.fullName} ({COMMUNITY_INFO.name})</h3>
            <p className="about-text">
              STIC serves as the official student-led technical collective at SAREC Mirzapur. Our objective is to bridge classroom syllabus with industry-grade software engineering, open-source development, competitive programming, and research prototyping.
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
          </div>
        </div>
      </div>
    </section>
  );
}
