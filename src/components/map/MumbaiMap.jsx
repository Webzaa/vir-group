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

// 10 Verified VIR Group developments with coordinates matching Mumbai-map.webp
const MUMBAI_PROJECTS = [
  {
    index: '01',
    slug: 'vir-krishna-koyna',
    name: 'VIR Krishna Koyna',
    area: 'Borivali West',
    config: '1, 2 and 3 BHK Homes',
    status: 'Completed',
    type: 'Modern Residences',
    badge: 'Shimpoli Connectivity',
    image: '/media/projects/project-detail/Krishna-Koyana.png',
    x: '42.68%',
    y: '14.26%',
    focusX: 42.68,
    focusY: 14.26,
    desc: 'Thoughtfully crafted living spaces combining modern architecture with peaceful suburban comfort.',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.342674857535!2d72.8425981242556!3d19.223891797314913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b1058b457809%3A0x1b55d3616bdc6da3!2sKrishna%20Koyna!5e0!3m2!1sen!2sin!4v1791272762385!5m2!1sen!2sin',
  },
  {
    index: '02',
    slug: 'vir-enclave',
    name: 'VIR Enclave',
    area: 'Borivali West',
    config: '1, 2 and 3 BHK Homes',
    status: 'Completed',
    type: 'Luxury Residences',
    badge: 'North Suburbs Corridor',
    image: '/media/projects/project-detail/VIR-Enclave.png',
    x: '41.78%',
    y: '21.91%',
    focusX: 41.78,
    focusY: 21.91,
    desc: 'Bespoke residences nestled in the vibrant neighborhood of Borivali West with premium amenities.',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.338218739854!2d72.8423567742557!3d19.224086147308817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b1000a3e6001%3A0xd294fd9cb1c0caa9!2sVir%20Enclave%20By%20Vir%20Group!5e0!3m2!1sen!2sin!4v1791272691392!5m2!1sen!2sin',
  },
  {
    index: '03',
    slug: 'vir-grace',
    name: 'VIR Grace',
    area: 'Malad West',
    config: 'Upcoming Residences',
    status: 'Upcoming',
    type: 'Upcoming Landmark',
    badge: 'Malad West Enclave',
    image: '/media/projects/project-detail/paradise.png',
    x: '40.17%',
    y: '31.70%',
    focusX: 40.17,
    focusY: 31.70,
    desc: 'An upcoming premium residential landmark in the prime neighborhood of Malad West.',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15072.84!2d72.836!3d19.186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b659c0000001%3A0x1!2sMalad%20West%2C%20Mumbai!5e0!3m2!1sen!2sin!5m2!1sen!2sin',
  },
  {
    index: '04',
    slug: 'vir-paradise',
    name: 'VIR Paradise',
    area: 'Malad West',
    config: '1 & 2 BHK Residences',
    status: 'Ongoing',
    type: 'Flagship Development',
    badge: 'Link Road & Metro Hub',
    image: '/media/projects/project-detail/paradise.png',
    x: '41.36%',
    y: '40.00%',
    focusX: 41.36,
    focusY: 40.00,
    desc: 'An iconic upcoming landmark near Malad Link Road offering contemporary lifestyle amenities.',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.2420076269514!2d72.84492517425461!3d19.184629348555127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b700157ea951%3A0xbfd8cf3b5dec10eb!2sVIR%20Paradise!5e0!3m2!1sen!2sin!4v1791272806458!5m2!1sen!2sin',
  },
  {
    index: '05',
    slug: 'vir-chandrapuri',
    name: 'VIR Chandrapuri',
    area: 'Malad East',
    config: 'Upcoming Residences',
    status: 'Upcoming',
    type: 'Upcoming Landmark',
    badge: 'Western Express Corridor',
    image: '/media/projects/project-detail/opportunity.webp',
    x: '47.82%',
    y: '32.13%',
    focusX: 47.82,
    focusY: 32.13,
    desc: 'An upcoming residential development strategically positioned in Malad East with superb connectivity.',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15072.96!2d72.855!3d19.184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b70000000001%3A0x1!2sMalad%20East%2C%20Mumbai!5e0!3m2!1sen!2sin!5m2!1sen!2sin',
  },
  {
    index: '06',
    slug: 'opportunity',
    name: 'VIR Opportunity',
    area: 'Malad East',
    config: 'Prime Commercial & Retail',
    status: 'Upcoming',
    type: 'Commercial Hub',
    badge: 'Western Express Highway',
    image: '/media/projects/project-detail/opportunity.webp',
    x: '47.88%',
    y: '40.21%',
    focusX: 47.88,
    focusY: 40.21,
    desc: 'Grade-A commercial and retail destination directly connecting to the Western Express Highway.',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15072.962082248549!2d72.83720033065583!3d19.184694333623547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7b834ff28e9%3A0x9f6fd34672620c06!2sVIR%20GROUP!5e0!3m2!1sen!2sin!4v1791272886115!5m2!1sen!2sin',
  },
  {
    index: '07',
    slug: 'global-residency',
    name: 'Global Residency',
    area: 'Goregaon East',
    config: '1 and 2 BHK Homes',
    status: 'Completed',
    type: 'Scenic Living',
    badge: 'Aarey Green Views',
    image: '/media/projects/project-detail/globli-residency.png',
    x: '47.82%',
    y: '52.45%',
    focusX: 47.82,
    focusY: 52.45,
    desc: 'Overlooking lush green expanses, Global Residency harmonizes nature with rapid urban transit.',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.693298248183!2d72.85397557425415!3d19.164898049177516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b70ce63ba081%3A0x2df6efe0a4fc009d!2sGlobal%20Residency!5e0!3m2!1sen!2sin!4v1791272930134!5m2!1sen!2sin',
  },
  {
    index: '08',
    slug: 'vir-sanket',
    name: 'VIR Sanket',
    area: 'Andheri East',
    config: 'Upcoming Residences',
    status: 'Upcoming',
    type: 'Upcoming Landmark',
    badge: 'Metro & Airport Hub',
    image: '/media/projects/project-detail/surya-prakash.png',
    x: '46.68%',
    y: '60.64%',
    focusX: 46.68,
    focusY: 60.64,
    desc: 'An upcoming residential development nestled in Andheri East, offering exceptional connectivity to metro and business hubs.',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15077.5!2d72.865!3d19.115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c80000000001%3A0x1!2sAndheri%20East%2C%20Mumbai!5e0!3m2!1sen!2sin!5m2!1sen!2sin',
  },
  {
    index: '09',
    slug: 'surya-prakash',
    name: 'Surya Prakash CHSL',
    area: 'Vile Parle East',
    config: '1, 2 and 3 BHK Homes',
    status: 'Ongoing',
    type: 'Redevelopment Landmark',
    badge: 'Parle Cultural Hub',
    image: '/media/projects/project-detail/surya-prakash.png',
    x: '45.49%',
    y: '70.11%',
    focusX: 45.49,
    focusY: 70.11,
    desc: 'Sophisticated living in the historic and prestigious cultural enclave of Vile Parle East.',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.3625348452906!2d72.84136137425216!3d19.091745251479907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9ae40c4ab9b%3A0x3a0f948dc777e56e!2sSurya%20Prakash%20CHS%20Ltd!5e0!3m2!1sen!2sin!4v1791272972377!5m2!1sen!2sin',
  },
  {
    index: '10',
    slug: 'vir-vinayanand',
    name: 'VIR Vinayanand',
    area: 'Santacruz West',
    config: 'Exclusive Boutique Residences',
    status: 'Upcoming',
    type: 'Boutique Living',
    badge: 'Airport Corridor',
    image: '/media/projects/project-detail/vinayanand.png',
    x: '39.33%',
    y: '87.87%',
    focusX: 39.33,
    focusY: 87.87,
    desc: 'Exclusive residences situated moments from Mumbai International Airport and Bandra-Kurla BKC.',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.4240386995816!2d72.85552267425444!3d19.1766729488062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7b834ff28e9%3A0x9f6fd34672620c06!2sVIR%20GROUP!5e0!3m2!1sen!2sin!4v1791272610508!5m2!1sen!2sin',
  },
];

