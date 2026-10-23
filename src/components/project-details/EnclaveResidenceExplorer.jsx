import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/animations/gsap';
import { getMediaUrl } from '@/lib/media';

export const ENCLAVE_FLOORS = [
  {
    level: 14,
    label: 'LEVEL 14',
    config: '3 BHK PENTHOUSE · SKY RESIDENCES',
    sold: 2,
    available: 1,
    isSoldOut: false,
    carpet: '1,120 – 1,350 sq.ft',
    units: [
      { id: '1401', name: 'Unit 1401', type: '3 BHK Luxury', carpet: '1,120 sq.ft', status: 'Sold', wing: 'West Wing' },
      { id: '1402', name: 'Unit 1402', type: '3 BHK Penthouse', carpet: '1,350 sq.ft', status: 'Available', wing: 'East Wing' },
      { id: '1403', name: 'Unit 1403', type: '3 BHK Sky Deck', carpet: '1,210 sq.ft', status: 'Sold', wing: 'South Wing' },
      { id: '1404', name: 'Unit 1404', type: 'Private Terrace', carpet: '950 sq.ft', status: 'Sold', wing: 'North Wing' },
    ],
    highlights: 'Private Sky Terrace · Highest Elevation · Panoramic Borivali Skyline Views',
  },
  {
    level: 13,
    label: 'LEVEL 13',
    config: '2 BHK LUXURY · 3 BHK GRANDE',
    sold: 3,
    available: 1,
    isSoldOut: false,
    carpet: '820 – 1,080 sq.ft',
    units: [
      { id: '1301', name: 'Unit 1301', type: '2 BHK Luxury', carpet: '820 sq.ft', status: 'Sold', wing: 'West Wing' },
      { id: '1302', name: 'Unit 1302', type: '3 BHK Grande', carpet: '1,080 sq.ft', status: 'Available', wing: 'East Wing' },
      { id: '1303', name: 'Unit 1303', type: '2 BHK Corner', carpet: '840 sq.ft', status: 'Sold', wing: 'South Wing' },
      { id: '1304', name: 'Unit 1304', type: '2 BHK Deck', carpet: '790 sq.ft', status: 'Sold', wing: 'North Wing' },
    ],
    highlights: 'Double Balconies · Sunset Western Exposure · Italian Marble Living',
  },
  {
    level: 12,
    label: 'LEVEL 12',
    config: '2 BHK · 3 BHK ELITE',
    sold: 3,
    available: 1,
    isSoldOut: false,
    carpet: '780 – 1,020 sq.ft',
    units: [
      { id: '1201', name: 'Unit 1201', type: '2 BHK Elite', carpet: '780 sq.ft', status: 'Available', wing: 'West Wing' },
      { id: '1202', name: 'Unit 1202', type: '3 BHK Elite', carpet: '1,020 sq.ft', status: 'Sold', wing: 'East Wing' },
      { id: '1203', name: 'Unit 1203', type: '2 BHK Prime', carpet: '760 sq.ft', status: 'Sold', wing: 'South Wing' },
      { id: '1204', name: 'Unit 1204', type: '2 BHK Standard', carpet: '740 sq.ft', status: 'Sold', wing: 'North Wing' },
    ],
    highlights: 'Unobstructed Western Sea Breeze · Zero Wastage Layout',
  },
  {
    level: 11,
    label: 'LEVEL 11',
    config: '1 BHK · 2 BHK · 3 BHK',
    sold: 4,
    available: 0,
    isSoldOut: true,
    carpet: '510 – 980 sq.ft',
    units: [
      { id: '1101', name: 'Unit 1101', type: '1 BHK', carpet: '510 sq.ft', status: 'Sold', wing: 'West Wing' },
      { id: '1102', name: 'Unit 1102', type: '2 BHK', carpet: '750 sq.ft', status: 'Sold', wing: 'East Wing' },
      { id: '1103', name: 'Unit 1103', type: '2 BHK', carpet: '780 sq.ft', status: 'Sold', wing: 'South Wing' },
      { id: '1104', name: 'Unit 1104', type: '3 BHK', carpet: '980 sq.ft', status: 'Sold', wing: 'North Wing' },
    ],
    highlights: 'Fully Sold Out · Contact Sales For Resale Registrations',
  },
  {
    level: 10,
    label: 'LEVEL 10',
    config: '1 BHK · 2 BHK LUXE',
    sold: 3,
    available: 2,
    isSoldOut: false,
    carpet: '520 – 860 sq.ft',
    units: [
      { id: '1001', name: 'Unit 1001', type: '1 BHK Prime', carpet: '520 sq.ft', status: 'Available', wing: 'West Wing' },
      { id: '1002', name: 'Unit 1002', type: '2 BHK Luxe', carpet: '860 sq.ft', status: 'Sold', wing: 'East Wing' },
      { id: '1003', name: 'Unit 1003', type: '2 BHK Luxe', carpet: '840 sq.ft', status: 'Available', wing: 'South Wing' },
      { id: '1004', name: 'Unit 1004', type: '1 BHK Smart', carpet: '510 sq.ft', status: 'Sold', wing: 'North Wing' },
    ],
    highlights: 'High Floor Open Views · Natural Cross Ventilation · Vastu Compliant',
  },
  {
    level: 9,
    label: 'LEVEL 09',
    config: '1 BHK · 1 BHK + STUDY · 2 BHK',
    sold: 4,
    available: 1,
    isSoldOut: false,
    carpet: '510 – 810 sq.ft',
    units: [
      { id: '901', name: 'Unit 901', type: '1 BHK', carpet: '510 sq.ft', status: 'Sold', wing: 'West Wing' },
      { id: '902', name: 'Unit 902', type: '1 BHK + Study', carpet: '620 sq.ft', status: 'Available', wing: 'East Wing' },
      { id: '903', name: 'Unit 903', type: '2 BHK Prime', carpet: '810 sq.ft', status: 'Sold', wing: 'South Wing' },
      { id: '904', name: 'Unit 904', type: '1 BHK Cozy', carpet: '495 sq.ft', status: 'Sold', wing: 'North Wing' },
    ],
    highlights: 'Dedicated Work-From-Home Study Alcove · East-West Facing',
  },
  {
    level: 8,
    label: 'LEVEL 08',
    config: '2 BHK · 3 BHK',
    sold: 3,
    available: 2,
    isSoldOut: false,
    carpet: '760 – 1,040 sq.ft',
    units: [
      { id: '801', name: 'Unit 801', type: '2 BHK Luxe', carpet: '760 sq.ft', status: 'Available', wing: 'West Wing' },
      { id: '802', name: 'Unit 802', type: '3 BHK Grande', carpet: '1,040 sq.ft', status: 'Available', wing: 'East Wing' },
      { id: '803', name: 'Unit 803', type: '2 BHK Comfort', carpet: '740 sq.ft', status: 'Sold', wing: 'South Wing' },
      { id: '804', name: 'Unit 804', type: '2 BHK Prime', carpet: '780 sq.ft', status: 'Sold', wing: 'North Wing' },
    ],
    highlights: 'Generous Living Deck · Master Bedroom Walk-In Closet Wardrobe Area',
  },
  {
    level: 7,
    label: 'LEVEL 07',
    config: '1 BHK · 2 BHK · 2 BHK + DECK',
    sold: 4,
    available: 1,
    isSoldOut: false,
    carpet: '510 – 820 sq.ft',
    units: [
      { id: '701', name: 'Unit 701', type: '1 BHK Prime', carpet: '510 sq.ft', status: 'Sold', wing: 'West Wing' },
      { id: '702', name: 'Unit 702', type: '2 BHK', carpet: '760 sq.ft', status: 'Sold', wing: 'East Wing' },
      { id: '703', name: 'Unit 703', type: '2 BHK + Deck', carpet: '820 sq.ft', status: 'Available', wing: 'South Wing' },
      { id: '704', name: 'Unit 704', type: '1 BHK Deluxe', carpet: '530 sq.ft', status: 'Sold', wing: 'North Wing' },
    ],
    highlights: 'Full-Length Viewing Deck · Premium Fixtures & Sanitary Ware',
  },
  {
    level: 6,
    label: 'LEVEL 06',
    config: '1 BHK · 1 BHK + STUDY · 2 BHK + MAID ROOM',
    sold: 4,
    available: 2,
    isSoldOut: false,
    carpet: '495 – 890 sq.ft',
    units: [
      { id: '601', name: 'Unit 601', type: '1 BHK Smart', carpet: '495 sq.ft', status: 'Available', wing: 'West Wing' },
      { id: '602', name: 'Unit 602', type: '1 BHK + Study', carpet: '610 sq.ft', status: 'Sold', wing: 'East Wing' },
      { id: '603', name: 'Unit 603', type: '2 BHK + Maid Room', carpet: '890 sq.ft', status: 'Available', wing: 'South Wing' },
      { id: '604', name: 'Unit 604', type: '1 BHK Prime', carpet: '515 sq.ft', status: 'Sold', wing: 'North Wing' },
    ],
    highlights: 'Dual Aspect Corner Residences · Optimal Daylight · Private Sundeck',
  },
  {
    level: 5,
    label: 'LEVEL 05',
    config: '1 BHK · 2 BHK SMART · 2 BHK PREMIUM',
    sold: 3,
    available: 2,
    isSoldOut: false,
    carpet: '490 – 780 sq.ft',
    units: [
      { id: '501', name: 'Unit 501', type: '1 BHK', carpet: '490 sq.ft', status: 'Sold', wing: 'West Wing' },
      { id: '502', name: 'Unit 502', type: '2 BHK Smart', carpet: '720 sq.ft', status: 'Available', wing: 'East Wing' },
      { id: '503', name: 'Unit 503', type: '2 BHK Premium', carpet: '780 sq.ft', status: 'Available', wing: 'South Wing' },
      { id: '504', name: 'Unit 504', type: '1 BHK Standard', carpet: '500 sq.ft', status: 'Sold', wing: 'North Wing' },
    ],
    highlights: 'Contemporary Smart Layouts · Acoustic Glazed French Windows',
  },
  {
    level: 4,
    label: 'LEVEL 04',
    config: '1 BHK · 2 BHK LUXE',
    sold: 4,
    available: 1,
    isSoldOut: false,
    carpet: '490 – 750 sq.ft',
    units: [
      { id: '401', name: 'Unit 401', type: '1 BHK', carpet: '490 sq.ft', status: 'Sold', wing: 'West Wing' },
      { id: '402', name: 'Unit 402', type: '2 BHK Luxe', carpet: '750 sq.ft', status: 'Available', wing: 'East Wing' },
      { id: '403', name: 'Unit 403', type: '2 BHK Prime', carpet: '730 sq.ft', status: 'Sold', wing: 'South Wing' },
      { id: '404', name: 'Unit 404', type: '1 BHK Standard', carpet: '505 sq.ft', status: 'Sold', wing: 'North Wing' },
    ],
    highlights: 'Tree Canopy Green Views · Private Bedroom Balconies',
  },
  {
    level: 3,
    label: 'LEVEL 03',
    config: '1 BHK · 2 BHK · 3 BHK',
    sold: 5,
    available: 1,
    isSoldOut: false,
    carpet: '490 – 960 sq.ft',
    units: [
      { id: '301', name: 'Unit 301', type: '1 BHK', carpet: '490 sq.ft', status: 'Sold', wing: 'West Wing' },
      { id: '302', name: 'Unit 302', type: '2 BHK', carpet: '720 sq.ft', status: 'Sold', wing: 'East Wing' },
      { id: '303', name: 'Unit 303', type: '3 BHK Grande', carpet: '960 sq.ft', status: 'Available', wing: 'South Wing' },
      { id: '304', name: 'Unit 304', type: '1 BHK Cozy', carpet: '505 sq.ft', status: 'Sold', wing: 'North Wing' },
    ],
    highlights: 'Quick Podium Amenity Access · Spacious Dining and Living Rooms',
  },
  {
    level: 2,
    label: 'LEVEL 02',
    config: '1 BHK COZY · 2 BHK PRIME',
    sold: 4,
    available: 2,
    isSoldOut: false,
    carpet: '480 – 740 sq.ft',
    units: [
      { id: '201', name: 'Unit 201', type: '1 BHK Cozy', carpet: '480 sq.ft', status: 'Available', wing: 'West Wing' },
      { id: '202', name: 'Unit 202', type: '2 BHK Prime', carpet: '740 sq.ft', status: 'Available', wing: 'East Wing' },
      { id: '203', name: 'Unit 203', type: '2 BHK Standard', carpet: '710 sq.ft', status: 'Sold', wing: 'South Wing' },
      { id: '204', name: 'Unit 204', type: '1 BHK Smart', carpet: '495 sq.ft', status: 'Sold', wing: 'North Wing' },
    ],
    highlights: 'Low Rise Convenience · Sound-Dampened Double Glazing',
  },
  {
    level: 1,
    label: 'LEVEL 01',
    config: '1 BHK GARDEN VIEW · 2 BHK PRIME',
    sold: 3,
    available: 2,
    isSoldOut: false,
    carpet: '480 – 750 sq.ft',
    units: [
      { id: '101', name: 'Unit 101', type: '1 BHK Garden View', carpet: '480 sq.ft', status: 'Available', wing: 'West Wing' },
      { id: '102', name: 'Unit 102', type: '2 BHK Prime', carpet: '750 sq.ft', status: 'Available', wing: 'East Wing' },
      { id: '103', name: 'Unit 103', type: '1 BHK Standard', carpet: '490 sq.ft', status: 'Sold', wing: 'South Wing' },
      { id: '104', name: 'Unit 104', type: '2 BHK Standard', carpet: '720 sq.ft', status: 'Sold', wing: 'North Wing' },
    ],
    highlights: 'Overlooks Landscaped Podium Greens · High 10.5 ft Ceilings',
  },
];

