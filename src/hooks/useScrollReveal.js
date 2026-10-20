
import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const revealElements = () => {
      const elements = document.querySelectorAll(
        '.scroll-reveal, #main-content > section, .institution-strip'
      );

      if (prefersReducedMotion) {
        elements.forEach((el) => el.classList.add('is-visible'));
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
        if (!el.classList.contains('scroll-reveal')) {
          el.classList.add('scroll-reveal');
        }

        // Already visible elements ko hidden state mein mat rakho
        if (el.classList.contains('is-visible')) {
          return;
        }

        observer.observe(el);
      });
    };

    revealElements();

    // Route change ya DOM update ke baad naye elements ko observe karo
    const mutationObserver = new MutationObserver(() => {
      revealElements();
    });

    const main = document.querySelector('#main-content');

    if (main) {
      mutationObserver.observe(main, {
        childList: true,
        subtree: true
      });
    }

    return () => {
      mutationObserver.disconnect();
    };
  }, []);
}
