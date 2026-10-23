import { useEffect, useRef, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { FinalCta } from '@/components/sections/FinalCta';
import { Button } from '@/components/ui/Button';
import { Headline } from '@/components/ui/Headline';
import { LevelMarker } from '@/components/ui/LevelMarker';
import { usePageMeta } from '@/lib/seo/usePageMeta';
import { getMediaUrl } from '@/lib/media';

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

export function TeamPage() {
  const { team = [], company = {} } = useLoaderData();

  // Founder and Managing Director (Top: Left Image, Right Text)
  const founder = {
    name: 'Veerabhai Prajapati',
    role: 'Founder and Managing Director',
    photo:
      team.find((m) => m.name === 'Veerabhai Prajapati')?.photo ||
      company.founderPhoto ||
      'https://res.cloudinary.com/dwssynxlw/image/upload/v1765974599/vir-group/team/vir-group/team/veerabhai-1765974595862.jpg',
    quote: company.quote || 'Our strength lies in our unwavering commitment to quality, integrity, and the trust our customers place in us.',
    bio: 'With over three decades of pioneering experience, Veerabhai Prajapati founded VIR Group in 2013 on the principles of transparency, craftsmanship, and timeless quality. His visionary leadership continues to shape landmark residential developments across Mumbai, taking every project from the first architectural line to handover.',
  };

  // Partner (Bottom: Left Text, Right Image)
  const partner = {
    name: 'Tarun Prajapati',
    role: 'Partner',
    photo:
      team.find((m) => m.name === 'Tarun Prajapati')?.photo ||
      'https://res.cloudinary.com/dwssynxlw/image/upload/v1767848913/vir-group/team/vir-group/team/whatsapp-image-2026-01-08-at-1-1767848913713.jpg',
    bio: 'Championing strategic execution, operational excellence, and lasting partnerships, Tarun Prajapati brings dynamic hands-on leadership to VIR Group. He oversees project delivery, modern construction methodologies, and business synergies to steer the group towards a forward-looking future.',
  };

  // Core team members in the carousel (excluding the two key leaders)
  const coreTeam = team.filter(
    (m) => m.name !== 'Veerabhai Prajapati' && m.name !== 'Tarun Prajapati'
  );

  const [idx, setIdx] = useState(0);
  const [isSwapping, setIsSwapping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const cardRefs = useRef([]);
  const containerRef = useRef(null);
  const pointerStart = useRef({ x: null, y: null });
  const lastWheelTime = useRef(0);

  usePageMeta({
    title: 'Team | Leadership & Core Team',
    description: 'Meet the VIR Group team, led by founder Veerabhai Prajapati and partner Tarun Prajapati.',
    path: '/team',
  });

  const activeMember = coreTeam[idx] || coreTeam[0] || {};

  // Infinite wrap-around loop navigation
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

  const [isInView, setIsInView] = useState(false);
  const hasEnteredRef = useRef(false);

  // Detect when Core Team section enters/exits the viewport
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
      {
        threshold: 0.2,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-play loop: only starts after user scrolls to this section, with a short delay
  useEffect(() => {
    if (!isInView || isPaused || coreTeam.length <= 1) return;

    // "uske thode der bad": wait 3.5s before sliding
    const delay = hasEnteredRef.current ? 3500 : 3500;
    hasEnteredRef.current = true;

    const timer = setTimeout(() => {
      go(idx + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, isPaused, idx, coreTeam.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.querySelector('.overlay')?.classList.contains('is-open')) return;
      if (e.key === 'ArrowRight') go(idx + 1);
      if (e.key === 'ArrowLeft') go(idx - 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [idx, coreTeam.length]);

  // Horizontal trackpad gesture navigation
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

  // Touch / pointer swipe for mobile & tablets
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

  // Circular continuous card position styling
  const getCardStyle = (i) => {
    const n = coreTeam.length;
    if (n === 0) return {};

    // Relative circular forward distance (0 = active, 1..5 = queue right, n-1 = exiting left)
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
      // Exiting left
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
      // Visible right stack queue
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

  return (
    <>
      {/* 01: HERO SECTION WITH BACKGROUND IMAGE */}
      <section
        className="team-hero"
        data-theme="basalt"
        data-hero="true"
        aria-labelledby="leadership-heading"
      >
        <div className="team-hero-bg" aria-hidden="true">
          <img
            src={getMediaUrl('/media/careers-meeting.jpg')}
            alt=""
            className="team-hero-bg-img"
            loading="eager"
            fetchPriority="high"
          />
          <div className="team-hero-scrim" />
        </div>

        <div className="wrap team-hero-inner">
          <LevelMarker name="Leadership & Vision" />
          <Headline
            as="h1"
            id="leadership-heading"
            variant="display"
            lines={['Founders & Leadership.']}
            reveal={false}
          />
          <p className="team-hero-desc">
            Guided by decades of craftsmanship, ethical principles, and an enduring passion for redefining luxury living across Mumbai.
          </p>
          <p className="crumbs" style={{ marginTop: '24px', marginBottom: 0 }}>
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Team</span>
          </p>
        </div>
      </section>

      {/* 02: DISTINCT EXECUTIVE LEADERSHIP SECTION */}
      <section
        className="team-leadership-sec"
        data-theme="lime"
        aria-label="Executive Leadership"
      >
        <div className="team-leadership-inner">
          <div className="team-leadership-stack">
            {/* Top: Founder and Managing Director (Left Image, Right Name and Text) */}
            <article className="leader-feature leader-feature--image-left">
              <div className="leader-feature-media">
                <div className="leader-feature-frame">
                  <img
                    src={founder.photo}
                    alt={`${founder.name}, ${founder.role}`}
                    loading="eager"
                  />
                </div>
              </div>
              <div className="leader-feature-content">
                <span className="leader-feature-role">{founder.role}</span>
                <h2 className="leader-feature-name">{founder.name}</h2>
                {founder.quote && (
                  <blockquote className="leader-feature-quote">
                    “{founder.quote}”
                  </blockquote>
                )}
                <p className="leader-feature-bio">{founder.bio}</p>
              </div>
            </article>

            {/* Bottom: Partner (Left Name and Text, Right Image) */}
            <article className="leader-feature leader-feature--image-right">
              <div className="leader-feature-content">
                <span className="leader-feature-role">{partner.role}</span>
                <h2 className="leader-feature-name">{partner.name}</h2>
                <p className="leader-feature-bio">{partner.bio}</p>
              </div>
              <div className="leader-feature-media">
                <div className="leader-feature-frame">
                  <img
                    src={partner.photo}
                    alt={`${partner.name}, ${partner.role}`}
                    loading="eager"
                  />
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 02: CORE TEAM CAROUSEL SECTION */}
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

      <FinalCta
        tag="Join Our Team"
        lines={['Want to Be Part of', 'Something Amazing?']}
        description="We're always looking for talented individuals who share our passion for creating exceptional real estate experiences."
      >
        <Button href="/careers" variant="ghost">
          View Open Positions
        </Button>
        <Button href="/contact?subject=Careers" variant="solid">
          Contact HR
        </Button>
      </FinalCta>
    </>
  );
}
