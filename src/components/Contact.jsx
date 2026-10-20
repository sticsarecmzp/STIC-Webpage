
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

  const mapsLink =
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(
      'Samrat Ashok Rajkiya Engineering College, Mirzapur, Uttar Pradesh 231001'
    );

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
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Connect With Us</h2>

          <p className="section-subtitle">
            Reach out for inquiries, collaborations, or community participation.
          </p>
        </div>

        <div className="contact-grid">
          {/* Email and Venue */}
          <div className="contact-card primary-contact-card">
            <div className="contact-item">
              <div className="contact-icon-box">
                <Mail size={18} strokeWidth={1.75} />
              </div>

              <div className="contact-item-content">
                <span className="contact-label">
                  Official Community Email
                </span>

                <a
                  href={emailLink}
                  target="_blank"
                  rel="noopener noreferrer"
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

            {/* Clickable Campus Address */}
            <div className="contact-item">
              <div className="contact-icon-box">
                <MapPin size={18} strokeWidth={1.75} />
              </div>

              <div className="contact-item-content">
                <span className="contact-label">
                  Campus Venue &amp; Address
                </span>

                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-venue-text"
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                  title="Open campus address in Google Maps"
                >
                  <strong>{COMMUNITY_INFO.venue}</strong>
                  <br />
                  {COMMUNITY_INFO.college}
                  <br />
                  {COMMUNITY_INFO.location}
                  {' '}
                  <ExternalLink
                    size={13}
                    style={{ display: 'inline', verticalAlign: 'middle' }}
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Online Channels */}
          <div className="contact-card channels-card">
            <h3 className="channels-card-title">
              Online Channels &amp; Links
            </h3>

            <p className="channels-card-desc">
              Official repositories, discussion groups, and updates.
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
                      <Icon size={16} strokeWidth={1.8} />
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
                      size={15}
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
