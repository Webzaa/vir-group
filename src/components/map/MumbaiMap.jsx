import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap, useGSAP, ScrollTrigger, REFRESH } from '@/lib/animations/gsap';
import { getMediaUrl } from '@/lib/media';

/**
 * ============================================================================
 * SECTION COMPONENT: 06 MUMBAI PRESENCE (REAL PROJECT LOCATIONS ON MAP)
 * ============================================================================
 * Features:
 * - 1 single permanent background Google Map embed (never reloads on scroll)
 * - 7 Real Project Location Pointers accurately mapped with verified coordinates
 * - Verified Google Maps embed URLs for each of the 7 developments
 * - Pinned GSAP ScrollTrigger zooming & panning directly to each location
 * - Active marker scale zoom (1.36x), multi-ring radar pulses, and rich tooltips
 * - Luxury glassmorphic HUD card with direct link and live Google Map modal
 * ============================================================================
 */

// Official VIR Group Headquarters / Mumbai Western Suburbs Corridor Base Map Image
const MUMBAI_MAP_IMG = getMediaUrl('/media/Mumbai-map.webp');

// 7 Verified VIR Group developments with coordinates matching Mumbai-map.webp
const MUMBAI_PROJECTS = [
  {
    index: '01',
    slug: 'vir-enclave',
    name: 'VIR Enclave',
    area: 'Borivali West',
    config: '1, 2 and 3 BHK Homes',
    status: 'Completed',
    type: 'Luxury Residences',
    badge: 'North Suburbs Corridor',
    image: '/media/projects/project-detail/VIR-Enclave.png',
    x: '41.8%',
    y: '6.8%',
    focusX: 41.8,
    focusY: 12.8,
    mobileX: '17.8%',
    mobileY: '13%',
    mobileFocusX: 26.8,
    mobileFocusY: 13.8,
    desc: 'Bespoke residences nestled in the vibrant neighborhood of Borivali West with premium amenities.',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.338218739854!2d72.8423567742557!3d19.224086147308817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b1000a3e6001%3A0xd294fd9cb1c0caa9!2sVir%20Enclave%20By%20Vir%20Group!5e0!3m2!1sen!2sin!4v1791272691392!5m2!1sen!2sin',
  },
  {
    index: '02',
    slug: 'vir-krishna-koyna',
    name: 'VIR Krishna Koyna',
    area: 'Mankhurd',
    config: '1, 2 and 3 BHK Homes',
    status: 'Completed',
    type: 'Modern Residences',
    badge: 'Shimpoli Connectivity',
    image: '/media/projects/project-detail/Krishna-Koyana.png',
    x: '49.6%',
    y: '9.8%',
    focusX: 49.6,
    focusY: 15.8,
    mobileX: '49%',
    mobileY: '16.2%',
    mobileFocusX: 54.5,
    mobileFocusY: 17.2,
    desc: 'Thoughtfully crafted living spaces combining modern architecture with peaceful suburban comfort.',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.342674857535!2d72.8425981242556!3d19.223891797314913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b1058b457809%3A0x1b55d3616bdc6da3!2sKrishna%20Koyna!5e0!3m2!1sen!2sin!4v1791272762385!5m2!1sen!2sin',
  },
  {
    index: '03',
    slug: 'vir-paradise',
    name: 'VIR Paradise',
    area: 'Malad West',
    config: '1 & 2 BHK Residences',
    status: 'Ongoing',
    type: 'Flagship Development',
    badge: 'Link Road & Metro Hub',
    image: '/media/projects/project-detail/paradise.png',
    x: '42.6%',
    y: '33.2%',
    focusX: 42.6,
    focusY: 36.2,
    mobileX: '23.2%',
    mobileY: '36%',
    mobileFocusX: 30.2,
    mobileFocusY: 41.6,
    desc: 'An iconic upcoming landmark near Malad Link Road offering contemporary lifestyle amenities.',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.2420076269514!2d72.84492517425461!3d19.184629348555127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b700157ea951%3A0xbfd8cf3b5dec10eb!2sVIR%20Paradise!5e0!3m2!1sen!2sin!4v1791272806458!5m2!1sen!2sin',
  },
  {
    index: '04',
    slug: 'opportunity',
    name: 'Opportunity',
    area: 'Malad East',
    config: 'Prime Commercial & Retail',
    status: 'Upcoming',
    type: 'Commercial Hub',
    badge: 'Western Express Highway',
    image: '/media/projects/project-detail/opportunity.webp',
    x: '46.9%',
    y: '33.2%',
    focusX: 46.9,
    focusY: 36.2,
    mobileX: '39.2%',
    mobileY: '36%',
    mobileFocusX: 45.2,
    mobileFocusY: 41.6,
    desc: 'Grade-A commercial and retail destination directly connecting to the Western Express Highway.',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15072.962082248549!2d72.83720033065583!3d19.184694333623547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7b834ff28e9%3A0x9f6fd34672620c06!2sVIR%20GROUP!5e0!3m2!1sen!2sin!4v1791272886115!5m2!1sen!2sin',
  },
  {
    index: '05',
    slug: 'global-residency',
    name: 'Global Residency',
    area: 'Goregaon East',
    config: '1 and 2 BHK Homes',
    status: 'Completed',
    type: 'Scenic Living',
    badge: 'Aarey Green Views',
    image: '/media/projects/project-detail/globli-residency.png',
    x: '42.2%',
    y: '51.8%',
    focusX: 42.2,
    focusY: 51.8,
    mobileX: '20%',
    mobileY: '50%',
    mobileFocusX: 28.2,
    mobileFocusY: 58.6,
    desc: 'Overlooking lush green expanses, Global Residency harmonizes nature with rapid urban transit.',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.693298248183!2d72.85397557425415!3d19.164898049177516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b70ce63ba081%3A0x2df6efe0a4fc009d!2sGlobal%20Residency!5e0!3m2!1sen!2sin!4v1791272930134!5m2!1sen!2sin',
  },
  {
    index: '06',
    slug: 'surya-prakash',
    name: 'Surya Prakash',
    area: 'Vile Parle',
    config: '1, 2 and 3 BHK Homes',
    status: 'Ongoing',
    type: 'Redevelopment Landmark',
    badge: 'Parle Cultural Hub',
    image: '/media/projects/project-detail/surya-prakash.png',
    x: '43.6%',
    y: '90.8%',
    focusX: 43.6,
    focusY: 84.8,
    mobileX: '27%',
    mobileY: '85%',
    mobileFocusX: 36.8,
    mobileFocusY: 75.6,
    desc: 'Sophisticated living in the historic and prestigious cultural enclave of Vile Parle.',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.3625348452906!2d72.84136137425216!3d19.091745251479907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9ae40c4ab9b%3A0x3a0f948dc777e56e!2sSurya%20Prakash%20CHS%20Ltd!5e0!3m2!1sen!2sin!4v1791272972377!5m2!1sen!2sin',
  },
  {
    index: '07',
    slug: 'vir-vinayanand',
    name: 'VIR Vinayanand',
    area: 'Santacruz',
    config: 'Exclusive Boutique Residences',
    status: 'Upcoming',
    type: 'Boutique Living',
    badge: 'Airport Corridor',
    image: '/media/projects/project-detail/vinayanand.png',
    x: '42.5%',
    y: '98.8%',
    focusX: 42.5,
    focusY: 91.8,
    mobileX: '21.8%',
    mobileY: '91.4%',
    mobileFocusX: 41.8,
    mobileFocusY: 83.4,
    desc: 'Exclusive residences situated moments from Mumbai International Airport and Bandra-Kurla BKC.',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.4240386995816!2d72.85552267425444!3d19.1766729488062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7b834ff28e9%3A0x9f6fd34672620c06!2sVIR%20GROUP!5e0!3m2!1sen!2sin!4v1791272610508!5m2!1sen!2sin',
  },
];

