import { useRef } from 'react';
import { LevelMarker } from '@/components/ui/LevelMarker';
import { gsap, useGSAP, REFRESH, ScrollTrigger } from '@/lib/animations/gsap';

export const achievementsData = [
  { id: 'sqft', value: 1.5, suffix: ' Lakh +', label: 'SQFT Built', size: 'c-xl', finalY: -14, zIndex: 1 },
  { id: 'ongoing', value: 27, suffix: ' Lakh', label: 'SQFT Ongoing', size: 'c-lg', finalY: 30, zIndex: 3 },
  { id: 'families', value: 100, suffix: '+', label: 'Happy Families', size: 'c-md', finalY: -42, zIndex: 2 },
  { id: 'experience', value: 13, suffix: '+', label: 'Years Experience', size: 'c-sm', finalY: 34, zIndex: 4 },
  { id: 'satisfaction', value: 100, suffix: '%', label: 'Customer Satisfaction', size: 'c-lg', highlight: true, finalY: -10, zIndex: 5 },
];

export function Achievements({ stats: _stats }) {
  const root = useRef(null);
  const headerRef = useRef(null);
  const clusterRef = useRef(null);
  const hasCountedRef = useRef(false);

  const animateCounter = (el, targetValue, suffix, duration = 2000) => {
    const startTime = performance.now();
    const startValue = 0;
    const isDecimal = !Number.isInteger(targetValue);

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentVal = startValue + (targetValue - startValue) * eased;
      const formatted = isDecimal ? currentVal.toFixed(1) : Math.round(currentVal).toLocaleString('en-US');
      el.textContent = formatted + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  const startCounters = () => {
    if (hasCountedRef.current) return;
    hasCountedRef.current = true;

    const numEls = root.current?.querySelectorAll('.ach-num');
    if (!numEls) return;

    numEls.forEach((el, i) => {
      const targetValue = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const isDecimal = !Number.isInteger(targetValue);
      el.textContent = (isDecimal ? '0.0' : '0') + suffix;

      setTimeout(() => {
        const duration = targetValue > 1000 ? 2500 : 1800;
        animateCounter(el, targetValue, suffix, duration);
      }, i * 200);
    });
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1200px) and (prefers-reduced-motion: no-preference)', () => {
        const el = root.current;
        const header = headerRef.current;
        const cluster = clusterRef.current;
        if (!el || !header || !cluster) return;
        const circles = gsap.utils.toArray('.ach-circle', cluster);
        const [c0, c1, c2, c3, c4] = circles;
        const [d0, d1, d2, d3, d4] = achievementsData;
        if (!c0 || !c1 || !c2 || !c3 || !c4 || !d0 || !d1 || !d2 || !d3 || !d4) return;
        const c0Rect = c0.getBoundingClientRect();
        const c0CenterX = c0Rect.left + c0Rect.width / 2;
        const c0CenterY = c0Rect.top + c0Rect.height / 2;
        const vpCenterX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
        const shiftX = vpCenterX - c0CenterX;
        const deltas = circles.map((c) => {
          const r = c.getBoundingClientRect();
          return {
            dx: c0CenterX - (r.left + r.width / 2),
            dy: c0CenterY - (r.top + r.height / 2),
          };
        });

        gsap.set(c0, {
          x: shiftX,
          y: 0,
          scale: 1.25,
          opacity: 1,
          zIndex: 10,
        });
        if (deltas[1]) gsap.set(c1, { x: deltas[1].dx + shiftX, y: deltas[1].dy, scale: 0.2, opacity: 0, zIndex: 0 });
        if (deltas[2]) gsap.set(c2, { x: deltas[2].dx + shiftX, y: deltas[2].dy, scale: 0.2, opacity: 0, zIndex: 0 });
        if (deltas[3]) gsap.set(c3, { x: deltas[3].dx + shiftX, y: deltas[3].dy, scale: 0.2, opacity: 0, zIndex: 0 });
        if (deltas[4]) gsap.set(c4, { x: deltas[4].dx + shiftX, y: deltas[4].dy, scale: 0.2, opacity: 0, zIndex: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=170%',
            pin: true,
            scrub: 1,
            refreshPriority: REFRESH.PIN,
            onEnter: () => startCounters(),
            onEnterBack: () => {
              hasCountedRef.current = false;
              startCounters();
            },
          },
        });

        tl.to(header, { y: -10, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
        tl.to(c0, { x: 0, y: d0.finalY, scale: 1, duration: 0.8, ease: 'power2.inOut' }, 0.08);
        tl.set(c1, { zIndex: 3 }, 0.18).to(c1, { x: 0, y: d1.finalY, scale: 1, opacity: 1, duration: 0.65, ease: 'power2.out' }, 0.18);
        tl.set(c2, { zIndex: 2 }, 0.30).to(c2, { x: 0, y: d2.finalY, scale: 1, opacity: 1, duration: 0.65, ease: 'power2.out' }, 0.30);
        tl.set(c3, { zIndex: 4 }, 0.42).to(c3, { x: 0, y: d3.finalY, scale: 1, opacity: 1, duration: 0.65, ease: 'power2.out' }, 0.42);
        tl.set(c4, { zIndex: 5 }, 0.54).to(c4, { x: 0, y: d4.finalY, scale: 1, opacity: 1, duration: 0.65, ease: 'power2.out' }, 0.54);
        tl.set(c0, { zIndex: 1 }, 0.48);
      });

      mm.add('(max-width: 1199px) and (prefers-reduced-motion: no-preference)', () => {
        const el = root.current;
        const header = headerRef.current;
        const cluster = clusterRef.current;
        if (!el || !cluster) return;

        const circles = gsap.utils.toArray('.ach-circle', cluster);
        if (circles.length < 5) return;
        const [c0, c1, c2, c3, c4] = circles;

        const clusterRect = cluster.getBoundingClientRect();
        const clusterCenterX = clusterRect.left + clusterRect.width / 2;
        const clusterCenterY = clusterRect.top + clusterRect.height / 2;

        const deltas = circles.map((c) => {
          const r = c.getBoundingClientRect();
          return {
            dx: clusterCenterX - (r.left + r.width / 2),
            dy: clusterCenterY - (r.top + r.height / 2),
          };
        });

        gsap.set(c0, {
          x: deltas[0].dx,
          y: deltas[0].dy,
          scale: 1.35,
          opacity: 1,
          zIndex: 10,
        });

        if (deltas[1]) gsap.set(c1, { x: deltas[1].dx, y: deltas[1].dy, scale: 0.2, opacity: 0, zIndex: 0 });
        if (deltas[2]) gsap.set(c2, { x: deltas[2].dx, y: deltas[2].dy, scale: 0.2, opacity: 0, zIndex: 0 });
        if (deltas[3]) gsap.set(c3, { x: deltas[3].dx, y: deltas[3].dy, scale: 0.2, opacity: 0, zIndex: 0 });
        if (deltas[4]) gsap.set(c4, { x: deltas[4].dx, y: deltas[4].dy, scale: 0.2, opacity: 0, zIndex: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=140%',
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            scrub: 0.8,
            refreshPriority: REFRESH.PIN,
            onEnter: () => startCounters(),
            onEnterBack: () => {
              hasCountedRef.current = false;
              startCounters();
            },
          },
        });

        if (header) {
          tl.to(header, { y: -8, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
        }

        tl.to(c0, { x: 0, y: 0, scale: 1, duration: 0.7, ease: 'power2.inOut' }, 0.05);
        tl.set(c1, { zIndex: 3 }, 0.15).to(c1, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.65, ease: 'power2.out' }, 0.15);
        tl.set(c2, { zIndex: 2 }, 0.28).to(c2, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.65, ease: 'power2.out' }, 0.28);
        tl.set(c3, { zIndex: 4 }, 0.42).to(c3, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.65, ease: 'power2.out' }, 0.42);
        tl.set(c4, { zIndex: 5 }, 0.55).to(c4, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.65, ease: 'back.out(1.5)' }, 0.55);
        tl.set(c0, { zIndex: 1 }, 0.45);
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const el = root.current;
        if (!el) return;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                startCounters();
                observer.disconnect();
              }
            });
          },
          { threshold: 0.3 },
        );
        observer.observe(el);

        return () => observer.disconnect();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="ach-section" data-theme="lime" data-level="+00.50" aria-labelledby="ach-h">
      <div className="wrap ach-stage">
        <div ref={headerRef} className="ach-header">
          <LevelMarker name="Achievements" />
          <h2 id="ach-h" className="t-display ach-title">
            Our Achievements
          </h2>
        </div>

        <div ref={clusterRef} className="ach-cluster">
          {achievementsData.map((item) => (
            <div key={item.id} className={`ach-circle ${item.size}${item.highlight ? ' ach-highlight' : ''}`} style={{ zIndex: item.zIndex }}>
              <div className="ach-circle-in">
                <span className="ach-num" data-count={item.value} data-suffix={item.suffix} suppressHydrationWarning>
                  {item.value.toLocaleString('en-US')}
                  {item.suffix}
                </span>
                <span className="ach-label">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;