// Explicit calibrated top percentages for all 14 residential levels on VIR-Enclave.png
const FLOOR_TOP_PERCENTAGES = {
  14: 12.0, // Penthouse / Top Floor
  13: 16.2,
  12: 21.3,
  11: 25.2,
  10: 30.1,
  9: 35.0,
  8: 39.8,
  7: 44.7,
  6: 49.5,
  5: 54.4,
  4: 59.2,
  3: 63.0, // Calibrated Level 03
  2: 70.0,
  1: 74.0, // Level 01 directly above podium
};

const getFloorTopPercent = (level) => {
  return FLOOR_TOP_PERCENTAGES[level] ?? (63 - (level - 3) * 3.9);
};

export function EnclaveResidenceExplorer({ p, status, config, projectSlug = 'vir-enclave', onContinue }) {
  const [activeFloor, setActiveFloor] = useState(7);
  const [isFloorExpanded, setIsFloorExpanded] = useState(false);
  const [hoveredUnit, setHoveredUnit] = useState(null);
  const [modalUnit, setModalUnit] = useState(null);

  const wrapperRef = useRef(null);
  const heroLayerRef = useRef(null);
  const explorerLayerRef = useRef(null);

  const currentFloorData = ENCLAVE_FLOORS.find((f) => f.level === activeFloor) || ENCLAVE_FLOORS[7];
  const units = currentFloorData.units || [];
  const u1 = units[0] || { id: `${activeFloor}01`, type: '2 BHK', carpet: '780 sq.ft', status: 'Available' };
  const u2 = units[1] || { id: `${activeFloor}02`, type: '1 BHK', carpet: '520 sq.ft', status: 'Available' };
  const u3 = units[2] || { id: `${activeFloor}03`, type: '2 BHK', carpet: '820 sq.ft', status: 'Sold' };
  const u4 = units[3] || { id: `${activeFloor}04`, type: '3 BHK', carpet: '980 sq.ft', status: 'Sold' };

  const enquire = `/contact?project=${projectSlug}`;

  // GSAP ScrollTrigger to crossfade text while keeping the background image 100% fixed
useGSAP(
  () => {
    const wrapper = wrapperRef.current;
    const hero = heroLayerRef.current;
    const explorer = explorerLayerRef.current;

    if (!wrapper || !hero || !explorer) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: '+=100%',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        hero,
        {
          opacity: 0,
          y: -50,
          ease: 'none',
          duration: 1,
        },
        0,
      );

      tl.fromTo(
        explorer,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          ease: 'none',
          duration: 1,
        },
        0.3,
      );
    });

    return () => mm.revert();
  },
  { scope: wrapperRef },
);


  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    } else {
      const nextSec = document.getElementById('enclave-details') || document.querySelector('.sec');
      if (nextSec) {
        nextSec.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenFloor = (lvl) => {
    setActiveFloor(lvl);
    setIsFloorExpanded(true);
  };

  return (
    <section
      className="enclave-hero-explorer-wrapper"
      ref={wrapperRef}
      data-theme="basalt"
      data-hero="true"
      aria-label="VIR Enclave Overview and Residences"
    >
      <div className={`enclave-sticky-stage ${isFloorExpanded ? 'is-floor-view' : ''}`}>
        {/* SINGLE FIXED BACKGROUND IMAGE - NEVER DUPLICATED */}
        <div className="enclave-exp-bg-wrap">
          <img
            src={getMediaUrl("/media/projects/project-detail/VIR-Enclave.png")}
            alt="VIR Enclave Tower Architecture"
            className="enclave-exp-bg-img"
          />
          <div className={`enclave-exp-overlay ${isFloorExpanded ? 'is-dimmed' : ''}`} />
        </div>

        {/* Vertical Architectural Guide Lines */}
        <div className="enclave-exp-guide-line enclave-exp-guide-left" />
        <div className="enclave-exp-guide-line enclave-exp-guide-right" />

        {/* LAYER 1: HERO VIEW (Visible at scroll 0, fades out on scroll) */}
        {p && (
          <div className="enclave-hero-layer dhero" ref={heroLayerRef} data-theme="basalt" data-hero="true">
            <div className="wrap in">
              <p className="hero-since" data-intro style={{ marginBottom: 20 }}>
                {status}
                {p.hero?.artisticImpression ? ' · Artistic impression' : ''}
              </p>
              <h1 id="dh" className="t-display" aria-label={p.name}>
                <span className="line" aria-hidden="true">
                  <span>{p.name}</span>
                </span>
              </h1>
              <div className="dmeta" data-intro>
                <span>{p.area}, Mumbai</span>
                {config && <span>{config}</span>}
                {p.rera && <span>MahaRERA No. {p.rera}</span>}
              </div>
              {p.tagline && (
                <p className="tagline" data-intro>
                  {p.tagline}
                </p>
              )}
              <div className="actions" data-intro>
                <Button href={`${enquire}&subject=Site%20visit`} variant="solid" event="project_enquiry">
                  Schedule site visit
                </Button>
                {p.brochureUrl ? (
                  <Button href={p.brochureUrl} variant="ghost" event="brochure_download">
                    Download brochure
                  </Button>
                ) : (
                  <Button href={`${enquire}&subject=Brochure%20request`} variant="ghost" event="brochure_download">
                    Request brochure
                  </Button>
                )}
                <Button href="tel:+919326287741" variant="ghost" event="phone_click">
                  Contact now
                </Button>
              </div>
              <p className="crumbs" data-intro style={{ marginTop: '24px', marginBottom: 0 }}>
                <Link to="/projects">Projects</Link>
                <span>/</span>
                <span>{p.name}</span>
              </p>
            </div>
          </div>
        )}

        {/* LAYER 2: EXPLORER VIEW (Animates in on scroll) */}
        <div className="enclave-explorer-layer" ref={explorerLayerRef}>
          {/* Left Column: Heading and Dynamic Active Floor Details */}
          <div className="enclave-exp-left">
            {isFloorExpanded ? (
              <button
                type="button"
                className="enclave-back-to-elev-btn"
                onClick={() => setIsFloorExpanded(false)}
              >
                <span className="back-arrow">←</span> BACK TO ELEVATION
              </button>
            ) : (
              <>
                <h2 className="enclave-exp-title">
                  EXPLORE<br />RESIDENCES
                </h2>
                <p className="enclave-exp-subtitle">
                  SELECT A LEVEL TO DISCOVER THE RESIDENCES.
                </p>
              </>
            )}

            <div className="enclave-exp-level-detail" key={activeFloor}>
              <h3 className="enclave-exp-level-name">
                LEVEL {String(activeFloor).padStart(2, '0')}
              </h3>
              <p className="enclave-exp-level-config">
                {currentFloorData.config}
              </p>
              <p className="enclave-exp-level-status">
                {currentFloorData.sold} SOLD · {currentFloorData.available} AVAILABLE
              </p>
            </div>
          </div>

          {/* VIEW MODE 1: Building Tower Elevation View */}
          {!isFloorExpanded && (
            <>
              {/* Center Tower Interactive Hitbox Area */}
              <div className="enclave-exp-tower-area">
                {ENCLAVE_FLOORS.map((f) => {
                  const topPercent = getFloorTopPercent(f.level);
                  return (
                    <div
                      key={f.level}
                      className={`enclave-exp-hitbox ${activeFloor === f.level ? 'is-active' : ''}`}
                      style={{
                        top: `${topPercent - 2}%`,
                        height: '4%',
                      }}
                      onMouseEnter={() => setActiveFloor(f.level)}
                      onClick={() => handleOpenFloor(f.level)}
                      title={`Click to open Level ${f.level} residence plan`}
                    />
                  );
                })}
              </div>

              {/* Center Floor Highlight Scanner Band */}
              <div
                className="enclave-scanner-band"
                style={{ top: `${getFloorTopPercent(activeFloor)}%` }}
                onClick={() => handleOpenFloor(activeFloor)}
              >
                <span className="enclave-scanner-level-tag">
                  {String(activeFloor).padStart(2, '0')}
                </span>

                <button
                  type="button"
                  className="enclave-scanner-pill-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenFloor(activeFloor);
                  }}
                  aria-label={`Open Level ${String(activeFloor).padStart(2, '0')} residence plan`}
                >
                  OPEN LEVEL {String(activeFloor).padStart(2, '0')}
                </button>
              </div>
            </>
          )}

          {/* Right Rail: Vertical Floor Selector */}
          <div className="enclave-exp-rail" role="list" aria-label="Floor selector">
            {ENCLAVE_FLOORS.map((f) => {
              const isActive = activeFloor === f.level;
              return (
                <button
                  type="button"
                  key={f.level}
                  className={`enclave-rail-item ${isActive ? 'is-active' : ''} ${f.isSoldOut ? 'is-sold' : ''}`}
                  style={{ top: `${getFloorTopPercent(f.level)}%` }}
                  onMouseEnter={() => setActiveFloor(f.level)}
                  onClick={() => {
                    setActiveFloor(f.level);
                  }}
                  aria-label={`Select level ${f.level}`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span className="enclave-rail-num">{String(f.level).padStart(2, '0')}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Center Controls */}
          <div className="enclave-exp-bottom">
            <p className="enclave-exp-bottom-hint">
              {isFloorExpanded ? 'SELECT A RESIDENCE TO ENQUIRE' : 'OPEN A RESIDENCE TO CARRY ON'}
            </p>
            <button
              type="button"
              className="enclave-exp-continue-btn"
              onClick={handleContinue}
            >
              CONTINUE WITHOUT EXPLORING ↓
            </button>
          </div>
        </div>

        {/* VIEW MODE 2: Floor Plate Architectural Layout View */}
        {isFloorExpanded && (
          <div className="enclave-floorplate-stage" key={`fp-${activeFloor}`}>
            <div className="enclave-floorplate-container">
              <svg
                viewBox="0 0 840 440"
                className="enclave-floorplate-svg"
                aria-label={`Level ${activeFloor} architectural floor plate`}
              >
                <defs>
                  {/* Diagonal Blueprint Hatch Patterns */}
                  <pattern id="hatch-blue" width="14" height="14" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="14" stroke="rgba(59, 130, 246, 0.75)" strokeWidth="2.5" />
                  </pattern>
                  <pattern id="hatch-cyan" width="14" height="14" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="14" stroke="rgba(6, 182, 212, 0.75)" strokeWidth="2.5" />
                  </pattern>
                  <pattern id="hatch-green" width="14" height="14" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="14" stroke="rgba(16, 185, 129, 0.75)" strokeWidth="2.5" />
                  </pattern>
                  <pattern id="hatch-emerald" width="14" height="14" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="14" stroke="rgba(5, 150, 105, 0.75)" strokeWidth="2.5" />
                  </pattern>
                </defs>

                {/* Architectural Grid lines */}
                <line x1="40" y1="40" x2="800" y2="40" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                <line x1="40" y1="400" x2="800" y2="400" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />

                {/* Central Core Structure */}
                <g className="core-group">
                  <rect x="290" y="60" width="260" height="320" rx="12" fill="rgba(15, 23, 42, 0.92)" stroke="rgba(148, 163, 184, 0.45)" strokeWidth="1.5" />

                  {/* Corridors and Lobby */}
                  <rect x="300" y="240" width="240" height="70" rx="6" fill="rgba(30, 41, 59, 0.95)" stroke="rgba(148, 163, 184, 0.3)" />
                  <text x="420" y="280" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontWeight="600" letterSpacing="0.12em">
                    LIFT LOBBY & CORRIDOR
                  </text>

                  {/* Elevator Shafts */}
                  <g className="elevator">
                    <rect x="320" y="130" width="85" height="90" rx="4" fill="rgba(24, 32, 47, 0.95)" stroke="rgba(148, 163, 184, 0.6)" strokeWidth="1.5" />
                    <line x1="320" y1="130" x2="405" y2="220" stroke="rgba(148, 163, 184, 0.25)" />
                    <line x1="405" y1="130" x2="320" y2="220" stroke="rgba(148, 163, 184, 0.25)" />
                    <text x="362" y="180" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700">LIFT 1</text>
                  </g>

                  <g className="elevator">
                    <rect x="435" y="130" width="85" height="90" rx="4" fill="rgba(24, 32, 47, 0.95)" stroke="rgba(148, 163, 184, 0.6)" strokeWidth="1.5" />
                    <line x1="435" y1="130" x2="520" y2="220" stroke="rgba(148, 163, 184, 0.25)" />
                    <line x1="520" y1="130" x2="435" y2="220" stroke="rgba(148, 163, 184, 0.25)" />
                    <text x="477" y="180" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700">LIFT 2</text>
                  </g>

                  {/* Stairwell */}
                  <rect x="330" y="320" width="180" height="45" rx="4" fill="rgba(30, 41, 59, 0.7)" stroke="rgba(148, 163, 184, 0.3)" />
                  <text x="420" y="348" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" letterSpacing="0.1em">FIRE EXIT STAIRCASE</text>
                </g>

                {/* UNIT 01: Upper Left (Blue Hatch) */}
                <g
                  className={`fp-unit fp-unit-blue ${hoveredUnit?.id === u1.id ? 'is-hovered' : ''}`}
                  onMouseEnter={() => setHoveredUnit(u1)}
                  onMouseLeave={() => setHoveredUnit(null)}
                  onClick={() => setModalUnit(u1)}
                  cursor="pointer"
                >
                  <rect x="40" y="50" width="240" height="170" rx="14" fill="rgba(30, 64, 175, 0.32)" stroke="rgba(59, 130, 246, 0.85)" strokeWidth="2" />
                  <rect x="40" y="50" width="240" height="170" rx="14" fill="url(#hatch-blue)" />

                  {/* Balcony Deck */}
                  <path d="M 40 50 L 10 50 L 10 120 L 40 120" fill="none" stroke="rgba(59, 130, 246, 0.6)" strokeDasharray="3 3" strokeWidth="1.5" />

                  {/* Unit Tag Pill */}
                  <rect x="75" y="115" width="170" height="36" rx="18" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(59, 130, 246, 0.9)" strokeWidth="1.5" />
                  <text x="160" y="137" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700" letterSpacing="0.04em">
                    {u1.name} · {u1.type}
                  </text>
                </g>

                {/* UNIT 02: Upper Right (Cyan Hatch) */}
                <g
                  className={`fp-unit fp-unit-cyan ${hoveredUnit?.id === u2.id ? 'is-hovered' : ''}`}
                  onMouseEnter={() => setHoveredUnit(u2)}
                  onMouseLeave={() => setHoveredUnit(null)}
                  onClick={() => setModalUnit(u2)}
                  cursor="pointer"
                >
                  <rect x="560" y="50" width="240" height="170" rx="14" fill="rgba(6, 182, 212, 0.32)" stroke="rgba(34, 211, 238, 0.85)" strokeWidth="2" />
                  <rect x="560" y="50" width="240" height="170" rx="14" fill="url(#hatch-cyan)" />

                  {/* Balcony Deck */}
                  <path d="M 800 50 L 830 50 L 830 120 L 800 120" fill="none" stroke="rgba(34, 211, 238, 0.6)" strokeDasharray="3 3" strokeWidth="1.5" />

                  {/* Unit Tag Pill */}
                  <rect x="595" y="115" width="170" height="36" rx="18" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(34, 211, 238, 0.9)" strokeWidth="1.5" />
                  <text x="680" y="137" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700" letterSpacing="0.04em">
                    {u2.name} · {u2.type}
                  </text>
                </g>

                {/* UNIT 03: Lower Left (Green Hatch) */}
                <g
                  className={`fp-unit fp-unit-green ${hoveredUnit?.id === u3.id ? 'is-hovered' : ''}`}
                  onMouseEnter={() => setHoveredUnit(u3)}
                  onMouseLeave={() => setHoveredUnit(null)}
                  onClick={() => setModalUnit(u3)}
                  cursor="pointer"
                >
                  <rect x="40" y="235" width="240" height="165" rx="14" fill="rgba(16, 185, 129, 0.3)" stroke="rgba(52, 211, 153, 0.85)" strokeWidth="2" />
                  <rect x="40" y="235" width="240" height="165" rx="14" fill="url(#hatch-green)" />

                  {/* Unit Tag Pill */}
                  <rect x="75" y="300" width="170" height="36" rx="18" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(52, 211, 153, 0.9)" strokeWidth="1.5" />
                  <text x="160" y="322" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700" letterSpacing="0.04em">
                    {u3.name} · {u3.type}
                  </text>
                </g>

                {/* UNIT 04: Lower Right (Emerald Hatch) */}
                <g
                  className={`fp-unit fp-unit-emerald ${hoveredUnit?.id === u4.id ? 'is-hovered' : ''}`}
                  onMouseEnter={() => setHoveredUnit(u4)}
                  onMouseLeave={() => setHoveredUnit(null)}
                  onClick={() => setModalUnit(u4)}
                  cursor="pointer"
                >
                  <rect x="560" y="235" width="240" height="165" rx="14" fill="rgba(5, 150, 105, 0.3)" stroke="rgba(16, 185, 129, 0.85)" strokeWidth="2" />
                  <rect x="560" y="235" width="240" height="165" rx="14" fill="url(#hatch-emerald)" />

                  {/* Unit Tag Pill */}
                  <rect x="595" y="300" width="170" height="36" rx="18" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(16, 185, 129, 0.9)" strokeWidth="1.5" />
                  <text x="680" y="322" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700" letterSpacing="0.04em">
                    {u4.name} · {u4.type}
                  </text>
                </g>

                {/* Top Center Pill Button: VIEW RESIDENCE PLAN */}
                <g
                  className="fp-center-cta-btn"
                  onClick={() => setModalUnit(u1)}
                  cursor="pointer"
                >
                  <rect x="330" y="75" width="180" height="34" rx="17" fill="rgba(255, 255, 255, 0.15)" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1.2" />
                  <text x="420" y="96" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700" letterSpacing="0.1em">
                    VIEW RESIDENCE PLAN
                  </text>
                </g>
              </svg>

              {/* Hovered Unit Floating Details Strip */}
              {hoveredUnit && (
                <div className="enclave-fp-tooltip">
                  <span className="tooltip-unit-name">{hoveredUnit.name}</span>
                  <span className="tooltip-unit-sep">·</span>
                  <span className="tooltip-unit-type">{hoveredUnit.type}</span>
                  <span className="tooltip-unit-sep">·</span>
                  <span className="tooltip-unit-carpet">{hoveredUnit.carpet}</span>
                  <span className="tooltip-unit-sep">·</span>
                  <span className={`tooltip-unit-status ${hoveredUnit.status.toLowerCase()}`}>
                    {hoveredUnit.status}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Residence Enquiry Modal when clicking a Unit or View Residence Plan */}
      {modalUnit && (
        <div
          className="enclave-modal-backdrop"
          onClick={() => setModalUnit(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="enclave-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="enclave-modal-close"
              onClick={() => setModalUnit(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="enclave-modal-header">
              <span className="enclave-modal-tag">VIR ENCLAVE · LEVEL {String(activeFloor).padStart(2, '0')}</span>
              <h3 className="enclave-modal-title">
                {modalUnit.name} — {modalUnit.type}
              </h3>
              <p className="enclave-modal-subtitle">
                {modalUnit.wing} · {modalUnit.carpet}
              </p>
            </div>

            <div className="enclave-modal-stats">
              <div className="enclave-modal-stat-box">
                <span className="stat-label">Carpet Area</span>
                <strong className="stat-value">{modalUnit.carpet}</strong>
              </div>
              <div className="enclave-modal-stat-box">
                <span className="stat-label">Status</span>
                <strong className="stat-value">
                  <span className={`unit-status-badge ${modalUnit.status.toLowerCase()}`}>
                    {modalUnit.status}
                  </span>
                </strong>
              </div>
            </div>

            <div className="enclave-modal-section">
              <h4 className="enclave-modal-section-title">Architectural Highlights</h4>
              <p className="enclave-modal-highlights">
                {currentFloorData.highlights}
              </p>
            </div>

            <div className="enclave-modal-actions">
              <Link
                to={`/contact?project=${projectSlug}&level=${activeFloor}&unit=${modalUnit.id}&subject=Site%20Visit%20Unit%20${modalUnit.id}`}
                className="btn btn-solid enclave-modal-btn"
                onClick={() => setModalUnit(null)}
              >
                Schedule Site Visit For {modalUnit.name}
              </Link>
              <Link
                to={`/contact?project=${projectSlug}&level=${activeFloor}&unit=${modalUnit.id}&subject=Floor%20Plan%20Enquiry`}
                className="btn btn-ghost enclave-modal-btn"
                onClick={() => setModalUnit(null)}
              >
                Request Detailed Floor Plan
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
