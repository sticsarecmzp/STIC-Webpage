import React from 'react';
import { ArrowLeft, Home, Sparkles, AlertTriangle } from 'lucide-react';

export default function NotFound({ onNavigateHome }) {
  const handleHomeClick = (e) => {
    e.preventDefault();
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.history.pushState({}, '', '/');
      window.location.href = '/';
    }
  };

  return (
    <div className="not-found-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div className="glass-card" style={{ maxWidth: '600px', width: '100%', padding: 'clamp(2rem, 5vw, 3.5rem)', textAlign: 'center', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.9rem', borderRadius: '4px', background: 'var(--brutal-yellow)', border: '2px solid var(--border-color)', color: '#000000', boxShadow: '3px 3px 0px var(--shadow-color)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700, marginBottom: '1.25rem' }}>
          <AlertTriangle size={14} strokeWidth={2} />
          <span>ERROR 404 • ROUTE NOT FOUND</span>
        </div>

        <div style={{ fontSize: 'clamp(4.5rem, 12vw, 6.5rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--text)', textShadow: '4px 4px 0px var(--brutal-yellow)', marginBottom: '1rem' }}>
          404
        </div>

        <h1 style={{ fontSize: 'var(--step-2)', fontWeight: 800, color: 'var(--text)', marginBottom: '0.75rem' }}>
          Node Not Found
        </h1>

        <p style={{ fontSize: 'var(--step-0)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
          The laboratory endpoint, documentation page, or campus route you are trying to visit does not exist on the STIC platform.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', justifyContent: 'center', marginBottom: '2rem' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleHomeClick}
          >
            <Home size={16} strokeWidth={1.5} />
            <span>Return to Community Home</span>
          </button>

          <a href="/#clubs" className="btn btn-secondary" onClick={() => { window.location.href = '/#clubs'; }}>
            <span>Explore 8 Guilds</span>
          </a>

          <a href="/#projects" className="btn btn-secondary" onClick={() => { window.location.href = '/#projects'; }}>
            <span>Student Projects</span>
          </a>
        </div>

        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', fontSize: '0.8rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
          STIC &bull; Samrat Ashok Rajkiya Engineering College, Mirzapur &bull; AKTU Code 1215
        </div>
      </div>
    </div>
  );
}
