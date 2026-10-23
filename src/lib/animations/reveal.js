import { DUR, EASE, gsap } from './gsap';
/* Shared one-shot animations. Call inside a gsap context (useGSAP) so cleanup is automatic. */
export function revealText(el, opts = {}) {
  const lines = el.querySelectorAll('.line > span');
  if (!lines.length) return;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  if (isMobile) {
    gsap.set(lines, { yPercent: 0, opacity: 1 });
    return;
  }
  gsap.from(lines, {
    yPercent: 105,
    duration: DUR.text,
    ease: EASE.arrive,
    stagger: opts.stagger ?? 0.08,
    scrollTrigger: { trigger: el, start: opts.start ?? 'top 80%', once: true },
  });
}
export function fadeUp(el, opts = {}) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  if (isMobile) {
    gsap.fromTo(
      el,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 96%', once: true },
      }
    );
    return;
  }
  gsap.from(el, {
    opacity: 0,
    y: opts.y ?? 16,
    duration: DUR.ui,
    ease: EASE.arrive,
    scrollTrigger: { trigger: el, start: opts.start ?? 'top 88%', once: true },
  });
}
export function revealImage(el, inner) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  if (isMobile) {
    gsap.set(el, { clipPath: 'inset(0% 0% 0% 0%)' });
    if (inner) gsap.set(inner, { scale: 1 });
    return;
  }
  const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
  tl.fromTo(el, { clipPath: 'inset(12% 20% 12% 20%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: DUR.mask, ease: EASE.reveal }, 0);
  if (inner) tl.fromTo(inner, { scale: 1.08 }, { scale: 1, duration: DUR.mask, ease: EASE.arrive }, 0);
  return tl;
}
export function parallaxImage(el, amount = 0.04) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  if (isMobile) return;
  const pct = Math.min(amount, 0.12) * 100;
  gsap.fromTo(
    el,
    { yPercent: -pct },
    {
      yPercent: pct,
      ease: 'none',
      scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
    },
  );
}
export function countUp(el) {
  const to = Number(el.dataset.count),
    dec = Number(el.dataset.dec ?? 0),
    suffix = el.dataset.suffix ?? '';
  const state = { v: 0 };
  gsap.to(state, {
    v: to,
    duration: DUR.mask,
    ease: EASE.arrive,
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    onUpdate: () => {
      el.textContent = state.v.toFixed(dec) + suffix;
    },
  });
}
/** Draws SVG strokes that carry pathLength="1". */
export function drawStrokes(targets, opts = {}) {
  gsap.set(targets, { strokeDashoffset: 1 });
  return gsap.to(targets, {
    strokeDashoffset: 0,
    duration: opts.duration ?? 1.6,
    ease: 'power2.inOut',
    stagger: { amount: opts.amount ?? 0.8, from: 'end' },
    scrollTrigger: opts.trigger ? { trigger: opts.trigger, start: 'top 60%', once: true } : undefined,
  });
}
