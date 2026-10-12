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
            href="https://wa.me/919451501321?text=Hi%20STIC%20Team%2C%20I%20have%20a%20question%20regarding%20clubs%20and%20membership."
            target="_blank"
            rel="noopener noreferrer"
            className="floating-action-item whatsapp"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <MessageSquare size={17} strokeWidth={2} />
            <span className="floating-action-tooltip">WhatsApp Help</span>
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
            {copied ? <Check size={17} style={{ color: 'var(--success)' }} strokeWidth={2.5} /> : <Share2 size={17} strokeWidth={2} />}
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
