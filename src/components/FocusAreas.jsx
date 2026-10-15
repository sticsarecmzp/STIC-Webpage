import React from 'react';
import { Code, Terminal, Cpu, Brain, Layers } from 'lucide-react';
import { FOCUS_AREAS } from '../data/communityData';

const ICONS = {
  'software': Code,
  'cp-dsa': Terminal,
  'ai-ds': Brain,
  'iot-robotics': Cpu
};

export default function FocusAreas() {
  return (
    <section id="domains" className="section-padding focus-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Technical Domains</span>
          <h2 className="section-title">What We Explore &amp; Build</h2>
          <p className="section-subtitle">
            Core engineering tracks focused on practical output, competitive problem solving, and technological innovation.
          </p>
        </div>

        <div className="focus-grid">
          {FOCUS_AREAS.map((area) => {
            const IconComponent = ICONS[area.id] || Layers;
            return (
              <div key={area.id} className="focus-card">
                <div className="focus-icon-box">
                  <IconComponent size={22} strokeWidth={1.75} />
                </div>
                <h3 className="focus-card-title">{area.title}</h3>
                <p className="focus-card-desc">{area.description}</p>
                <div className="focus-tags-list">
                  {area.tags.map((tag, idx) => (
                    <span key={idx} className="focus-tag-chip">
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
