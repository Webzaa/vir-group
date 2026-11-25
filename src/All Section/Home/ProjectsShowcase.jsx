import { useEffect, useRef, useState } from 'react';
import { Image } from '@/components/ui/Image';
import { Link, useNavigate } from 'react-router-dom';
import { REFRESH, gsap, useGSAP, ScrollTrigger } from '@/lib/animations/gsap';
import { Button } from '@/components/ui/Button';
import { LevelMarker } from '@/components/ui/LevelMarker';
import { getMediaUrl } from '@/lib/media';

const towerConfigs = [
  { heightPercent: '93%', widthClass: 'pj-sky-tower-0' },
  { heightPercent: '90%', widthClass: 'pj-sky-tower-1' },
  { heightPercent: '94%', widthClass: 'pj-sky-tower-2' },
  { heightPercent: '89%', widthClass: 'pj-sky-tower-3' },
  { heightPercent: '92%', widthClass: 'pj-sky-tower-4' },
  { heightPercent: '90%', widthClass: 'pj-sky-tower-5' },
  { heightPercent: '95%', widthClass: 'pj-sky-tower-6' },
];

const HOME_TOWER_CUTOUTS = {
  'opportunity': '/media/home-project/opportunity.png',
  'vir-paradise': '/media/home-project/paradise.png',
  'vir-vinayanand': '/media/home-project/vinayanand.png',
  'vir-enclave': '/media/home-project/enclave.png',
  'global-residency': '/media/home-project/global-residancy.png',
  'vir-krishna-koyna': '/media/home-project/krishna-koyna.png',
  'surya-prakash': '/media/home-project/suryaprakash.png',
};

