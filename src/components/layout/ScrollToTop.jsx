import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from '@/lib/animations/gsap';

/**
 * ScrollToTop: Ensures every page opens at the top (y = 0) upon navigation,
 * on both mobile touch devices and desktop, while supporting anchor links (#hash).
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  // 1. Disable browser's auto scroll restoration
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // 2. Immediate scroll reset before paint
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const resetToTop = () => {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true, force: true });
      }
    };

    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        resetToTop();
      }
    } else {
      resetToTop();
    }
  }, [pathname, hash]);

  // 3. Follow-up scroll reset after DOM/image layout settles
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!hash) {
      window.scrollTo(0, 0);
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true, force: true });
      }
    }

    const t1 = setTimeout(() => {
      if (!hash) {
        window.scrollTo(0, 0);
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { immediate: true, force: true });
        }
      }
      ScrollTrigger.refresh();
    }, 50);

    const t2 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname, hash]);

  return null;
}
