import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { LevelMarker } from '@/components/ui/LevelMarker';

export const MILESTONES = [
  {
    year: 2013,
    title: 'Foundation',
    desc: 'Established with a vision to transform Mumbai',
    angle: 0,
    x: 230,
    y: 75,
  },
  {
    year: 2016,
    title: 'Expansion',
    desc: 'Completed 5 residential projects across Mumbai',
    angle: 60,
    x: 364,
    y: 153,
  },
  {
    year: 2020,
    title: 'Milestone',
    desc: 'Delivered projects, impacting 50+ families',
    angle: 120,
    x: 364,
    y: 308,
  },
  {
    year: 2022,
    title: 'Innovation',
    desc: 'Introduced eco-friendly construction practices',
    angle: 180,
    x: 230,
    y: 385,
  },
  {
    year: 2023,
    title: 'Recognition',
    desc: 'Recognition for excellence in real estate development',
    angle: 240,
    x: 96,
    y: 308,
  },
  {
    year: 2025,
    title: 'Legacy',
    desc: '1500000+ SQFTs completed, 100+ happy families',
    angle: 300,
    x: 96,
    y: 153,
  },
];

export function Story() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [angle, setAngle] = useState(0);
  const isInteracting = useRef(false);

  useEffect(() => {
    const handleClockProgress = (e) => {
      if (isInteracting.current) return;
      const progress = Math.max(0, Math.min(1, e.detail?.progress ?? 0));
      const targetAngle = progress * 300;
      setAngle(targetAngle);

      const numMilestones = MILESTONES.length;
      const idx = Math.min(
        numMilestones - 1,
        Math.floor(progress * numMilestones)
      );
      setActiveIndex(idx);
    };

    window.addEventListener('vir-clock-progress', handleClockProgress);
    return () => {
      window.removeEventListener('vir-clock-progress', handleClockProgress);
    };
  }, []);

  const handleSelectYear = (idx) => {
    isInteracting.current = true;
    setActiveIndex(idx);
    setAngle(MILESTONES[idx].angle);
    setTimeout(() => {
      isInteracting.current = false;
    }, 1200);
  };

  const activeMilestone = MILESTONES[activeIndex] || MILESTONES[0];

  return (
    <section className="story" data-theme="white" data-level="+02.00" aria-labelledby="story-h">
      <div className="wrap story-container">
        <div className="story-left-col">
          <div className="story-marker-wrap">
            <LevelMarker level="+02.00" name="Our journey" />
          </div>

          <div className="story-content-deck">
            <div className="story-year-row">
              <span className="story-big-year">{activeMilestone.year}</span>
              <span className="story-year-badge">{activeMilestone.title}</span>
            </div>
            <h3 id="story-h" className="story-milestone-desc">
              {activeMilestone.desc}
            </h3>
          </div>

          <div className="story-actions">
            <Button href="/about" variant="ghost">Discover our story</Button>
            <div className="story-pill-nav" aria-label="Milestone navigator">
              {MILESTONES.map((m, idx) => (
                <button key={m.year} className={`story-pill ${activeIndex === idx ? 'is-active' : ''}`} onClick={() => handleSelectYear(idx)} aria-label={`Jump to ${m.year}`} >
                  <span>{m.year}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="story-right-col">
          <div className="clock-dial-wrapper">
            <svg className="clock-dial-svg" viewBox="0 0 460 460" aria-hidden="true">
              <defs>
                <linearGradient id="needleGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e2c68c" />
                  <stop offset="100%" stopColor="#7d5e39" />
                </linearGradient>
              </defs>

              <circle cx="230" cy="230" r="220" className="clock-rim" />
              <circle cx="230" cy="230" r="200" className="clock-inner-rim" />
              <circle cx="230" cy="230" r="155" className="clock-track" />

              {Array.from({ length: 60 }).map((_, i) => {
                const tickAngle = (i * 6 * Math.PI) / 180;
                const isMajor = i % 5 === 0;
                const rInner = isMajor ? 190 : 194;
                const rOuter = 200;
                const x1 = 230 + rInner * Math.sin(tickAngle);
                const y1 = 230 - rInner * Math.cos(tickAngle);
                const x2 = 230 + rOuter * Math.sin(tickAngle);
                const y2 = 230 - rOuter * Math.cos(tickAngle);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    className={isMajor ? 'clock-tick-major' : 'clock-tick-minor'}
                  />
                );
              })}

              <text x="230" y="195" textAnchor="middle" className="clock-dial-brand">
                VIR GROUP
              </text>
              <text x="230" y="272" textAnchor="middle" className="clock-dial-sub">
                TIMELESS CRAFTSMANSHIP
              </text>

              <g className="clock-needle-group" style={{ transform: `rotate(${angle}deg)`, transformOrigin: '230px 230px', transition: isInteracting.current ? 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' : 'none', }}>
                <polygon points="226,230 230,80 234,230 230,248" className="clock-needle" />
                <circle cx="230" cy="245" r="7" className="clock-counterweight" />
                <circle cx="230" cy="230" r="14" className="clock-pivot-outer" />
                <circle cx="230" cy="230" r="6" className="clock-pivot-inner" />
              </g>
            </svg>

            <div className="clock-badges-layer">
              {MILESTONES.map((m, idx) => {
                const isActive = activeIndex === idx;
                const leftPercent = (m.x / 460) * 100;
                const topPercent = (m.y / 460) * 100;
                return (
                  <button key={m.year} className={`clock-year-node ${isActive ? 'is-active' : ''}`} style={{ left: `${leftPercent}%`, top: `${topPercent}%` }} onClick={() => handleSelectYear(idx)} aria-label={`Milestone ${m.year}: ${m.title}`}>
                    <span className="clock-node-dot" />
                    <span className="clock-node-year">{m.year}</span>
                    <span className="clock-node-title">{m.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Story;