export function ProjectsShowcase({ items = [] }) {
  const navigate = useNavigate();
  const root = useRef(null);
  const skylineRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const SIGNATURE_7_SLUGS = [
    'opportunity',
    'vir-paradise',
    'vir-vinayanand',
    'vir-enclave',
    'global-residency',
    'vir-krishna-koyna',
    'surya-prakash',
  ];
  const matchedTowers = items.filter((p) => SIGNATURE_7_SLUGS.includes(p.slug));
  const skylineTowers = matchedTowers.length === 7 ? matchedTowers : items.slice(0, 7);
  const activeTower = skylineTowers[activeIdx] || skylineTowers[0];

  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const isDraggingRef = useRef(false);
  const preventClickRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const scrollTimeoutRef = useRef(null);
  const preventClickTimeoutRef = useRef(null);

  const markScrollingOrDragging = () => {
    lastScrollTimeRef.current = Date.now();
    preventClickRef.current = true;
    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      preventClickRef.current = false;
      isDraggingRef.current = false;
    }, 500);
  };

  const isControlTarget = (target) => {
    return !!(
      target?.closest?.('button') ||
      target?.closest?.('.pj-mobile-nav') ||
      target?.closest?.('.pj-nav-btn') ||
      target?.closest?.('.pj-mobile-dot') ||
      target?.closest?.('.pj-bottom-link')
    );
  };

  const handleTouchStart = (e) => {
    if (isControlTarget(e.target)) return;
    if (!e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
    isDraggingRef.current = false;
    if (Date.now() - lastScrollTimeRef.current < 500) {
      preventClickRef.current = true;
    }
  };

  const handleTouchMove = (e) => {
    if (isControlTarget(e.target)) return;
    if (!e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - touchStartRef.current.x);
    const dy = Math.abs(touch.clientY - touchStartRef.current.y);
    if (dx > 10 || dy > 10) {
      isDraggingRef.current = true;
      preventClickRef.current = true;
      lastScrollTimeRef.current = Date.now();
    }
  };

  const handleTouchEnd = (e) => {
    if (isControlTarget(e?.target)) return;
    if (isDraggingRef.current) {
      preventClickRef.current = true;
      clearTimeout(preventClickTimeoutRef.current);
      preventClickTimeoutRef.current = setTimeout(() => {
        preventClickRef.current = false;
        isDraggingRef.current = false;
      }, 500);
    }
  };

  const isScrollOrDrag = () => {
    return (
      isDraggingRef.current ||
      preventClickRef.current ||
      Date.now() - lastScrollTimeRef.current < 500
    );
  };

  const handleClickCapture = (e) => {
    if (isControlTarget(e.target)) {
      return;
    }
    if (isScrollOrDrag()) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
  };

  useEffect(() => {
    const onScrollUpdate = () => {
      markScrollingOrDragging();
    };
    window.addEventListener('scroll', onScrollUpdate, { passive: true });
    window.addEventListener('wheel', onScrollUpdate, { passive: true });
    ScrollTrigger.addEventListener('scrollStart', onScrollUpdate);
    ScrollTrigger.addEventListener('scrollEnd', onScrollUpdate);
    return () => {
      window.removeEventListener('scroll', onScrollUpdate);
      window.removeEventListener('wheel', onScrollUpdate);
      ScrollTrigger.removeEventListener('scrollStart', onScrollUpdate);
      ScrollTrigger.removeEventListener('scrollEnd', onScrollUpdate);
      clearTimeout(scrollTimeoutRef.current);
      clearTimeout(preventClickTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleProgress = (e) => {
      if (e.detail?.activeIdx !== undefined) {
        setActiveIdx(e.detail.activeIdx);
      } else {
        const p = e.detail?.progress ?? 0;
        const idx = Math.min(Math.floor(p * skylineTowers.length), skylineTowers.length - 1);
        setActiveIdx(idx);
      }
    };
    window.addEventListener('vir-towers-progress', handleProgress);
    return () => window.removeEventListener('vir-towers-progress', handleProgress);
  }, [skylineTowers.length]);

  const scrollDebounceRef = useRef(null);
  const isNavigatingRef = useRef(false);

  const handleTrackScroll = (e) => {
    markScrollingOrDragging();
    if (typeof window === 'undefined' || window.innerWidth >= 900) return;
    if (isNavigatingRef.current) return;
    const el = e.currentTarget;
    if (!el || !el.clientWidth) return;

    clearTimeout(scrollDebounceRef.current);
    scrollDebounceRef.current = setTimeout(() => {
      if (!el.clientWidth) return;
      const newIdx = Math.min(
        Math.max(0, Math.round(el.scrollLeft / el.clientWidth)),
        skylineTowers.length - 1
      );
      setActiveIdx((prev) => (prev !== newIdx ? newIdx : prev));
    }, 60);
  };

  const scrollToTower = (index) => {
    const el = skylineRef.current;
    if (!el) return;
    isNavigatingRef.current = true;
    clearTimeout(scrollDebounceRef.current);
    setActiveIdx(index);
    const targetChild = el.children && el.children[index];
    const targetX = targetChild ? targetChild.offsetLeft : index * el.clientWidth;
    el.scrollTo({ left: targetX, behavior: 'smooth' });
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 450);
  };

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      if (el.closest('.df-sticky-container')) {
        return;
      }
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const skyline = skylineRef.current;
        if (!skyline) return;
        const towers = gsap.utils.toArray('.pj-sky-tower', skyline);
        const partingLeft = el.querySelector('.pj-parting-cloud-left');
        const partingRight = el.querySelector('.pj-parting-cloud-right');
        const partingMist = el.querySelector('.pj-parting-cloud-mist');
        const topBranding = el.querySelector('.pj-top-branding');

        if (partingLeft && partingRight) {
          gsap.set(partingLeft, { xPercent: 0, opacity: 1, scale: 1 });
          gsap.set(partingRight, { xPercent: 0, opacity: 1, scale: 1 });
        }
        if (partingMist) {
          gsap.set(partingMist, { opacity: 0.7 });
        }
        if (topBranding) {
          gsap.set(topBranding, { opacity: 0.15, y: -20 });
        }
        if (towers.length) {
          gsap.set(towers, { y: 240, opacity: 0.25, scale: 0.95 });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=450%',
            pin: true,
            scrub: 1.1,
            refreshPriority: REFRESH.PIN,
            onUpdate: (self) => {
              const idx = Math.min(Math.floor(self.progress * skylineTowers.length), skylineTowers.length - 1);
              setActiveIdx(idx);
            },
          },
        });

        if (partingLeft && partingRight) {
          tl.to(partingLeft, { xPercent: -130, opacity: 0, scale: 1.15, duration: 1.1, ease: 'power2.inOut' }, 0)
            .to(partingRight, { xPercent: 130, opacity: 0, scale: 1.15, duration: 1.1, ease: 'power2.inOut' }, 0);
          if (partingMist) {
            tl.to(partingMist, { opacity: 0, duration: 0.9, ease: 'power1.out' }, 0);
          } 
        }
        if (topBranding) {
          tl.to(topBranding, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 0.1);
        }

        if (towers.length) {
          tl.to(
            towers,
            {
              y: 0,
              opacity: 1,
              scale: 1,
              stagger: 0.1,
              duration: 1.2,
              ease: 'power2.out',
            },
            0.15,
          );
          tl.to(
            skyline,
            {
              x: () => -(skyline.scrollWidth - el.clientWidth),
              duration: 2.8,
              ease: 'none',
            },
            1.4
          );
        }

        const cloudBack = el.querySelector('.pj-cloud-back');
        const cloudMid = el.querySelector('.pj-cloud-mid');
        const cloudFront = el.querySelector('.pj-cloud-front');
        const mistPuffs = gsap.utils.toArray('.pj-mist-puff', el);

        if (cloudBack) tl.to(cloudBack, { x: -16, duration: 1.2, ease: 'none' }, 0.15);
        if (cloudMid) tl.to(cloudMid, { x: 20, duration: 1.2, ease: 'none' }, 0.15);
        if (cloudFront) tl.to(cloudFront, { x: -12, duration: 1.2, ease: 'none' }, 0.15);
        if (mistPuffs.length) tl.to(mistPuffs, { scale: 1.08, opacity: 0.55, stagger: 0.1, duration: 1.2, ease: 'none' }, 0.15);
      });
    },
    { scope: root },
  );

  if (!skylineTowers.length || !activeTower) return null;

  return (
    <section
      ref={root}
      className="projects pj-panoramic-stage"
      id="projects"
      data-theme="basalt"
      data-level="+04.00"
      aria-labelledby="pj-h"
      onClickCapture={handleClickCapture}
      onTouchStartCapture={handleTouchStart}
      onTouchMoveCapture={handleTouchMove}
      onTouchEndCapture={handleTouchEnd}
      onTouchCancelCapture={handleTouchEnd}
    >
      <div className="pj-bg-layer">
        <Image src="/media/home-project/project-bg.png" alt="VIR Projects Skyline Background" fill priority sizes="100vw" className="pj-bg-img" />
        <div className="pj-bg-overlay" />
      </div>

      <div className="pj-parting-clouds-curtain" aria-hidden="true">
        <div className="pj-parting-cloud-mist" />
        <div className="pj-parting-cloud-side pj-parting-cloud-left">
          <div className="pj-parting-cloud-inner">
            <img
              src={getMediaUrl('/media/cloud-1.png')}
              alt=""
              className="pj-parting-cloud-img"
              loading="eager"
            />
          </div>
        </div>
        <div className="pj-parting-cloud-side pj-parting-cloud-right">
          <div className="pj-parting-cloud-inner">
            <img
              src={getMediaUrl('/media/cloud-2.png')}
              alt=""
              className="pj-parting-cloud-img"
              loading="eager"
            />
          </div>
        </div>
      </div>

      <div className="pj-top-branding">
        <div className="pj-branding-row">
          <LevelMarker level="+04.00" name="Featured projects" centered />
        </div>
        <h2 id="pj-h" className="t-display pj-main-title">
          Landmark Towers
        </h2>
      </div>

      <aside
        className="pj-mobile-card"
        aria-label="Selected Project Details"
        onClick={(e) => {
          if (isScrollOrDrag()) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          navigate(`/projects/${activeTower.slug}`);
        }}
        style={{ cursor: 'pointer' }}
      >
        <div className="pj-card-badge">
          <span className="pj-badge-dot" />
          <span className="pj-badge-text">VIR GROUP · SIGNATURE</span>
          <span className="pj-card-counter">
            {String(activeIdx + 1).padStart(2, '0')} / {String(skylineTowers.length).padStart(2, '0')}
          </span>
        </div>

        <h3 className="pj-card-title">
          <Link
            to={`/projects/${activeTower.slug}`}
            className="pj-card-title-link"
            onClick={(e) => {
              if (isScrollOrDrag()) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            {activeTower.name}
          </Link>
        </h3>
        <p className="pj-card-area">{activeTower.area}, Mumbai</p>

        <div className="pj-card-specs">
          <span className="pj-spec-item">{activeTower.config || '1 / 2 / 3 BHK'}</span>
          <span className="pj-spec-divider">·</span>
          <span className="pj-spec-item">{activeTower.status}</span>
        </div>
      </aside>

      <div ref={skylineRef} className="pj-skyline-track" onScroll={handleTrackScroll} role="region" aria-label="Interactive Skyline Towers">
        {skylineTowers.map((tower, idx) => {
          const cfg = towerConfigs[idx] || { heightPercent: '85%', widthClass: '' };
          const isActive = idx === activeIdx;
          return (
            <div
              key={tower.slug}
              className={`pj-sky-tower ${cfg.widthClass || ''} ${isActive ? 'is-active' : ''}`}
              style={{ height: cfg.heightPercent }}
              onClick={(e) => {
                if (isScrollOrDrag()) {
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
                const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 900;
                if (isDesktop) {
                  setActiveIdx(idx);
                  navigate(`/projects/${tower.slug}`);
                }
              }}
              onMouseEnter={() => setActiveIdx(idx)}
              role="button"
              tabIndex={0}
              aria-label={`View ${tower.name}`}
            >
              <aside className={`pj-tower-card ${isActive ? 'is-visible' : ''}`} aria-hidden={!isActive}>
                <div className="pj-card-badge">
                  <span className="pj-badge-dot" />
                  <span className="pj-badge-text">VIR GROUP · SIGNATURE</span>
                  <span className="pj-card-counter">
                    {String(idx + 1).padStart(2, '0')} / {String(skylineTowers.length).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="pj-card-title">
                  <Link
                    to={`/projects/${tower.slug}`}
                    className="pj-card-title-link"
                    onClick={(e) => {
                      if (isScrollOrDrag()) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                  >
                    {tower.name}
                  </Link>
                </h3>
                <p className="pj-card-area">{tower.area}, Mumbai</p>

                <div className="pj-card-specs">
                  <span className="pj-spec-item">{tower.config || '1 / 2 / 3 BHK'}</span>
                  <span className="pj-spec-divider">·</span>
                  <span className="pj-spec-item">{tower.status}</span>
                </div>
              </aside>

              <div className="pj-tower-img-wrap">
                {(() => {
                  const cutoutSrc = HOME_TOWER_CUTOUTS[tower.slug] || tower.cutout || tower.hero?.src;
                  return cutoutSrc ? (
                    <Image
                      src={cutoutSrc}
                      alt={tower.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, 60vw"
                      className="pj-tower-img"
                    />
                  ) : null;
                })()}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pj-mobile-nav" aria-label="Building slider navigation">
        <button
          type="button"
          className="pj-nav-btn pj-nav-prev"
          onClick={(e) => {
            e.stopPropagation();
            const el = skylineRef.current;
            const current = el && el.clientWidth ? Math.round(el.scrollLeft / el.clientWidth) : activeIdx;
            scrollToTower((current - 1 + skylineTowers.length) % skylineTowers.length);
          }}
          aria-label="Previous building"
        >
          ←
        </button>

        <div className="pj-mobile-dots">
          {skylineTowers.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`pj-mobile-dot ${i === activeIdx ? 'is-active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                scrollToTower(i);
              }}
              aria-label={`View building ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="pj-nav-btn pj-nav-next"
          onClick={(e) => {
            e.stopPropagation();
            const el = skylineRef.current;
            const current = el && el.clientWidth ? Math.round(el.scrollLeft / el.clientWidth) : activeIdx;
            scrollToTower((current + 1) % skylineTowers.length);
          }}
          aria-label="Next building"
        >
          →
        </button>
      </div>

      <div className="pj-bottom-link">
        <Button href="/projects" variant="ghost">
          View all projects →
        </Button>
      </div>
    </section>
  );
}

export default ProjectsShowcase;
