import React from 'react';

/**
 * Modern trending section divider with glowing traveling laser beam,
 * ambient radial light flare, and interactive coordinate badge.
 */
export default function SectionDivider({ 
  index = "01", 
  tag = "SECTION", 
  targetId, 
  delayClass = "divider-delay-1" 
}) {
  const handleClick = (e) => {
    if (targetId) {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={`section-divider-wrap ${delayClass}`} aria-hidden={!targetId}>
      <div className="divider-container">
        {/* Ambient Radial Lighting Flare */}
        <div className="divider-ambient-flare" />

        {/* Hairline Track with Traveling Laser Pulse */}
        <div className="divider-line-track">
          <div className="divider-laser-beam" />
        </div>

        {/* Center Interactive Tech Coordinate Badge */}
        {targetId ? (
          <a
            href={`#${targetId}`}
            onClick={handleClick}
            className="divider-badge-link"
            aria-label={`Jump to ${tag} section`}
          >
            <span className="divider-index">{index}</span>
            <span className="divider-pulse-node" />
            <span className="divider-tag-label">{tag}</span>
          </a>
        ) : (
          <div className="divider-badge-link" style={{ cursor: 'default' }}>
            <span className="divider-index">{index}</span>
            <span className="divider-pulse-node" />
            <span className="divider-tag-label">{tag}</span>
          </div>
        )}
      </div>
    </div>
  );
}
