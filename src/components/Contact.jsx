
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

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(
        COMMUNITY_INFO.officialEmail
      );

      setCopiedEmail(true);

      setTimeout(() => {
        setCopiedEmail(false);
      }, 2000);
    } catch (error) {
      console.error('Unable to copy email:', error);
      window.location.href =
        `mailto:${COMMUNITY_INFO.officialEmail}`;
    }
  };

  const gmailComposeUrl =
    `https://mail.google.com/mail/?view=cm&fs=1` +
    `&to=${encodeURIComponent(COMMUNITY_INFO.officialEmail)}` +
    `&su=${encodeURIComponent('STIC Website Inquiry')}` +
    `&body=${encodeURIComponent(
      'Hello STIC Team,\n\nI would like to know more about STIC.\n\nThank you.'
    )}`;

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
        <div className="section-heading">
          <span className="section-eyebrow">
            GET IN TOUCH
          </span>

          <h2>
            Let's Connect
          </h2>

          <p>
            Have a question, an idea, or want to collaborate
            with STIC? We'd love to hear from you.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">
                <Mail size={22} />
              </div>

              <div className="contact-card-content">
                <h3>Email Us</h3>

                <p>
                  For questions, collaborations, and
                  community-related queries.
                </p>

                <a
                  href={`mailto:${COMMUNITY_INFO.officialEmail}`}
                  className="contact-value-link"
                >
                  {COMMUNITY_INFO.officialEmail}
                </a>

                <div className="contact-actions">
                  <a
                    href={gmailComposeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                  >
                    <Mail size={14} />
                    <span>Send Message</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="btn btn-secondary btn-sm"
                  >
                    {copiedEmail ? (
                      <Check size={14} />
                    ) : (
                      <Copy size={14} />
                    )}

                    <span>
                      {copiedEmail ? 'Copied!' : 'Copy Email'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <MapPin size={22} />
              </div>

              <div className="contact-card-content">
                <h3>Our Location</h3>

                <p>
                  SAREC, Mirzapur, Uttar Pradesh, India
                </p>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=SAREC+Mirzapur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-value-link"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>

          <div className="contact-social">
            <h3>Connect With Us</h3>

            <p>
              Follow our community and stay updated with
              activities, events, and opportunities.
            </p>

            <div className="social-links-list">
              {channels.map((channel) => {
                const Icon = channel.Icon;

                return (
                  <a
                    key={channel.name}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-card"
                  >
                    <span className="social-link-icon">
                      <Icon size={20} />
                    </span>

                    <span className="social-link-content">
                      <strong>{channel.name}</strong>
                      <small>{channel.handle}</small>
                    </span>

                    <ExternalLink
                      size={16}
                      className="social-link-arrow"
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