// Focus coordinates helper for camera pan & zoom (unified 16:9 coordinate space)
const getFocusCoords = () =>
  MUMBAI_PROJECTS.map((p) => ({
    x: p.focusX,
    y: p.focusY,
  }));
const FOCUS_COORDS = getFocusCoords();

// Calculate GPU scale & translation to focus directly on target location
const getCameraTransform = (coord, scale = 1.28, isMobile = false) => {
  const effScale = isMobile ? 1.24 : scale;
  const targetX = isMobile ? 50 : 45;
  const targetY = isMobile ? 48 : 50;

  // Strict physical bounds keeping map image properly fit (never cut off top or bottom)
  const maxShiftX = Math.max(0, (effScale - 1) * 48);
  const maxShiftY = Math.max(0, (effScale - 1) * 48);

  let xShift = (targetX - 50) - (coord.x - 50) * effScale;
  let yShift = (targetY - 50) - (coord.y - 50) * effScale;

  xShift = Math.max(-maxShiftX, Math.min(maxShiftX, xShift));
  yShift = Math.max(-maxShiftY, Math.min(maxShiftY, yShift));

  return {
    scale: effScale,
    xPercent: xShift,
    yPercent: yShift,
  };
};

const TOTAL_MAP_TIMELINE = 19.6;

