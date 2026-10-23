import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}
export { gsap, ScrollTrigger, useGSAP };
/** Motion tokens from the design system (motion.md). */
export const EASE = {
  arrive: 'expo.out',
  reveal: 'power4.inOut',
  settle: 'power2.out',
};
export const DUR = { micro: 0.3, ui: 0.6, text: 1, mask: 1.5, hero: 2.4 };
/**
 * Refresh order matters: pins must be measured before triggers below them.
 * Pins use PIN, scroll-position readers (header, rail) use OBSERVER.
 */
export const REFRESH = { PIN: 1, DEFAULT: 0, OBSERVER: -1 };
