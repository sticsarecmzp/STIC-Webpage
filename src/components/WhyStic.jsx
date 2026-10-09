import React from 'react';
import { Terminal, Users, Trophy, Compass } from 'lucide-react';
import { CORE_PILLARS } from '../data/communityData';

const PILLAR_ICONS = [Terminal, Users, Trophy, Compass];

export default function WhyStic() {
  return (
    <section id="why-stic" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Learning Methodology</span>
          <h2 className="section-title">Why Peer Technical Communities Matter</h2>
          <p className="section-description">
            Academic exams measure theoretical retention. Modern software engineering demands practical
            architecture, collaborative version control, and production debugging.
          </p>
        </div>

        <div className="pillars-grid">
          {CORE_PILLARS.map((pillar, idx) => {
            const Icon = PILLAR_ICONS[idx] || Terminal;
            return (
              <div key={idx} className="pillar-card">
                <div className="pillar-header">
                  <div className="pillar-icon">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="pillar-title">{pillar.title}</h3>
                </div>

                <p className="pillar-desc">{pillar.description}</p>
                <div className="pillar-detail">{pillar.detail}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