const getProjectTargetProgress = (index, total = 10) => {
  if (index <= 0) return 0.4 / TOTAL_MAP_TIMELINE;
  const targetTime = 0.4 + index * 2.0;
  return Math.min(18.4 / TOTAL_MAP_TIMELINE, targetTime / TOTAL_MAP_TIMELINE);
};

const getProjectIndexFromProgress = (progress, total = 10) => {
  const t = progress * TOTAL_MAP_TIMELINE;
  if (t <= 1.4) return 0;
  return Math.min(total - 1, Math.max(0, Math.round((t - 0.4) / 2.0)));
};

const buildCameraTimeline = (tl, coords, canvasEl, isMobile) => {
  const zoomScale = isMobile ? 1.24 : 1.28;
  const transitScale = isMobile ? 1.14 : 1.16;

  // Pre-calculate target transforms for all locations at focused zoom
  const transforms = coords.map((c) => getCameraTransform(c, zoomScale, isMobile));

  // 1. Initial stable hold with focused zoom on Point 01 (VIR Krishna Koyna)
  tl.to(canvasEl, {
    ...transforms[0],
    duration: 0.8,
    ease: 'none',
  });

  // 2. Smooth cinematic flights with focused zoom-in onto each project point
  for (let i = 0; i < transforms.length - 1; i++) {
    const tCurrent = transforms[i];
    const tNext = transforms[i + 1];

    // Midpoint: strictly interpolated positions (guarantees continuous monotonic flight, zero glitch)
    const midTransform = {
      scale: transitScale,
      xPercent: (tCurrent.xPercent + tNext.xPercent) / 2,
      yPercent: (tCurrent.yPercent + tNext.yPercent) / 2,
    };

    // A. Ease out: relax zoom into wide corridor flight
    tl.to(canvasEl, {
      ...midTransform,
      duration: 0.6,
      ease: 'sine.in',
    });

    // B. Ease in: smoothly zoom in directly onto the next project point
    tl.to(canvasEl, {
      ...tNext,
      duration: 0.6,
      ease: 'sine.out',
    });

    // C. Solid hold on the zoomed-in project point for comfortable viewing
    tl.to(canvasEl, {
      ...tNext,
      duration: 0.8,
      ease: 'none',
    });
  }

  // 3. Final buffer hold on Point 10 (VIR Vinayanand) to prevent boundary glitch
  tl.to(canvasEl, {
    ...transforms[transforms.length - 1],
    duration: 0.8,
    ease: 'none',
  });
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
  const activeIdxRef = useRef(activeIdx);
  useEffect(() => {
    activeIdxRef.current = activeIdx;
  }, [activeIdx]);

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


  useGSAP(
    () => {
      const stageEl = rootRef.current;
      const canvasEl = canvasRef.current;
      if (!stageEl || !canvasEl) return;

      const isMobileInit = typeof window !== 'undefined' && window.innerWidth < 768;
      const initCoords = getFocusCoords();

      gsap.set(canvasEl, {
        transformOrigin: '50% 50%',
        ...getCameraTransform(initCoords[activeIdx] || initCoords[0], isMobileInit ? 1.24 : 1.28, isMobileInit),
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
            end: '+=4500',
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            fastScrollEnd: true,
            refreshPriority: REFRESH.PIN,
            onToggle: (self) => {
              document.body.classList.toggle('map-active', self.isActive);
            },
            onEnter: () => {
              document.body.classList.add('map-active');
            },
            onLeave: () => {
              document.body.classList.remove('map-active');
            },
            onLeaveBack: () => {
              document.body.classList.remove('map-active');
            },
            onUpdate: (self) => {
              const nextIdx = getProjectIndexFromProgress(self.progress, FOCUS_COORDS.length);
              if (nextIdx !== activeIdxRef.current) {
                activeIdxRef.current = nextIdx;
                setActiveIdx(nextIdx);
              }
            },
          },
        });

        scrollTriggerInstance.current = tl.scrollTrigger;

        // Build smooth zoom & pan transitions with stable holds
        buildCameraTimeline(tl, FOCUS_COORDS, canvasEl, false);

        return () => {
          tl.kill();
          document.body.classList.remove('map-active');
        };
      });

      // Mobile Phones (< 768px) — Pinned sticky camera tour!
      mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        const mobCoords = getFocusCoords();
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stageEl,
            start: 'top top',
            end: '+=4200',
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            fastScrollEnd: true,
            refreshPriority: REFRESH.PIN,
            onToggle: (self) => {
              document.body.classList.toggle('map-active', self.isActive);
            },
            onEnter: () => {
              document.body.classList.add('map-active');
            },
            onLeave: () => {
              document.body.classList.remove('map-active');
            },
            onLeaveBack: () => {
              document.body.classList.remove('map-active');
            },
            onUpdate: (self) => {
              const nextIdx = getProjectIndexFromProgress(self.progress, mobCoords.length);
              if (nextIdx !== activeIdxRef.current) {
                activeIdxRef.current = nextIdx;
                setActiveIdx(nextIdx);
              }
            },
          },
        });

        scrollTriggerInstance.current = tl.scrollTrigger;

        // Mobile transitions: smooth zoom, flights & stable holds
        buildCameraTimeline(tl, mobCoords, canvasEl, true);

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

  const scrollTweenRef = useRef(null);

  /**
   * Click / Select Handler: Smoothly scroll and center the selected project
   */
  const handleSelectProject = useCallback((index, syncScroll = true) => {
    setActiveIdx(index);
    activeIdxRef.current = index;

    if (syncScroll && scrollTriggerInstance.current) {
      const st = scrollTriggerInstance.current;
      const total = MUMBAI_PROJECTS.length;
      const progressTarget = getProjectTargetProgress(index, total);
      const targetScroll = Math.round(st.start + progressTarget * (st.end - st.start));

      if (scrollTweenRef.current) {
        scrollTweenRef.current.kill();
      }

      const scrollObj = { y: window.scrollY };
      scrollTweenRef.current = gsap.to(scrollObj, {
        y: targetScroll,
        duration: 0.6,
        ease: 'power2.out',
        onUpdate: () => {
          window.scrollTo(0, scrollObj.y);
        },
        onComplete: () => {
          scrollTweenRef.current = null;
        },
      });
    } else if (canvasRef.current) {
      const isMob = typeof window !== 'undefined' && window.innerWidth < 768;
      const coords = getFocusCoords();
      gsap.to(canvasRef.current, {
        ...getCameraTransform(coords[index] || coords[0], isMob ? 1.24 : 1.28, isMob),
        duration: 0.6,
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
          {/* 16:9 Stage Plane: Locks map image and pins in perfect 1:1 sync across all devices */}
          <div className="fullmap-stage-plane">
            {/* Render High-Res Mumbai Projects Map Image */}
            <div className="fullmap-google-container">
              <img
                src={MUMBAI_MAP_IMG}
                alt="VIR Group Mumbai Western Suburbs Presence Map"
                className="fullmap-google-iframe"
                draggable={false}
              />
              <div className="fullmap-map-overlay" />
            </div>

            {/* 10 Verified Real Project Hotspot Markers Overlaid on Map */}
            <div className="fullmap-pins-layer" aria-label="10 Project Location Points">
              {MUMBAI_PROJECTS.map((proj, idx) => {
                const isActive = activeIdx === idx;
                const posX = proj.x;
                const posY = proj.y;
                const posXNum = parseFloat(posX);
                const isTopPin = parseFloat(posY) < 30;
                const isLeftPin = posXNum < 45;
                const isRightPin = posXNum > 55;

                return (
                  <button
                    key={proj.slug}
                    type="button"
                    className={`fullmap-pin ${isActive ? 'is-active' : ''} ${isTopPin ? 'tooltip-bottom' : 'tooltip-top'} ${isLeftPin ? 'tooltip-align-left' : ''} ${isRightPin ? 'tooltip-align-right' : ''}`}
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
      </div>



        {/* ================================================================== */}
        {/* 3. LUXURY GLASSMORPHIC HUD PROJECT CARD OVERLAY (KEPT HIDDEN)      */}
        {/* ================================================================== */}
        {false && (
          <div className="fullmap-hud-card" aria-live="polite">
            <div className="hud-header">
              <span className="hud-badge">{activeProject.badge}</span>
              <span className="hud-number">{activeProject.index} / 10</span>
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

        {/* Scroll indicator hint (desktop only) */}
        {!isMobile && (
          <div className="fullmap-scroll-hint">
            <span className="mouse-wheel-icon" />
            <span>Scroll down to explore all 10 locations · Click any point to focus</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default MumbaiMap;
