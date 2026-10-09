import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '../data/communityData';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Campus Inquiries</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-description">
            Clear answers about membership, branch eligibility, meeting schedules, and lab guidelines.
          </p>
        </div>

        <div className="faq-list">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="faq-item">
                <button
                  type="button"
                  className="faq-button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp size={18} strokeWidth={1.5} color="var(--primary)" />
                  ) : (
                    <ChevronDown size={18} strokeWidth={1.5} />
                  )}
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
