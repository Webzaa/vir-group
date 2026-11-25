import { useState, useRef, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/animations/gsap';
import { JsonLd, breadcrumbJsonLd, projectJsonLd } from '@/lib/seo/jsonld';
import { opportunity as defaultProject } from '@/data/projects/opportunity';
import { configLong, configShort, statusLabel } from '@/lib/content';
import { getMediaUrl } from '@/lib/media';
import { PopupForm } from '@/components/forms/PopupForm';
import { Button } from '@/components/ui/Button';

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

const FLOOR_TOP_PERCENTAGES = {
  14: 12.0,
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
  3: 63.0,
  2: 70.0,
  1: 74.0,
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
        <div className="enclave-exp-bg-wrap">
          <img
            src={getMediaUrl('/media/projects/project-detail/VIR-Enclave.png')}
            alt="VIR Enclave Tower Architecture"
            className="enclave-exp-bg-img"
          />
          <div className={`enclave-exp-overlay ${isFloorExpanded ? 'is-dimmed' : ''}`} />
        </div>

        <div className="enclave-exp-guide-line enclave-exp-guide-left" />
        <div className="enclave-exp-guide-line enclave-exp-guide-right" />

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
                  <Button href={p.brochureUrl} variant="ghost" event="brochure_download" download={`${p?.name || 'VIR Enclave'} Brochure.pdf`}>
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

        <div className="enclave-explorer-layer" ref={explorerLayerRef}>
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

          {!isFloorExpanded && (
            <>
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

        {isFloorExpanded && (
          <div className="enclave-floorplate-stage" key={`fp-${activeFloor}`}>
            <div className="enclave-floorplate-container">
              <svg
                viewBox="0 0 840 440"
                className="enclave-floorplate-svg"
                aria-label={`Level ${activeFloor} architectural floor plate`}
              >
                <defs>
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

                <line x1="40" y1="40" x2="800" y2="40" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                <line x1="40" y1="400" x2="800" y2="400" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />

                <g className="core-group">
                  <rect x="290" y="60" width="260" height="320" rx="12" fill="rgba(15, 23, 42, 0.92)" stroke="rgba(148, 163, 184, 0.45)" strokeWidth="1.5" />
                  <rect x="300" y="240" width="240" height="70" rx="6" fill="rgba(30, 41, 59, 0.95)" stroke="rgba(148, 163, 184, 0.3)" />
                  <text x="420" y="280" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontWeight="600" letterSpacing="0.12em">
                    LIFT LOBBY & CORRIDOR
                  </text>

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

                  <rect x="330" y="320" width="180" height="45" rx="4" fill="rgba(30, 41, 59, 0.7)" stroke="rgba(148, 163, 184, 0.3)" />
                  <text x="420" y="348" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" letterSpacing="0.1em">FIRE EXIT STAIRCASE</text>
                </g>

                <g
                  className={`fp-unit fp-unit-blue ${hoveredUnit?.id === u1.id ? 'is-hovered' : ''}`}
                  onMouseEnter={() => setHoveredUnit(u1)}
                  onMouseLeave={() => setHoveredUnit(null)}
                  onClick={() => setModalUnit(u1)}
                  cursor="pointer"
                >
                  <rect x="40" y="50" width="240" height="170" rx="14" fill="rgba(30, 64, 175, 0.32)" stroke="rgba(59, 130, 246, 0.85)" strokeWidth="2" />
                  <rect x="40" y="50" width="240" height="170" rx="14" fill="url(#hatch-blue)" />
                  <path d="M 40 50 L 10 50 L 10 120 L 40 120" fill="none" stroke="rgba(59, 130, 246, 0.6)" strokeDasharray="3 3" strokeWidth="1.5" />
                  <rect x="75" y="115" width="170" height="36" rx="18" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(59, 130, 246, 0.9)" strokeWidth="1.5" />
                  <text x="160" y="137" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700" letterSpacing="0.04em">
                    {u1.name} · {u1.type}
                  </text>
                </g>

                <g
                  className={`fp-unit fp-unit-cyan ${hoveredUnit?.id === u2.id ? 'is-hovered' : ''}`}
                  onMouseEnter={() => setHoveredUnit(u2)}
                  onMouseLeave={() => setHoveredUnit(null)}
                  onClick={() => setModalUnit(u2)}
                  cursor="pointer"
                >
                  <rect x="560" y="50" width="240" height="170" rx="14" fill="rgba(6, 182, 212, 0.32)" stroke="rgba(34, 211, 238, 0.85)" strokeWidth="2" />
                  <rect x="560" y="50" width="240" height="170" rx="14" fill="url(#hatch-cyan)" />
                  <path d="M 800 50 L 830 50 L 830 120 L 800 120" fill="none" stroke="rgba(34, 211, 238, 0.6)" strokeDasharray="3 3" strokeWidth="1.5" />
                  <rect x="595" y="115" width="170" height="36" rx="18" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(34, 211, 238, 0.9)" strokeWidth="1.5" />
                  <text x="680" y="137" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700" letterSpacing="0.04em">
                    {u2.name} · {u2.type}
                  </text>
                </g>

                <g
                  className={`fp-unit fp-unit-green ${hoveredUnit?.id === u3.id ? 'is-hovered' : ''}`}
                  onMouseEnter={() => setHoveredUnit(u3)}
                  onMouseLeave={() => setHoveredUnit(null)}
                  onClick={() => setModalUnit(u3)}
                  cursor="pointer"
                >
                  <rect x="40" y="235" width="240" height="165" rx="14" fill="rgba(16, 185, 129, 0.3)" stroke="rgba(52, 211, 153, 0.85)" strokeWidth="2" />
                  <rect x="40" y="235" width="240" height="165" rx="14" fill="url(#hatch-green)" />
                  <rect x="75" y="300" width="170" height="36" rx="18" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(52, 211, 153, 0.9)" strokeWidth="1.5" />
                  <text x="160" y="322" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700" letterSpacing="0.04em">
                    {u3.name} · {u3.type}
                  </text>
                </g>

                <g
                  className={`fp-unit fp-unit-emerald ${hoveredUnit?.id === u4.id ? 'is-hovered' : ''}`}
                  onMouseEnter={() => setHoveredUnit(u4)}
                  onMouseLeave={() => setHoveredUnit(null)}
                  onClick={() => setModalUnit(u4)}
                  cursor="pointer"
                >
                  <rect x="560" y="235" width="240" height="165" rx="14" fill="rgba(5, 150, 105, 0.3)" stroke="rgba(16, 185, 129, 0.85)" strokeWidth="2" />
                  <rect x="560" y="235" width="240" height="165" rx="14" fill="url(#hatch-emerald)" />
                  <rect x="595" y="300" width="170" height="36" rx="18" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(16, 185, 129, 0.9)" strokeWidth="1.5" />
                  <text x="680" y="322" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700" letterSpacing="0.04em">
                    {u4.name} · {u4.type}
                  </text>
                </g>

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

export function Enclave(props) {
  const loaderData = useLoaderData() || {};
  const p = props.p || loaderData.p || defaultProject;
  const next = props.next || loaderData.next || { slug: 'vir-paradise', name: 'VIR Paradise' };
  const company = props.company || loaderData.company || { founded: 1985, phone: '+919326287741', phoneDisplay: '+91 93262 87741' };

  const stageRef = useRef(null);
  const colInRef = useRef(null);

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

  const PROJECT_AMENITIES_MAP = {
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
  };

  const projectAmenitiesList = PROJECT_AMENITIES_MAP[p?.slug] || p?.amenities?.items || [
    'Parking',
    '24/7 Security',
    'Kids Play Area',
    'Gas Pipeline',
    '24x7 Water Supply',
    'Power Backup',
    'Elevator',
    'CCTV Surveillance',
  ];

  const fpThumb = (src) => (typeof src === 'string' ? src.replace(/\/([^/]+?)\.[a-z0-9]+$/i, '/thumbs/$1.webp') : src);
  const fpImgFallback = (e, original) => {
    if (e.currentTarget.dataset.fb) return;
    e.currentTarget.dataset.fb = '1';
    e.currentTarget.src = original;
  };

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

  const totalFloors = p.elevation?.floors || 14;

  const [activeHotspot, setActiveHotspot] = useState(null);
  const [planFilter, setPlanFilter] = useState('ALL');
  const [modalPlan, setModalPlan] = useState(null);
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

  const handleHotspotClick = (index) => {
    setActiveHotspot((prev) => (prev === index ? null : index));
  };

  const filteredPlans = planFilter === 'ALL'
    ? floorPlansList
    : floorPlansList.filter((plan) => plan.type === planFilter);

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
  const amenIntroBg = getMediaUrl('/media/projects/krishna-koy/amenities/Landscape-garden.jpg');
  const statusDisplay = statusLabel[p.status] || (p.status === 'ongoing' ? 'Under development' : (p.status === 'available' ? 'Ready · Available' : 'Under development'));

  const aboutParas = p.aboutParagraphs || [p.description || p.tagline];

  useEffect(() => {
    if (!stageRef.current || !colInRef.current) return;

    const ctx = gsap.context(() => {
      const stage = stageRef.current;
      const colIn = colInRef.current;
      const mobile = () => window.innerWidth < 760;

      gsap.from('.hero-copy h1 b', { yPercent: 110, duration: 1.2, ease: 'power4.out', stagger: 0.12, delay: 0.2 });
      gsap.from('.hero-copy .mi', { opacity: 0, y: 14, duration: 1, ease: 'power3.out', delay: 0.1 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: '+=100%',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      gsap.set('.layer--2 .ph', { yPercent: 10 });

      const getColPositions = () => {
        const winH = window.innerHeight;
        const colH = colIn.offsetHeight;
        const isMob = mobile();
        const topBuffer = isMob
          ? Math.max(28, Math.round(winH * 0.05))
          : Math.max(45, Math.round(winH * 0.07));
        const botBuffer = isMob ? 24 : 32;

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

        tl.to('.hero-copy', { y: -80, opacity: 0, duration: 0.6 }, 0)
          .to('.stage-hotspots', { opacity: 0, duration: 0.4, ease: 'power2.inOut' }, 0)
          .to('.layer--1 .ph', { scale: 1.08, duration: 2.5 }, 0)
          .to(['.panel', '.col'], {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.0,
            ease: 'power2.inOut',
          }, 0.3)
          .to(colIn, {
            y: () => getColPositions().end,
            duration: 2.5,
            ease: 'none',
          }, 1.3)
          .to({}, { duration: 1.2 }, '+=0');
      } else {
        gsap.set(colIn, {
          opacity: 0,
          y: () => getColPositions().start + 45,
        });

        gsap.set('.layer--2', { clipPath: 'inset(100% 0% 0% 0%)' });

        tl.to('.hero-copy', { y: -90, opacity: 0, duration: 0.8 }, 0)
          .to('.stage-hotspots', { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, 0)
          .to('.panel', { width: '50%', duration: 1, ease: 'power2.inOut' }, 0.35)
          .to('.layer--1', { clipPath: 'inset(0 0 0 50%)', duration: 1, ease: 'power2.inOut' }, 0.35)
          .to('.layer--1 .ph', { scale: 1.12, duration: 3.5 }, 0)
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
          .to('.layer--2', { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power2.inOut' }, 0.35)
          .to('.layer--2 .ph', { yPercent: -4, duration: 2.2 }, 0.35);
      }

      if (amenStickyStageRef.current) {
        const stageEl = amenStickyStageRef.current;

        gsap.set('.amen-pair--1 .amen-pane-left', { clipPath: 'inset(100% 0% 0% 0%)' });
        gsap.set('.amen-pair--1 .amen-pane-right', { clipPath: 'inset(0% 0% 100% 0%)' });
        gsap.set('.amen-pair--1 .amen-pane-img', { scale: 1.14 });

        gsap.set('.amen-pair--2 .amen-pane-left', { clipPath: 'inset(0% 0% 100% 0%)' });
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
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 1.2,
            ease: 'power2.inOut',
          }, 0.4)
          .to('.amen-pair--1 .amen-pane-img', { scale: 1.0, duration: 1.4 }, 0.4)
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
  }, [heroImgSrc, img2Src]);

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

      <section className="stage" id="stage" ref={stageRef} data-hero="true" data-theme="glass">
        <div className="stack">
          <div className="layer layer--1">
            <div className="ph" style={{ backgroundImage: `url(${heroImgSrc})` }} />

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

          <div className="layer layer--2">
            <div className="ph" style={{ backgroundImage: `url(${img2Src})` }} />
          </div>
        </div>

        <div className="panel" />

        <div className="hero-copy">
          <p className="mi" id="dk" style={{ margin: '0 0 14px 0', opacity: 0.95, fontSize: '11.5px', letterSpacing: '0.24em', textTransform: 'uppercase' }}>
            {p.area || 'Borivali West'}, Mumbai · {statusDisplay}
          </p>
          <h1>
            <span><b>{p.name}</b></span>
          </h1>
        </div>

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

      <section className="fp-section" id="residences" data-theme="basalt" aria-label="Floor Plans and Residence Configurations">
        <div className="fp-container">
          <aside className="fp-sidebar">
            <div className="fp-sidebar-sticky">
              <span className="fp-eyebrow">The Residences</span>
              <h2 className="fp-heading">
                Curated <em>Floor Plans.</em>
              </h2>
              <p className="fp-description">
                Explore meticulously planned layouts designed for exceptional natural cross-ventilation, abundant sunlight, and absolute privacy.
              </p>

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

          <main className="fp-content">
            <div className="fp-grid">
              {filteredPlans.map((plan) => (
                <article
                  key={plan.id}
                  className="fp-card"
                  onClick={() => handleFloorPlanClick(plan)}
                >
                  <div className="fp-card-head-clean">
                    <span className="fp-card-type-tag">{plan.type} Floor Plan</span>
                    <span className="fp-card-confidential-tag">
                      {hasUnlockedFloorPlans ? '✓ Unlocked' : '🔒 Confidential'}
                    </span>
                  </div>

                  <div className="fp-card-image-wrap">
                    <img
                      src={fpThumb(plan.img)}
                      alt={`${p.name} - ${plan.type} Floor Plan`}
                      className={`fp-card-image ${hasUnlockedFloorPlans ? '' : 'blurred'}`}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => fpImgFallback(e, plan.img)}
                    />
                    {!hasUnlockedFloorPlans ? (
                      <div className="fp-blur-overlay">
                        <span className="fp-lock-cta-text">Unlock Floor Plan</span>
                      </div>
                    ) : (
                      <span className="fp-zoom-hint">🔍 Tap to Zoom</span>
                    )}
                  </div>

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
              ))}
            </div>
          </main>
        </div>
      </section>

      <section
        className="amen-pinned-stage"
        id="amenities"
        ref={amenStickyStageRef}
        data-theme="basalt"
        aria-label="Curated Amenities & Lifestyle"
      >
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

        {amenityPairs.map((pair, pIdx) => (
          <div
            key={pair.id}
            className={`amen-pair-layer amen-pair--${pIdx + 1}`}
          >
            <div className="amen-pane amen-pane-left">
              <div
                className="amen-pane-img"
                style={{ backgroundImage: `url(${pair.left.image})` }}
              />
              <div className="amen-pane-hud">
                <h3 className="amen-pane-title">{pair.left.title}</h3>
              </div>
            </div>

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

      <PopupForm
        isOpen={popupOpen}
        onClose={() => {
          setPopupOpen(false);
          setSelectedPlanForEnquiry(null);
          setIsBrochureRequest(false);
        }}
        onSuccess={() => {
          if (isBrochureRequest) {
            const targetUrl = p?.brochureUrl || (p?.slug ? `/brochures/${p.slug}-brochure.pdf` : '/brochures/vir-enclave-brochure.pdf');
            const link = document.createElement('a');
            link.href = targetUrl;
            link.download = `${p?.name || 'VIR Enclave'} Brochure.pdf`;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
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

export { Enclave as VirEnclave, Enclave as default, Enclave as VirEnclaveSection };
