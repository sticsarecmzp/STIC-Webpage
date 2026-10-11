import React from 'react';
import { ExternalLink } from 'lucide-react';
import { COMMUNITY_INFO } from '../data/communityData';

export default function InstitutionStrip() {
  return (
    <div className="institution-strip">
      <div className="container">
        <div className="institution-flex">
          <div className="institution-brand">
            <a
              href={COMMUNITY_INFO.collegeWebsite}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit SAREC Mirzapur College Website"
              title="Visit official portal: sarecmzp.ac.in"
              style={{ display: 'inline-flex', flexShrink: 0 }}
            >
              <img
                src="/assets/logos/sarec-college-seal.png"
                alt="SAREC Mirzapur College Seal"
                className="college-seal-img"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </a>
            <div className="institution-meta">
              <a
                href={COMMUNITY_INFO.collegeWebsite}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <h3>Samrat Ashok Rajkiya Engineering College, Mirzapur</h3>
              </a>
              <p>
                Government Engineering College affiliated to AKTU Lucknow (College Code 1215). Est. 2023.
              </p>
            </div>
          </div>

          <div className="institution-tags">
            <a
              href={COMMUNITY_INFO.collegeWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="tag-badge"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent)' }}
            >
              <span>sarecmzp.ac.in</span>
              <ExternalLink size={12} strokeWidth={1.5} />
            </a>
            <span className="tag-badge">B.Tech CSE</span>
            <span className="tag-badge">B.Tech IT</span>
            <span className="tag-badge">B.Tech EL</span>
            <span className="tag-badge">B.Tech EE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
