import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getMediaUrl } from '@/lib/media';

const SLIDES = [
  {
    id: 1,
    desk: '/media/slider/desk01.webp',
    mob: '/media/slider/mob01.webp',
    alt: 'VIR Group Landmark Living Banner 1',
  },
  {
    id: 2,
    desk: '/media/slider/desk02.webp',
    mob: '/media/slider/mob02.webp',
    alt: 'VIR Group Landmark Living Banner 2',
  },
  {
    id: 3,
    desk: '/media/slider/desk03.webp',
    mob: '/media/slider/mob03.webp',
    alt: 'VIR Group Landmark Living Banner 3',
  },
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Prefetch all slider images immediately for instant transitions
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = getMediaUrl(isMobile ? slide.mob : slide.desk);
    });
  }, []);

  // Touch gesture support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section className="homeslider overflow-hidden dark-bg home1 p-0" id="home" data-hero="true" data-theme="basalt" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} aria-label="Home Banner Slider">
      <div id="heroCarousel" className="carousel slide">
        <div className="carousel-inner" style={{ display: 'flex', width: '100%', transform: `translate3d(-${currentIndex * 100}%, 0, 0)`, transition: 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)', willChange: 'transform', }}>
          {SLIDES.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={slide.id}
                className={`carousel-item ${isActive ? 'active' : ''}`}
                style={{
                  flex: '0 0 100%',
                  width: '100%',
                  minWidth: '100%',
                  display: 'block',
                  opacity: 1,
                }}
                aria-hidden={!isActive}
              >
                <div className="banner_content position-relative">
                  <div className="banner-image">
                    <picture className="d-block w-100">
                      <source media="(max-width: 767.98px)" srcSet={getMediaUrl(slide.mob)} />
                      <source media="(min-width: 768px)" srcSet={getMediaUrl(slide.desk)} />
                      <img
                        className="img-fluid w-100"
                        src={getMediaUrl(slide.mob)}
                        alt={slide.alt}
                        width={600}
                        height={1000}
                        loading="eager"
                        fetchPriority={index === 0 ? 'high' : 'auto'}
                        decoding={index === 0 ? 'sync' : 'async'}
                      />
                    </picture>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
        </button>
        <button
          className="carousel-control-next"
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
        </button>

        {/* Indicators */}
        <div className="carousel-indicators">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              type="button"
              className={index === currentIndex ? 'active' : ''}
              onClick={() => goToSlide(index)}
              aria-label={`Slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;