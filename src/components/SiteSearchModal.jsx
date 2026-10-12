import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  Layers, 
  FolderGit2, 
  Calendar, 
  Users, 
  HelpCircle, 
  Sparkles,
  Command
} from 'lucide-react';
import { 
  CLUBS, 
  STUDENT_PROJECTS, 
  EVENTS, 
  FAQS, 
  TEAM_MEMBERS 
} from '../data/communityData';

export default function SiteSearchModal({ isOpen, onClose, onSelectClub }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  // Filter items
  const matchedClubs = q
    ? CLUBS.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.description.toLowerCase().includes(q) ||
        c.topics.some(t => t.toLowerCase().includes(q))
      )
    : CLUBS.slice(0, 4);

  const matchedProjects = q
    ? STUDENT_PROJECTS.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) || 
        p.track.toLowerCase().includes(q) ||
        p.stack.some(s => s.toLowerCase().includes(q))
      )
    : STUDENT_PROJECTS.slice(0, 3);

  const matchedEvents = q
    ? EVENTS.filter(e => 
        e.title.toLowerCase().includes(q) || 
        e.description.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q)
      )
    : EVENTS.slice(0, 2);

  const matchedFaqs = q
    ? FAQS.filter(f => 
        f.question.toLowerCase().includes(q) || 
        f.answer.toLowerCase().includes(q)
      )
    : [];

  const matchedTeam = q
    ? TEAM_MEMBERS.filter(m => 
        m.name.toLowerCase().includes(q) || 
        m.role.toLowerCase().includes(q) ||
        (m.focus && m.focus.toLowerCase().includes(q))
      )
    : [];

  const totalResults = matchedClubs.length + matchedProjects.length + matchedEvents.length + matchedFaqs.length + matchedTeam.length;

  const handleSelectResult = (targetHash, trackName = null) => {
    onClose();
    if (trackName && onSelectClub) {
      onSelectClub(trackName);
    }
    const el = document.getElementById(targetHash.replace('#', ''));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="search-modal-backdrop" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="siteSearchTitle"
    >
      <div 
        className="search-modal-card" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="search-input-header">
          <Search size={20} className="search-icon" strokeWidth={2} />
          <input
            ref={inputRef}
            id="siteSearchTitle"
            type="search"
            className="search-modal-input"
            placeholder="Search guilds, projects, bootcamps, FAQs, leaders..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button 
              type="button" 
              className="search-clear-btn" 
              onClick={() => setQuery('')}
              aria-label="Clear query"
            >
              <X size={16} />
            </button>
          )}
          <button 
            type="button" 
            className="search-close-key-badge" 
            onClick={onClose}
            aria-label="Close search"
          >
            ESC
          </button>
        </div>

        <div className="search-modal-body">
          {q && totalResults === 0 ? (
            <div className="search-empty-state">
              <p>No results found for "<strong>{query}</strong>"</p>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                Try searching for "React", "AI", "Robotics", "SIH", or "Mentorship".
              </span>
            </div>
          ) : (
            <div className="search-results-list">
              {/* Guilds */}
              {matchedClubs.length > 0 && (
                <div className="search-group">
                  <div className="search-group-title">
                    <Layers size={13} strokeWidth={2} />
                    <span>Technology Guilds ({matchedClubs.length})</span>
                  </div>
                  {matchedClubs.map(club => (
                    <div 
                      key={club.id} 
                      className="search-item" 
                      onClick={() => handleSelectResult('join', club.primaryTrack)}
                    >
                      <div>
                        <div className="search-item-title">{club.name}</div>
                        <div className="search-item-sub">{club.description.slice(0, 85)}...</div>
                      </div>
                      <span className="search-item-badge">Join Track &rarr;</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Projects */}
              {matchedProjects.length > 0 && (
                <div className="search-group">
                  <div className="search-group-title">
                    <FolderGit2 size={13} strokeWidth={2} />
                    <span>Student Innovation ({matchedProjects.length})</span>
                  </div>
                  {matchedProjects.map(proj => (
                    <div 
                      key={proj.id} 
                      className="search-item" 
                      onClick={() => handleSelectResult('projects')}
                    >
                      <div>
                        <div className="search-item-title">{proj.title}</div>
                        <div className="search-item-sub">{proj.track} &bull; {proj.description.slice(0, 75)}...</div>
                      </div>
                      <span className="search-item-badge">View Project</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Events */}
              {matchedEvents.length > 0 && (
                <div className="search-group">
                  <div className="search-group-title">
                    <Calendar size={13} strokeWidth={2} />
                    <span>Events &amp; Bootcamps</span>
                  </div>
                  {matchedEvents.map(evt => (
                    <div 
                      key={evt.id} 
                      className="search-item" 
                      onClick={() => handleSelectResult('events')}
                    >
                      <div>
                        <div className="search-item-title">{evt.title}</div>
                        <div className="search-item-sub">{evt.date} &bull; {evt.location}</div>
                      </div>
                      <span className="search-item-badge">Calendar</span>
                    </div>
                  ))}
                </div>
              )}

              {/* FAQs */}
              {matchedFaqs.length > 0 && (
                <div className="search-group">
                  <div className="search-group-title">
                    <HelpCircle size={13} strokeWidth={2} />
                    <span>Frequently Asked Questions</span>
                  </div>
                  {matchedFaqs.map((faq, i) => (
                    <div 
                      key={i} 
                      className="search-item" 
                      onClick={() => handleSelectResult('faq')}
                    >
                      <div>
                        <div className="search-item-title">{faq.question}</div>
                        <div className="search-item-sub">{faq.answer.slice(0, 80)}...</div>
                      </div>
                      <span className="search-item-badge">Read FAQ</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Team */}
              {matchedTeam.length > 0 && (
                <div className="search-group">
                  <div className="search-group-title">
                    <Users size={13} strokeWidth={2} />
                    <span>Leadership &amp; Coordinators</span>
                  </div>
                  {matchedTeam.map((m, i) => (
                    <div 
                      key={i} 
                      className="search-item" 
                      onClick={() => handleSelectResult('team')}
                    >
                      <div>
                        <div className="search-item-title">{m.name}</div>
                        <div className="search-item-sub">{m.role} &bull; {m.affiliation}</div>
                      </div>
                      <span className="search-item-badge">Profile</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="search-modal-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <kbd className="search-kbd">ESC</kbd> <span>Close</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>Quick shortcut:</span> <kbd className="search-kbd">Ctrl+K</kbd> / <kbd className="search-kbd">Cmd+K</kbd>
          </div>
        </div>
      </div>
    </div>
  );
}
