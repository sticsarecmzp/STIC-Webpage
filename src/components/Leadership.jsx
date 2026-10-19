import React from 'react';
import {
  Award,
  Shield,
  Sparkles,
  GraduationCap,
  Users,
} from 'lucide-react';

import { LEADERSHIP } from '../data/communityData';

export default function Leadership() {
  const { faculty, executives } = LEADERSHIP;

  const coreTeam = [
    {
      name: 'Harshita Mishra',
      image: '/assets/team/Harshita.jpeg',
    },
    {
      name: 'Anjesh',
      image: '/assets/team/Anjesh.jpeg',
    },
    {
      name: 'Om Prakash',
      image: '/assets/team/Om%20prakash.jpeg',
    },
    {
      name: 'Divyansh Vandan Srivastava',
      image: '/assets/team/Divyansh%20vandan.jpeg',
    },
  ];

  return (
    <section
      id="leadership"
      className="section-padding leadership-section"
    >
      <div className="container">

        {/* Main Header */}
        <div className="section-header">
          <span className="section-eyebrow">
            Team &amp; Mentors
          </span>

          <h2 className="section-title">
            Faculty Advisors &amp; Student Leads
          </h2>

          <p className="section-subtitle">
            STIC is guided by faculty advisors at SAREC Mirzapur and organized by passionate student developers.
          </p>
        </div>

        {/* 1. Faculty Mentors */}
        <div className="leadership-subgroup">
          <div className="subgroup-header">
            <span className="neo-badge badge-faculty">
              <GraduationCap size={14} strokeWidth={2.5} />
              <span>Faculty Mentors &amp; Advisors</span>
            </span>

            <span className="subgroup-count">
              Academic Advisory &bull; SAREC Mirzapur
            </span>
          </div>

          <div className="faculty-grid">
            {faculty.map((f) => {
              const isCoordinator =
                f.role === 'Faculty Coordinator';

              return (
                <div
                  key={f.id}
                  className="neo-card faculty-card"
                >
                  <div className="faculty-photo-wrap">
                    <img
                      src={f.image}
                      alt={f.name}
                      className="faculty-photo"
                      loading="lazy"
                      onError={(e) => {
                        if (
                          f.fallbackImage &&
                          e.currentTarget.src !== f.fallbackImage
                        ) {
                          e.currentTarget.src = f.fallbackImage;
                        }
                      }}
                    />
                  </div>

                  <div className="neo-badge-row">
                    <span
                      className={`neo-badge ${
                        isCoordinator
                          ? 'badge-faculty'
                          : 'badge-mentor'
                      }`}
                    >
                      {isCoordinator ? (
                        <Award size={12} strokeWidth={2.5} />
                      ) : (
                        <Sparkles size={12} strokeWidth={2.5} />
                      )}

                      <span>{f.role}</span>
                    </span>

                    <span className="neo-tag">
                      {f.designation}
                    </span>
                  </div>

                  <h3 className="leader-name">
                    {f.name}
                  </h3>

                  <p className="leader-role">
                    {f.affiliation}
                  </p>

                  <p className="leader-college">
                    {f.college}
                  </p>

                  <div className="leader-focus-pill">
                    <span>{f.focus}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Executive Members */}
        <div className="executives-container">
          <div className="executives-header">
            <span className="neo-badge badge-exec">
              <Shield size={13} strokeWidth={2.5} />
              <span>
                Student Leads &amp; Organizers
              </span>
            </span>

            <span className="exec-count-text">
              {executives.length} Student Organizers &bull; SAREC Mirzapur
            </span>
          </div>

          <div className="executives-grid">
            {executives.map((exec, idx) => (
              <div
                key={idx}
                className="neo-card exec-mini-card"
              >
                <div className="exec-photo-wrap">
                  {exec.image ? (
                    <img
                      src={exec.image}
                      alt={exec.name}
                      className="exec-photo"
                      loading="lazy"
                    />
                  ) : (
                    <div className="exec-photo-placeholder">
                      <span className="exec-large-initials">
                        {exec.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </span>
                    </div>
                  )}
                </div>

                <div className="exec-card-body">
                  <div className="exec-role-pill-wrap">
                    <span className="exec-role-pill">
                      {exec.role}
                    </span>
                  </div>

                  <h4 className="exec-name">
                    {exec.name}
                  </h4>

                  <p className="exec-branch-line">
                    <span className="exec-branch-name">
                      {exec.affiliation}
                    </span>

                    <span className="exec-meta-dot">
                      &bull;
                    </span>

                    <span className="exec-college-name">
                      SAREC Mirzapur
                    </span>
                  </p>

                  <div className="exec-focus-badge">
                    <span>{exec.focus}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Core Team */}
        <div className="leadership-subgroup core-team-section">
          <div className="subgroup-header">
            <span className="neo-badge badge-faculty">
              <Users size={14} strokeWidth={2.5} />
              <span>Core Team</span>
            </span>

            <span className="subgroup-count">
              Active Student Contributors
            </span>
          </div>

          <div className="core-team-grid">
            {coreTeam.map((member) => (
              <div
                key={member.name}
                className="neo-card core-team-card"
              >
                <div className="core-team-photo-wrap">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="core-team-photo"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.alt =
                        `${member.name} photo unavailable`;
                    }}
                  />
                </div>

                <div className="core-team-card-body">
                  <h4 className="core-team-name">
                    {member.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
