import { useState, useId, useRef, useEffect, useCallback, useMemo } from 'react';
import { testimonialsData } from '@/data/testimonials';
import { getMediaUrl } from '@/lib/media';

export function Testimonial({ items = testimonialsData, level = '+09.00', autoPlayInterval = 4500 }) {
  const totalItems = items.length;
  const CLONES_COUNT = 3;

  // Clone 3 items at start and end for seamless infinite looping without empty space or rewind jumps
  const slides = useMemo(() => {
    if (totalItems <= 1) return items;
    return [
      ...items.slice(-CLONES_COUNT),
      ...items,
      ...items.slice(0, CLONES_COUNT),
    ];
  }, [items, totalItems]);

  const [pos, setPos] = useState(CLONES_COUNT); // Starts at real index 0 (Slide 1)
  const [withTransition, setWithTransition] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isTransitioningRef = useRef(false);
  const resetTimerRef = useRef(null);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const trackRef = useRef(null);
  const sectionId = useId();

  // Active display index (0-based: 0 to totalItems - 1)
  const activeIndex = totalItems > 0 ? ((pos - CLONES_COUNT) % totalItems + totalItems) % totalItems : 0;

  const handleNext = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setWithTransition(true);
    setPos((prev) => prev + 1);

    clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      isTransitioningRef.current = false;
    }, 550);
  }, []);

  const handlePrev = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setWithTransition(true);
    setPos((prev) => prev - 1);

    clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      isTransitioningRef.current = false;
    }, 550);
  }, []);

  const goToIndex = (targetIdx) => {
    if (isTransitioningRef.current) return;
    setWithTransition(true);
    setPos(targetIdx + CLONES_COUNT);
  };

  // Seamless jump when transitioning into clones
  const handleTransitionEnd = (e) => {
    if (e && e.target !== trackRef.current) return;

    if (pos >= CLONES_COUNT + totalItems) {
      setWithTransition(false);
      setPos(pos - totalItems);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setWithTransition(true);
          isTransitioningRef.current = false;
        });
      });
    } else if (pos < CLONES_COUNT) {
      setWithTransition(false);
      setPos(pos + totalItems);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setWithTransition(true);
          isTransitioningRef.current = false;
        });
      });
    } else {
      isTransitioningRef.current = false;
    }
  };

  // Auto-play infinite loop (pauses on hover and while dragging)
  useEffect(() => {
    if (isHovered || isDragging || totalItems <= 1) return;

    const timer = setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) return;
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isHovered, isDragging, totalItems, autoPlayInterval, handleNext, pos]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => clearTimeout(resetTimerRef.current);
  }, []);

  /* Pointer / Touch Drag Gestures for Swiper */
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
    setDragOffset(diff);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = currentXRef.current - startXRef.current;
    const threshold = 45;

    if (diff < -threshold) {
      handleNext();
    } else if (diff > threshold) {
      handlePrev();
    }
    setDragOffset(0);
  };

  return (
    <section
      className="testimonials-sec"
      id="testimonials"
      data-level={level}
      data-theme="lime"
      aria-labelledby={`${sectionId}-heading`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ----------------------------------------------------------------------
          BACKGROUND AMBIANCE & OVERLAY
          ---------------------------------------------------------------------- */}
      <div className="testimonials-bg" aria-hidden="true">
        <img
          src={getMediaUrl('/media/testimonial-bg.jpg')}
          alt=""
          className="testimonials-bg-img"
          loading="lazy"
        />
        <div className="testimonials-bg-overlay" />
      </div>

      <div className="wrap testimonials-wrap">
        {/* --------------------------------------------------------------------
            SECTION HEADER: Label, Diamond Divider & Title
            -------------------------------------------------------------------- */}
        <header className="testimonials-header">
          <p className="testimonials-label">TESTIMONIALS</p>
          <div className="testimonials-divider" aria-hidden="true">
            <span className="testimonials-divider-line" />
            <span className="testimonials-diamond" />
            <span className="testimonials-divider-line" />
          </div>
          <h2 id={`${sectionId}-heading`} className="testimonials-title">
            What Our Clients Say
          </h2>
        </header>

        {/* --------------------------------------------------------------------
            SWIPER SLIDER CAROUSEL TRACK (Seamless Infinite Loop)
            -------------------------------------------------------------------- */}
        <div
          className={`testimonials-swiper-container ${isDragging ? 'is-dragging' : ''}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          role="region"
          aria-label="Client testimonials slider"
        >
          <div
            ref={trackRef}
            className="testimonials-swiper-track"
            style={{
              transform: `translateX(calc(-${pos} * var(--testimonials-shift) + ${dragOffset}px))`,
              transition:
                withTransition && !isDragging
                  ? 'transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)'
                  : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {slides.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className={`testimonials-swiper-slide ${pos === idx ? 'is-active' : ''}`}
              >
                <article className="testimonial-card">
                  <div
                    className={`testimonial-quote-glyph ${item.quoteVariant === 'muted' || idx % 2 === 1 ? 'is-muted' : 'is-primary'}`}
                    aria-hidden="true"
                  >
                    <svg
                      width="86"
                      height="110"
                      viewBox="14 4 32 58"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="testimonial-svg-glyph"
                    >
                      <path d="M31 5H42L35 34H45V61H15V38L31 5Z" fill="#0c1049ff" />
                    </svg>
                  </div>
                  <div className="testimonial-body">
                    <div className="testimonial-stars" aria-label="5 out of 5 stars">
                      {[...Array(5)].map((_, starIdx) => (
                        <svg
                          key={starIdx}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="testimonial-star"
                          aria-hidden="true"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>

                    <blockquote className="testimonial-quote-text">
                      “{item.quote}”
                    </blockquote>

                    <footer className="testimonial-meta">
                      <div className="testimonial-meta-author">
                        <h3 className="testimonial-author">{item.author}</h3>
                        <p className="testimonial-role">{item.role}</p>
                      </div>

                      <div className="testimonial-meta-details">
                        <p className="testimonial-location">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="testimonial-pin-icon"
                            aria-hidden="true"
                          >
                            <path d="M12 21s-6-5.6-6-10a6 6 0 1 1 12 0c0 4.4-6 10-6 10z" />
                            <circle cx="12" cy="11" r="2.5" />
                          </svg>
                          <span>{item.location}</span>
                        </p>
                        {item.project && (
                          <p className="testimonial-project">
                            <span>
                              Project: <b>{item.project}</b>
                            </span>
                          </p>
                        )}
                      </div>
                    </footer>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* --------------------------------------------------------------------
            CAROUSEL CONTROLS & PROGRESS BAR (< 1 ─── 5 >)
            -------------------------------------------------------------------- */}
        <nav
          className="testimonials-nav"
          aria-label="Testimonials pagination navigation"
        >
          {/* Previous Slide Button */}
          <button
            type="button"
            className="testimonials-nav-btn testimonials-nav-prev"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="testimonials-nav-arrow"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Current Index Number (1-based) */}
          <span className="testimonials-nav-num testimonials-nav-current">
            {activeIndex + 1}
          </span>

          {/* Central Progress Track Line */}
          <div
            className="testimonials-progress-track"
            role="progressbar"
            aria-valuenow={activeIndex + 1}
            aria-valuemin="1"
            aria-valuemax={totalItems}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, clickX / rect.width));
              const targetIdx = Math.floor(ratio * totalItems);
              goToIndex(targetIdx);
            }}
            style={{ cursor: 'pointer' }}
          >
            <div
              className="testimonials-progress-fill"
              style={{
                width: `${100 / totalItems}%`,
                transform: `translateX(${activeIndex * 100}%)`,
              }}
            />
          </div>

          {/* Total Items Number */}
          <span className="testimonials-nav-num testimonials-nav-total">
            {totalItems}
          </span>

          {/* Next Slide Button */}
          <button
            type="button"
            className="testimonials-nav-btn testimonials-nav-next"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="testimonials-nav-arrow"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </nav>
      </div>
    </section>
  );
}

export default Testimonial;


