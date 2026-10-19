import React from 'react';
import { Code, Terminal, Smartphone, ShieldCheck, Layers } from 'lucide-react';
import { FOCUS_AREAS } from '../data/communityData';

const ICONS = {
  'software': Code,
  'app-dev': Smartphone,
  'cp-dsa': Terminal,
  'cyber-cloud': ShieldCheck
};

export default function FocusAreas() {
  return (
    <section id="domains" className="section-padding focus-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Learning Domains</span>
          <h2 className="section-title">What We Learn &amp; Build</h2>
          <p className="section-subtitle">
            Core tracks designed for real-world engineering proficiency.
          </p>
        </div>

        <div className="focus-grid">
          {FOCUS_AREAS.map((area) => {
            const IconComponent = ICONS[area.id] || Layers;
            const accentClass = `domain-${area.accent || 'cyan'}`;
            return (
              <div key={area.id} className={`focus-card ${accentClass}`}>
                <div className="focus-card-header">
                  <div className={`focus-icon-box ${accentClass}-icon`}>
                    <IconComponent size={18} strokeWidth={2} />
                  </div>
                  <h3 className="focus-card-title">{area.title}</h3>
                </div>
                <p className="focus-card-desc">{area.description}</p>
                <div className="focus-tags-list">
                  {area.tags.map((tag, idx) => (
                    <span key={idx} className={`focus-tag-chip ${accentClass}-tag`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
