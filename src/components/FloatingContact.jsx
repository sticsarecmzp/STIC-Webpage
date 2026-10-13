import React, { useState } from 'react';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Share2, 
  X, 
  Check, 
  HelpCircle 
} from 'lucide-react';
import { LinkedinIcon } from './Icons';
import { COMMUNITY_INFO } from '../data/communityData';

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="floating-contact-container" aria-label="Quick Community Contacts">
      {open && (
        <div className="floating-contact-menu">
          {/* WhatsApp Action */}
          <a
            href={COMMUNITY_INFO.whatsappGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="floating-action-item whatsapp"
            title="Join STIC WhatsApp Group"
            aria-label="Join STIC WhatsApp Group"
          >
            <MessageSquare size={17} strokeWidth={2} />
            <span className="floating-action-tooltip">WhatsApp Group</span>
          </a>

          {/* LinkedIn Posts Action */}
          <a
            href={COMMUNITY_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="floating-action-item linkedin"
            title="STIC LinkedIn Posts"
            aria-label="STIC LinkedIn Posts"
          >
            <LinkedinIcon size={17} />
            <span className="floating-action-tooltip">LinkedIn Posts</span>
          </a>

          {/* Email Action */}
          <a
            href={`mailto:${COMMUNITY_INFO.officialEmail}`}
            className="floating-action-item email"
            title="Send Email"
            aria-label="Send Email"
          >
            <Mail size={17} strokeWidth={2} />
            <span className="floating-action-tooltip">Official Email</span>
          </a>

          {/* Call Action */}
          <a
            href="tel:+919451501321"
            className="floating-action-item call"
            title="Call Student Coordinator"
            aria-label="Call Student Coordinator"
          >
            <Phone size={17} strokeWidth={2} />
            <span className="floating-action-tooltip">Call Lead (+91 94515 01321)</span>
          </a>

          {/* Copy Link Action */}
          <button
            type="button"
            className="floating-action-item share"
            onClick={handleCopyLink}
            title="Share Portal Link"
            aria-label="Copy portal link"
          >
            {copied ? <Check size={17} style={{ color: 'var(--text)' }} strokeWidth={2.5} /> : <Share2 size={17} strokeWidth={2} />}
            <span className="floating-action-tooltip">
              {copied ? 'Link Copied!' : 'Copy Share Link'}
            </span>
          </button>
        </div>
      )}

      {/* Main Dock Trigger */}
      <button
        type="button"
        className={`floating-contact-trigger ${open ? 'active' : ''}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Toggle contact help menu"
        title="Quick Help & Community Contact"
      >
        {open ? <X size={20} strokeWidth={2} /> : <MessageSquare size={20} strokeWidth={2} />}
        {!open && <span className="floating-trigger-ping" />}
      </button>
    </div>
  );
}
