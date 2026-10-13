import React from 'react';
import { Mail, Phone, ShieldCheck } from 'lucide-react';
import { TEAM_MEMBERS, EXECUTIVE_COUNCIL_INFO } from '../data/communityData';

export default function Team() {
  const faculty = TEAM_MEMBERS.find(m => m.isFaculty);
  const councilMembers = TEAM_MEMBERS.filter(m => !m.isFaculty);

  return (
    <section id="team" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">COMMUNITY LEADERSHIP</span>
          <h2 className="section-title">Faculty Coordinator &amp; Executive Council</h2>
          <p className="section-description">
            The institutional leadership, student co-founders, and executive council members driving 
            technical curriculum tracks, hackathon operations, sponsor outreach, and campus development at SAREC Mirzapur.
          </p>
        </div>

        {/* 1. Explicit Faculty Coordinator Highlight */}
        {faculty && (
          <div className="faculty-spotlight-wrapper">
            <div className="team-group-header">
              <span className="team-group-pill">INSTITUTIONAL LEADERSHIP</span>
              <h3 className="team-group-title">Faculty Coordinator</h3>
            </div>
            <article className="team-card faculty-card">
              <div className="team-card-header">
                <div className="team-avatar faculty-avatar">
                  {faculty.initials}
                </div>
                <div>
                  <span className="team-badge-tag faculty-tag">FACULTY COORDINATOR</span>
                  <h3 className="team-name">{faculty.name}</h3>
                  <div className="team-role">{faculty.role}</div>
                </div>
              </div>

              <div className="team-affiliation">{faculty.affiliation}</div>

              {faculty.note && (
                <div className="team-notes faculty-note">
                  <strong style={{ color: 'var(--text)', fontWeight: 800 }}>Institutional Focus: </strong>
                  <span>{faculty.note}</span>
                </div>
              )}
            </article>
          </div>
        )}

        {/* 2. Executive Council Section with Brief Intro */}
        <div className="council-section-wrapper">
          <div className="team-group-header">
            <span className="team-group-pill">STUDENT GOVERNANCE</span>
            <h3 className="team-group-title">Executive Council</h3>
          </div>

          {/* Executive Council Brief Intro Banner */}
          <div className="council-intro-banner">
            <div className="council-intro-header">
              <div className="council-status-badge">
                <ShieldCheck size={14} strokeWidth={2.5} />
                <span>{EXECUTIVE_COUNCIL_INFO.badge}</span>
              </div>
              <span className="council-code-tag">{EXECUTIVE_COUNCIL_INFO.subBadge}</span>
            </div>

            <h4 className="council-intro-title">{EXECUTIVE_COUNCIL_INFO.title}</h4>
            <p className="council-intro-text">{EXECUTIVE_COUNCIL_INFO.description}</p>

            <div className="council-stats-row">
              {EXECUTIVE_COUNCIL_INFO.stats.map((stat, i) => (
                <div key={i} className="council-stat-item">
                  <span className="council-stat-val">{stat.value}</span>
                  <span className="council-stat-lbl">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Executive Council Members Grid */}
          <div className="team-grid">
            {councilMembers.map((member, idx) => (
              <article key={idx} className={`team-card ${member.isCoFounder ? 'card-cofounder' : ''}`}>
                <div className="team-card-header">
                  <div className="team-avatar">
                    {member.initials}
                  </div>
                  <div>
                    {member.isCoFounder ? (
                      <span className="team-badge-tag cofounder-tag">CO-FOUNDER &amp; COUNCIL</span>
                    ) : (
                      <span className="team-badge-tag council-tag">EXECUTIVE COUNCIL</span>
                    )}
                    <h3 className="team-name">{member.name}</h3>
                    <div className="team-role">{member.role}</div>
                  </div>
                </div>

                <div className="team-affiliation">{member.affiliation}</div>

                {member.focus && (
                  <div className="team-notes">
                    <strong style={{ color: 'var(--text)', fontWeight: 800 }}>Guild Track: </strong>
                    <span>{member.focus}</span>
                  </div>
                )}

                {(member.email || member.phone) && (
                  <div className="team-contacts">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="contact-link"
                        aria-label={`Send email to ${member.name} (${member.email})`}
                        title={`Email ${member.name}: ${member.email}`}
                      >
                        <span className="contact-icon-pill">
                          <Mail size={14} strokeWidth={1.5} />
                        </span>
                        <span>{member.email}</span>
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone.replace(/\s+/g, '')}`}
                        className="contact-link"
                        aria-label={`Call ${member.name} at ${member.phone}`}
                        title={`Call ${member.name}: ${member.phone}`}
                      >
                        <span className="contact-icon-pill">
                          <Phone size={14} strokeWidth={1.5} />
                        </span>
                        <span>{member.phone}</span>
                      </a>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
