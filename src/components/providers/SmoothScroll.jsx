import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/animations/gsap';

export function SmoothScroll({ children }) {
  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const isTouch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    if (isTouch) {
      // On touch devices, let native browser touch scrolling handle scroll naturally.
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      autoResize: true,
    });

    window.__lenis = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const tick = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(tick);
      lenis.off('scroll', onScroll);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}