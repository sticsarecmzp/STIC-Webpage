import React from 'react';
import { ExternalLink, Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsAppIcon } from './Icons';
import { COMMUNITY_INFO } from '../data/communityData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main-grid">
          {/* Identity Column */}
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <img
                src="/assets/logos/stic-logo-light.png"
                alt="STIC Community Emblem"
                className="footer-seal-img"
              />
              <div>
                <span className="footer-brand-title">{COMMUNITY_INFO.name}</span>
                <span className="footer-brand-subtitle">{COMMUNITY_INFO.fullName}</span>
              </div>
            </div>

            <p className="footer-college-text">
              Software &amp; Technology Innovation Club
              <br />
              <span className="footer-aktu-badge">SAREC Mirzapur</span>
            </p>

            <p className="footer-mission-text">
              Official student technical community &bull; Code, build &amp; innovate.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="footer-nav-col">
            <span className="footer-col-title">Navigation</span>
            <ul className="footer-links-list">
              <li><a href="#top">Home</a></li>
              <li><a href="#about">About STIC</a></li>
              <li><a href="#domains">Technical Domains</a></li>
              <li><a href="#departments">Departments</a></li>
              <li><a href="#contact">Contact &amp; Connect</a></li>
            </ul>
          </div>

          {/* Institutional Portal & Contact */}
          <div className="footer-nav-col">
            <span className="footer-col-title">Institutional Links</span>
            <ul className="footer-links-list">
              <li>
                <a
                  href={COMMUNITY_INFO.collegeWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-external-link"
                >
                  <span>College Website (sarecmzp.ac.in)</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href={`mailto:${COMMUNITY_INFO.officialEmail}`}>
                  {COMMUNITY_INFO.officialEmail}
                </a>
              </li>
              <li>
                <span className="footer-venue-text">
                  SAREC Campus, Mirzapur, U.P.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-social-icons">
            <a
              href={COMMUNITY_INFO.githubOrg}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon-btn"
              aria-label="GitHub"
              title="GitHub"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={COMMUNITY_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon-btn"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={COMMUNITY_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon-btn"
              aria-label="Instagram"
              title="Instagram"
            >
              <InstagramIcon size={16} />
            </a>
            <a
              href={COMMUNITY_INFO.whatsappGroup}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon-btn"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <WhatsAppIcon size={16} />
            </a>
            <a
              href={`mailto:${COMMUNITY_INFO.officialEmail}`}
              className="footer-icon-btn"
              aria-label="Email"
              title="Email"
            >
              <Mail size={16} strokeWidth={1.8} />
            </a>
          </div>

          <div className="footer-copy-text">
            &copy; {COMMUNITY_INFO.establishedYear} &ndash; 2026 {COMMUNITY_INFO.name} &bull; {COMMUNITY_INFO.collegeShort}. All rights reserved.
          </div>

          <button
            type="button"
            className="footer-back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={14} strokeWidth={2} />
          </button>
        </div>
      </div>
    </footer>
  );
}
