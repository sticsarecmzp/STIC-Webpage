import React, { useState } from 'react';
import { Layers, Terminal, Sparkles, ExternalLink, Code2 } from 'lucide-react';
import { GithubIcon } from './Icons';
import { STUDENT_PROJECTS } from '../data/communityData';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? STUDENT_PROJECTS
    : STUDENT_PROJECTS.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Proof of Work</span>
          <h2 className="section-title">Student Innovation Showcase</h2>
          <p className="section-description">
            Real software and hardware systems built, tested, and deployed by engineering students at SAREC Mirzapur to solve concrete campus workflows and community challenges.
          </p>
        </div>

        {/* Project Category Filters */}
        <div className="clubs-filter-row" role="tablist" aria-label="Project categories" style={{ marginBottom: '2rem' }}>
          <button
            type="button"
            className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Projects ({STUDENT_PROJECTS.length})
          </button>
          <button
            type="button"
            className={`filter-btn ${activeCategory === 'web' ? 'active' : ''}`}
            onClick={() => setActiveCategory('web')}
          >
            Web &amp; Apps
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
            className={`filter-btn ${activeCategory === 'hardware' ? 'active' : ''}`}
            onClick={() => setActiveCategory('hardware')}
          >
            Hardware &amp; IoT
          </button>
          <button
            type="button"
            className={`filter-btn ${activeCategory === 'utility' ? 'active' : ''}`}
            onClick={() => setActiveCategory('utility')}
          >
            Campus Utilities
          </button>
          <button
            type="button"
            className={`filter-btn ${activeCategory === 'systems' ? 'active' : ''}`}
            onClick={() => setActiveCategory('systems')}
          >
            Developer Tools
          </button>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <article key={project.id} className="project-card glass-interactive">
              <div>
                {/* Visual Project Banner with Grid Pattern */}
                <div className="project-visual-banner">
                  <div className="project-visual-pattern" />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', zIndex: 1 }}>
                    <div className="club-icon-wrap" style={{ background: 'var(--glass-bg)', width: '38px', height: '38px' }}>
                      <Code2 size={18} strokeWidth={1.5} />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text)' }}>
                      STIC SAREC Lab
                    </span>
                  </div>
                </div>

                <div className="project-top-meta">
                  <span className="project-track">{project.track}</span>
                  <span className="project-status">{project.status}</span>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                <div className="project-stack-wrap">
                  {project.stack.map((tech, i) => (
                    <span key={i} className="club-tag-pill">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="project-footer-meta" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>{project.teamSize}</span>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                    style={{ fontSize: '0.75rem', color: 'var(--primary)' }}
                  >
                    <span>View Repository</span>
                    <ExternalLink size={11} strokeWidth={1.5} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
