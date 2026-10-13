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
  const [activeFilter, setActiveFilter] = useState('all');

  const activeClubs = CLUBS.filter(club => club.status === 'active');
  const futureClubs = CLUBS.filter(club => club.status === 'future');

  const getFilteredList = () => {
    if (activeFilter === 'all') return CLUBS;
    if (activeFilter === 'current') return activeClubs;
    if (activeFilter === 'future') return futureClubs;
    return CLUBS.filter(club => club.category === activeFilter);
  };

  const filteredClubs = getFilteredList();

  const handleSelectTrack = (primaryTrack) => {
    if (onSelectClub) {
      onSelectClub(primaryTrack);
    }
    const target = document.getElementById('join');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderClubCard = (club) => {
    const IconComponent = CLUB_ICONS[club.id] || Code2;
    const isSelected = selectedClub === club.primaryTrack;
    const isActive = club.status === 'active';

    return (
      <div 
        key={club.id} 
        className={`club-card glass-interactive ${isActive ? 'club-card-active' : 'club-card-future'} ${isSelected ? 'is-selected' : ''}`}
      >
        <div>
          <div className="club-card-top">
            <div className="club-icon-wrap">
              <IconComponent size={20} strokeWidth={1.5} />
            </div>
            <div className="club-badges-group">
              <span className="club-badge">{club.badge}</span>
              {isActive ? (
                <span className="club-badge club-status-active">
                  <span className="live-status-dot" />
                  <span>Active</span>
                </span>
              ) : (
                <span className="club-badge club-status-future">
                  <span className="future-status-dot" />
                  <span>Future Scope</span>
                </span>
              )}
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
            <Clock size={12} strokeWidth={1.5} />
            <span>{club.schedule}</span>
          </div>

          <button
            type="button"
            className={`btn-track-action ${isSelected ? 'btn-track-selected' : (isActive ? 'btn-track-active' : 'btn-track-future')}`}
            onClick={() => handleSelectTrack(club.primaryTrack)}
            title={isActive ? `Join ${club.name}` : `Pre-register for ${club.name}`}
          >
            <span>{isSelected ? 'Selected' : (isActive ? 'Join Track' : 'Pre-Register')}</span>
            <ArrowRight size={11} strokeWidth={2} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <section id="clubs" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Campus Tracks &amp; Roadmap</span>
          <h2 className="section-title">The 8 Technology Guilds</h2>
          <p className="section-description">
            Explore 4 tracks active in current time with live weekly labs at SAREC Mirzapur, 
            alongside 4 upcoming tracks in our future scope incubation roadmap.
          </p>
        </div>

        {/* Filter Navigation Row */}
        <div className="clubs-filter-row" role="tablist" aria-label="Guild status and categories">
          <button
            type="button"
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Guilds (8)
          </button>
          <button
            type="button"
            className={`filter-btn ${activeFilter === 'current' ? 'active' : ''}`}
            onClick={() => setActiveFilter('current')}
          >
            In Current Time (4)
          </button>
          <button
            type="button"
            className={`filter-btn ${activeFilter === 'future' ? 'active' : ''}`}
            onClick={() => setActiveFilter('future')}
          >
            Future Scope (4)
          </button>
          <button
            type="button"
            className={`filter-btn ${activeFilter === 'software' ? 'active' : ''}`}
            onClick={() => setActiveFilter('software')}
          >
            Software &amp; Systems
          </button>
          <button
            type="button"
            className={`filter-btn ${activeFilter === 'hardware' ? 'active' : ''}`}
            onClick={() => setActiveFilter('hardware')}
          >
            Hardware &amp; IoT
          </button>
          <button
            type="button"
            className={`filter-btn ${activeFilter === 'ai' ? 'active' : ''}`}
            onClick={() => setActiveFilter('ai')}
          >
            AI &amp; Data
          </button>
          <button
            type="button"
            className={`filter-btn ${activeFilter === 'creative' ? 'active' : ''}`}
            onClick={() => setActiveFilter('creative')}
          >
            Design &amp; Innovation
          </button>
        </div>

        {/* Guilds Display */}
        {activeFilter === 'all' ? (
          <div>
            {/* Section 1: In Current Time */}
            <div className="guilds-status-header">
              <div className="guilds-status-badge badge-active">
                <span className="live-status-dot" />
                <span>IN CURRENT TIME • CURRENTLY ACTIVE</span>
              </div>
              <h3 className="guilds-status-title">Currently Active Cohort (2026–2027)</h3>
              <p className="guilds-status-subtitle">
                Running active weekly build sprints, peer problem sheets, code reviews, and live production deployments at SAREC Mirzapur.
              </p>
            </div>
            <div className="clubs-grid" style={{ marginBottom: '3.5rem' }}>
              {activeClubs.map(renderClubCard)}
            </div>

            {/* Section 2: Future Scope */}
            <div className="guilds-status-header">
              <div className="guilds-status-badge badge-future">
                <span className="future-status-dot" />
                <span>INCUBATION ROADMAP • FUTURE SCOPE</span>
              </div>
              <h3 className="guilds-status-title">Future Scope &amp; Incubation Tracks</h3>
              <p className="guilds-status-subtitle">
                Scheduled for upcoming academic cohorts, dedicated hardware fabrication labs, and venture incubation. Pre-register now to express interest.
              </p>
            </div>
            <div className="clubs-grid">
              {futureClubs.map(renderClubCard)}
            </div>
          </div>
        ) : (
          <div>
            <div className="guilds-status-header">
              <div className={`guilds-status-badge ${activeFilter === 'current' ? 'badge-active' : (activeFilter === 'future' ? 'badge-future' : 'badge-active')}`}>
                <span>
                  {activeFilter === 'current' 
                    ? 'In Current Time (4 Active Tracks)' 
                    : (activeFilter === 'future' 
                      ? 'Future Scope (4 Upcoming Tracks)' 
                      : `Filtered Tracks (${filteredClubs.length})`)}
                </span>
              </div>
            </div>
            <div className="clubs-grid">
              {filteredClubs.map(renderClubCard)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
