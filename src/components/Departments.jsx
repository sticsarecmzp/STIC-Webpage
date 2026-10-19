import React from 'react';
import { DEPARTMENTS } from '../data/communityData';

export default function Departments() {
  return (
    <section id="departments" className="section-padding departments-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">All Branches Welcome</span>
          <h2 className="section-title">Open to All Engineering Branches</h2>
          <p className="section-subtitle">
            Tech isn't just for computer science. Students from CSE, IT, EL, and EE collaborate and build together at SAREC Mirzapur.
          </p>
        </div>

        <div className="departments-grid">
          {DEPARTMENTS.map((dept) => (
            <div key={dept.code} className="department-card">
              <div className="dept-badge-row">
                <span className="dept-code-badge">B.Tech {dept.code}</span>
              </div>
              <h3 className="dept-title">{dept.name}</h3>
              <p className="dept-desc">{dept.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
