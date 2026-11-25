import { useState, useRef } from 'react';

export const PERKS = [
  {
    title: 'Career Growth',
    desc: 'Clear paths for advancement and skill development',
    bg: '#eff6ff',
    color: '#2563eb',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="3" y1="20" x2="21" y2="20" />
      </svg>
    ),
  },
  {
    title: 'Health Benefits',
    desc: 'Comprehensive medical insurance for you and your family',
    bg: '#fff7ed',
    color: '#ea580c',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
  {
    title: 'Work-Life Balance',
    desc: 'Flexible work arrangements and a supportive environment',
    bg: '#fefce8',
    color: '#ca8a04',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="M7 21h10" />
        <path d="M12 3v18" />
        <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
      </svg>
    ),
  },
  {
    title: 'Recognition',
    desc: 'Performance bonuses and appreciation programs',
    bg: '#fff1f2',
    color: '#e11d48',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Learning & Development',
    desc: 'Regular training sessions and workshops',
    bg: '#eef2ff',
    color: '#4f46e5',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
        <path d="M6 6h10" />
        <path d="M6 10h10" />
      </svg>
    ),
  },
  {
    title: 'Job Security',
    desc: 'Stable career with a well-established and trusted company',
    bg: '#f0fdf4',
    color: '#0284c7',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      </svg>
    ),
  },
];

const PERK_SLIDES = [];
for (let i = 0; i < PERKS.length; i += 2) {
  PERK_SLIDES.push(PERKS.slice(i, i + 2));
}

export function CareersPerks() {
  const perksRef = useRef(null);
  const [perkSlide, setPerkSlide] = useState(0);
  const perkSlides = PERK_SLIDES.length;

  const handlePerksScroll = (e) => {
    const el = e.currentTarget;
    if (!el.clientWidth) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setPerkSlide(Math.min(Math.max(idx, 0), perkSlides - 1));
  };

  const goToPerkSlide = (i) => {
    const el = perksRef.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <section className="careers-v2-why-sec" data-theme="lime" aria-labelledby="why-join-title">
      <div className="wrap">
        <div className="careers-v2-sec-center">
          <span className="careers-v2-micro-tag">WHY JOIN US</span>
          <h2 id="why-join-title" className="careers-v2-sec-title">
            Why Work With VIR Group?
          </h2>
          <p className="careers-v2-sec-subtitle">
            We believe in nurturing talent and creating opportunities for growth, innovation and meaningful impact.
          </p>
        </div>

        <div
          ref={perksRef}
          onScroll={handlePerksScroll}
          className="careers-v2-perks-grid"
        >
          {PERK_SLIDES.map((pair, sIdx) => (
            <div key={sIdx} className="careers-v2-perks-slide">
              {pair.map((perk) => (
                <div key={perk.title} className="careers-v2-perk-card">
                  <div
                    className="careers-v2-perk-icon-box"
                    style={{ backgroundColor: perk.bg, color: perk.color }}
                  >
                    {perk.icon}
                  </div>
                  <div className="careers-v2-perk-text">
                    <h3 className="careers-v2-perk-title">{perk.title}</h3>
                    <p className="careers-v2-perk-desc">{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="careers-v2-perks-dots" aria-hidden="true">
          {Array.from({ length: perkSlides }).map((_, i) => (
            <button
              key={i}
              type="button"
              tabIndex={-1}
              onClick={() => goToPerkSlide(i)}
              className={`careers-v2-perks-dot ${perkSlide === i ? 'is-active' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CareersPerks;
