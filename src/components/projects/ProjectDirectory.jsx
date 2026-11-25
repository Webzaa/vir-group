import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from '@/lib/animations/gsap';
import { getMediaUrl } from '@/lib/media';

// Project image mapping from public/media/projects/project-detail
const PROJECT_IMAGES = {
  'opportunity': '/media/projects/project-detail/opportunity.webp',
  'vir-paradise': '/media/projects/project-detail/paradise.png',
  'vir-vinayanand': '/media/projects/project-detail/vinayanand.png',
  'vir-grace': '/media/projects/project-detail/under-construction.webp',
  'vir-chandrapuri': '/media/projects/project-detail/under-construction.webp',
  'vir-sanket': '/media/projects/project-detail/under-construction.webp',
  'vir-enclave': '/media/projects/project-detail/VIR-Enclave.png',
  'global-residency': '/media/projects/project-detail/globli-residency.png',
  'vir-krishna-koyna': '/media/projects/project-detail/Krishna-Koyana.png',
  'surya-prakash': '/media/projects/project-detail/surya-prakash.png',
};

// Project status mapping requested by user
const PROJECT_STATUS_MAP = {
  'vir-enclave': 'completed',
  'vir-paradise': 'ongoing',
  'surya-prakash': 'ongoing',
  'vir-vinayanand': 'upcoming',
  'vir-grace': 'upcoming',
  'vir-chandrapuri': 'upcoming',
  'vir-sanket': 'upcoming',
  'opportunity': 'upcoming',
  'global-residency': 'completed',
  'vir-krishna-koyna': 'completed',
};

// Project floor count mapping requested by user
const PROJECT_FLOORS_MAP = {
  'vir-vinayanand': 7,
  'vir-grace': 16,
  'vir-chandrapuri': 14,
  'vir-sanket': 15,
  'vir-paradise': 22,
  'opportunity': 42,
  'vir-enclave': 17,
  'global-residency': 10,
  'vir-krishna-koyna': 10,
  'surya-prakash': 8,
};

// Default fallback projects matching directory brief
const DEFAULT_PROJECTS = [
  { slug: 'opportunity', name: 'Opportunity', area: 'Malad East', status: 'upcoming', configurations: ['1', '2', '3'], elevation: { floors: 42, towerWidth: 230 } },
  { slug: 'vir-paradise', name: 'VIR Paradise', area: 'Malad West', status: 'ongoing', configurations: ['1', '2', '3'], elevation: { floors: 22, towerWidth: 200 } },
  { slug: 'vir-vinayanand', name: 'VIR Vinayanand', area: 'Santacruz', status: 'upcoming', configurations: [], elevation: { floors: 7, towerWidth: 190 } },
  { slug: 'vir-grace', name: 'VIR Grace', area: 'Malad West', status: 'upcoming', configurations: [], elevation: { floors: 16, towerWidth: 210 } },
  { slug: 'vir-chandrapuri', name: 'VIR Chandrapuri', area: 'Malad East', status: 'upcoming', configurations: [], elevation: { floors: 14, towerWidth: 200 } },
  { slug: 'vir-sanket', name: 'VIR Sanket', area: 'Andheri East', status: 'upcoming', configurations: [], elevation: { floors: 15, towerWidth: 220 } },
  { slug: 'vir-enclave', name: 'VIR Enclave', area: 'Borivali West', status: 'completed', configurations: ['1', '2', '3'], elevation: { floors: 17, towerWidth: 270 } },
  { slug: 'global-residency', name: 'Global Residency', area: 'Goregaon East', status: 'completed', configurations: ['1', '2'], elevation: { floors: 10, towerWidth: 210 } },
  { slug: 'vir-krishna-koyna', name: 'VIR Krishna Koyna', area: 'Borivali West', status: 'completed', configurations: ['1', '2', '3'], elevation: { floors: 10, towerWidth: 300 } },
  { slug: 'surya-prakash', name: 'Surya Prakash', area: 'Vile Parle', status: 'ongoing', configurations: ['1', '2', '3'], elevation: { floors: 8, towerWidth: 180 } },
];

const STATUS_TEXT = {
  ongoing: 'Ongoing',
  completed: 'Completed',
  upcoming: 'Upcoming',
};

