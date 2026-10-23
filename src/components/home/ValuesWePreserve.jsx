import { useRef, useState } from 'react';
import { getMediaUrl } from '@/lib/media';
import { gsap, useGSAP, REFRESH } from '@/lib/animations/gsap';

const VALUES = [
  {
    title: 'Quality',
    text: 'Premium construction and materials that stand the test of time',
    image: getMediaUrl('/media/Values-We-Preserve/quality.avif'),
  },
  {
    title: 'Value',
    text: 'Creating vibrant neighborhoods where families grow together',
    image: getMediaUrl('/media/Values-We-Preserve/value.avif'),
  },
  {
    title: 'Trust',
    text: 'Spaces crafted with attention to every detail and lifestyle need',
    image: getMediaUrl('/media/Values-We-Preserve/trust.avif'),
  },
  {
    title: 'Commitment',
    text: 'Eco-friendly practices for a better tomorrow',
    image: getMediaUrl('/media/Values-We-Preserve/commitment.avif'),
  },
];

export function ValuesWePreserve({ level = '+08.00' }) {
  const sectionRef = useRef(null);

  // Mobile Swiper State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);

  const totalSlides = VALUES.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goToSlide = (idx) => {
    setCurrentSlide(Math.max(0, Math.min(idx, totalSlides - 1)));
  };

  /* Touch / Pointer drag gesture handlers for Mobile Swiper */
  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    setIsDragging(true);
    startXRef.current = e.clientX;
    currentXRef.current = e.clientX;
    setDragOffset(0);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    currentXRef.current = e.clientX;
    const diff = currentXRef.current - startXRef.current;
    // Dampen drag at boundaries
    if ((currentSlide === 0 && diff > 0) || (currentSlide === totalSlides - 1 && diff < 0)) {
      setDragOffset(diff * 0.3);
    } else {
      setDragOffset(diff);
    }
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = currentXRef.current - startXRef.current;
    const threshold = 40;

    if (diff < -threshold && currentSlide < totalSlides - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else if (diff > threshold && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
    setDragOffset(0);
  };

  // GSAP Desktop Animation Only (>= 900px)
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set(section, {
          '--rise': 0,
          '--spread': 0,
          '--reveal': 0,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=2800',
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            refreshPriority: REFRESH.PIN,
          },
        });

        // Phase 1: Rise (Heading moves up to top, cards rise up from bottom stacked in center)
        tl.to(section, {
          '--rise': 1,
          duration: 1.2,
          ease: 'power2.out',
        })
          // Phase 2: Spread (Cards fan out from center into a single horizontal row)
          .to(
            section,
            {
              '--spread': 1,
              duration: 1.4,
              ease: 'power2.inOut',
            },
            '+=0.1',
          )
          // Phase 3: Reveal (Title & description captions fade in over each image)
          .to(
            section,
            {
              '--reveal': 1,
              duration: 0.9,
              ease: 'power1.out',
            },
            '+=0.05',
          );

        return () => {
          tl.kill();
        };
      });

      // Reduced motion
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(section, {
          '--rise': 1,
          '--spread': 1,
          '--reveal': 1,
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section className="vw" ref={sectionRef} data-level={level} aria-labelledby="vw-heading">
      <style>{css}</style>

      <div className="vw__stage">
        <header className="vw__head">
          <h2 id="vw-heading" className="vw__title">
            Values We Preserve
          </h2>
          <p className="vw__lead">
            Delivering thoughtfully designed spaces that foster everyday joy across homes, families, and communities.
          </p>
        </header>

        {/* Desktop Animated Cards Deck (>= 900px) */}
        <ul className="vw__row">
          {VALUES.map((v, i) => (
            <li className="vw__card" style={{ '--i': i }} key={v.title}>
              <img src={v.image} alt={v.title} loading="lazy" />
              <div className="vw__caption">
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Mobile Swiper Slider (< 900px) */}
        <div
          className="vw-mobile-swiper"
          role="region"
          aria-label="Values We Preserve Carousel"
        >
          <div
            className={`vw-swiper-container ${isDragging ? 'is-dragging' : ''}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div
              className="vw-swiper-track"
              style={{
                transform: `translateX(calc(-${currentSlide} * (var(--slide-w) + var(--slide-gap)) + ${dragOffset}px))`,
                transition: isDragging ? 'none' : 'transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {VALUES.map((v, i) => (
                <div
                  key={v.title}
                  className={`vw-swiper-slide ${currentSlide === i ? 'is-active' : ''}`}
                >
                  <div className="vw-swiper-card">
                    <div className="vw-swiper-img-box">
                      <img src={v.image} alt={v.title} loading="lazy" />
                      <span className="vw-swiper-badge">0{i + 1}</span>
                    </div>
                    <div className="vw-swiper-caption">
                      <h3>{v.title}</h3>
                      <p>{v.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Swiper Controls: Dots & Navigation Arrows */}
          <div className="vw-swiper-controls">
            <div className="vw-swiper-dots">
              {VALUES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`vw-swiper-dot ${currentSlide === i ? 'is-active' : ''}`}
                  onClick={() => goToSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="vw-swiper-nav">
              <span className="vw-swiper-counter">
                <strong>0{currentSlide + 1}</strong> / 0{totalSlides}
              </span>
              <div className="vw-swiper-buttons">
                <button
                  type="button"
                  className="vw-swiper-btn"
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  aria-label="Previous value"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="vw-swiper-btn"
                  onClick={nextSlide}
                  disabled={currentSlide === totalSlides - 1}
                  aria-label="Next value"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ValuesWePreserve;

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;700&family=Inter:wght@400;500&display=swap');

.vw {
  --rise: 0;
  --spread: 0;
  --reveal: 0;
  --w: clamp(190px, 21vw, 290px);
  --gap: clamp(12px, 1.8vw, 28px);

  position: relative;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  color: #5a3a1c;
  font-family: 'Inter', system-ui, sans-serif;
  background: #fff;
}

.vw__stage {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: clamp(40px, 9vh, 96px) 24px 0;
}

.vw__head {
  text-align: center;
  max-width: 680px;
  will-change: transform;
  transform: translate3d(0, calc((1 - var(--rise)) * clamp(150px, 28vh, 300px)), 0);
}

.vw__title {
  margin: 0;
  font-family: 'AvenirLTProMedium', var(--font-display), sans-serif;
  font-weight: 500;
  font-size: clamp(2.2rem, 4.6vw, 3.6rem);
  line-height: 1.1;
  letter-spacing: 0.005em;
  color: #3d2612;
}

.vw__lead {
  margin: 20px auto 0;
  max-width: 52ch;
  font-size: clamp(0.9rem, 1.1vw, 1rem);
  line-height: 1.6;
  color: #7a6246;
}

/* Desktop deck */
.vw__row {
  list-style: none;
  margin: auto 0;
  padding: 0;
  position: relative;
  width: 100%;
  height: calc(var(--w) * 7 / 6);
}

.vw__card {
  position: absolute;
  top: 0;
  left: 50%;
  width: var(--w);
  aspect-ratio: 6 / 7;
  margin-left: calc(var(--w) / -2);
  overflow: hidden;
  border-radius: 0;
  background: #2a1a0c;
  box-shadow: 0 18px 40px -18px rgba(60, 35, 10, 0.55);
  will-change: transform;
  transform: translate3d(
    calc((var(--i) - 1.5) * (var(--w) + var(--gap)) * var(--spread)),
    calc((1 - var(--rise)) * 75vh),
    0
  );
}

.vw__card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.vw__caption {
  position: absolute;
  inset: auto 0 0 0;
  padding: 72px 20px 22px;
  color: #fbf3e2;
  background: linear-gradient(to top, rgba(22, 12, 2, 0.92) 0%, rgba(22, 12, 2, 0.58) 55%, transparent 100%);
  opacity: var(--reveal);
  transform: translateY(calc((1 - var(--reveal)) * 14px));
}

.vw__caption h3 {
  margin: 0 0 6px;
  font-family: 'AvenirLTProMedium', var(--font-display), sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.1;
  color: #fbf3e2;
}

.vw__caption p {
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.5;
  color: rgba(251, 243, 226, 0.88);
}

/* Hide mobile swiper on desktop */
.vw-mobile-swiper {
  display: none !important;
}

/* Mobile & Tablet (< 900px): Luxury Touch Swiper */
@media (max-width: 899px) {
  .vw {
    height: auto !important;
    min-height: 0 !important;
    overflow: hidden !important;
    padding: clamp(36px, 6vh, 52px) 0 40px 0;
    background: #ffffff;
  }

  .vw__stage {
    position: static !important;
    height: auto !important;
    overflow: visible !important;
    display: block !important;
    padding: 0 !important;
  }

  .vw__head {
    position: static !important;
    transform: none !important;
    will-change: auto !important;
    width: 100%;
    max-width: 580px;
    margin: 0 auto;
    padding: 0 16px;
    box-sizing: border-box;
    text-align: center;
  }

  @media (min-width: 540px) and (max-width: 899px) {
    .vw__head {
      padding: 0 20px;
    }
  }

  .vw__title {
    font-size: clamp(1.75rem, 5.2vw, 2.2rem);
    line-height: 1.15;
    margin: 0;
  }

  .vw__lead {
    margin: 8px auto 0;
    font-size: clamp(0.82rem, 2.3vw, 0.92rem);
    line-height: 1.45;
    max-width: 44ch;
  }

  .vw__row {
    display: none !important;
  }

  .vw-mobile-swiper {
    display: block !important;
    --slide-w: clamp(275px, 82vw, 350px);
    --slide-gap: 14px;
    width: 100%;
    margin-top: 24px;
    position: relative;
    overflow: hidden;
  }

  @media (min-width: 540px) and (max-width: 899px) {
    .vw-mobile-swiper {
      --slide-w: 460px;
      --slide-gap: 18px;
      max-width: 540px;
      margin: 24px auto 0;
    }
  }

  .vw-swiper-container {
    width: 100%;
    overflow: hidden;
    padding: 8px 0 14px 16px;
    cursor: grab;
    touch-action: pan-y;
    box-sizing: border-box;
  }

  @media (min-width: 540px) and (max-width: 899px) {
    .vw-swiper-container {
      padding: 8px 0 14px 20px;
    }
  }

  .vw-swiper-container.is-dragging {
    cursor: grabbing;
    user-select: none;
  }

  .vw-swiper-track {
    display: flex;
    gap: var(--slide-gap);
    will-change: transform;
  }

  .vw-swiper-slide {
    flex: 0 0 var(--slide-w);
    width: var(--slide-w);
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .vw-swiper-slide:not(.is-active) {
    opacity: 0.72;
    transform: scale(0.97);
  }

  .vw-swiper-slide.is-active {
    opacity: 1;
    transform: scale(1);
  }

  .vw-swiper-card {
    position: relative;
    width: 100%;
    aspect-ratio: 6 / 7;
    // border-radius: 6px;
    overflow: hidden;
    background: #120d08;
    box-shadow: 0 16px 36px -10px rgba(35, 20, 8, 0.45);
    border: 1px solid rgba(197, 168, 128, 0.35);
  }

  .vw-swiper-img-box {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #1a1208;
  }

  .vw-swiper-img-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .vw-swiper-badge {
    position: absolute;
    top: 14px;
    right: 14px;
    z-index: 3;
    background: rgba(18, 13, 8, 0.82);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(197, 168, 128, 0.55);
    color: #c5a880;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    padding: 4px 10px;
    border-radius: 20px;
  }

  .vw-swiper-caption {
    position: absolute;
    inset: auto 0 0 0;
    z-index: 2;
    padding: 80px 22px 24px;
    background: linear-gradient(to top, rgba(16, 11, 7, 0.96) 0%, rgba(16, 11, 7, 0.62) 55%, transparent 100%);
    border-top: none;
    color: #fbf3e2;
  }

  .vw-swiper-caption h3 {
    margin: 0 0 6px;
    font-family: 'AvenirLTProMedium', var(--font-display), serif;
    font-size: clamp(1.4rem, 4.8vw, 1.7rem);
    font-weight: 700;
    color: #fbf3e2;
    letter-spacing: 0.01em;
    line-height: 1.15;
  }

  .vw-swiper-caption p {
    margin: 0;
    font-size: clamp(0.85rem, 2.5vw, 0.95rem);
    line-height: 1.5;
    color: rgba(251, 243, 226, 0.9);
    font-weight: 400;
  }

  .vw-swiper-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px 0;
    width: 100%;
    box-sizing: border-box;
  }

  @media (min-width: 540px) and (max-width: 899px) {
    .vw-swiper-controls {
      padding: 14px 20px 0;
      max-width: 520px;
      margin: 0 auto;
    }
  }

  .vw-swiper-dots {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .vw-swiper-dot {
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: rgba(60, 35, 10, 0.22);
    border: none;
    padding: 0;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .vw-swiper-dot.is-active {
    width: 24px;
    background: linear-gradient(90deg, #c5a880 0%, #b48c36 100%);
  }

  .vw-swiper-nav {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .vw-swiper-counter {
    font-size: 12px;
    color: #7a6246;
    letter-spacing: 0.05em;
  }

  .vw-swiper-counter strong {
    color: #3d2612;
    font-size: 13.5px;
  }

  .vw-swiper-buttons {
    display: flex;
    gap: 6px;
  }

  .vw-swiper-btn {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1.5px solid rgba(197, 168, 128, 0.5);
    background: transparent;
    color: #3d2612;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 0;
  }

  .vw-swiper-btn:active:not(:disabled) {
    background: rgba(197, 168, 128, 0.2);
    transform: scale(0.94);
  }

  .vw-swiper-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
}

@media (prefers-reduced-motion: reduce) {
  .vw {
    height: auto;
    padding: 72px 24px;
    overflow: visible;
  }
  .vw__stage {
    position: static;
    height: auto;
    overflow: visible;
    padding: 0;
  }
  .vw__head {
    transform: none !important;
  }
  .vw__row {
    margin: 40px auto 0;
    max-width: 1280px;
    height: auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--gap);
  }
  .vw__card {
    position: relative;
    left: auto;
    width: auto;
    margin: 0;
    transform: none !important;
  }
  .vw__caption {
    opacity: 1 !important;
    transform: none !important;
  }
}
`;
