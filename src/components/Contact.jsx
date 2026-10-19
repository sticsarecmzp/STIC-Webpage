import React, { useState } from 'react';
import { Mail, MapPin, ExternalLink, Copy, Check } from 'lucide-react';
import { COMMUNITY_INFO } from '../data/communityData';
import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsAppIcon } from './Icons';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(COMMUNITY_INFO.officialEmail);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = COMMUNITY_INFO.officialEmail;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Get in Touch</span>
          <h2 className="section-title">Contact &amp; Connect</h2>
          <p className="section-subtitle">
            Whether you want to join, ask a question, or collaborate with STIC, feel free to reach out.
          </p>
        </div>

        <div className="contact-grid">
          {/* Email & Venue Card */}
          <div className="contact-card primary-contact-card">
            <div className="contact-item">
              <div className="contact-icon-box">
                <Mail size={20} strokeWidth={1.75} />
              </div>
              <div className="contact-item-content">
                <span className="contact-label">Email Us</span>
                <a
                  href={`mailto:${COMMUNITY_INFO.officialEmail}`}
                  className="contact-value-link"
                >
                  {COMMUNITY_INFO.officialEmail}
                </a>
                <div className="contact-btn-row">
                  <a
                    href={`mailto:${COMMUNITY_INFO.officialEmail}`}
                    className="btn btn-secondary btn-sm"
                  >
                    <span>Send Message</span>
                  </a>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={handleCopyEmail}
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? (
                      <>
                        <Check size={14} strokeWidth={2.5} style={{ color: 'var(--success)' }} />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} strokeWidth={1.75} />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="contact-divider" />

            <div className="contact-item">
              <div className="contact-icon-box">
                <MapPin size={20} strokeWidth={1.75} />
              </div>
              <div className="contact-item-content">
                <span className="contact-label">Where to Find Us</span>
                <p className="contact-venue-text">
                  <strong>{COMMUNITY_INFO.venue}</strong>
                  <br />
                  {COMMUNITY_INFO.college}
                  <br />
                  {COMMUNITY_INFO.location}
                </p>
              </div>
            </div>
          </div>

          {/* Online Channels Card */}
          <div className="contact-card channels-card">
            <h3 className="channels-card-title">Join Our Online Channels</h3>
            <p className="channels-card-desc">
              Connect with us on GitHub, LinkedIn, Instagram, and our student WhatsApp group.
            </p>

            <div className="channels-list">
              <a
                href={COMMUNITY_INFO.collegeWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="channel-link-row"
              >
                <div className="channel-icon-pill">
                  <ExternalLink size={16} strokeWidth={1.75} />
                </div>
                <div className="channel-info">
                  <span className="channel-name">Official College Website</span>
                  <span className="channel-handle">sarecmzp.ac.in</span>
                </div>
                <ExternalLink size={14} className="channel-arrow" />
              </a>

              <a
                href={COMMUNITY_INFO.githubOrg}
                target="_blank"
                rel="noopener noreferrer"
                className="channel-link-row"
              >
                <div className="channel-icon-pill">
                  <GithubIcon size={16} />
                </div>
                <div className="channel-info">
                  <span className="channel-name">GitHub Organization</span>
                  <span className="channel-handle">github.com/sticsarecmzp</span>
                </div>
                <ExternalLink size={14} className="channel-arrow" />
              </a>

              <a
                href={COMMUNITY_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="channel-link-row"
              >
                <div className="channel-icon-pill">
                  <LinkedinIcon size={16} />
                </div>
                <div className="channel-info">
                  <span className="channel-name">LinkedIn Community Page</span>
                  <span className="channel-handle">stic-sarec-mirzapur</span>
                </div>
                <ExternalLink size={14} className="channel-arrow" />
              </a>

              <a
                href={COMMUNITY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="channel-link-row"
              >
                <div className="channel-icon-pill">
                  <InstagramIcon size={16} />
                </div>
                <div className="channel-info">
                  <span className="channel-name">Instagram</span>
                  <span className="channel-handle">@sticsarecmzp</span>
                </div>
                <ExternalLink size={14} className="channel-arrow" />
              </a>

              <a
                href={COMMUNITY_INFO.whatsappGroup}
                target="_blank"
                rel="noopener noreferrer"
                className="channel-link-row"
              >
                <div className="channel-icon-pill">
                  <WhatsAppIcon size={16} />
                </div>
                <div className="channel-info">
                  <span className="channel-name">WhatsApp Community</span>
                  <span className="channel-handle">Join Student Group</span>
                </div>
                <ExternalLink size={14} className="channel-arrow" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
