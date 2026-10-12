import { useEffect } from 'react';

/**
 * Custom hook that observes sections and elements with the `.scroll-reveal` class,
 * adding `.is-visible` as they enter the viewport for smooth trending entrance animations.
 */
export function useScrollReveal() {
  useEffect(() => {
    // If user prefers reduced motion, mark all visible immediately
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll('.scroll-reveal, #main-content > section, .institution-strip');

    if (prefersReducedMotion) {
      elements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    elements.forEach((el) => {
      // Ensure element has .scroll-reveal class if it was matched by tag
      if (!el.classList.contains('scroll-reveal')) {
        el.classList.add('scroll-reveal');
      }
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
}
