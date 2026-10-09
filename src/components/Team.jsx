import React from 'react';
import { Mail, Phone, GraduationCap, Code } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/communityData';

export default function Team() {
  return (
    <section id="team" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Community Leadership</span>
          <h2 className="section-title">Faculty and Student Coordinators</h2>
          <p className="section-description">
            The core organizers and faculty coordinator leading technical tracks, lab operations,
            and peer mentorship at SAREC Mirzapur.
          </p>
        </div>

        <div className="team-grid">
          {TEAM_MEMBERS.map((member, idx) => (
            <article key={idx} className="team-card">
              <div className="team-card-header">
                <div className="team-avatar">
                  {member.initials}
                </div>
                <div>
                  <h3 className="team-name">{member.name}</h3>
                  <div className="team-role">{member.role}</div>
                </div>
              </div>

              <div className="team-affiliation">{member.affiliation}</div>

              {member.note && (
                <div className="team-notes">
                  <p>{member.note}</p>
                </div>
              )}

              {member.focus && (
                <div className="team-notes">
                  <strong style={{ color: 'var(--primary)' }}>Focus Areas: </strong>
                  <span>{member.focus}</span>
                </div>
              )}

              {(member.email || member.phone) && (
                <div className="team-contacts">
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="contact-link">
                      <Mail size={14} strokeWidth={1.5} />
                      <span>{member.email}</span>
                    </a>
                  )}
                  {member.phone && (
                    <a href={`tel:${member.phone.replace(/\s+/g, '')}`} className="contact-link">
                      <Phone size={14} strokeWidth={1.5} />
                      <span>{member.phone}</span>
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
