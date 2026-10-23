import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/animations/gsap';
import { Datum } from '@/components/ui/Datum';
/**
 * Mounted by app/template.tsx, so it re-runs on every navigation: a basalt panel
 * covers the incoming page and lifts away (~550ms), then the page's own hero reveal plays.
 * The first load is handled by the Preloader instead.
 */
export function PageTransition({ children }) {
  const panel = useRef(null);
  useGSAP(() => {
    const first = !window.__virNavigated;
    window.__virNavigated = true;
    const lenis = window.__lenis;
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
    // useGSAP runs in a layout effect, so the panel covers the new page before its first paint.
    if (first || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTimeout(() => ScrollTrigger.refresh(), 100);
      return;
    }
    gsap.fromTo(panel.current, { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.55, ease: 'power3.inOut', delay: 0.05 });
    setTimeout(() => ScrollTrigger.refresh(), 600);
    const h1 = document.querySelector('main h1');
    if (h1) {
      h1.setAttribute('tabindex', '-1');
      h1.focus({ preventScroll: true });
    }
  });
  return (
    <>
      <div className="tp" ref={panel} aria-hidden="true" style={{ clipPath: 'inset(100% 0% 0% 0%)' }}>
        <Datum className="" />
      </div>
      {children}
    </>
  );
}
