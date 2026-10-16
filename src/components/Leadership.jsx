import React from 'react';
import { Award, Shield, Sparkles, GraduationCap } from 'lucide-react';
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

        {/* Faculty Mentorship Row (3 Faculty Members) */}
        <div className="leadership-subgroup">
          <div className="subgroup-header">
            <span className="neo-badge badge-faculty">
              <GraduationCap size={13} strokeWidth={2.5} />
              <span>Faculty Mentorship &amp; Direction</span>
            </span>
            <span className="subgroup-count">Academic Leadership &bull; SAREC Mirzapur</span>
          </div>

          <div className="faculty-grid">
            {faculty.map((f) => {
              const isCoordinator = f.role === 'Faculty Coordinator';
              return (
                <div key={f.id} className="neo-card faculty-card">
                  <div className="faculty-photo-wrap">
                    <img
                      src={f.image}
                      alt={f.name}
                      className="faculty-photo"
                      onError={(e) => {
                        if (f.fallbackImage && e.currentTarget.src !== f.fallbackImage) {
                          e.currentTarget.src = f.fallbackImage;
                        }
                      }}
                    />
                  </div>
                  <div className="neo-badge-row">
                    <span className={`neo-badge ${isCoordinator ? 'badge-faculty' : 'badge-mentor'}`}>
                      {isCoordinator ? (
                        <Award size={12} strokeWidth={2.5} />
                      ) : (
                        <Sparkles size={12} strokeWidth={2.5} />
                      )}
                      <span>{f.role}</span>
                    </span>
                    <span className="neo-tag">{f.designation}</span>
                  </div>
                  <h3 className="leader-name">{f.name}</h3>
                  <p className="leader-role">{f.affiliation}</p>
                  <p className="leader-college">{f.college}</p>
                  <div className="leader-focus-pill">
                    <span>{f.focus}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Co-Founders Row */}
        <div className="leadership-subgroup">
          <div className="subgroup-header">
            <span className="neo-badge badge-founder">
              <Sparkles size={13} strokeWidth={2.5} />
              <span>Student Co-Founders</span>
            </span>
            <span className="subgroup-count">2 Student Initiators &bull; B.Tech IT</span>
          </div>

          <div className="cofounders-grid">
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
