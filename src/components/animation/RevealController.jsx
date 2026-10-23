import { useGSAP, gsap } from '@/lib/animations/gsap';
import { countUp, drawStrokes, fadeUp, parallaxImage, revealImage, revealText } from '@/lib/animations/reveal';
/**
 * Applies the shared one-shot animations to markup that opts in with data attributes,
 * so sections stay Server Components. Mounted once per page; reverted on navigation.
 */
export function RevealController() {
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const main = document.querySelector('main');
    if (!main) return;
    main.querySelectorAll('[data-lines]').forEach((el) => {
      if (!el.closest('[data-hero]')) revealText(el, { start: 'top 85%' });
    });
    main.querySelectorAll('[data-fade]').forEach((el) => fadeUp(el));
    main.querySelectorAll('[data-reveal]').forEach((el) => revealImage(el, el.querySelector('.media-in')));
    main.querySelectorAll('[data-parallax]').forEach((el) => parallaxImage(el));
    main.querySelectorAll('[data-count]').forEach((el) => countUp(el));
    main.querySelectorAll('.cta').forEach((cta) => {
      const strokes = Array.from(cta.querySelectorAll('.cta-media .l, .cta-media .f, .cta-media .g'));
      if (strokes.length) drawStrokes(strokes, { duration: 2, amount: 1, trigger: cta });
      gsap.fromTo(
        cta.querySelector('.cta-media'),
        { scale: 1 },
        { scale: 1.06, ease: 'none', transformOrigin: '50% 100%', scrollTrigger: { trigger: cta, start: 'top bottom', end: 'bottom bottom', scrub: true } },
      );
    });
    const fill = main.querySelector('.tl-fill');
    if (fill) gsap.to(fill, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '#tl', start: 'top 60%', end: 'bottom 60%', scrub: true } });
  });
  return null;
}
