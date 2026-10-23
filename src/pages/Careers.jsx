import React, { useState, useMemo, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLoaderData } from 'react-router-dom';
import { usePageMeta } from '@/lib/seo/usePageMeta';
import { getMediaUrl } from '@/lib/media';
import { RevealController } from '@/components/animation/RevealController';
import { useGSAP, gsap } from '@/lib/animations/gsap';
import { CareerForm } from '@/components/forms/CareerForm';

// --- DATA DEFINITION ---
const STATS = [
  { value: 1.5, suffix: ' Lakh +', label: 'SQFT Built' },
  { value: 27, suffix: ' Lakh', label: 'SQFT Ongoing' },
  { value: 100, suffix: '+', label: 'Happy Families' },
  { value: 13, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '%', label: 'Customer Satisfaction' },
];

const PERKS = [
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

// Mobile slider: 2 perks per slide
const PERK_SLIDES = [];
for (let i = 0; i < PERKS.length; i += 2) {
  PERK_SLIDES.push(PERKS.slice(i, i + 2));
}

const DEPARTMENTS = [
  { name: 'All Departments', key: 'All', icon: 'grid' },
  { name: 'Sales & Marketing', key: 'Sales & Marketing', icon: 'sales' },
  { name: 'Engineering', key: 'Engineering', icon: 'engineering' },
  { name: 'Design', key: 'Design', icon: 'design' },
  { name: 'Projects', key: 'Projects', icon: 'projects' },
  { name: 'Finance & Accounts', key: 'Finance & Accounts', icon: 'finance' },
  { name: 'Human Resources', key: 'Human Resources', icon: 'hr' },
  { name: 'Internships', key: 'Internships', icon: 'internships' },
];

const POSITIONS = [
  {
    id: 'sales-manager',
    title: 'Senior Sales Manager',
    department: 'Sales & Marketing',
    location: 'Mumbai',
    experience: '5-8 years',
    type: 'Full Time',
    description: 'Lead our sales team and drive revenue growth across residential projects.',
  },
  {
    id: 'marketing-exec',
    title: 'Marketing Executive',
    department: 'Sales & Marketing',
    location: 'Mumbai',
    experience: '2-4 years',
    type: 'Full Time',
    description: 'Create compelling marketing campaigns and manage digital presence.',
  },
  {
    id: 'civil-engineer',
    title: 'Civil Engineer',
    department: 'Engineering',
    location: 'Mumbai',
    experience: '3-6 years',
    type: 'Full Time',
    description: 'Oversee construction projects and ensure quality standards.',
  },
  {
    id: 'interior-designer',
    title: 'Interior Designer',
    department: 'Design',
    location: 'Mumbai',
    experience: '2-5 years',
    type: 'Full Time',
    description: 'Design stunning interiors for residential and commercial spaces.',
  },
  {
    id: 'project-manager',
    title: 'Project Manager',
    department: 'Projects',
    location: 'Mumbai',
    experience: '5-7 years',
    type: 'Full Time',
    description: 'Manage end-to-end project execution and client relationships.',
  },
  {
    id: 'accounts-manager',
    title: 'Accounts Manager',
    department: 'Finance & Accounts',
    location: 'Mumbai',
    experience: '3-5 years',
    type: 'Full Time',
    description: 'Handle financial operations, reporting, and compliance.',
  },
  {
    id: 'hr-executive',
    title: 'HR Executive',
    department: 'Human Resources',
    location: 'Mumbai',
    experience: '2-4 years',
    type: 'Full Time',
    description: 'Manage talent acquisition, employee onboarding, and people culture.',
  },
  {
    id: 'architecture-intern',
    title: 'Architecture Intern',
    department: 'Internships',
    location: 'Mumbai',
    experience: '0-1 years',
    type: 'Internship',
    description: 'Learn from experienced architects and work on live residential projects.',
  },
  {
    id: 'bizdev-exec',
    title: 'Business Development Executive',
    department: 'Sales & Marketing',
    location: 'Mumbai',
    experience: '1-3 years',
    type: 'Full Time',
    description: 'Identify new business opportunities and build client relationships.',
  },
  {
    id: 'site-supervisor',
    title: 'Site Supervisor',
    department: 'Engineering',
    location: 'Mumbai',
    experience: '2-5 years',
    type: 'Full Time',
    description: 'Supervise on-ground construction activities, materials and safety protocol.',
  },
  {
    id: 'planning-engineer',
    title: 'Project Planning Engineer',
    department: 'Projects',
    location: 'Mumbai',
    experience: '3-6 years',
    type: 'Full Time',
    description: 'Coordinate project schedules, material procurement and milestone tracking.',
  },
  {
    id: 'marketing-intern',
    title: 'Digital Marketing Intern',
    department: 'Internships',
    location: 'Mumbai',
    experience: '0-1 years',
    type: 'Internship',
    description: 'Assist with social media campaigns, content creation and brand communications.',
  },
];

function DeptIcon({ type }) {
  switch (type) {
    case 'sales':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m3 11 18-5v12L3 14v-3z" />
          <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
        </svg>
      );
    case 'engineering':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case 'design':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="m4.93 4.93 4.24 4.24" />
          <path d="m14.83 9.17 4.24-4.24" />
          <path d="m14.83 14.83 4.24 4.24" />
          <path d="m9.17 14.83-4.24 4.24" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
    case 'projects':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case 'finance':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <line x1="3" x2="21" y1="9" y2="9" />
          <line x1="9" x2="9" y1="21" y2="9" />
        </svg>
      );
    case 'hr':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case 'internships':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    default:
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="7" height="7" x="3" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="14" rx="1" />
          <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
      );
  }
}

