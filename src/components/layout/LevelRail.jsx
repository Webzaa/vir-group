import { useRef, useState } from 'react';
import { REFRESH, ScrollTrigger, useGSAP } from '@/lib/animations/gsap';
import { Datum } from '@/components/ui/Datum';
/** Position in the page's elevation: rises from ±00 (hero) to Rooftop (final CTA). Desktop only, decorative. */
export function LevelRail() {
  const root = useRef(null);
  const [levels, setLevels] = useState([]);
  const [pos, setPos] = useState(0);
  const [theme, setTheme] = useState('basalt');
  useGSAP(
    (_ctx, contextSafe) => {
      const create = contextSafe(() => {
        const secs = Array.from(document.querySelectorAll('main section[data-level]'));
        setLevels(secs.map((s) => s.dataset.level ?? ''));
        secs.forEach((sec, i) => {
          ScrollTrigger.create({
            trigger: sec,
            start: 'top center',
            end: 'bottom center',
            refreshPriority: REFRESH.OBSERVER,
            onUpdate: (st) => setPos(i + st.progress * 0.999),
            onToggle: (st) => {
              if (st.isActive) setTheme(sec.dataset.theme ?? 'basalt');
            },
          });
        });
      });
      const id = window.setTimeout(create, 60);
      return () => window.clearTimeout(id);
    },
    { scope: root },
  );
  const n = Math.max(levels.length - 1, 1);
  const y = (i) => `${100 - (Math.max(0, Math.min(n, i)) / n) * 100}%`;
  return (
    <div ref={root} className="rail" aria-hidden="true" data-theme={theme} style={{ opacity: levels.length ? 1 : 0 }}>
      <div className="rail-track" />
      {levels.map((l, i) => (
        <span key={`${l}-${i}`}>
          <span className="rail-tick" style={{ top: y(i) }} />
          <span className="rail-label" style={{ top: y(i), opacity: Math.round(pos) === i ? 1 : 0 }}>
            {l.replace('.00', '')}
          </span>
        </span>
      ))}
      <div className="rail-dot" style={{ top: y(pos) }}>
        <Datum className="" />
      </div>
    </div>
  );
}
