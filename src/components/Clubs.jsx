import React, { useState } from 'react';
import { 
  Code2, 
  Layout, 
  BrainCircuit, 
  Cpu, 
  ShieldCheck, 
  GitBranch, 
  Palette, 
  Rocket, 
  Clock, 
  Users, 
  ArrowRight 
} from 'lucide-react';
import { CLUBS } from '../data/communityData';

const CLUB_ICONS = {
  'web-mobile': Layout,
  'ai-ml': BrainCircuit,
  'coding-guild': Code2,
  'robotech': Cpu,
  'cybersec': ShieldCheck,
  'open-source': GitBranch,
  'uiux-media': Palette,
  'ecell': Rocket,
};

export default function Clubs({ selectedClub, onSelectClub }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredClubs = activeCategory === 'all'
    ? CLUBS
    : CLUBS.filter(club => club.category === activeCategory);

  const handleSelectTrack = (primaryTrack) => {
    if (onSelectClub) {
      onSelectClub(primaryTrack);
    }
    const target = document.getElementById('join');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="clubs" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Campus Tracks</span>
          <h2 className="section-title">The 8 Technology Guilds</h2>
          <p className="section-description">
            Choose your engineering focus area. Each guild runs regular weekly build sessions,
            hands-on labs, and collaborative project repositories at SAREC Mirzapur.
          </p>
        </div>

        <div className="clubs-filter-row" role="tablist" aria-label="Club categories">
          <button
            type="button"
            className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Guilds ({CLUBS.length})
          </button>
          <button
            type="button"
            className={`filter-btn ${activeCategory === 'software' ? 'active' : ''}`}
            onClick={() => setActiveCategory('software')}
          >
            Software &amp; Systems
          </button>
          <button
            type="button"
            className={`filter-btn ${activeCategory === 'hardware' ? 'active' : ''}`}
            onClick={() => setActiveCategory('hardware')}
          >
            Hardware &amp; Robotics
          </button>
          <button
            type="button"
            className={`filter-btn ${activeCategory === 'ai' ? 'active' : ''}`}
            onClick={() => setActiveCategory('ai')}
          >
            AI &amp; Data
          </button>
          <button
            type="button"
            className={`filter-btn ${activeCategory === 'creative' ? 'active' : ''}`}
            onClick={() => setActiveCategory('creative')}
          >
            Design &amp; Innovation
          </button>
        </div>

        <div className="clubs-grid">
          {filteredClubs.map((club) => {
            const IconComponent = CLUB_ICONS[club.id] || Code2;
            const isSelected = selectedClub === club.primaryTrack;

            return (
              <div 
                key={club.id} 
                className={`club-card glass-interactive ${isSelected ? 'is-selected' : ''}`}
              >
                <div>
                  <div className="club-card-top">
                    <div className="club-icon-wrap">
                      <IconComponent size={22} strokeWidth={1.5} />
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <span className="club-badge">{club.badge}</span>
                      <span 
                        className="club-badge" 
                        style={{ color: 'var(--primary)', borderColor: 'var(--primary-glow-subtle)' }}
                      >
                        Open Track
                      </span>
                    </div>
                  </div>

                  <h3 className="club-title">{club.name}</h3>
                  <p className="club-description">{club.description}</p>

                  <div className="club-tags-list">
                    {club.topics.map((topic, i) => (
                      <span key={i} className="club-tech-tag">{topic}</span>
                    ))}
                  </div>
                </div>

                <div className="club-card-footer">
                  <div className="club-schedule-text">
                    <Clock size={13} strokeWidth={1.5} />
                    <span>{club.schedule}</span>
                  </div>

                  <button
                    type="button"
                    className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => handleSelectTrack(club.primaryTrack)}
                  >
                    <span>{isSelected ? 'Track Selected' : 'Select Track'}</span>
                    <ArrowRight size={13} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