export function ProjectDirectory({ items = [] }) {
  const navigate = useNavigate();
  const rootRef = useRef(null);
  const cardRef = useRef(null);

  // Normalize project list with user defined statuses and floor counts
  const allProjects = (items && items.length > 0 ? items : DEFAULT_PROJECTS).map((p) => {
    const status = PROJECT_STATUS_MAP[p.slug] || p.status || 'ongoing';
    const floors = PROJECT_FLOORS_MAP[p.slug] || p.elevation?.floors || p.floors || 14;
    return {
      slug: p.slug,
      name: p.name,
      area: p.area,
      status: status,
      configurations: p.configurations || [],
      floors: floors,
      towerWidth: p.elevation?.towerWidth || p.towerWidth || 200,
      img: getMediaUrl(PROJECT_IMAGES[p.slug] || p.hero?.src || '/media/projects-hero-bg.jpg'),
    };
  });

  const [filter, setFilter] = useState('all');
  const [activeSlug, setActiveSlug] = useState(allProjects[0]?.slug || 'opportunity');
  const [bgIndex, setBgIndex] = useState(0); // 0 = bgA active, 1 = bgB active
  const [bgA, setBgA] = useState(allProjects[0]?.img || '');
  const [bgB, setBgB] = useState('');
  const [hoverProject, setHoverProject] = useState(null);
  const [previewProject, setPreviewProject] = useState(allProjects[0] || null);

  const popupRef = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);

  useEffect(() => {
    if (popupRef.current) {
      xTo.current = gsap.quickTo(popupRef.current, 'x', { duration: 0.35, ease: 'power3.out' });
      yTo.current = gsap.quickTo(popupRef.current, 'y', { duration: 0.35, ease: 'power3.out' });
    }
  }, []);

  const handleListMouseMove = (e) => {
    if (!xTo.current || !yTo.current) return;
    const popupWidth = 320;
    const popupHeight = 210;
    let targetX = e.clientX + 24;
    let targetY = e.clientY - popupHeight / 2;

    if (targetX + popupWidth > window.innerWidth - 20) {
      targetX = e.clientX - popupWidth - 24;
    }
    if (targetY < 20) targetY = 20;
    if (targetY + popupHeight > window.innerHeight - 20) {
      targetY = window.innerHeight - popupHeight - 20;
    }

    xTo.current(targetX);
    yTo.current(targetY);
  };

  const filteredProjects = allProjects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'ongoing') return p.status === 'ongoing';
    if (filter === 'completed') return p.status === 'completed' || p.status === 'available' || p.status === 'ready';
    if (filter === 'upcoming') return p.status === 'upcoming';
    return true;
  });

  const activeProject = allProjects.find((p) => p.slug === activeSlug) || allProjects[0];

  const formatConfig = (p) => {
    if (!p.configurations || !p.configurations.length) return 'Configurations on request';
    return p.configurations.join(', ') + ' BHK';
  };

  const formatFloors = (p) => {
    if (p.slug === 'opportunity') return 'G+42 floors';
    if (p.slug === 'vir-paradise') return 'G+21 floors';
    if (p.slug === 'global-residency') return 'G+9 floors';
    return `${p.floors} floors`;
  };

  const handleHot = (p) => {
    if (!p || p.slug === activeSlug) return;
    setActiveSlug(p.slug);

    // Crossfade background
    if (bgIndex === 0) {
      setBgB(p.img);
      setBgIndex(1);
    } else {
      setBgA(p.img);
      setBgIndex(0);
    }

    // GSAP animate card content
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current.children,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
      );
    }
  };

  // Initial skyline towers entrance animation
  useEffect(() => {
    if (rootRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.proj-dir-wrap .tw',
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: 'power3.out',
            clearProps: 'all',
          }
        );
      }, rootRef);
      return () => ctx.revert();
    }
  }, []);

  const svgWidth = Math.max(1000, allProjects.length * 115);
  const gap = svgWidth / allProjects.length;

  return (
    <>
      {/* 1. FIRST SECTION: HERO SKYLINE WITH ALL TOWERS PERSISTENTLY VISIBLE */}
      <section ref={rootRef} className="proj-dir-wrap" id="dir" data-theme="basalt" data-hero="true" aria-label="Projects skyline directory">
      {/* Background image crossfade layers */}
      <i
        className={`bgx ${bgIndex === 0 ? 'on' : ''}`}
        style={{ backgroundImage: `url(${bgA})` }}
        aria-hidden="true"
      />
      <i
        className={`bgx ${bgIndex === 1 ? 'on' : ''}`}
        style={{ backgroundImage: `url(${bgB})` }}
        aria-hidden="true"
      />
      <div className="shade" aria-hidden="true" />
      {/* Title & metadata */}
      <p className="mi">VIR Group · Mumbai · {allProjects.length} residential projects</p>
      <h1>
        Pick a tower.<br />
        <em>Step inside.</em>
      </h1>
      <p className="crumbs" style={{ marginTop: '14px', marginBottom: 0 }}>
        <Link to="/">Home</Link>
        <span>/</span>
        <span>Projects</span>
      </p>

      {/* Interactive Skyline SVG - All towers with clean spacing, 3D depth, and shadows */}
      <svg
        id="sky"
        viewBox={`0 0 ${svgWidth} 415`}
        role="group"
        aria-label="Skyline of VIR Group projects. Select a tower to open it."
      >
        <defs>
          <filter id="tw-shadow" x="-30%" y="-20%" width="160%" height="150%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.85" />
          </filter>
          <filter id="tw-glow" x="-40%" y="-30%" width="180%" height="170%">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000000" floodOpacity="0.95" />
            <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#c9aa7e" floodOpacity="0.75" />
          </filter>
          <linearGradient id="tw-glass-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(24, 36, 64, 0.85)" />
            <stop offset="100%" stopColor="rgba(8, 14, 28, 0.92)" />
          </linearGradient>
          <linearGradient id="tw-hot-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(201, 170, 126, 0.45)" />
            <stop offset="100%" stopColor="rgba(20, 28, 48, 0.92)" />
          </linearGradient>
        </defs>

        {allProjects.map((p, i) => {
          const rawW = p.towerWidth * 0.28;
          const w = Math.min(74, Math.max(56, rawW));
          const h = 100 + (p.floors / 42) * 235;
          const floorStep = h / p.floors;
          const x = gap * i + gap / 2 - w / 2;
          const y = 360 - h;
          const isHot = p.slug === activeSlug;

          const lines = [];
          for (let k = 1; k < p.floors; k++) {
            lines.push(
              <line
                key={k}
                className="f"
                x1={x}
                x2={x + w}
                y1={y + k * floorStep}
                y2={y + k * floorStep}
              />
            );
          }

          return (
            <g key={p.slug} className={`tw ${isHot ? 'hot' : ''}`} tabIndex={0} role="button" aria-label={`${p.name}, ${p.area}`} onMouseEnter={() => handleHot(p)} onFocus={() => handleHot(p)} onClick={() => { handleHot(p); navigate(`/projects/${p.slug}`); }} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleHot(p); navigate(`/projects/${p.slug}`); } }}
            >
              <rect className="tw-hitbox" x={gap * i} y={0} width={gap} height={415} fill="transparent" style={{ pointerEvents: 'all', cursor: 'pointer' }} />
              <rect className="b" x={x} y={y} width={w} height={h} rx="3" filter={isHot ? 'url(#tw-glow)' : 'url(#tw-shadow)'} fill={isHot ? 'url(#tw-hot-grad)' : 'url(#tw-glass-grad)'} />
              {lines}
              <circle className="pin" cx={x + w / 2} cy={y - 14} r="3.5" />
              <circle className="pr" cx={x + w / 2} cy={y - 14} r="3.5" />
              {(() => {
                const rawName = p.shortName || p.name.replace(/^Codename\s+/i, '').replace(/^VIR\s+/i, '').trim();
                const parts = rawName.split(/\s+/);
                const cx = x + w / 2;
                if (parts.length > 1) {
                  return (
                    <text x={cx} y="377">
                      <tspan x={cx} dy="0">{parts[0]}</tspan>
                      <tspan x={cx} dy="13">{parts.slice(1).join(' ')}</tspan>
                    </text>
                  );
                }
                return (
                  <text x={cx} y="384">
                    {parts[0]}
                  </text>
                );
              })()}
            </g>
          );
        })}
        <line x1="0" x2={svgWidth} y1="360" y2="360" stroke="rgba(241,237,229,.45)" strokeWidth="1.5" />
      </svg>

      {/* Active Project Card */}
      <div ref={cardRef} className="card" aria-live="polite">
        <div>
          <span className="mi">
            {activeProject.area} · {STATUS_TEXT[activeProject.status] || activeProject.status}
          </span>
          <h3>{activeProject.name}</h3>
          {/* BHK and floor display commented out for upcoming projects as requested */}
          {/* {!['vir-grace', 'vir-chandrapuri', 'vir-sanket'].includes(activeProject.slug) && (
            <span className="mi" style={{ color: 'var(--mute)' }}>
              {formatConfig(activeProject)} · {formatFloors(activeProject)}
            </span>
          )} */}
          {!['vir-grace', 'vir-chandrapuri', 'vir-sanket'].includes(activeProject.slug) && (
            <span className="mi" style={{ color: 'var(--mute)' }}>
              {formatConfig(activeProject)} · {formatFloors(activeProject)}
            </span>
          )}
        </div>
        <Link to={`/projects/${activeProject.slug}`} className="go mi">
          Enter project →
        </Link>
      </div>
    </section>

    {/* 2. SECOND SECTION: CLEAN LIST WITH ALL, ONGOING, COMPLETED, UPCOMING TABS */}
    <section
      className="proj-dir-list-sec"
      data-theme="lime"
      aria-label="Projects directory list"
      onMouseMove={handleListMouseMove}
      onMouseLeave={() => setHoverProject(null)}
    >
      <div className="proj-dir-list-in">
        {/* Filter Tabs placed nicely in the list section */}
        <div className="proj-dir-list-header">
          <div className="proj-dir-list-chips" role="group" aria-label="Filter projects">
            {[
              ['all', 'All Projects'],
              ['ongoing', 'Ongoing'],
              ['completed', 'Completed'],
              ['upcoming', 'Upcoming'],
            ].map(([f, label]) => (
              <button
                key={f}
                type="button"
                className={`chip mi ${filter === f ? 'on' : ''}`}
                onClick={() => setFilter(f)}
              >
                {label}
              </button>
            ))}
          </div>
          <span className="proj-dir-count mi" style={{ color: '#8c857b', fontSize: '0.8rem', letterSpacing: '0.15em' }}>
            {filteredProjects.length} OF {allProjects.length} PROJECTS
          </span>
        </div>

        <ol className="rows">
          {filteredProjects.map((p, i) => {
            const isHot = p.slug === activeSlug;
            return (
              <li key={p.slug}>
                <button
                  type="button"
                  className={isHot ? 'hot' : ''}
                  onMouseEnter={(e) => {
                    handleHot(p);
                    setHoverProject(p);
                    setPreviewProject(p);
                    handleListMouseMove(e);
                  }}
                  onMouseLeave={() => setHoverProject(null)}
                  onFocus={() => { handleHot(p); setHoverProject(p); setPreviewProject(p); }}
                  onClick={() => { handleHot(p); navigate(`/projects/${p.slug}`); }}
                >
                  <span className="n mi">{String(i + 1).padStart(2, '0')}</span>
                  <div className="proj-row-content">
                    <span className="t">{p.name}</span>
                    <div className="proj-mobile-meta">
                      <span className="c mi">{p.area}</span>
                      <span className="proj-meta-sep" aria-hidden="true">•</span>
                      <span className="status-pill mi">{STATUS_TEXT[p.status] || p.status}</span>
                    </div>
                  </div>
                  <span className="c mi proj-desktop-col">{p.area}</span>
                  <span className="status-pill mi proj-desktop-col">{STATUS_TEXT[p.status] || p.status}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Floating Hover Project Image Preview Popup */}
      <div
        ref={popupRef}
        className={`proj-hover-popup ${hoverProject ? 'is-visible' : ''}`}
        aria-hidden="true"
      >
        {previewProject && (
          <div className="proj-hover-popup-inner">
            <img
              src={previewProject.img}
              alt={previewProject.name}
              className="proj-hover-popup-img"
              loading="eager"
            />
            <div className="proj-hover-popup-overlay">
              <span className="mi">{previewProject.area}</span>
              <h4>{previewProject.name}</h4>
            </div>
          </div>
        )}
      </div>
    </section>
  </>
  );
}