// Focus coordinates helper for camera pan & zoom (desktop vs mobile responsive)
const getFocusCoords = (isMob) =>
  MUMBAI_PROJECTS.map((p) => ({
    x: isMob && p.mobileFocusX !== undefined ? p.mobileFocusX : p.focusX,
    y: isMob && p.mobileFocusY !== undefined ? p.mobileFocusY : p.focusY,
  }));
const FOCUS_COORDS = getFocusCoords(false);

// Calculate GPU scale & translation to focus directly on target location
const getCameraTransform = (coord, scale = 1.15, isMobile = false) => {
  // Target position: On mobile portrait center at (50% X, 48% Y); on desktop (42% X, 50% Y)
  const targetX = isMobile ? 50 : 42;
  const targetY = isMobile ? 48 : 50;
  const effScale = isMobile ? Math.max(scale, 1.24) : scale;

  let xShift = (targetX - 50) - (coord.x - 50) * effScale;
  let yShift = (targetY - 50) - (coord.y - 50) * effScale;

  // Clamp shift so container borders never expose empty background
  const maxShift = ((effScale - 1) / 2) * 90;
  xShift = Math.max(-maxShift, Math.min(maxShift, xShift));
  yShift = Math.max(-maxShift, Math.min(maxShift, yShift));

  return {
    scale: effScale,
    xPercent: xShift,
    yPercent: yShift,
  };
};

