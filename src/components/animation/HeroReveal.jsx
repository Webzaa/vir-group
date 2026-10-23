import { gsap, useGSAP } from '@/lib/animations/gsap';
/**
 * Plays the hero entrance of whichever page is mounted: elevation strokes draw, headline lines rise,
 * meta fades in, then a scrubbed hand-off on scroll. Waits for the preloader on a first visit.
 */
export function HeroReveal() {
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const hero = document.querySelector('main [data-hero]');
    if (!hero) return;
    const w = window;
    const firstEver = !w.__virHeroPlayed;
    w.__virHeroPlayed = true;
    const lines = hero.querySelectorAll('h1 .line > span');
    const intro = hero.querySelectorAll('[data-intro]');
    const strokes = hero.querySelectorAll('.hero-media .l, .hero-media .f, .hero-media .g');
    const art = hero.querySelector('.hero-media svg, .hero-media video, .hero-media img');
    if (lines.length) gsap.set(lines, { yPercent: 105 });
    if (intro.length) gsap.set(intro, { opacity: 0, y: 16 });
    if (strokes.length) gsap.set(strokes, { strokeDashoffset: 1 });
    if (art) gsap.set(art, { scale: 1.06, transformOrigin: '70% 100%' });
    const tl = gsap
      .timeline({ delay: 0.1, defaults: { ease: 'expo.out' } });
    if (strokes.length) tl.to(strokes, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', stagger: { amount: 0.8, from: 'end' } }, 0);
    if (art) tl.to(art, { scale: 1, duration: 2.4 }, 0);
    if (lines.length) tl.to(lines, { yPercent: 0, duration: 1, stagger: 0.12 }, 0.5);
    if (intro.length) tl.to(intro, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 1.1);
    if (!firstEver) tl.timeScale(2.5);
    const heroMedia = hero.querySelector('.hero-media');
    const heroContent = hero.querySelector('.hero-content, .in');
    if (heroMedia && heroContent) {
      gsap
        .timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } })
        .to(heroMedia, { scale: 1.06, ease: 'none' }, 0)
        .to(heroContent, { yPercent: -8, opacity: 0.25, ease: 'none' }, 0);
    }
  });
  return null;
}
