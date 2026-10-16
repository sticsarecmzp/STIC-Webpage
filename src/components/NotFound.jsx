import React from 'react';
import { Home, AlertTriangle } from 'lucide-react';

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
    <div className="not-found-section" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
      <div className="about-card" style={{ maxWidth: '580px', width: '100%', padding: 'clamp(2rem, 5vw, 3.5rem)', textAlign: 'center', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.9rem', borderRadius: '999px', background: 'var(--badge-bg)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '1.25rem' }}>
          <AlertTriangle size={14} strokeWidth={2} />
          <span>404 &bull; PAGE NOT FOUND</span>
        </div>

        <div style={{ fontSize: 'clamp(4rem, 10vw, 6rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--text-primary)', marginBottom: '1rem' }}>
          404
        </div>

        <h1 style={{ fontSize: 'var(--step-2)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
          Page Not Found
        </h1>

        <p style={{ fontSize: 'var(--step-0)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
          The page or route you are trying to visit does not exist on the STIC platform.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', justifyContent: 'center', marginBottom: '2rem' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleHomeClick}
          >
            <Home size={16} strokeWidth={1.5} />
            <span>Return to Home</span>
          </button>
        </div>

        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', fontSize: '0.8rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
          STIC &bull; Samrat Ashoka Rajkiya Engineering College, Mirzapur
        </div>
      </div>
    </div>
  );
}
