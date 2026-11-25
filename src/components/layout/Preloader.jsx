import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getMediaUrl } from '@/lib/media';
import { ScrollTrigger } from '@/lib/animations/gsap';

/**
 * Hero slider images to preload during intro/initialization
 */
export const HERO_SLIDER_IMAGES = [
  { desk: '/media/slider/desk01.webp', mob: '/media/slider/mob01.webp' },
  { desk: '/media/slider/desk02.webp', mob: '/media/slider/mob02.webp' },
  { desk: '/media/slider/desk03.webp', mob: '/media/slider/mob03.webp' },
];

/**
 * Preload all hero banner images into browser cache immediately
 */
export function preloadHeroSliderImages() {
  if (typeof window === 'undefined') return;
  const isMobile = window.innerWidth < 768;

  // 1. Prioritize active device resolution first for fastest render
  HERO_SLIDER_IMAGES.forEach((slide) => {
    const primaryImg = new Image();
    primaryImg.src = getMediaUrl(isMobile ? slide.mob : slide.desk);
  });

  // 2. Also cache alternative resolution in background
  HERO_SLIDER_IMAGES.forEach((slide) => {
    const altImg = new Image();
    altImg.src = getMediaUrl(isMobile ? slide.desk : slide.mob);
  });
}


export function Preloader() {
  const { pathname } = useLocation();
  const cleanPath = (pathname || '').replace(/\/+$/, '');
  const isHomePage = cleanPath === '' || cleanPath === '/' || cleanPath === '/vir-group' || cleanPath === '/virgroup' || cleanPath === '/vir-groupv3' || cleanPath === '/vir-groupv10';

  const [isVisible, setIsVisible] = useState(isHomePage);
  const [isFading, setIsFading] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const videoRef = useRef(null);
  const hasFinishedRef = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Preload hero banner slider images immediately upon mounting
  useEffect(() => {
    preloadHeroSliderImages();
  }, []);

  const handleComplete = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsFading(true);
    setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';
      window.__lenis?.start();
      window.__virPreloaderDone = true;
      ScrollTrigger.refresh();
      setTimeout(() => ScrollTrigger.refresh(), 200);
    }, 700);
  };

  useEffect(() => {
    if (!isVisible) {
      window.__virPreloaderDone = true;
      document.body.style.overflow = '';
      ScrollTrigger.refresh();
      return;
    }

    // Lock scroll during preloader
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const lenis = window.__lenis;
    lenis?.stop();

    const video = videoRef.current;
    if (video) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay fallback if restricted
        });
      }
    }

    // Safety fallback in case video fails or takes too long (6.5s)
    const timer = setTimeout(() => {
      handleComplete();
    }, 6500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
      ScrollTrigger.refresh();
    };
  }, [isVisible, isMobile]);

  if (!isVisible) return null;

  const videoSrc = getMediaUrl(isMobile ? '/media/mob-loader.mp4' : '/media/loader1.mp4');

  return (
    <div className={`site-preloader ${isFading ? 'is-fading' : ''}`} role="dialog" aria-modal="true" aria-label="Loading VIR Group">
      <div className="site-preloader-inner">
        <video
          key={isMobile ? 'mob' : 'desk'}
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleComplete}
          onError={handleComplete}
          className="site-preloader-video"
          style={{ position: 'relative', zIndex: 2 }}
        />
      </div>
    </div>
  );
}

export default Preloader;
