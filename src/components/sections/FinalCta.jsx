import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '@/lib/animations/gsap';
import { Elevation } from '@/components/ui/Elevation';
import { Headline } from '@/components/ui/Headline';
import { LevelMarker } from '@/components/ui/LevelMarker';
import { getMediaUrl } from '@/lib/media';

const SKYLINE = [
  [20, 110, 220],
  [150, 90, 300],
  [260, 140, 170],
  [420, 80, 360],
  [520, 120, 240],
  [860, 100, 330],
  [980, 150, 210],
  [1150, 90, 280],
  [1260, 120, 190],
];

/**
 * ============================================================================
 * SECTION COMPONENT: FINAL CTA ("Your next address starts here")
 * ============================================================================
 * Closing call-to-action section with luxury rooftop skyline background image,
 * ambient twilight overlay, architectural elevation wireframe, and high-contrast
 * premium typography.
 * ============================================================================
 */
export function FinalCta({
  lines,
  level,
  tag,
  description,
  children,
  bgImage = '/media/final-cta-bg.jpg',
}) {
  const sectionRef = useRef(null);
  const bgImgRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const img = bgImgRef.current;
      if (!section || !img) return;

      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          img,
          {
            yPercent: -10,
            scale: 1.12,
          },
          {
            yPercent: 10,
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  const marker = tag || level;

  return (
    <section
      ref={sectionRef}
      className="cta cta-has-bg"
      data-theme="basalt"
      data-level={marker}
      aria-label="Get in touch"
    >
      {/* Background Image Layer */}
      {bgImage && (
        <div className="cta-bg-layer" aria-hidden="true">
          <img
            ref={bgImgRef}
            src={getMediaUrl(bgImage)}
            alt="Luxury Rooftop Skyline"
            className="cta-bg-img"
            loading="lazy"
          />
          <div className="cta-bg-overlay" />
        </div>
      )}

      {/* Architectural Elevation Blueprint Backdrop */}
      <div className="cta-media">
        <Elevation
          floors={30}
          towerWidth={140}
          columns={4}
          crown
          drawable
          width={1400}
          height={500}
          base={2}
          floorHeight={10}
          context={SKYLINE}
        />
      </div>

      <div className="wrap cta-in">
        {marker && <LevelMarker name={marker} centered />}
        <Headline variant="display" lines={lines} />
        {description && (
          <p className="cta-desc" data-fade>
            {description}
          </p>
        )}
        <div className="cta-actions" data-fade>
          {children}
        </div>
      </div>
    </section>
  );
}
