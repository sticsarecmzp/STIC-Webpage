import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Sparkles, 
  Layers, 
  GraduationCap, 
  ShieldCheck,
  HelpCircle,
  Shield,
  ArrowUpRight,
  CheckCircle2,
  Users
} from 'lucide-react';
import { COMMUNITY_INFO, COMMUNITY_STATS } from '../data/communityData';

const STAT_ICONS = [Layers, GraduationCap, MapPin, ShieldCheck];

const ROTATOR_WORDS = [
  "ASSUMING",
  "PANICKING",
  "CODING ALONE",
  "HESITATING"
];

export default function Hero({ onSelectClub }) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATOR_WORDS.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="top" className="hero-section">
      {/* Ambient Aurora Orbs & Cyber Perspective Grid Mesh */}
      <div className="hero-mesh-glow" aria-hidden="true" />
      <div className="hero-floating-orb orb-1" aria-hidden="true" />
      <div className="hero-floating-orb orb-2" aria-hidden="true" />
      <div className="hero-grid-mesh" aria-hidden="true" />

      <div className="container">
        {/* 2-Column Responsive Hero Grid */}
        <div className="hero-grid">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="hero-content">
            {/* Kinetic Typography Outline Text Rotator */}
            <h1 className="hero-title">
              <span className="word-stop">STOP</span>
              <div className="outline-rotator" id="heroRotator" aria-live="polite">
                {ROTATOR_WORDS.map((word, idx) => (
                  <span
                    key={word}
                    className={`rotator-word ${idx === wordIndex ? 'active' : ''}`}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </h1>

            <p className="hero-paragraph">
              Before you spend 4 years on theoretical lectures and outdated slides, build with students who are actually shipping systems. Get real roadmaps on placements, open source, hackathons, and software engineering.
            </p>

            <div className="hero-cta-group">
              <a href="#join" className="btn btn-primary hero-main-cta">
                <span>Join Community</span>
                <ArrowRight size={16} strokeWidth={1.5} className="cta-arrow-icon" />
              </a>

              <a href="#clubs" className="btn btn-secondary">
                <span>Explore 8 Guilds</span>
              </a>

              <a href="#projects" className="btn btn-ghost" style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--btn-radius)' }}>
                <span>View Projects</span>
              </a>
            </div>

            {/* Verified Campus Proof Bar */}
            <div className="hero-proof-bar">
              <div className="proof-item">
                <CheckCircle2 size={16} strokeWidth={2.5} style={{ color: 'var(--success)' }} />
                <span>8 Specialized Guilds</span>
              </div>
              <div className="proof-item">
                <ShieldCheck size={16} strokeWidth={2} style={{ color: 'var(--accent)' }} />
                <span>AKTU College Code 1215</span>
              </div>
              <div className="proof-item">
                <Users size={16} strokeWidth={2} style={{ color: 'var(--primary)' }} />
                <span>₹0 100% Free &amp; Open Access</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Bento Grid from stic-delta */}
          <div className="hero-bento-grid" aria-label="Campus Insights Bento Grid">
            {/* Bento Card 1: What Freshers Ask */}
            <div className="bento-card bento-card-ask">
              <div className="bento-header">
                <span className="bento-label">What Freshers Ask</span>
                <HelpCircle size={18} strokeWidth={2} style={{ color: 'var(--text-tertiary)' }} />
              </div>
              <p className="bento-quote">“What is the actual placement &amp; roadmap reality?”</p>
              <p className="bento-desc">Ask the uncomfortable questions before you spend years in confusion.</p>
            </div>

            {/* Bento Card 2: Opportunity Cost */}
            <div className="bento-card bento-card-cost">
              <div className="bento-header">
                <span className="bento-label">Opportunity Cost</span>
                <Shield size={18} strokeWidth={2} style={{ color: 'var(--accent)' }} />
              </div>
              <div className="bento-number">4 Years</div>
              <p className="bento-desc">Too much valuable time to spend based on outdated slides and random opinions.</p>
            </div>

            {/* Bento Card 3: Campus Blueprint CTA */}
            <div 
              className="bento-card bento-card-cta"
              onClick={() => {
                const el = document.getElementById('clubs');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              role="button"
              tabIndex={0}
              aria-label="Find your guild first. Ship your flagship project next."
            >
              <div>
                <span className="cta-tag">Campus Blueprint</span>
                <p className="cta-headline">Find your guild first. Ship your flagship project next.</p>
              </div>
              <div className="cta-circle-btn">
                <ArrowUpRight size={22} strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>

        {/* Community Stat Counters */}
        <div className="hero-specs-grid" aria-label="Community Specifications and Impact" style={{ marginTop: '3.5rem' }}>
          {COMMUNITY_STATS.map((stat, idx) => {
            const Icon = STAT_ICONS[idx] || Sparkles;
            return (
              <div key={idx} className="spec-card">
                <div className="spec-label">
                  <Icon size={14} strokeWidth={1.5} />
                  <span>{stat.label}</span>
                </div>
                <div className="spec-value" style={{ fontSize: 'var(--step-2)', fontWeight: 800, color: 'var(--text)' }}>
                  {stat.value}
                </div>
                <div className="spec-sub">{stat.sub}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
