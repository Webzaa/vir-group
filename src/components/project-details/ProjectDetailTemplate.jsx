import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '@/lib/animations/gsap';
import { JsonLd, breadcrumbJsonLd, projectJsonLd } from '@/lib/seo/jsonld';
import { configLong, statusLabel } from '@/lib/content';
import { getMediaUrl } from '@/lib/media';
import { FinalCta } from '@/components/sections/FinalCta';
import { PopupForm } from '@/components/forms/PopupForm';
import { ProjectForm } from '@/components/forms/ProjectForm';

export function ProjectDetailTemplate({
  p,
  next,
  company = { founded: 1985, phone: '+919326287741', phoneDisplay: '+91 93262 87741' },
  hotspots = [],
  floorPlans = [],
  amenityPairs = [],
  amenitiesList = [],
  overviewImg,
  heroImg,
  amenIntroBg,
  isUpcoming = false,
  customHotspotRenderer,
}) {
  const stageRef = useRef(null);
  const colInRef = useRef(null);
  const amenStickyStageRef = useRef(null);

  const heroImgSrc = getMediaUrl(heroImg || p?.hero?.src || '/media/projects/project-detail/under-construction.webp');
  const img2Src = getMediaUrl(overviewImg || heroImg || p?.hero?.src || '/media/projects/project-detail/under-construction.webp');
  const introBgSrc = getMediaUrl(amenIntroBg || '/media/projects/krishna-koy/amenities/Landscape-garden.jpg');
  const statusDisplay = statusLabel[p?.status] || (p?.status === 'ongoing' ? 'Under development' : (p?.status === 'available' ? 'Ready · Available' : 'Under development'));
  const aboutParas = p?.aboutParagraphs || [p?.description || p?.tagline || 'Premium residential development by VIR Group in Mumbai.'];
  const totalFloors = p?.elevation?.floors || 10;

  // React States
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [pendingHotspotIndex, setPendingHotspotIndex] = useState(null);
  const [hasUnlockedHotspots, setHasUnlockedHotspots] = useState(() => {
    try {
      return sessionStorage.getItem('vir_hotspot_lead_submitted') === 'true';
    } catch {
      return false;
    }
  });

  const [planFilter, setPlanFilter] = useState('ALL');
  const [modalPlan, setModalPlan] = useState(null);
  const [selectedPlanForEnquiry, setSelectedPlanForEnquiry] = useState(null);
  const [isBrochureRequest, setIsBrochureRequest] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);

  const [hasUnlockedFloorPlans, setHasUnlockedFloorPlans] = useState(() => {
    try {
      return sessionStorage.getItem('vir_floorplan_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  // Expand mobile stage when read more is toggled
  useEffect(() => {
    if (stageRef.current && typeof window !== 'undefined' && window.innerWidth < 760) {
      const pinSpacer = stageRef.current.closest('.pin-spacer');
      if (pinSpacer) {
        if (isReadMore) {
          pinSpacer.style.height = 'auto';
          pinSpacer.style.minHeight = 'auto';
          pinSpacer.style.paddingBottom = '0px';
        } else {
          pinSpacer.style.height = '';
          pinSpacer.style.minHeight = '';
          pinSpacer.style.paddingBottom = '';
        }
      }
    }
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => clearTimeout(timer);
  }, [isReadMore]);

  // Handle floor plan click
  const handleFloorPlanClick = (plan) => {
    if (hasUnlockedFloorPlans) {
      setModalPlan(plan);
    } else {
      setSelectedPlanForEnquiry(plan);
      setPendingHotspotIndex(null);
      setPopupOpen(true);
    }
  };

  // Hotspot interaction
  const handleHotspotClick = (index) => {
    if (hasUnlockedHotspots) {
      setActiveHotspot((prev) => (prev === index ? null : index));
    } else {
      setSelectedPlanForEnquiry(null);
      setPendingHotspotIndex(index);
      setPopupOpen(true);
    }
  };

  const filteredPlans = planFilter === 'ALL'
    ? floorPlans
    : floorPlans.filter((plan) => plan.type === planFilter);

  // Re-measure ScrollTrigger when floor plans filter changes
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

  const fpThumb = (src) => (typeof src === 'string' ? src.replace(/\/([^/]+?)\.[a-z0-9]+$/i, '/thumbs/$1.webp') : src);
  const fpImgFallback = (e, original) => {
    if (e.currentTarget.dataset.fb) return;
    e.currentTarget.dataset.fb = '1';
    e.currentTarget.src = original;
  };

  // GSAP Animations
  useEffect(() => {
    if (!stageRef.current || !colInRef.current) return;

    const ctx = gsap.context(() => {
      const stage = stageRef.current;
      const colIn = colInRef.current;
      const mobile = () => window.innerWidth < 760;

      gsap.from('.hero-copy h1 b', { yPercent: 110, duration: 1.2, ease: 'power4.out', stagger: 0.12, delay: 0.2 });
      gsap.from('.hero-copy .mi', { opacity: 0, y: 14, duration: 1, ease: 'power3.out', delay: 0.1 });

      if (!mobile()) {
        const getColPositions = () => {
          const winH = window.innerHeight;
          const actionsEl = colIn.querySelector('.col__actions');
          let colH = Math.max(colIn.scrollHeight, colIn.offsetHeight);
          if (actionsEl) {
            const actionBottom = actionsEl.offsetTop + actionsEl.offsetHeight;
            colH = Math.max(colH, actionBottom);
          }
          const navEl = document.querySelector('.hdr');
          const navH = (navEl && navEl.offsetHeight > 0) ? navEl.offsetHeight : 76;
          const topBuffer = Math.max(navH + 20, Math.round(winH * 0.07));
          const botBuffer = 32;

          if (colH + topBuffer + botBuffer <= winH) {
            const start = Math.max(topBuffer, Math.round((winH - colH) / 2));
            const end = Math.max(topBuffer, winH - colH - botBuffer);
            return { start, end };
          }
          const start = topBuffer;
          const end = Math.min(-10, winH - colH - botBuffer);
          return { start, end };
        };

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: () => '+=' + Math.max(Math.round(window.innerHeight * 2.2), (colIn.scrollHeight || 0) * 1.2 + Math.round(window.innerHeight * 0.8)),
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        gsap.set('.layer--2 .ph', { yPercent: 10 });
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
            duration: 2.8,
            ease: 'none',
          }, 1.3)
          .to({}, { duration: 1.4 }, '+=0')
          .to('.layer--2', { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power2.inOut' }, 0.35)
          .to('.layer--2 .ph', { yPercent: -4, duration: 2.2 }, 0.35);
      }

      // Dual-Direction Split-Screen Amenities Reveal Stage
      if (amenStickyStageRef.current && amenityPairs.length > 0) {
        const stageEl = amenStickyStageRef.current;
        const numPairs = amenityPairs.length;

        amenityPairs.forEach((pair, idx) => {
          const pNum = idx + 1;
          const isOdd = pNum % 2 !== 0;
          gsap.set(`.amen-pair--${pNum} .amen-pane-left`, {
            clipPath: isOdd ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
          });
          gsap.set(`.amen-pair--${pNum} .amen-pane-right`, {
            clipPath: isOdd ? 'inset(0% 0% 100% 0%)' : 'inset(100% 0% 0% 0%)',
          });
          gsap.set(`.amen-pair--${pNum} .amen-pane-img`, { scale: 1.14 });
        });

        const amenTl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stageEl,
            start: 'top top',
            end: () => '+=' + (window.innerHeight * (numPairs >= 3 ? 4.2 : 2.8)),
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        amenTl
          .to('.amen-intro-center-wrap', { opacity: 0, y: -30, duration: 0.6, ease: 'power2.in' }, 0.2)
          .to('.amen-intro-opp-amenities', { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' }, 0.2)
          .to('.amen-intro-img', { scale: 1.15, duration: 1.4 }, 0.2);

        amenityPairs.forEach((pair, idx) => {
          const pNum = idx + 1;
          const prevNum = idx;
          const startTime = 0.4 + idx * 1.5;

          if (prevNum > 0) {
            amenTl.to(
              `.amen-pair--${prevNum} .amen-pane-hud`,
              { opacity: 0, y: -20, duration: 0.5 },
              startTime - 0.1
            );
          }

          amenTl
            .to(
              `.amen-pair--${pNum} .amen-pane-left`,
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.2,
                ease: 'power2.inOut',
              },
              startTime
            )
            .to(
              `.amen-pair--${pNum} .amen-pane-right`,
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.2,
                ease: 'power2.inOut',
              },
              startTime
            )
            .to(
              `.amen-pair--${pNum} .amen-pane-img`,
              { scale: 1.0, duration: 1.4 },
              startTime
            );
        });

        amenTl.to({}, { duration: 0.8 });
      }
    });

    return () => ctx.revert();
  }, [p?.slug, heroImgSrc, img2Src, amenityPairs.length]);

  return (
    <div className="pdetail-root" aria-label={`${p?.name} Project Overview`}>
      <JsonLd data={projectJsonLd(p)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: p?.name, path: `/projects/${p?.slug}` },
        ])}
      />

      {/* 1. HERO PINNED STAGE */}
      <section
        className={`stage ${isReadMore ? 'stage--expanded' : ''}`}
        id="stage"
        ref={stageRef}
        data-hero="true"
        data-theme="glass"
      >
        <div className="stage-hero-visual">
          <div className="stack">
            <div className="layer layer--1">
              <div className="ph" style={{ backgroundImage: `url(${heroImgSrc})` }} />
            </div>

            <div className="layer layer--2">
              <div className="ph" style={{ backgroundImage: `url(${img2Src})` }} />
            </div>
          </div>

          <div className="panel" />

          <div className="hero-copy">
            <p className="mi" id="dk" style={{ margin: '0 0 14px 0', opacity: 0.95, fontSize: '11.5px', letterSpacing: '0.24em', textTransform: 'uppercase' }}>
              {p?.area || 'Mumbai'}, Mumbai · {statusDisplay}
            </p>
            <h1>
              <span><b>{p?.name}</b></span>
            </h1>
            <p className="crumbs" style={{ marginTop: '16px', marginBottom: 0, pointerEvents: 'auto' }}>
              <Link to="/projects">Projects</Link>
              <span>/</span>
              <span>{p?.name}</span>
            </p>
          </div>

          {/* Hotspots */}
          {!isUpcoming && hotspots.length > 0 && (
            <div className="stage-hotspots">
              <span className="mi pick">Select a point of interest +</span>
              <div id="hss">
                {hotspots.map((h, i) => {
                  const isHot = activeHotspot === i;
                  return (
                    <button
                      key={h.tag || i}
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
                  customHotspotRenderer ? (
                    customHotspotRenderer(hotspots[activeHotspot])
                  ) : (
                    <>
                      <span className="mi" id="pk" style={{ color: '#e5c38c', fontWeight: 700, fontSize: '11px', letterSpacing: '0.18em', display: 'inline-block', marginBottom: '4px' }}>
                        {hotspots[activeHotspot].tag}
                      </span>
                      <h3 id="pt" style={{ margin: '0 0 8px 0', fontSize: '1.45rem', color: '#ffffff', fontFamily: 'var(--serif)' }}>
                        {hotspots[activeHotspot].title}
                      </h3>
                      <p id="pp" style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: '#e2e8f0' }}>
                        {hotspots[activeHotspot].desc}
                      </p>
                    </>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* Left Column Copy */}
        <div className="col">
          <div className="col__inner" ref={colInRef}>
            <div className="col__head">
              <h2>Open the doors of {p?.name} and step into your true self</h2>
            </div>
            {aboutParas.map((para, i) => {
              const shouldTruncate = i === 0 && !isReadMore && typeof window !== 'undefined' && window.innerWidth < 760;
              const displayPara = shouldTruncate && para.length > 220 ? para.slice(0, 220) + '...' : para;

              return (
                <p key={i} className={`col__para ${i === 0 ? 'col__para--lead' : ''}`}>
                  {displayPara}
                  {i === 0 && para.length > 220 && (
                    <button
                      type="button"
                      className="read-more-toggle-btn only-mob"
                      onClick={() => {
                        setIsReadMore((prev) => !prev);
                        setTimeout(() => {
                          ScrollTrigger.refresh();
                        }, 120);
                      }}
                      aria-expanded={isReadMore}
                    >
                      {isReadMore ? ' Read Less' : ' Read More'}
                    </button>
                  )}
                </p>
              );
            })}

            <div className="col__actions">
              <button
                type="button"
                onClick={() => {
                  setIsBrochureRequest(true);
                  setSelectedPlanForEnquiry(null);
                  setPendingHotspotIndex(null);
                  setPopupOpen(true);
                }}
                className="col__cta-btn col__cta-btn--primary"
                id="col-brochure-btn"
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

      {/* 2. CURATED FLOOR PLANS SECTION */}
      {floorPlans.length > 0 && (
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
                        alt={`${p?.name} - ${plan.type} Floor Plan`}
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
      )}

      {/* 3. AMENITIES REVEAL SECTION */}
      {amenityPairs.length > 0 && (
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
                style={{ backgroundImage: `url(${introBgSrc})` }}
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

            {amenitiesList.length > 0 && (
              <div className="amen-intro-opp-amenities" aria-label={`${p?.name || 'Project'} amenities list`}>
                <div className="amen-opp-tag">
                  <span className="amen-opp-tag-sparkle">✦</span>
                  <span>{amenitiesList.length} Curated Amenities</span>
                </div>
                <div className="amen-opp-list">
                  {amenitiesList.map((item) => (
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
      )}



      {/* 5. FINAL CTA */}
      <FinalCta lines={['Find the address', 'that fits.']} level="Rooftop">
        <ProjectForm projectName={p?.name} />
      </FinalCta>

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
                alt={`${p?.name} - ${modalPlan.type} Floor Plan`}
                className="fp-modal-full-img"
                decoding="async"
              />
            </div>
            <div className="fp-modal-foot">
              <a
                href={`https://wa.me/919326287741?text=Hi%2C+I+want+to+schedule+a+site+visit+for+${encodeURIComponent(p?.name)}+${encodeURIComponent(modalPlan.type)}+Floor+Plan`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-solid"
              >
                Schedule Site Visit ↗
              </a>
              <a
                href={`https://wa.me/919326287741?text=Hi%2C+please+share+high-res+PDF+floor+plan+for+${encodeURIComponent(p?.name)}+${encodeURIComponent(modalPlan.type)}`}
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
            const targetUrl = p?.brochureUrl || (p?.slug ? `/brochures/${p.slug}-brochure.pdf` : '/brochures/opportunity-brochure.pdf');
            const link = document.createElement('a');
            link.href = targetUrl;
            link.download = `${p?.name || 'Project'} Brochure.pdf`;
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
          } else {
            setHasUnlockedHotspots(true);
            try {
              sessionStorage.setItem('vir_hotspot_lead_submitted', 'true');
            } catch {}
            if (pendingHotspotIndex !== null) {
              setActiveHotspot(pendingHotspotIndex);
            }
          }
        }}
        title={
          isBrochureRequest
            ? `Download Brochure · ${p?.name}`
            : selectedPlanForEnquiry
            ? `Unlock ${selectedPlanForEnquiry.type || ''} Floor Plan`
            : pendingHotspotIndex !== null
            ? `Enquire - ${hotspots[pendingHotspotIndex]?.tag}`
            : `Enquire for ${p?.name}`
        }
        subtitle={`${p?.name} · ${p?.area || 'Mumbai'}`}
        defaultProject={p?.name}
        defaultSubject={
          isBrochureRequest
            ? `Brochure Download Request: ${p?.name}`
            : selectedPlanForEnquiry
            ? `Floor Plan Request: ${p?.name} (${selectedPlanForEnquiry.type || 'Configuration'})`
            : pendingHotspotIndex !== null
            ? `Point of Interest: ${hotspots[pendingHotspotIndex]?.tag} (${p?.name})`
            : `Project Enquiry: ${p?.name}`
        }
      />
    </div>
  );
}
export default ProjectDetailTemplate;
