import React from 'react';
import { Mail, MessageSquare, ExternalLink, Phone } from 'lucide-react';
import { GithubIcon, InstagramIcon, LinkedinIcon } from './Icons';
import { COMMUNITY_INFO } from '../data/communityData';

export default function Footer({ onSelectClub }) {
  const handleTrackClick = (e, trackName) => {
    e.preventDefault();
    if (onSelectClub) {
      onSelectClub(trackName);
    } else {
      const target = document.getElementById('join');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a
              href="#top"
              className="footer-brand-block-link"
              aria-label="STIC SAREC Mirzapur Home - Back to top"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', textDecoration: 'none' }}
            >
              <img
                src="/assets/logos/sarec-college-seal.png"
                alt="SAREC Mirzapur College Seal"
                style={{ width: '42px', height: '42px', objectFit: 'contain' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div>
                <div className="footer-brand-title">{COMMUNITY_INFO.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                  {COMMUNITY_INFO.collegeShort} ({COMMUNITY_INFO.collegeCode})
                </div>
              </div>
            </a>

            <p className="footer-brand-desc">
              The official student technical and innovation community at Samrat Ashok Rajkiya Engineering
              College, Mirzapur. Fostering software engineering, competitive programming, and robotics.
            </p>

            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
              <a
                href={COMMUNITY_INFO.githubOrg}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                aria-label="STIC GitHub Organization"
                title="STIC GitHub Organization"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href={COMMUNITY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                aria-label="STIC Instagram"
                title="STIC Instagram"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href={COMMUNITY_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                aria-label="STIC LinkedIn"
                title="STIC LinkedIn"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href={`mailto:${COMMUNITY_INFO.officialEmail}`}
                className="btn-icon"
                aria-label="Contact STIC via Email"
                title={`Email STIC: ${COMMUNITY_INFO.officialEmail}`}
              >
                <Mail size={16} strokeWidth={1.5} />
              </a>
              <a
                href="tel:+919451501321"
                className="btn-icon"
                aria-label="Call STIC Coordinator"
                title="Call STIC: +91 94515 01321"
              >
                <Phone size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Tracks</h4>
            <ul>
              <li>
                <a href="#join" onClick={(e) => handleTrackClick(e, 'STIC Coding Guild')}>
                  Coding &amp; CP Guild
                </a>
              </li>
              <li>
                <a href="#join" onClick={(e) => handleTrackClick(e, 'Web & Mobile Guild')}>
                  Web &amp; Mobile Dev
                </a>
              </li>
              <li>
                <a href="#join" onClick={(e) => handleTrackClick(e, 'AI/ML Syndicate')}>
                  AI &amp; Data Science
                </a>
              </li>
              <li>
                <a href="#join" onClick={(e) => handleTrackClick(e, 'RoboTech & Automation')}>
                  RoboTech &amp; IoT
                </a>
              </li>
              <li>
                <a href="#join" onClick={(e) => handleTrackClick(e, 'CyberSec Guild')}>
                  Cyber Security
                </a>
              </li>
              <li>
                <a href="#join" onClick={(e) => handleTrackClick(e, 'Open Source SAREC')}>
                  Open Source SAREC
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li><a href="#top">Overview &amp; Mission</a></li>
              <li><a href="#why-stic">Why STIC Methodology</a></li>
              <li><a href="#events">Events &amp; Sprints</a></li>
              <li><a href="#projects">Student Projects</a></li>
              <li><a href="#team">Leadership Team</a></li>
              <li><a href="#faq">Questions &amp; Answers</a></li>
              <li>
                <a
                  href={COMMUNITY_INFO.collegeWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  <span>College Portal (SAREC)</span>
                  <ExternalLink size={12} strokeWidth={1.5} />
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact &amp; Hub</h4>
            <ul>
              <li>
                <a
                  href={`mailto:${COMMUNITY_INFO.officialEmail}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}
                  title="Official Community Email"
                >
                  <Mail size={13} strokeWidth={1.5} />
                  <span>{COMMUNITY_INFO.officialEmail}</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919451501321"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}
                  title="Call Student Coordinator"
                >
                  <Phone size={13} strokeWidth={1.5} />
                  <span>+91 94515 01321</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919451501321?text=Hi%20STIC%20Team%2C%20I%20have%20a%20question%20about%20clubs%20and%20events."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--success)' }}
                >
                  <MessageSquare size={13} strokeWidth={1.5} />
                  <span>WhatsApp Community Help</span>
                </a>
              </li>
              <li style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-tertiary)', lineHeight: 1.45 }}>
                Venue: {COMMUNITY_INFO.venue}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} STIC | Samrat Ashok Rajkiya Engineering College, Mirzapur. All rights reserved.</p>
          <p>Maintained by STIC Student Web &amp; Systems Team.</p>
        </div>
      </div>
    </footer>
  );
}
