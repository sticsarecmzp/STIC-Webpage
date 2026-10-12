import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown, Search, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/communityData';

export default function Faq() {
  const [openIndices, setOpenIndices] = useState(new Set([0]));
  const [faqFilter, setFaqFilter] = useState('');

  const toggle = (idx) => {
    setOpenIndices(prev => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  const handleToggleAll = () => {
    if (openIndices.size === FAQS.length) {
      setOpenIndices(new Set());
    } else {
      setOpenIndices(new Set(FAQS.map((_, i) => i)));
    }
  };

  const filteredFaqs = faqFilter.trim()
    ? FAQS.filter(
        f =>
          f.question.toLowerCase().includes(faqFilter.toLowerCase()) ||
          f.answer.toLowerCase().includes(faqFilter.toLowerCase())
      )
    : FAQS;

  const isAllExpanded = openIndices.size === FAQS.length;

  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <span className="section-tag">Campus Inquiries</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-description">
              Clear answers about membership, branch eligibility, meeting schedules, and lab guidelines.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleToggleAll}
              style={{ fontSize: '0.8rem' }}
            >
              <ChevronsUpDown size={14} strokeWidth={1.8} />
              <span>{isAllExpanded ? 'Collapse All' : 'Expand All'}</span>
            </button>
          </div>
        </div>

        {/* Quick FAQ Filter Input */}
        <div style={{ maxWidth: '420px', marginBottom: '2rem', position: 'relative' }}>
          <Search size={16} strokeWidth={2} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.5rem', borderRadius: '9999px', fontSize: '0.88rem' }}
            placeholder="Filter questions (e.g. fees, laptop, branch)..."
            value={faqFilter}
            onChange={(e) => setFaqFilter(e.target.value)}
            aria-label="Filter frequently asked questions"
          />
        </div>

        <div className="faq-list">
          {filteredFaqs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-tertiary)', background: 'var(--glass-bg)', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
              No questions matched "{faqFilter}". Have a different question? Email <a href="mailto:sticsarecmzp@gmail.com" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>sticsarecmzp@gmail.com</a>.
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndices.has(index);
              return (
                <div key={index} className="faq-item">
                  <button
                    type="button"
                    className="faq-button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp size={18} strokeWidth={2} color="var(--primary)" />
                    ) : (
                      <ChevronDown size={18} strokeWidth={2} />
                    )}
                  </button>
                  {isOpen && (
                    <div id={`faq-answer-${index}`} className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