export function Careers() {
  const { company = {} } = useLoaderData() || {};

  usePageMeta({
    title: 'Careers | Join Our Team | VIR Group Mumbai',
    description: "Build your career with VIR Group. Be part of a legacy that's been transforming Mumbai's skyline for over 50 years. View open positions in Sales, Engineering, Architecture, and Management.",
    path: '/careers',
  });

  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [modalJob, setModalJob] = useState(null); // When open, holds job or { title: 'General Application' }

  // Mobile department dropdown
  const [deptOpen, setDeptOpen] = useState(false);
  const deptDropRef = useRef(null);

  // Perks swipe slider (mobile)
  const perksRef = useRef(null);
  const [perkSlide, setPerkSlide] = useState(0);
  const perkSlides = PERK_SLIDES.length; // 2 cards per slide

  useEffect(() => {
    if (modalJob) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [modalJob]);

  // Close dept dropdown on outside tap/click or Escape
  useEffect(() => {
    if (!deptOpen) return;
    const onDown = (e) => {
      if (deptDropRef.current && !deptDropRef.current.contains(e.target)) {
        setDeptOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setDeptOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [deptOpen]);

  const heroStatsRef = useRef(null);
  const containerRef = useRef(null);

  // Department counts calculated dynamically
  const deptCounts = useMemo(() => {
    const counts = { All: POSITIONS.length };
    POSITIONS.forEach((pos) => {
      counts[pos.department] = (counts[pos.department] || 0) + 1;
    });
    return counts;
  }, []);

  const activeDept = DEPARTMENTS.find((d) => d.key === selectedDept) || DEPARTMENTS[0];

  // Filtered positions
  const filteredPositions = useMemo(() => {
    return POSITIONS.filter((pos) => {
      const matchSearch =
        !search.trim() ||
        pos.title.toLowerCase().includes(search.toLowerCase()) ||
        pos.description.toLowerCase().includes(search.toLowerCase()) ||
        pos.department.toLowerCase().includes(search.toLowerCase());
      const matchDept = selectedDept === 'All' || pos.department === selectedDept;
      const matchType = selectedType === 'All' || pos.type.toLowerCase() === selectedType.toLowerCase();
      const matchLoc = selectedLocation === 'All' || pos.location.toLowerCase().includes(selectedLocation.toLowerCase());
      return matchSearch && matchDept && matchType && matchLoc;
    });
  }, [search, selectedDept, selectedType, selectedLocation]);

  // GSAP Counter Animation
  useGSAP(
    () => {
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
    },
    { scope: containerRef }
  );

  const handleApplyClick = (job) => {
    setModalJob(job);
  };

  const scrollToPositions = () => {
    const el = document.getElementById('open-positions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    <div ref={containerRef} className="careers-v2-page">
      {/* ── 1. HERO SECTION ── */}
      <section className="careers-v2-hero" data-theme="basalt" data-hero="true" aria-labelledby="careers-hero-title">
        {/* Full Bleed Background Image & Scrim */}
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
          {/* Left Text Column */}
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
                onClick={scrollToPositions}
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

        {/* Bottom Stats Bar */}
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

      {/* ── 2. WHY JOIN US SECTION ── */}
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

          {/* Desktop: grid | Mobile: swipe slider, 2 cards per slide */}
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

          {/* Dots (mobile only) */}
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

      {/* ── 3. OPEN POSITIONS SECTION ── */}
      <section className="careers-v2-roles-sec" data-theme="white" id="open-positions" aria-labelledby="open-positions-title">
        <div className="wrap">
          <div className="careers-v2-roles-header">
            <div>
              <span className="careers-v2-micro-tag">OPEN POSITIONS</span>
              <h2 id="open-positions-title" className="careers-v2-sec-title">
                Find Your Perfect Role
              </h2>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="careers-v2-filter-bar">
            <div className="careers-v2-search-input-wrap">
              <svg className="careers-v2-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search job title, skills or keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="careers-v2-search-input"
                aria-label="Search job title, skills or keywords"
              />
              {search && (
                <button
                  type="button"
                  className="careers-v2-search-clear"
                  onClick={() => setSearch('')}
                >
                  ✕
                </button>
              )}
            </div>

            <div className="careers-v2-selects-group">
              {/* Department select: hidden on mobile (custom dropdown below replaces it) */}
              <div className="careers-v2-select-field careers-v2-select-field--dept">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  aria-label="Filter by department"
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d.key} value={d.key}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="careers-v2-select-field">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  aria-label="Filter by type"
                >
                  <option value="All">All Types</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="careers-v2-select-field">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  aria-label="Filter by location"
                >
                  <option value="All">All Locations</option>
                  <option value="Mumbai">Mumbai</option>
                </select>
              </div>
            </div>
          </div>

          {/* Layout: Left Sidebar Categories + Right Job Cards */}
          <div className="careers-v2-layout">
            {/* Left Sidebar */}
            <aside className="careers-v2-sidebar">
              {/* Desktop: original list */}
              <div className="careers-v2-dept-list careers-v2-dept-list--desktop">
                {DEPARTMENTS.map((dept) => {
                  const isActive = selectedDept === dept.key;
                  const count = deptCounts[dept.key] || 0;
                  return (
                    <button
                      key={dept.key}
                      type="button"
                      onClick={() => setSelectedDept(dept.key)}
                      className={`careers-v2-dept-item ${isActive ? 'is-active' : ''}`}
                    >
                      <span className="careers-v2-dept-icon">
                        <DeptIcon type={dept.icon} />
                      </span>
                      <span className="careers-v2-dept-name">{dept.name}</span>
                      <span className="careers-v2-dept-badge">{count}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile: dropdown */}
              <div className="careers-v2-dept-dropdown" ref={deptDropRef}>
                <button
                  type="button"
                  className={`careers-v2-dept-trigger ${deptOpen ? 'is-open' : ''}`}
                  onClick={() => setDeptOpen((o) => !o)}
                  aria-haspopup="listbox"
                  aria-expanded={deptOpen}
                >
                  <span className="careers-v2-dept-icon">
                    <DeptIcon type={activeDept.icon} />
                  </span>
                  <span className="careers-v2-dept-name">{activeDept.name}</span>
                  <span className="careers-v2-dept-badge">{deptCounts[activeDept.key] || 0}</span>
                  <svg
                    className="careers-v2-dept-chevron"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {deptOpen && (
                  <ul className="careers-v2-dept-menu" role="listbox">
                    {DEPARTMENTS.map((dept) => {
                      const isActive = selectedDept === dept.key;
                      return (
                        <li key={dept.key} role="option" aria-selected={isActive}>
                          <button
                            type="button"
                            className={`careers-v2-dept-option ${isActive ? 'is-active' : ''}`}
                            onClick={() => {
                              setSelectedDept(dept.key);
                              setDeptOpen(false);
                            }}
                          >
                            <span className="careers-v2-dept-icon">
                              <DeptIcon type={dept.icon} />
                            </span>
                            <span className="careers-v2-dept-name">{dept.name}</span>
                            <span className="careers-v2-dept-badge">{deptCounts[dept.key] || 0}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </aside>

            {/* Right Job Listings */}
            <main className="careers-v2-content">
              <div className="careers-v2-results-count">
                Showing <strong>{filteredPositions.length}</strong> of <strong>{POSITIONS.length}</strong> positions
              </div>

              <div className="careers-v2-job-list">
                {filteredPositions.length > 0 ? (
                  filteredPositions.map((job) => (
                    <div key={job.id} className="careers-v2-job-card">
                      <div className="careers-v2-job-card-main">
                        <div className="careers-v2-job-left-icon">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                            <rect width="18" height="18" x="3" y="3" rx="2" />
                            <path d="M3 9h18" />
                            <path d="M9 21V9" />
                          </svg>
                        </div>

                        <div className="careers-v2-job-info">
                          <div className="careers-v2-job-title-row">
                            <h3 className="careers-v2-job-title">{job.title}</h3>
                            <span className="careers-v2-type-pill">{job.type}</span>
                          </div>
                          <div className="careers-v2-job-meta">
                            <span className="careers-v2-meta-tag">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                <circle cx="12" cy="10" r="3" />
                              </svg>
                              {job.location}
                            </span>
                            <span className="careers-v2-meta-tag">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              {job.experience}
                            </span>
                          </div>
                          <p className="careers-v2-job-desc">{job.description}</p>
                        </div>
                      </div>

                      <div className="careers-v2-job-btn-wrap">
                        <button type="button" onClick={() => handleApplyClick(job)} className="careers-v2-apply-btn">
                          <span>Apply Now</span>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="careers-v2-empty">
                    <p>No positions matching your current search or filters.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearch('');
                        setSelectedDept('All');
                        setSelectedType('All');
                        setSelectedLocation('All');
                      }}
                      className="careers-v2-reset-btn"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* ── 4. MORE THAN JUST A WORKPLACE (OUR PEOPLE) ── */}
      <section className="careers-v2-workplace-sec" data-theme="lime" aria-labelledby="workplace-title">
        <div className="wrap">
          <div className="careers-v2-workplace-grid">
            {/* Left Content */}
            <div className="careers-v2-workplace-content">
              <span className="careers-v2-micro-tag">OUR PEOPLE</span>
              <h2 id="workplace-title" className="careers-v2-sec-title">
                More Than Just a Workplace
              </h2>
              <p className="careers-v2-workplace-text">
                At VIR Group, you'll be part of a passionate team that values collaboration, innovation, and making a positive impact on communities.
              </p>

              <div className="careers-v2-workplace-action">
                <button
                  type="button"
                  onClick={scrollToPositions}
                  className="careers-v2-btn-dark"
                >
                  <span>Life at VIR Group</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>

              {/* 3 Badges */}
              <div className="careers-v2-badges-row">
                <div className="careers-v2-badge-pill">
                  <span className="careers-v2-badge-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                    </svg>
                  </span>
                  <span>Collaborative Culture</span>
                </div>

                <div className="careers-v2-badge-pill">
                  <span className="careers-v2-badge-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                      <path d="M2 12h20" />
                    </svg>
                  </span>
                  <span>Diverse Opportunities</span>
                </div>

                <div className="careers-v2-badge-pill">
                  <span className="careers-v2-badge-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </span>
                  <span>Meaningful Impact</span>
                </div>
              </div>
            </div>

            {/* Right Photo Mosaic */}
            <div className="careers-v2-mosaic">
              <div className="careers-v2-mosaic-main">
                <img
                  src={getMediaUrl('/media/careers-team.jpg')}
                  alt="VIR Group Team Collaboration"
                  loading="lazy"
                  className="careers-v2-mosaic-img"
                />
              </div>
              <div className="careers-v2-mosaic-stack">
                <div className="careers-v2-mosaic-item">
                  <img
                    src={getMediaUrl('/media/careers-lounge.jpg')}
                    alt="VIR Group Office Lobby & Reception"
                    loading="lazy"
                    className="careers-v2-mosaic-img"
                  />
                </div>
                <div className="careers-v2-mosaic-item">
                  <img
                    src={getMediaUrl('/media/careers-meeting.jpg')}
                    alt="Executive Boardroom Conference"
                    loading="lazy"
                    className="careers-v2-mosaic-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. DON'T SEE YOUR ROLE? (CTA BANNER) ── */}
      <section className="careers-v2-cta-sec" data-theme="basalt" aria-labelledby="cta-role-title">
        <div className="careers-v2-cta-bg" aria-hidden="true">
          <img
            src={getMediaUrl('/media/projects-hero-bg.jpg')}
            alt=""
            className="careers-v2-cta-bg-img"
            loading="lazy"
          />
          <div className="careers-v2-cta-scrim" />
        </div>
        <div className="wrap careers-v2-cta-wrap">
          <div className="careers-v2-cta-text">
            <span className="careers-v2-cta-tag">READY TO BUILD YOUR FUTURE?</span>
            <h2 id="cta-role-title" className="careers-v2-cta-title">
              Don't See Your Role?
            </h2>
            <p className="careers-v2-cta-sub">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <button
              type="button"
              onClick={() => handleApplyClick({ title: 'General Application' })}
              className="careers-v2-btn-white"
            >
              <span>Send Your Resume</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── 6. APPLICATION MODAL (Teleported to body so it never hides behind navbar) ── */}
      {modalJob &&
        createPortal(
          <div
            className="careers-v2-modal-backdrop"
            onClick={() => setModalJob(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="careers-v2-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="careers-v2-modal-close"
                onClick={() => setModalJob(null)}
                aria-label="Close modal"
              >
                ✕
              </button>

              <CareerForm
                job={modalJob}
                onClose={() => setModalJob(null)}
              />
            </div>
          </div>,
          document.body
        )}

      <RevealController />
    </div>
  );
}

export default Careers;