export function MumbaiMap({
  projects = [],
  focus,
  withPanel = true,
  enableScrollPin = false,
}) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const scrollTriggerInstance = useRef(null);

  // Initialize active project: match focus if provided
  const initialIdx = Math.max(
    0,
    MUMBAI_PROJECTS.findIndex(
      (p) => focus && (p.area.toLowerCase() === focus.toLowerCase() || p.slug === focus),
    ),
  );

  const [activeIdx, setActiveIdx] = useState(initialIdx !== -1 ? initialIdx : 0);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  );
  const activeProject = MUMBAI_PROJECTS[activeIdx] || MUMBAI_PROJECTS[0];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /**
   * --------------------------------------------------------------------------
   * GSAP ScrollTrigger: Cinematic Camera Pan & Zoom onto Each Location
   * --------------------------------------------------------------------------
   * Scrolling down smoothly zooms in and pans the camera directly to each
   * of the 7 verified project points, highlighting them sequentially!
   * Enabled on BOTH Desktop and Mobile!
   * --------------------------------------------------------------------------
   */
  useGSAP(
    () => {
      const stageEl = rootRef.current;
      const canvasEl = canvasRef.current;
      if (!stageEl || !canvasEl) return;

      const isMobileInit = typeof window !== 'undefined' && window.innerWidth < 768;
      const initCoords = isMobileInit ? getFocusCoords(true) : getFocusCoords(false);

      // Set initial zoom & position on the active project
      gsap.set(canvasEl, {
        transformOrigin: '50% 50%',
        ...getCameraTransform(initCoords[activeIdx] || initCoords[0], 1.15, isMobileInit),
      });

      if (!enableScrollPin) {
        // When not pinned (e.g. inside project details pages), toggle navbar when map is in view
        const unpinnedTrigger = ScrollTrigger.create({
          trigger: stageEl,
          start: 'top 80px',
          end: 'bottom 80px',
          onToggle: (self) => {
            document.body.classList.toggle('map-active', self.isActive);
          },
          onLeave: () => {
            document.body.classList.remove('map-active');
          },
          onLeaveBack: () => {
            document.body.classList.remove('map-active');
          },
        });

        return () => {
          unpinnedTrigger.kill();
          document.body.classList.remove('map-active');
        };
      }

      const mm = gsap.matchMedia();

      // Desktop & Tablets (>= 768px)
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stageEl,
            start: 'top top',
            end: '+=3500',
            pin: true,
            pinSpacing: true,
            scrub: 1.2,
            anticipatePin: 1,
            snap: {
              snapTo: 1 / (FOCUS_COORDS.length - 1),
              duration: { min: 0.25, max: 0.6 },
              ease: 'power1.inOut',
            },
            refreshPriority: REFRESH.PIN,
            onToggle: (self) => {
              document.body.classList.toggle('map-active', self.isActive);
            },
            onLeave: () => {
              document.body.classList.remove('map-active');
            },
            onLeaveBack: () => {
              document.body.classList.remove('map-active');
            },
            onUpdate: (self) => {
              const p = self.progress;
              const milestone = p * (FOCUS_COORDS.length - 1);
              const nextIdx = Math.min(
                FOCUS_COORDS.length - 1,
                Math.max(0, Math.round(milestone)),
              );
              setActiveIdx((prev) => (prev !== nextIdx ? nextIdx : prev));
            },
          },
        });

        scrollTriggerInstance.current = tl.scrollTrigger;

        // Build smooth zoom & pan transitions across all 7 projects
        for (let i = 0; i < FOCUS_COORDS.length - 1; i++) {
          const p1 = FOCUS_COORDS[i];
          const p2 = FOCUS_COORDS[i + 1];
          const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };

          // 1. Gently dips scale to 1.0x while gliding towards midpoint
          tl.to(canvasEl, {
            ...getCameraTransform(mid, 1.0, false),
            ease: 'sine.inOut',
            duration: 1,
          });

          // 2. Zooms in to 1.18x directly onto next project location!
          tl.to(canvasEl, {
            ...getCameraTransform(p2, 1.18, false),
            ease: 'sine.inOut',
            duration: 1,
          });
        }

        return () => {
          tl.kill();
          document.body.classList.remove('map-active');
        };
      });

      // Mobile Phones (< 768px) — Pinned sticky camera tour!
      mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        const mobCoords = getFocusCoords(true);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stageEl,
            start: 'top top',
            end: '+=1200',
            pin: true,
            pinSpacing: true,
            scrub: 0.35,
            anticipatePin: 1,
            snap: {
              snapTo: 1 / (mobCoords.length - 1),
              duration: { min: 0.2, max: 0.5 },
              ease: 'power1.inOut',
            },
            refreshPriority: REFRESH.PIN,
            onToggle: (self) => {
              document.body.classList.toggle('map-active', self.isActive);
            },
            onLeave: () => {
              document.body.classList.remove('map-active');
            },
            onLeaveBack: () => {
              document.body.classList.remove('map-active');
            },
            onUpdate: (self) => {
              const p = self.progress;
              const milestone = p * (mobCoords.length - 1);
              const nextIdx = Math.min(
                mobCoords.length - 1,
                Math.max(0, Math.round(milestone)),
              );
              setActiveIdx((prev) => (prev !== nextIdx ? nextIdx : prev));
            },
          },
        });

        scrollTriggerInstance.current = tl.scrollTrigger;

        // Mobile transitions: tailored scales & centering for portrait screens
        for (let i = 0; i < mobCoords.length - 1; i++) {
          const p1 = mobCoords[i];
          const p2 = mobCoords[i + 1];
          const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };

          tl.to(canvasEl, {
            ...getCameraTransform(mid, 1.12, true),
            ease: 'sine.inOut',
            duration: 1,
          });

          tl.to(canvasEl, {
            ...getCameraTransform(p2, 1.28, true),
            ease: 'sine.inOut',
            duration: 1,
          });
        }

        return () => {
          tl.kill();
          document.body.classList.remove('map-active');
        };
      });
    },
    { scope: rootRef, dependencies: [enableScrollPin] },
  );

  // Ensure navbar visibility is restored if component unmounts
  useEffect(() => {
    return () => {
      document.body.classList.remove('map-active');
    };
  }, []);

  /**
   * Click Handler: Smoothly zoom and scroll to the selected project
   */
  const handleSelectProject = useCallback((index, syncScroll = true) => {
    setActiveIdx(index);

    if (syncScroll && scrollTriggerInstance.current) {
      const st = scrollTriggerInstance.current;
      const total = MUMBAI_PROJECTS.length;
      const progressTarget = index / (total - 1);
      const targetScroll = st.start + progressTarget * (st.end - st.start);

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    } else if (canvasRef.current) {
      const isMob = typeof window !== 'undefined' && window.innerWidth < 768;
      const coords = isMob ? getFocusCoords(true) : getFocusCoords(false);
      gsap.to(canvasRef.current, {
        ...getCameraTransform(coords[index] || coords[0], 1.25, isMob),
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  }, []);

  return (
    <div
      ref={rootRef}
      className={`fullmap-wrapper ${enableScrollPin ? 'fullmap-pinned-mode' : ''}`}
      aria-label="VIR Group Mumbai Western Suburbs Presence Map"
    >
      {/* ==================================================================== */}
      {/* FULL MAP VIEWPORT STAGE (ZOOMABLE CAMERA CANVAS)                     */}
      {/* ==================================================================== */}
      <div className="fullmap-viewport">
        {/* Zoomable Canvas: Wraps Google Map and Overlaid Pins */}
        <div ref={canvasRef} className="fullmap-canvas">
          {/* Render High-Res Mumbai Projects Map Image */}
          <div className="fullmap-google-container">
            <img
              src={MUMBAI_MAP_IMG}
              alt="VIR Group Mumbai Western Suburbs Presence Map"
              className="fullmap-google-iframe"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
              draggable={false}
            />
            <div className="fullmap-map-overlay" />
          </div>

          {/* 7 Verified Real Project Hotspot Markers Overlaid on Map */}
          <div className="fullmap-pins-layer" aria-label="7 Project Location Points">
            {MUMBAI_PROJECTS.map((proj, idx) => {
              const isActive = activeIdx === idx;
              const posX = isMobile && proj.mobileX ? proj.mobileX : proj.x;
              const posY = isMobile && proj.mobileY ? proj.mobileY : proj.y;
              const isTopPin = parseFloat(posY) < 30;

              return (
                <button
                  key={proj.slug}
                  type="button"
                  className={`fullmap-pin ${isActive ? 'is-active' : ''} ${isTopPin ? 'tooltip-bottom' : 'tooltip-top'}`}
                  style={{
                    top: posY,
                    left: posX,
                  }}
                  onClick={() => handleSelectProject(idx)}
                  aria-label={`${proj.name} in ${proj.area}`}
                  title={`View Location: ${proj.name} (${proj.area})`}
                >
                  <span className="fullmap-pin-pulse" />
                  <span className="fullmap-pin-pulse outer-ring" />
                  <span className="fullmap-pin-badge">
                    <span className="pin-number">{proj.index}</span>
                  </span>
                  <span className="fullmap-pin-tooltip">
                    <span className="tooltip-title">{proj.name}</span>
                    <div className="tooltip-row">
                      <span className="tooltip-sub">{proj.area}</span>
                      <span className={`tooltip-status-tag status-${proj.status?.toLowerCase()}`}>
                        <span className="tooltip-status-dot" />
                        {proj.status}
                      </span>
                    </div>
                  </span>
                </button>
              );
            })}
          </div>
        </div>



        {/* ================================================================== */}
        {/* 3. LUXURY GLASSMORPHIC HUD PROJECT CARD OVERLAY (KEPT HIDDEN)      */}
        {/* ================================================================== */}
        {false && (
          <div className="fullmap-hud-card" aria-live="polite">
            <div className="hud-header">
              <span className="hud-badge">{activeProject.badge}</span>
              <span className="hud-number">{activeProject.index} / 07</span>
            </div>
            <p className="hud-locality">{activeProject.area}, Mumbai</p>
            <h3 className="hud-title">
              <Link to={`/projects/${activeProject.slug}`} className="hud-title-link">
                {activeProject.name}
              </Link>
            </h3>
            <div className="hud-thumb-wrap">
              <img
                src={getMediaUrl(activeProject.image)}
                alt={activeProject.name}
                className="hud-thumb-img"
                loading="lazy"
              />
            </div>
            <div className="hud-meta">
              <span className="hud-meta-pill status-pill">{activeProject.status}</span>
              <span className="hud-meta-pill config-pill">{activeProject.config}</span>
            </div>
            <p className="hud-desc">{activeProject.desc}</p>
            <div className="hud-actions">
              <Link to={`/projects/${activeProject.slug}`} className="hud-btn-primary">
                View Project →
              </Link>
              {activeProject.mapEmbed && (
                <button
                  type="button"
                  className="hud-btn-secondary"
                  onClick={() => setShowEmbedModal(true)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 18px',
                    background: 'rgba(14, 34, 63, 0.08)',
                    color: '#0e223f',
                    border: '1px solid rgba(14, 34, 63, 0.15)',
                    borderRadius: '999px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                >
                  📍 Live Map
                </button>
              )}
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* 4. MODAL: VERIFIED LIVE GOOGLE MAP EMBED FOR THE SELECTED POINTER   */}
        {/* ================================================================== */}
        {showEmbedModal && activeProject.mapEmbed && (
          <div
            className="fullmap-embed-modal-backdrop"
            onClick={() => setShowEmbedModal(false)}
          >
            <div
              className="fullmap-embed-modal"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <div className="embed-modal-header">
                <div>
                  <span className="hud-badge">{activeProject.badge}</span>
                  <h4 style={{ margin: '4px 0 0', color: '#0e223f', font: '600 1.15rem var(--font-display)' }}>
                    {activeProject.name} · {activeProject.area}
                  </h4>
                </div>
                <button
                  type="button"
                  className="embed-modal-close"
                  onClick={() => setShowEmbedModal(false)}
                  aria-label="Close Google Map"
                >
                  ✕
                </button>
              </div>
              <div className="embed-modal-body">
                <iframe
                  src={activeProject.mapEmbed}
                  width="100%"
                  height="360"
                  style={{ border: 0, borderRadius: '14px', display: 'block', width: '100%' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title={`${activeProject.name} on Google Maps`}
                />
                <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <a href={`https://www.google.com/maps/search/${encodeURIComponent(`${activeProject.name} ${activeProject.area} Mumbai`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hud-btn-primary"
                    style={{ fontSize: '0.8rem', padding: '9px 18px' }}
                  >
                    Open in Google Maps App ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scroll indicator hint */}
        <div className="fullmap-scroll-hint">
          <span className="mouse-wheel-icon" />
          <span>Scroll down to zoom into 7 locations · Click any point to focus</span>
        </div>
      </div>
    </div>
  );
}

export default MumbaiMap;
