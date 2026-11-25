import { useState, useRef, useEffect } from 'react';
import { LevelMarker } from '@/components/ui/LevelMarker';

const initials = (n) =>
  n
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2);

const SLOTS = [
  null,
  { left: 0.22, w: 0.6, h: 0.86, wash: 0.22 },
  { left: 0.88, w: 0.48, h: 0.74, wash: 0.38 },
  { left: 1.42, w: 0.38, h: 0.62, wash: 0.5 },
  { left: 1.86, w: 0.3, h: 0.52, wash: 0.6 },
  { left: 2.22, w: 0.24, h: 0.44, wash: 0.68 },
];

export function TeamCarousel({ coreTeam = [] }) {
  const [idx, setIdx] = useState(0);
  const [isSwapping, setIsSwapping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const cardRefs = useRef([]);
  const containerRef = useRef(null);
  const pointerStart = useRef({ x: null, y: null });
  const lastWheelTime = useRef(0);
  const [isInView, setIsInView] = useState(false);
  const hasEnteredRef = useRef(false);

  const go = (n) => {
    if (coreTeam.length === 0) return;
    const nextIdx = ((n % coreTeam.length) + coreTeam.length) % coreTeam.length;
    if (nextIdx === idx) return;
    setIsSwapping(true);
    setIdx(nextIdx);
    setTimeout(() => {
      setIsSwapping(false);
    }, 220);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (!entry.isIntersecting) {
          hasEnteredRef.current = false;
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || isPaused || coreTeam.length <= 1) return;
    const delay = 3500;
    hasEnteredRef.current = true;

    const timer = setTimeout(() => {
      go(idx + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, isPaused, idx, coreTeam.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.querySelector('.overlay')?.classList.contains('is-open')) return;
      if (e.key === 'ArrowRight') go(idx + 1);
      if (e.key === 'ArrowLeft') go(idx - 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [idx, coreTeam.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 18) {
        const now = Date.now();
        if (now - lastWheelTime.current < 450) return;

        if (e.deltaX > 0) {
          e.preventDefault();
          lastWheelTime.current = now;
          go(idx + 1);
        } else if (e.deltaX < 0) {
          e.preventDefault();
          lastWheelTime.current = now;
          go(idx - 1);
        }
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [idx, coreTeam.length]);

  const handlePointerDown = (e) => {
    setIsPaused(true);
    pointerStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    setTimeout(() => setIsPaused(false), 2000);
    if (pointerStart.current.x === null) return;
    const dx = e.clientX - pointerStart.current.x;
    const dy = e.clientY - (pointerStart.current.y || e.clientY);
    pointerStart.current = { x: null, y: null };

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 35) {
      if (dx < 0) {
        go(idx + 1);
      } else if (dx > 0) {
        go(idx - 1);
      }
    }
  };

  const getCardStyle = (i) => {
    const n = coreTeam.length;
    if (n === 0) return {};

    const forwardDist = (i - idx + n) % n;

    if (forwardDist === 0) {
      return {
        left: 0,
        width: 'var(--mw)',
        height: 'var(--mh)',
        opacity: 1,
        zIndex: 20,
        transform: 'translateY(-50%) translate(0, 0)',
        '--wash': 0,
        pointerEvents: 'auto',
      };
    } else if (forwardDist === n - 1) {
      return {
        left: 0,
        width: 'var(--mw)',
        height: 'var(--mh)',
        opacity: 0,
        zIndex: 1,
        transform: 'translateY(-50%) translate(-22%, 0)',
        '--wash': 0,
        pointerEvents: 'none',
      };
    } else {
      const d = forwardDist;
      const hide = d > 5;
      const s = SLOTS[Math.min(d, 5)];
      return {
        left: `calc(var(--mw) * (1 + var(--sl) * ${hide ? 2.5 : s.left}))`,
        width: `calc(var(--mw) * var(--sl) * ${hide ? 0 : s.w})`,
        height: `calc(var(--mh) * ${hide ? 0.35 : s.h})`,
        opacity: hide ? 0 : 1,
        zIndex: 15 - Math.min(d, 10),
        transform: 'translateY(-50%) translate(0, 0)',
        '--wash': hide ? 0 : s.wash,
        pointerEvents: hide ? 'none' : 'auto',
      };
    }
  };

  const activeMember = coreTeam[idx] || coreTeam[0] || {};

  return (
    <section
      ref={containerRef}
      className="team-page"
      data-theme="lime"
      aria-labelledby="team-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div className="team-main">
        <div className="team-stage-header">
          <LevelMarker name="Core Team" />
        </div>

        <h2 id="team-heading" className="team-title">
          <span>Meet</span>
          <span className="soft">our</span>
          <span>Team</span>
        </h2>

        <div
          className="team-stage"
          role="region"
          aria-roledescription="carousel"
          aria-label="Core Team members"
        >
          {coreTeam.map((m, i) => {
            const d = i - idx;
            return (
              <div
                key={m.name}
                ref={(el) => (cardRefs.current[i] = el)}
                className={`team-card ${d === 0 ? 'is-main' : ''}`}
                style={getCardStyle(i)}
                role="group"
                aria-label={`${i + 1} of ${coreTeam.length}: ${m.name}`}
                onClick={() => i !== idx && go(i)}
              >
                <span className="ini">{initials(m.name)}</span>
                {m.photo && (
                  <img
                    src={m.photo}
                    alt={`${m.name}, ${m.role}`}
                    loading={i < 4 ? 'eager' : 'lazy'}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className={`team-who ${isSwapping ? 'swap' : ''}`} aria-live="polite">
          <h2>{activeMember?.name}</h2>
          <div className="team-tags">
            <span>{activeMember?.role}</span>
          </div>
        </div>

        <div className="team-arrows">
          <button
            type="button"
            onClick={() => go(idx - 1)}
            aria-label="Previous member"
          >
            <svg viewBox="0 0 48 14" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M47 7H2M8 1 2 7l6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(idx + 1)}
            aria-label="Next member"
          >
            <svg viewBox="0 0 48 14" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M1 7h45M40 1l6 6-6 6" />
            </svg>
          </button>
        </div>

        <p className="team-blurb">
          Our dedicated team of project leads, site engineers, and operational professionals brings every residence from blueprint to handover.
        </p>

        <div className={`team-count ${isSwapping ? 'swap' : ''}`} aria-hidden="true">
          <b>{idx + 1}</b>
          <small>/ <span>{coreTeam.length}</span></small>
        </div>
      </div>
    </section>
  );
}

export default TeamCarousel;
