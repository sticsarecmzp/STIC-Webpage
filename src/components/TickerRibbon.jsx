import React from 'react';

/**
 * Dual angled continuous marquee ticker ribbons from stic-delta.vercel.app
 * running infinite smooth opposite-direction scrolling animations.
 */
export default function TickerRibbon() {
  return (
    <section className="ticker-section" aria-label="Campus Tech Guilds and Stacks Marquee">
      <div className="ticker-wrapper">
        {/* Top Dark Angled Ribbon (-3deg) */}
        <div className="ticker-ribbon ticker-ribbon-dark">
          <div className="ticker-track">
            <span className="ticker-item">STIC CODING <span className="ticker-dot">•</span></span>
            <span className="ticker-item">ROBOTECH &amp; IOT <span className="ticker-dot">•</span></span>
            <span className="ticker-item">AI &amp; MACHINE LEARNING <span className="ticker-dot">•</span></span>
            <span className="ticker-item">CYBER SECURITY <span className="ticker-dot">•</span></span>
            <span className="ticker-item">WEB &amp; APP DEV <span className="ticker-dot">•</span></span>
            <span className="ticker-item">OPEN SOURCE SAREC <span className="ticker-dot">•</span></span>
            <span className="ticker-item">E-CELL &amp; STARTUPS <span className="ticker-dot">•</span></span>
            <span className="ticker-item">PIXELS UI/UX <span className="ticker-dot">•</span></span>
            {/* Repeated for continuous seamless loop */}
            <span className="ticker-item">STIC CODING <span className="ticker-dot">•</span></span>
            <span className="ticker-item">ROBOTECH &amp; IOT <span className="ticker-dot">•</span></span>
            <span className="ticker-item">AI &amp; MACHINE LEARNING <span className="ticker-dot">•</span></span>
            <span className="ticker-item">CYBER SECURITY <span className="ticker-dot">•</span></span>
            <span className="ticker-item">WEB &amp; APP DEV <span className="ticker-dot">•</span></span>
            <span className="ticker-item">OPEN SOURCE SAREC <span className="ticker-dot">•</span></span>
            <span className="ticker-item">E-CELL &amp; STARTUPS <span className="ticker-dot">•</span></span>
            <span className="ticker-item">PIXELS UI/UX <span className="ticker-dot">•</span></span>
          </div>
        </div>

        {/* Bottom Accent Angled Ribbon (+3deg) */}
        <div className="ticker-ribbon ticker-ribbon-light">
          <div className="ticker-track">
            <span className="ticker-item">REACT &amp; NEXT.JS <span className="ticker-dot">•</span></span>
            <span className="ticker-item">PYTHON &amp; PYTORCH <span className="ticker-dot">•</span></span>
            <span className="ticker-item">C++ &amp; DATA STRUCTURES <span className="ticker-dot">•</span></span>
            <span className="ticker-item">DOCKER &amp; LINUX <span className="ticker-dot">•</span></span>
            <span className="ticker-item">ARDUINO &amp; ESP32 <span className="ticker-dot">•</span></span>
            <span className="ticker-item">FLUTTER &amp; MOBILE <span className="ticker-dot">•</span></span>
            <span className="ticker-item">FIGMA &amp; DESIGN SYSTEMS <span className="ticker-dot">•</span></span>
            <span className="ticker-item">GIT &amp; OPEN COLLAB <span className="ticker-dot">•</span></span>
            {/* Repeated for continuous seamless loop */}
            <span className="ticker-item">REACT &amp; NEXT.JS <span className="ticker-dot">•</span></span>
            <span className="ticker-item">PYTHON &amp; PYTORCH <span className="ticker-dot">•</span></span>
            <span className="ticker-item">C++ &amp; DATA STRUCTURES <span className="ticker-dot">•</span></span>
            <span className="ticker-item">DOCKER &amp; LINUX <span className="ticker-dot">•</span></span>
            <span className="ticker-item">ARDUINO &amp; ESP32 <span className="ticker-dot">•</span></span>
            <span className="ticker-item">FLUTTER &amp; MOBILE <span className="ticker-dot">•</span></span>
            <span className="ticker-item">FIGMA &amp; DESIGN SYSTEMS <span className="ticker-dot">•</span></span>
            <span className="ticker-item">GIT &amp; OPEN COLLAB <span className="ticker-dot">•</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}
