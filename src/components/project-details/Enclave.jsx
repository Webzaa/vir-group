import { useState, useRef, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { gsap, ScrollTrigger } from '@/lib/animations/gsap';
import { JsonLd, breadcrumbJsonLd, projectJsonLd } from '@/lib/seo/jsonld';
import { opportunity as defaultProject } from '@/data/projects/opportunity';
import { configLong, configShort, statusLabel } from '@/lib/content';
import { getMediaUrl } from '@/lib/media';
import { PopupForm } from '@/components/forms/PopupForm';

export function Enclave(props) {
  const loaderData = useLoaderData() || {};
  const p = props.p || loaderData.p || defaultProject;
  const next = props.next || loaderData.next || { slug: 'vir-paradise', name: 'VIR Paradise' };
  const company = props.company || loaderData.company || { founded: 1985, phone: '+919326287741', phoneDisplay: '+91 93262 87741' };

  const stageRef = useRef(null);
  const colInRef = useRef(null);
  const amenSectionRef = useRef(null);
  const amenColLeftRef = useRef(null);
  const amenColRightRef = useRef(null);

  // Hotspots definitions from original project data
  const hotspots = [
    {
      x: 22,
      y: 30,
      tag: 'Location',
      title: `${p.area || 'Malad East'}, Mumbai`,
      desc: `${p.name} sits in ${p.area || 'Malad East'}, in Mumbai's western suburbs, with rapid access to the Western Express Highway, SV Road, and the suburban rail line.`,
    },
    {
      x: 46,
      y: 52,
      tag: 'Residences',
      title: configLong(p) || '1, 2 and 3 BHK',
      desc: 'Homes planned for maximum cross-ventilation, expansive privacy, natural daylight, and panoramic suburban vistas.',
    },
    {
      x: 68,
      y: 38,
      tag: 'Rooftop',
      title: 'Rooftop Retreat',
      desc: 'Landscaped leisure deck above the city with dedicated yoga, morning meditation, and open-air sunset seating.',
    },
    {
      x: 80,
      y: 70,
      tag: 'Arrival',
      title: 'Grand Lobby & Security',
      desc: 'Double-height entrance lobby, high-speed elevators, podium car parking, 24/7 CCTV surveillance and generator backup.',
    },
  ];

  const amenStickyStageRef = useRef(null);

  // ============================================================================
  // PROJECT-SPECIFIC CURATED AMENITIES (Displayed in Intro Section Right-Bottom)
  // ============================================================================
  const PROJECT_AMENITIES_MAP = {
    // --------------------------------------------------------------------------
    // 1. Codename Opportunity (Malad East) - 20 Curated Amenities
    // --------------------------------------------------------------------------
    'opportunity': [
      'Gym',
      'Swimming Pool',
      'Parking',
      '24/7 Security',
      'WiFi',
      'Garden/Park',
      'Clubhouse',
      'Kids Play Area',
      'Gas Pipeline',
      '24x7 Water Supply',
      'Power Backup',
      'Elevator',
      'Shopping Center',
      'CCTV Surveillance',
      'Sports Facility',
      'Visitor Parking',
      'Medical Facility',
      'Cafeteria',
      'Library',
      'Party Hall',
    ],

    // --------------------------------------------------------------------------
    // 2. VIR Paradise (Malad West) - 8 Curated Amenities
    // --------------------------------------------------------------------------
    'vir-paradise': [
      'Parking',
      '24/7 Security',
      'Clubhouse',
      'Kids Play Area',
      'Gas Pipeline',
      '24x7 Water Supply',
      'Power Backup',
      'Elevator',
    ],

    // --------------------------------------------------------------------------
    // 3. VIR Enclave (Borivali West) - 8 Curated Amenities
    // --------------------------------------------------------------------------
    'vir-enclave': [
      'Parking',
      '24/7 Security',
      'Kids Play Area',
      'Gas Pipeline',
      '24x7 Water Supply',
      'Power Backup',
      'Elevator',
      'CCTV Surveillance',
    ],

    // --------------------------------------------------------------------------
    // 4. Global Residency (Goregaon) - 9 Curated Amenities
    // --------------------------------------------------------------------------
    'global-residency': [
      'Parking',
      '24/7 Security',
      'Kids Play Area',
      'Clubhouse',
      'Garden/Park',
      'Elevator',
      '24x7 Water Supply',
      'Gas Pipeline',
      'CCTV Surveillance',
    ],

    // --------------------------------------------------------------------------
    // 5. VIR Krishna Koyna (Borivali West) - 9 Curated Amenities
    // --------------------------------------------------------------------------
    'vir-krishna-koyna': [
      'Parking',
      '24/7 Security',
      'Garden/Park',
      'Clubhouse',
      'Kids Play Area',
      '24x7 Water Supply',
      'Gas Pipeline',
      'Elevator',
      'Power Backup',
    ],

    // --------------------------------------------------------------------------
    // 6. Surya Prakash (Vile Parle) - 8 Curated Amenities
    // --------------------------------------------------------------------------
    'surya-prakash': [
      'Gym',
      'Parking',
      '24/7 Security',
      'Garden/Park',
      'Kids Play Area',
      '24x7 Water Supply',
      'Elevator',
      'CCTV Surveillance',
    ],
  };

  const projectAmenitiesList = PROJECT_AMENITIES_MAP[p?.slug] || p?.amenities?.items || [];

  // Curated floor plans list for VIR Enclave with verified 1, 2 & 3 BHK images
  const floorPlansList = [
    {
      id: 've-01',
      title: '1 BHK 3D Isometric View',
      type: '1 BHK',
      carpet: '372 sq.ft',
      unitNo: '101',
      rooms: '1 Bed · 2 Bath · Cross Breeze',
      facing: 'East Facing Open View',
      finish: 'High Grade Vitrified Tiles',
      img: getMediaUrl('/media/projects/Enclave/plans/02.jpg'),
    },
    {
      id: 've-02',
      title: 'Typical 1 BHK Floor Plan',
      type: '1 BHK',
      carpet: '372 – 415 sq.ft',
      unitNo: '102',
      rooms: '1 Bed · 2 Bath · Open Living',
      facing: 'East Facing Garden View',
      finish: 'Designer Ceramic & Vitrified',
      img: getMediaUrl('/media/projects/Enclave/plans/01.jpg'),
    },
    {
      id: 've-03',
      title: '2 BHK 3D Isometric View',
      type: '2 BHK',
      carpet: '612 sq.ft',
      unitNo: '201',
      rooms: '2 Bed · 2 Bath · Master Bedroom Suite',
      facing: 'North-East Green View',
      finish: 'Italian Pattern Glazed Tiles',
      img: getMediaUrl('/media/projects/Enclave/plans/05.jpg'),
    },
    {
      id: 've-04',
      title: 'Typical 2 BHK Floor Plan',
      type: '2 BHK',
      carpet: '612 – 680 sq.ft',
      unitNo: '202',
      rooms: '2 Bed · 2 Bath · Utility Area',
      facing: 'South-West Sunset View',
      finish: 'Designer Ceramic & Vitrified',
      img: getMediaUrl('/media/projects/Enclave/plans/01.jpg'),
    },
    {
      id: 've-05',
      title: '3 BHK 3D Isometric View',
      type: '3 BHK',
      carpet: '989 sq.ft',
      unitNo: '301',
      rooms: '3 Bed · 3 Bath · Spacious Living & Balcony',
      facing: 'Panoramic Western Suburbs View',
      finish: 'Premium Marble & Designer Wood',
      img: getMediaUrl('/media/projects/Enclave/plans/04.jpg'),
    },
    {
      id: 've-06',
      title: 'Typical 3 BHK Floor Plan (13th, 15th & 16th Floor)',
      type: '3 BHK',
      carpet: '989 – 1,060 sq.ft',
      unitNo: '302',
      rooms: '3 Bed · 3 Bath · Double Balcony',
      facing: 'South-East Skyline Panorama',
      finish: 'Custom Luxury Marble & Fixtures',
      img: getMediaUrl('/media/projects/Enclave/plans/03.jpg'),
    },
  ];

  // Amenities Data in Pairs for Sticky Split-Screen Reveal Stage (from krishna-koy/amenities)
  const amenityPairs = [
    {
      id: 'pair-1',
      index: '01 / 02',
      left: {
        number: '01',
        category: 'ACTIVE LIVING',
        title: 'Jogging Track',
        desc: 'Dedicated paved jogging track surrounded by lush landscaping for morning and evening runs.',
        image: getMediaUrl('/media/projects/krishna-koy/amenities/Jogging-track.jpg'),
        badge: 'Fitness Circuit',
      },
      right: {
        number: '02',
        category: 'NATURE & GREENS',
        title: 'Landscape Garden',
        desc: 'Serene verdant garden spaces designed for family strolls, fresh air, and relaxation.',
        image: getMediaUrl('/media/projects/krishna-koy/amenities/Landscape-garden.jpg'),
        badge: 'Lush Greenery',
      },
    },
    {
      id: 'pair-2',
      index: '03 / 04',
      left: {
        number: '03',
        category: 'COMMUNITY & LEISURE',
        title: 'Senior Citizen Sitting Area',
        desc: 'Comfortable shaded seating corners tailored for elderly residents to relax and socialize.',
        image: getMediaUrl('/media/projects/krishna-koy/amenities/Senior-citizen-sitting-area.jpg'),
        badge: 'Tranquil Seating',
      },
      right: {
        number: '04',
        category: 'HOLISTIC WELLNESS',
        title: 'Yoga Area',
        desc: 'Open-air peaceful sanctuary designed for morning yoga, pranayama, and mindful rejuvenation.',
        image: getMediaUrl('/media/projects/krishna-koy/amenities/Yoga-area.jpg'),
        badge: 'Mind & Body',
      },
    },
  ];

  const totalFloors = p.elevation?.floors || 10;

  // React States
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [planFilter, setPlanFilter] = useState('ALL');
  const [modalPlan, setModalPlan] = useState(null);
  const [likedPlans, setLikedPlans] = useState({});
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedPlanForEnquiry, setSelectedPlanForEnquiry] = useState(null);
  const [isBrochureRequest, setIsBrochureRequest] = useState(false);
  const [hasUnlockedFloorPlans, setHasUnlockedFloorPlans] = useState(() => {
    try {
      return sessionStorage.getItem('vir_floorplan_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  const handleFloorPlanClick = (plan) => {
    if (hasUnlockedFloorPlans) {
      setModalPlan(plan);
    } else {
      setSelectedPlanForEnquiry(plan);
      setPopupOpen(true);
    }
  };

  // Hotspot interaction
  const handleHotspotClick = (index) => {
    setActiveHotspot((prev) => (prev === index ? null : index));
  };

  const toggleLikePlan = (id) => {
    setLikedPlans((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredPlans = planFilter === 'ALL'
    ? floorPlansList
    : floorPlansList.filter((plan) => plan.type === planFilter);

  // The floor-plan grid changes height when the BHK filter changes. Every pinned
  // section below it was measured for the old height, so re-measure them (two frames
  // later, once React has committed and the browser has laid out the new grid).
  const filterMountedRef = useRef(false);
  useEffect(() => {
    if (!filterMountedRef.current) {
      filterMountedRef.current = true;
      return undefined;
    }
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [planFilter]);

  const heroImgSrc = getMediaUrl(p.hero?.src || '/media/projects/project-detail/VIR-Enclave.png');
  const img2Src = getMediaUrl('/media/overview/VIR-Enclave.webp');
  const colPhotoSrc = getMediaUrl('/media/projects/krishna-koy/amenities/Jogging-track.jpg');
  const amenIntroBg = getMediaUrl('/media/projects/krishna-koy/amenities/Landscape-garden.jpg');
  const statusDisplay = statusLabel[p.status] || (p.status === 'ongoing' ? 'Under development' : (p.status === 'available' ? 'Ready · Available' : 'Under development'));

  const aboutParas = p.aboutParagraphs || [p.description || p.tagline];

  // GSAP Springs Reveal Pinned Timeline & Amenities Parallax
  useEffect(() => {
    if (!stageRef.current || !colInRef.current) return;

    const ctx = gsap.context(() => {
      const stage = stageRef.current;
      const colIn = colInRef.current;
      const mobile = () => window.innerWidth < 760;

      // Hero intro lines entrance
      gsap.from('.hero-copy h1 b', { yPercent: 110, duration: 1.2, ease: 'power4.out', stagger: 0.12, delay: 0.2 });
      gsap.from('.hero-copy .mi', { opacity: 0, y: 14, duration: 1, ease: 'power3.out', delay: 0.1 });

      // Springs Pinned Reveal Timeline (Exact Template Implementation)
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
       scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: '+=100%',
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
      });

      /* initial states */
      gsap.set('.layer--2 .ph', { yPercent: 10 });

      // Calculate start and end Y for colIn with ample top and bottom breathing space
      const getColPositions = () => {
        const winH = window.innerHeight;
        const colH = colIn.offsetHeight;
        const isMob = mobile();
        const topBuffer = isMob
          ? Math.max(28, Math.round(winH * 0.05))
          : Math.max(45, Math.round(winH * 0.07));
        const botBuffer = isMob
          ? 24
          : 32;

        if (colH + topBuffer + botBuffer <= winH) {
          const start = Math.max(topBuffer, Math.round((winH - colH) / 3));
          const end = Math.max(topBuffer, winH - colH - botBuffer);
          return { start, end };
        }

        const start = topBuffer;
        const end = winH - colH - botBuffer;
        return { start, end };
      };

      if (mobile()) {
        gsap.set(['.panel', '.col'], {
          clipPath: 'inset(100% 0% 0% 0%)',
        });
        gsap.set(colIn, {
          opacity: 1,
          y: () => getColPositions().start,
        });

        /* 1) hero copy leaves */
        tl.to('.hero-copy', { y: -80, opacity: 0, duration: 0.6 }, 0)
          .to('.stage-hotspots', { opacity: 0, duration: 0.4, ease: 'power2.inOut' }, 0)
          .to('.layer--1 .ph', { scale: 1.08, duration: 2.5 }, 0)

          /* 2) solid white panel & column wipe up together from bottom covering the hero cleanly */
          .to(['.panel', '.col'], {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.0,
            ease: 'power2.inOut',
          }, 0.3)

          /* 3) smooth scroll of colIn if content exceeds screen height */
          .to(colIn, {
            y: () => getColPositions().end,
            duration: 2.5,
            ease: 'none',
          }, 1.3)
          /* 4) hold resting at bottom */
          .to({}, { duration: 1.2 }, '+=0');
      } else {
        gsap.set(colIn, {
          opacity: 0,
          y: () => getColPositions().start + 45,
        });

        /* make sure layer--2 is hidden initially from bottom wipe */
        gsap.set('.layer--2', { clipPath: 'inset(100% 0% 0% 0%)' });

        /* 1) hero copy leaves, panel wipes in from the left, hero image clips to right half */
        tl.to('.hero-copy', { y: -90, opacity: 0, duration: 0.8 }, 0)
          .to('.stage-hotspots', { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, 0)
          .to('.panel', { width: '50%', duration: 1, ease: 'power2.inOut' }, 0.35)
          .to('.layer--1', { clipPath: 'inset(0 0 0 50%)', duration: 1, ease: 'power2.inOut' }, 0.35)
          .to('.layer--1 .ph', { scale: 1.12, duration: 3.5 }, 0)

          /* 2) left copy smoothly enters with ample top space, and glides to retain ample bottom space */
          .to(colIn, {
            opacity: 1,
            y: () => getColPositions().start,
            duration: 0.8,
            ease: 'power2.out',
          }, 0.5)
          .to(colIn, {
            y: () => getColPositions().end,
            duration: 2.5,
            ease: 'none',
          }, 1.3)

          /* 3) right-hand overview image wipes up smoothly as panel wipes in */
          .to('.layer--2', { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power2.inOut' }, 0.35)
          .to('.layer--2 .ph', { yPercent: -4, duration: 2.2 }, 0.35);
      }



      // 3. Dual-Direction Split-Screen Amenities Reveal Stage (Ek upar, ek niche scroll)
      if (amenStickyStageRef.current) {
        const stageEl = amenStickyStageRef.current;

        // Pair 1 initial setup:
        // Left pane from bottom (niche se upar aayega)
        gsap.set('.amen-pair--1 .amen-pane-left', { clipPath: 'inset(100% 0% 0% 0%)' });
        // Right pane from top (upar se niche aayega)
        gsap.set('.amen-pair--1 .amen-pane-right', { clipPath: 'inset(0% 0% 100% 0%)' });
        gsap.set('.amen-pair--1 .amen-pane-img', { scale: 1.14 });

        // Pair 2 initial setup:
        // Left pane from top (upar se niche aayega)
        gsap.set('.amen-pair--2 .amen-pane-left', { clipPath: 'inset(0% 0% 100% 0%)' });
        // Right pane from bottom (niche se upar aayega)
        gsap.set('.amen-pair--2 .amen-pane-right', { clipPath: 'inset(100% 0% 0% 0%)' });
        gsap.set('.amen-pair--2 .amen-pane-img', { scale: 1.14 });

        const amenTl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stageEl,
            start: 'top top',
            end: () => '+=' + (window.innerHeight * 2.8),
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        // 1. Reveal Pair 1 OVER Intro Card:
        // Left pane wipes up (niche se upar), Right pane wipes down (upar se niche)
        amenTl
          .to('.amen-intro-center-wrap', { opacity: 0, y: -30, duration: 0.6, ease: 'power2.in' }, 0.2)
          .to('.amen-intro-opp-amenities', { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' }, 0.2)
          .to('.amen-intro-img', { scale: 1.15, duration: 1.4 }, 0.2)
          .to('.amen-pair--1 .amen-pane-left', {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power2.inOut',
          }, 0.4)
          .to('.amen-pair--1 .amen-pane-right', {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power2.inOut',
          }, 0.4)
          .to('.amen-pair--1 .amen-pane-img', { scale: 1.0, duration: 1.4 }, 0.4)

          // 2. Reveal Pair 2 OVER Pair 1:
          // Left pane wipes down (upar se niche), Right pane wipes up (niche se upar)
          .to('.amen-pair--1 .amen-pane-hud', { opacity: 0, y: -20, duration: 0.5 }, 1.8)
          .to('.amen-pair--2 .amen-pane-left', {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power2.inOut',
          }, 1.9)
          .to('.amen-pair--2 .amen-pane-right', {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power2.inOut',
          }, 1.9)
          .to('.amen-pair--2 .amen-pane-img', { scale: 1.0, duration: 1.4 }, 1.9);
      }
    });

    return () => ctx.revert();
  }, [heroImgSrc, img2Src, img3Src]);

  return (
    <div className="pdetail-root" aria-label={`${p.name} Project Overview`}>
      <JsonLd data={projectJsonLd(p)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: p.name, path: `/projects/${p.slug}` },
        ])}
      />

      {/* 1. SPRINGS PINNED REVEAL SCROLL HERO STAGE */}
      <section className="stage" id="stage" ref={stageRef} data-hero="true" data-theme="glass">
        {/* Right-hand Image Stack */}
        <div className="stack">
          {/* Layer 1 = Hero Image (Hotspots exist ONLY on this image) */}
          <div className="layer layer--1">
            <div className="ph" style={{ backgroundImage: `url(${heroImgSrc})` }} />

            {/* Hotspots exclusively for the first hero image */}
            <div className="stage-hotspots">
              <span className="mi pick">Select a point of interest +</span>
              <div id="hss">
                {hotspots.map((h, i) => {
                  const isHot = activeHotspot === i;
                  return (
                    <button
                      key={h.tag}
                      type="button"
                      className={`hs ${isHot ? 'on' : ''}`}
                      style={{ left: `${h.x}%`, top: `${h.y}%` }}
                      onClick={() => handleHotspotClick(i)}
                      aria-label={h.tag}
                    >
                      <i>+</i>
                      <span className="mi">{h.tag}</span>
                    </button>
                  );
                })}
              </div>

              {/* Floating HUD Panel */}
              <div id="pan" className={activeHotspot !== null ? 'on' : ''} aria-live="polite">
                {activeHotspot !== null && (
                  <>
                    <span className="mi" id="pk">
                      {hotspots[activeHotspot].tag}
                    </span>
                    <h3 id="pt">{hotspots[activeHotspot].title}</h3>
                    <p id="pp">{hotspots[activeHotspot].desc}</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Layer 2 = Overview building image on the right */}
          <div className="layer layer--2">
            <div className="ph" style={{ backgroundImage: `url(${img2Src})` }} />
          </div>
        </div>

        {/* Panel that wipes in from the left */}
        <div className="panel" />

        {/* Hero Initial Copy */}
        <div className="hero-copy">
          <p className="mi" id="dk" style={{ margin: '0 0 14px 0', opacity: 0.95, fontSize: '11.5px', letterSpacing: '0.24em', textTransform: 'uppercase' }}>
            {p.area || 'Malad East'}, Mumbai · {statusDisplay}
          </p>
          <h1>
            <span><b>{p.name}</b></span>
          </h1>
        </div>

        {/* Left Column that scrolls through the panel */}
        <div className="col">
          <div className="col__inner" ref={colInRef}>
            <div className="col__head">
              <h2>Open the doors of {p.name} and step into your true self</h2>
            </div>
            {aboutParas.map((para, i) => (
              <p key={i} className={`col__para ${i === 0 ? 'col__para--lead' : ''}`}>
                {para}
              </p>
            ))}

            {/* CTA Buttons below about content */}
            <div className="col__actions">
              <button
                type="button"
                onClick={() => {
                  setIsBrochureRequest(false);
                  setSelectedPlanForEnquiry(null);
                  setPopupOpen(true);
                }}
                className="col__cta-btn col__cta-btn--primary"
                id="col-enquire-btn-enclave"
              >
                <span>Enquire Now</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsBrochureRequest(true);
                  setSelectedPlanForEnquiry(null);
                  setPopupOpen(true);
                }}
                className="col__cta-btn col__cta-btn--secondary"
                id="col-brochure-btn-enclave"
              >
                <span>Download Brochure</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE RESIDENCES / CURATED FLOOR PLANS (Sticky Left Sidebar + Scrollable Right Cards) */}
      <section className="fp-section" id="residences" data-theme="basalt" aria-label="Floor Plans and Residence Configurations">
        <div className="fp-container">
          {/* Left Sticky Column */}
          <aside className="fp-sidebar">
            <div className="fp-sidebar-sticky">
              <span className="fp-eyebrow">The Residences</span>
              <h2 className="fp-heading">
                Curated <em>Floor Plans.</em>
              </h2>
              <p className="fp-description">
                Explore meticulously planned layouts designed for exceptional natural cross-ventilation, abundant sunlight, and absolute privacy.
              </p>

              {/* Filter Tabs */}
              <div className="fp-filter-group" role="tablist" aria-label="Filter configurations">
                {['ALL', '1 BHK', '2 BHK', '3 BHK'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={planFilter === tab}
                    className={`fp-filter-pill ${planFilter === tab ? 'active' : ''}`}
                    onClick={() => setPlanFilter(tab)}
                  >
                    {tab === 'ALL' ? 'All Configurations' : tab}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Scrollable Column of Floor Plan Cards */}
          <main className="fp-content">
            <div className="fp-grid">
              {filteredPlans.map((plan) => {
                return (
                  <article
                    key={plan.id}
                    className="fp-card"
                    onClick={() => handleFloorPlanClick(plan)}
                  >
                    {/* Clean Header */}
                    <div className="fp-card-head-clean">
                      <span className="fp-card-type-tag">{plan.type} Floor Plan</span>
                      <span className="fp-card-confidential-tag">
                        {hasUnlockedFloorPlans ? '✓ Unlocked' : '🔒 Confidential'}
                      </span>
                    </div>

                    {/* Image Box with Blur and Lock Overlay */}
                    <div className="fp-card-image-wrap">
                      <img
                        src={plan.img}
                        alt={`${p.name} - ${plan.type} Floor Plan`}
                        className={`fp-card-image ${hasUnlockedFloorPlans ? '' : 'blurred'}`}
                        loading="lazy"
                      />
                      {!hasUnlockedFloorPlans ? (
                        <div className="fp-blur-overlay">
                          <span className="fp-lock-cta-text">Unlock Floor Plan</span>
                        </div>
                      ) : (
                        <span className="fp-zoom-hint">🔍 Tap to Zoom</span>
                      )}
                    </div>

                    {/* Footer Action */}
                    <div className="fp-card-footer-clean">
                      <button
                        type="button"
                        className="fp-unlock-action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFloorPlanClick(plan);
                        }}
                      >
                        {hasUnlockedFloorPlans ? (
                          <span>View Full Floor Plan ↗</span>
                        ) : (
                          <span>Unlock Floor Plan ↗</span>
                        )}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </main>
        </div>
      </section>

      {/* 3. PINNED STICKY REVEAL AMENITIES SECTION (DUAL-DIRECTION: EK UPAR, EK NICHE) */}
      <section
        className="amen-pinned-stage"
        id="amenities"
        ref={amenStickyStageRef}
        data-theme="basalt"
        aria-label="Curated Amenities & Lifestyle"
      >
        {/* Card 1: Intro Card (Base Layer) */}
        <div className="amen-intro-layer">
          <div className="df-card-img-wrap">
            <div
              className="df-card-img amen-intro-img"
              style={{ backgroundImage: `url(${amenIntroBg})` }}
            />
          </div>
          <div className="amen-intro-overlay" aria-hidden="true" />
          
          <div className="amen-intro-center-wrap">
            <div className="amen-intro-label">
              Curated Lifestyle & Wellness
            </div>

            <div className="amen-intro-big">
              <span>AMENITIES</span>
            </div>

            <p className="amen-intro-txt">
              Immerse yourself in world-class wellness, leisure, and open-air rooftop experiences crafted with timeless elegance.
            </p>
          </div>

          {/* Curated Amenities in Right Bottom */}
          {projectAmenitiesList.length > 0 && (
            <div className="amen-intro-opp-amenities" aria-label={`${p?.name || 'Project'} amenities list`}>
              <div className="amen-opp-tag">
                <span className="amen-opp-tag-sparkle">✦</span>
                <span>{projectAmenitiesList.length} Curated Amenities</span>
              </div>
              <div className="amen-opp-list">
                {projectAmenitiesList.map((item) => (
                  <div key={item} className="amen-opp-item">
                    <span className="amen-opp-dot" aria-hidden="true" />
                    <span className="amen-opp-name">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Subsequent Cards: 2-by-2 Amenity Pairs (Dual-Direction Up/Down Reveal) */}
        {amenityPairs.map((pair, pIdx) => (
          <div
            key={pair.id}
            className={`amen-pair-layer amen-pair--${pIdx + 1}`}
          >
            {/* Left Amenity Pane */}
            <div className="amen-pane amen-pane-left">
              <div
                className="amen-pane-img"
                style={{ backgroundImage: `url(${pair.left.image})` }}
              />
              <div className="amen-pane-hud">
                <h3 className="amen-pane-title">{pair.left.title}</h3>
              </div>
            </div>

            {/* Right Amenity Pane */}
            <div className="amen-pane amen-pane-right">
              <div
                className="amen-pane-img"
                style={{ backgroundImage: `url(${pair.right.image})` }}
              />
              <div className="amen-pane-hud">
                <h3 className="amen-pane-title">{pair.right.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 4. AT A GLANCE & IN NUMBERS */}
      <section className="sec" style={{ background: 'var(--ink2)' }} data-theme="basalt" aria-label="At a glance facts">
        <p className="mi">At a glance</p>
        <h2 id="ft">
          {p.name}, <em>in numbers.</em>
        </h2>

        <div className="facts" id="facts">
          <div>
            <span className="mi">Location</span>
            <b>{p.area || 'Malad East'}</b>
          </div>
          <div>
            <span className="mi">Status</span>
            <b>{statusDisplay}</b>
          </div>
          <div>
            <span className="mi">Homes</span>
            <b>{configLong(p) || '1, 2 and 3 BHK'}</b>
          </div>
          <div>
            <span className="mi">Floors</span>
            <b>{totalFloors} Floors</b>
          </div>
          {p.carpetArea && (
            <div>
              <span className="mi">Carpet Area</span>
              <b>{p.carpetArea}</b>
            </div>
          )}
          {p.rera && (
            <div>
              <span className="mi">MahaRERA</span>
              <b>{p.rera}</b>
            </div>
          )}
        </div>

        {/* CTA Contact & Next Project */}
        <div className="cta-row">
          <a className="btn s" href={`tel:${company.phone || '+919326287741'}`}>
            Call {company.phoneDisplay || '+91 93262 87741'}
          </a>
          <a
            className="btn"
            href={`https://wa.me/919326287741?text=Hello+VIR+Group%2C+I+would+like+to+know+more+about+${encodeURIComponent(p.name)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          {next && (
            <Link className="btn mi" to={`/projects/${next.slug}`}>
              Next · {next.name} →
            </Link>
          )}
        </div>

        <p className="mi" style={{ marginTop: '3rem', color: 'var(--mute)' }}>
          {p.disclaimer || 'Artistic impression. Architectural specifications and amenities are subject to approvals.'}
        </p>
      </section>

      {/* Floor Plan Lightbox Modal */}
      {modalPlan && (
        <div
          className="fp-modal-backdrop"
          onClick={() => setModalPlan(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="fp-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="fp-modal-close"
              onClick={() => setModalPlan(null)}
              aria-label="Close modal"
            >
              ✕
            </button>
            <div className="fp-modal-head">
              <span className="fp-card-type">{modalPlan.type}</span>
              <h3>{modalPlan.type} Floor Plan</h3>
            </div>
            <div className="fp-modal-img-container">
              <img
                src={modalPlan.img}
                alt={`${p.name} - ${modalPlan.type} Floor Plan`}
                className="fp-modal-full-img"
              />
            </div>
            <div className="fp-modal-foot">
              <a
                href={`https://wa.me/919326287741?text=Hi%2C+I+want+to+schedule+a+site+visit+for+${encodeURIComponent(p.name)}+${encodeURIComponent(modalPlan.type)}+Floor+Plan`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-solid"
              >
                Schedule Site Visit ↗
              </a>
              <a
                href={`https://wa.me/919326287741?text=Hi%2C+please+share+high-res+PDF+floor+plan+for+${encodeURIComponent(p.name)}+${encodeURIComponent(modalPlan.type)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Request High-Res PDF
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Enquiry Modal using PopupForm */}
      <PopupForm
        isOpen={popupOpen}
        onClose={() => {
          setPopupOpen(false);
          setSelectedPlanForEnquiry(null);
          setIsBrochureRequest(false);
        }}
        onSuccess={() => {
          if (isBrochureRequest) {
            if (p.brochureUrl) {
              window.open(p.brochureUrl, '_blank');
            } else {
              window.open(
                `https://wa.me/919326287741?text=Hello+VIR+Group%2C+please+share+the+brochure+for+${encodeURIComponent(p.name)}`,
                '_blank'
              );
            }
            setIsBrochureRequest(false);
          } else if (selectedPlanForEnquiry) {
            setHasUnlockedFloorPlans(true);
            try {
              sessionStorage.setItem('vir_floorplan_unlocked', 'true');
            } catch {}
            setModalPlan(selectedPlanForEnquiry);
            setSelectedPlanForEnquiry(null);
          }
        }}
        title={
          isBrochureRequest
            ? `Download Brochure · ${p.name}`
            : selectedPlanForEnquiry
            ? `Unlock ${selectedPlanForEnquiry.type || ''} Floor Plan`
            : `Enquire for ${p.name}`
        }
        subtitle={`${p.name} · ${p.area || 'Mumbai'}`}
        defaultProject={p.name}
        defaultSubject={
          isBrochureRequest
            ? `Brochure Download Request: ${p.name}`
            : selectedPlanForEnquiry
            ? `Floor Plan Request: ${p.name} (${selectedPlanForEnquiry.type || 'Configuration'})`
            : `Project Enquiry: ${p.name}`
        }
      />
    </div>
  );
}