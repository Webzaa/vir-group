import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP, gsap } from '@/lib/animations/gsap';
import { getMediaUrl } from '@/lib/media';

export const STATS = [
  { value: 1.5, suffix: ' Lakh +', label: 'SQFT Built' },
  { value: 27, suffix: ' Lakh', label: 'SQFT Ongoing' },
  { value: 100, suffix: '+', label: 'Happy Families' },
  { value: 13, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '%', label: 'Customer Satisfaction' },
];

export function CareersHero({ onScrollToPositions }) {
  const heroStatsRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const statElements = heroStatsRef.current?.querySelectorAll('.careers-v2-stat-val');
    if (statElements) {
      statElements.forEach((el) => {
        const target = parseFloat(el.getAttribute('data-target') || '0');
        const isDecimal = !Number.isInteger(target);
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
          onUpdate: () => {
            el.innerText = isDecimal ? counter.val.toFixed(1) : Math.round(counter.val).toString();
          },
        });
      });
    }
  });

  return (
    <section className="careers-v2-hero" data-theme="basalt" data-hero="true" aria-labelledby="careers-hero-title">
      <div className="careers-v2-hero-bg" aria-hidden="true">
        <img
          src={getMediaUrl('/media/careers-hero-office.jpg')}
          alt=""
          className="careers-v2-hero-bg-img"
          loading="eager"
          fetchPriority="high"
        />
        <div className="careers-v2-hero-scrim" />
      </div>

      <div className="careers-v2-hero-inner wrap">
        <div className="careers-v2-hero-content">
          <div className="careers-v2-hero-tag">
            CAREERS AT VIR GROUP
          </div>

          <h1 id="careers-hero-title" className="careers-v2-hero-title">
            Build Your Career With <span className="text-highlight">VIR Group</span>
          </h1>

          <p className="careers-v2-hero-sub">
            Be part of a legacy that's been transforming Mumbai's skyline for over 50 years. Join a team that builds more than homes — we build futures.
          </p>

          <div className="careers-v2-hero-cta">
            <button
              type="button"
              onClick={onScrollToPositions}
              className="careers-v2-btn-light"
            >
              <span>Join Our Team</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          <p className="crumbs" style={{ marginTop: '28px', marginBottom: 0 }}>
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Careers</span>
          </p>
        </div>
      </div>

      <div className="careers-v2-stats-strip">
        <div className="wrap">
          <div ref={heroStatsRef} className="careers-v2-stats-grid">
            {STATS.map((st, i) => (
              <div key={i} className="careers-v2-stat-item">
                <div className="careers-v2-stat-num">
                  <span className="careers-v2-stat-val" data-target={st.value}>
                    {st.value}
                  </span>
                  <span className="careers-v2-stat-suffix">{st.suffix}</span>
                </div>
                <div className="careers-v2-stat-label">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CareersHero;
