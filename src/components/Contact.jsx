
import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';

import { COMMUNITY_INFO } from '../data/communityData';
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  WhatsAppIcon,
} from './Icons';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const email = COMMUNITY_INFO.officialEmail;
  const subject = 'STIC Website Inquiry';

  const message = `Hello STIC Team,

I would like to know more about STIC.

Thank you.`;

  const emailLink =
    `https://mail.google.com/mail/?view=cm&fs=1` +
    `&to=${encodeURIComponent(email)}` +
    `&su=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(message)}`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);

      setCopiedEmail(true);

      setTimeout(() => {
        setCopiedEmail(false);
      }, 2000);
    } catch (error) {
      console.error('Unable to copy email:', error);
      window.location.href = `mailto:${email}`;
    }
  };

  const channels = [
    {
      name: 'Official College Website',
      handle: 'sarecmzp.ac.in',
      href: COMMUNITY_INFO.collegeWebsite,
      Icon: ExternalLink,
    },
    {
      name: 'GitHub Organization',
      handle: 'github.com/sticsarecmzp',
      href: COMMUNITY_INFO.githubOrg,
      Icon: GithubIcon,
    },
    {
      name: 'LinkedIn Community Page',
      handle: 'stic-sarec-mirzapur',
      href: COMMUNITY_INFO.linkedin,
      Icon: LinkedinIcon,
    },
    {
      name: 'Instagram',
      handle: '@sticsarecmzp',
      href: COMMUNITY_INFO.instagram,
      Icon: InstagramIcon,
    },
    {
      name: 'WhatsApp Community',
      handle: 'Join Student Group',
      href: COMMUNITY_INFO.whatsappGroup,
      Icon: WhatsAppIcon,
    },
  ];

  return (
    <section
      id="contact"
      className="section-padding contact-section"
    >
      <style>{`
        /* Online Channels card redesign */
        .contact-section .channels-card {
          position: relative;
          overflow: hidden;
          padding: 32px;
          border: 1px solid #f59e0b;
          border-radius: 18px;
          background: #111827;
          box-shadow: 5px 6px 0 rgba(245, 158, 11, 0.28);
          transition: border-color 0.25s ease,
                      box-shadow 0.25s ease,
                      transform 0.25s ease;
        }

        .contact-section .channels-card:hover {
          border-color: #fbbf24;
          box-shadow: 6px 8px 0 rgba(245, 158, 11, 0.35);
          transform: translateY(-2px);
        }

        .contact-section .channels-card-title {
          margin: 0 0 14px;
          color: #f9fafb;
          font-size: 1.5rem;
          font-weight: 750;
        }

        .contact-section .channels-card-desc {
          margin: 0;
          color: #cbd5e1;
          line-height: 1.7;
        }

        .contact-section .channels-list {
          display: grid;
          gap: 16px;
          margin-top: 28px;
        }

        .contact-section .channel-link-row {
          display: flex;
          align-items: center;
          gap: 20px;
          min-width: 0;
          padding: 18px 20px;
          border: 1px solid transparent;
          border-radius: 11px;
          background: #1f2937;
          text-decoration: none;
          transition: background 0.25s ease,
                      border-color 0.25s ease,
                      transform 0.25s ease,
                      box-shadow 0.25s ease;
        }

        .contact-section .channel-link-row:hover {
          background: #172235;
          border-color: #f59e0b;
          transform: translateX(4px);
          box-shadow: 0 5px 18px rgba(245, 158, 11, 0.08);
        }

        .contact-section .channel-icon-pill {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          border: 1px solid rgba(245, 158, 11, 0.22);
          border-radius: 10px;
          background: #111827;
          color: #f59e0b;
          transition: color 0.25s ease,
                      background 0.25s ease,
                      transform 0.25s ease;
        }

        .contact-section .channel-link-row:hover .channel-icon-pill {
          background: #f59e0b;
          color: #111827;
          transform: scale(1.06);
        }

        .contact-section .channel-info {
          display: flex;
          flex: 1;
          flex-direction: column;
          gap: 5px;
          min-width: 0;
        }

        .contact-section .channel-name {
          color: #f9fafb;
          font-size: 1rem;
          font-weight: 700;
        }

        .contact-section .channel-handle {
          color: #9ca3af;
          font-size: 0.9rem;
          overflow-wrap: anywhere;
        }

        .contact-section .channel-arrow {
          flex-shrink: 0;
          color: #9ca3af;
          transition: color 0.25s ease,
                      transform 0.25s ease;
        }

        .contact-section .channel-link-row:hover .channel-arrow {
          color: #f59e0b;
          transform: translate(2px, -2px);
        }

        @media (max-width: 640px) {
          .contact-section .channels-card {
            padding: 22px 16px;
          }

          .contact-section .channels-list {
            gap: 12px;
            margin-top: 22px;
          }

          .contact-section .channel-link-row {
            gap: 12px;
            padding: 14px 12px;
          }

          .contact-section .channel-icon-pill {
            width: 40px;
            height: 40px;
          }

          .contact-section .channel-name {
            font-size: 0.9rem;
          }

          .contact-section .channel-handle {
            font-size: 0.8rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-section .channels-card,
          .contact-section .channel-link-row,
          .contact-section .channel-icon-pill,
          .contact-section .channel-arrow {
            transition: none;
          }
        }
      `}</style>

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">
            Communication &amp; Outreach
          </span>

          <h2 className="section-title">
            Connect With Us
          </h2>

          <p className="section-subtitle">
            Have questions about STIC or wish to collaborate?
            Reach out to us through our official channels.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="contact-grid">
          {/* Email and Venue */}
          <div className="contact-card primary-contact-card">
            <div className="contact-item">
              <div className="contact-icon-box">
                <Mail size={20} strokeWidth={1.75} />
              </div>

              <div className="contact-item-content">
                <span className="contact-label">
                  Official Community Email
                </span>

                <a
                  href={`mailto:${email}`}
                  className="contact-value-link"
                >
                  {email}
                </a>

                <div className="contact-btn-row">
                  <a
                    href={emailLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <Mail size={14} />
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
                        <Check
                          size={14}
                          strokeWidth={2.5}
                          style={{ color: 'var(--success)' }}
                        />
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

            {/* Campus Venue and Address */}
            <div className="contact-item">
              <div className="contact-icon-box">
                <MapPin size={20} strokeWidth={1.75} />
              </div>

              <div className="contact-item-content">
                <span className="contact-label">
                  Campus Venue &amp; Address
                </span>

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

          {/* Online Channels */}
          <div className="contact-card channels-card">
            <h3 className="channels-card-title">
              Online Channels &amp; Links
            </h3>

            <p className="channels-card-desc">
              Follow our latest open-source repositories,
              campus announcements, and community updates.
            </p>

            <div className="channels-list">
              {channels.map((channel) => {
                const Icon = channel.Icon;

                return (
                  <a
                    key={channel.name}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="channel-link-row"
                  >
                    <div className="channel-icon-pill">
                      <Icon size={20} strokeWidth={1.8} />
                    </div>

                    <div className="channel-info">
                      <span className="channel-name">
                        {channel.name}
                      </span>

                      <span className="channel-handle">
                        {channel.handle}
                      </span>
                    </div>

                    <ExternalLink
                      size={18}
                      className="channel-arrow"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
