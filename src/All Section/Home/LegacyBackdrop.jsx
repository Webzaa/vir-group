import React, { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger, REFRESH } from '@/lib/animations/gsap';
import { getMediaUrl } from '@/lib/media';

export function LegacyBackdrop({ children }) {
  const containerRef = useRef(null);
  const childArray = React.Children.toArray(children);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      // ==========================================
      // DESKTOP: >= 900px
      // ==========================================
      mm.add('(min-width: 900px)', () => {
        const dfCards = gsap.utils.toArray('.df-sticky-card', container);
        const hasThreeCards = dfCards.length >= 3;
        const totalScroll = hasThreeCards ? '+=6400' : '+=3600';

        dfCards.forEach((card, index) => {
          gsap.set(card, {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: dfCards.length - index,
            clipPath: 'inset(0px 0px 0% 0px)',
            force3D: true,
          });
        });

        const bgImg = container.querySelector('.legacy-backdrop-img');
        if (bgImg) {
          gsap.set(bgImg, { scale: 1.0, transformOrigin: 'center center' });
        }

        const dfCardsTL = gsap.timeline();

        ScrollTrigger.create({
          animation: dfCardsTL,
          trigger: container,
          start: 'top top',
          end: totalScroll,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          scrub: 0.8,
          refreshPriority: REFRESH.PIN,
          invalidateOnRefresh: true,
        });

        if (bgImg) {
          dfCardsTL.to(
            bgImg,
            {
              scale: 1.18,
              ease: 'none',
              duration: 3.1,
              force3D: true,
            },
            0
          );
        }

        const statementWrap = container.querySelector('.df-card-statement .statement-wrap');
        if (statementWrap) {
          dfCardsTL.to(
            statementWrap,
            {
              y: -50,
              opacity: 0.85,
              ease: 'none',
              duration: 3.1,
            },
            0
          );
        }

        const card0 = dfCards[0];
        if (card0) {
          dfCardsTL.to(
            card0,
            {
              clipPath: 'inset(0px 0px 100% 0px)',
              duration: 1.6,
              ease: 'none',
              onUpdate: function () {
                if (card0?.style) {
                  card0.style.pointerEvents = this.progress() >= 0.98 ? 'none' : 'auto';
                }
              },
            },
            1.5
          );
        }

        dfCardsTL.to(
          {},
          {
            duration: 6.0,
            ease: 'none',
            onUpdate: function () {
              const p = this.progress();
              window.dispatchEvent(
                new CustomEvent('vir-clock-progress', { detail: { progress: p } })
              );
            },
          },
          3.5
        );

        const card1 = dfCards[1];
        if (card1 && hasThreeCards) {
          const storyContainer = container.querySelector('.df-card-story .story-container');
          if (storyContainer) {
            dfCardsTL.to(
              storyContainer,
              {
                y: -50,
                opacity: 0.85,
                ease: 'none',
                duration: 1.6,
              },
              10.5
            );
          }

          dfCardsTL.to(
            card1,
            {
              clipPath: 'inset(0px 0px 100% 0px)',
              duration: 1.6,
              ease: 'none',
              onUpdate: function () {
                if (card1?.style) {
                  card1.style.pointerEvents = this.progress() >= 0.98 ? 'none' : 'auto';
                }
              },
            },
            10.5
          );

          const partingLeft = container.querySelector('.pj-parting-cloud-left');
          const partingRight = container.querySelector('.pj-parting-cloud-right');
          const partingMist = container.querySelector('.pj-parting-cloud-mist');
          const topBranding = container.querySelector('.pj-top-branding');

          if (partingLeft && partingRight) {
            gsap.set(partingLeft, { xPercent: 0, opacity: 1, scale: 1 });
            gsap.set(partingRight, { xPercent: 0, opacity: 1, scale: 1 });
            if (partingMist) {
              gsap.set(partingMist, { opacity: 0.7 });
            }

            dfCardsTL
              .to(
                partingLeft,
                {
                  xPercent: -130,
                  opacity: 0,
                  scale: 1.15,
                  duration: 1.6,
                  ease: 'power2.inOut',
                },
                11.3
              )
              .to(
                partingRight,
                {
                  xPercent: 130,
                  opacity: 0,
                  scale: 1.15,
                  duration: 1.6,
                  ease: 'power2.inOut',
                },
                11.3
              );

            if (partingMist) {
              dfCardsTL.to(
                partingMist,
                {
                  opacity: 0,
                  duration: 1.3,
                  ease: 'power1.out',
                },
                11.3
              );
            }
          }

          if (topBranding) {
            gsap.set(topBranding, { opacity: 0.1, y: -24 });
            dfCardsTL.to(
              topBranding,
              {
                opacity: 1,
                y: 0,
                duration: 1.3,
                ease: 'power2.out',
              },
              11.5
            );
          }

          const towers = gsap.utils.toArray('.pj-sky-tower', container);
          if (towers.length) {
            gsap.set(towers, { y: 240, opacity: 0.25, scale: 0.95 });
            dfCardsTL.to(
              towers,
              {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.08,
                duration: 1.4,
                ease: 'power2.out',
              },
              11.7
            );
            const cloudBack = container.querySelector('.pj-cloud-back');
            const cloudMid = container.querySelector('.pj-cloud-mid');
            const cloudFront = container.querySelector('.pj-cloud-front');
            const mistPuffs = gsap.utils.toArray('.pj-mist-puff', container);

            if (cloudBack) dfCardsTL.to(cloudBack, { x: -16, duration: 1.4, ease: 'none' }, 11.7);
            if (cloudMid) dfCardsTL.to(cloudMid, { x: 20, duration: 1.4, ease: 'none' }, 11.7);
            if (cloudFront) dfCardsTL.to(cloudFront, { x: -12, duration: 1.4, ease: 'none' }, 11.7);
            if (mistPuffs.length) dfCardsTL.to(mistPuffs, { scale: 1.08, opacity: 0.55, stagger: 0.1, duration: 1.4, ease: 'none' }, 11.7);
          }

          const skylineTrack = container.querySelector('.pj-skyline-track');
          if (skylineTrack) {
            gsap.set(skylineTrack, { x: 0 });
            dfCardsTL.to(
              skylineTrack,
              {
                x: () => {
                  const maxShift = skylineTrack.scrollWidth - container.clientWidth;
                  return -Math.max(0, maxShift);
                },
                duration: 6.0,
                ease: 'none',
                onUpdate: function () {
                  const p = this.progress();
                  const totalTowers = towers.length || 7;
                  const idx = Math.min(Math.floor(p * totalTowers), totalTowers - 1);
                  window.dispatchEvent(
                    new CustomEvent('vir-towers-progress', { detail: { progress: p, activeIdx: idx } })
                  );
                },
              },
              13.4
            );
          }
        }
      });

      // ==========================================
      // MOBILE: < 900px
      // ==========================================
      mm.add('(max-width: 899px)', () => {
        const dfCards = gsap.utils.toArray('.df-sticky-card', container);
        const hasThreeCards = dfCards.length >= 3;
        const totalScroll = hasThreeCards ? '+=3200' : '+=1800';

        dfCards.forEach((card, index) => {
          gsap.set(card, {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: dfCards.length - index,
            clipPath: 'inset(0px 0px 0% 0px)',
            force3D: true,
          });
        });

        const bgImg = container.querySelector('.legacy-backdrop-img');
        if (bgImg) {
          gsap.set(bgImg, { scale: 1.0, transformOrigin: 'center center' });
        }

        const mobileTL = gsap.timeline();

        ScrollTrigger.create({
          animation: mobileTL,
          trigger: container,
          start: 'top top',
          end: totalScroll,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          fastScrollEnd: false,
          scrub: 0.8,
          refreshPriority: REFRESH.PIN,
          invalidateOnRefresh: true,
        });

        if (bgImg) {
          mobileTL.to(
            bgImg,
            {
              scale: 1.12,
              ease: 'none',
              duration: 2.5,
              force3D: true,
            },
            0
          );
        }

        const statementWrap = container.querySelector('.df-card-statement .statement-wrap');
        if (statementWrap) {
          mobileTL.to(
            statementWrap,
            {
              y: -30,
              opacity: 0.85,
              ease: 'none',
              duration: 2.5,
            },
            0
          );
        }

        const card0 = dfCards[0];
        if (card0) {
          mobileTL.to(
            card0,
            {
              clipPath: 'inset(0px 0px 100% 0px)',
              duration: 1.3,
              ease: 'none',
              onUpdate: function () {
                if (card0?.style) {
                  card0.style.pointerEvents = this.progress() >= 0.98 ? 'none' : 'auto';
                }
              },
            },
            1.2
          );
        }

        mobileTL.to(
          {},
          {
            duration: 4.5,
            ease: 'none',
            onUpdate: function () {
              const p = this.progress();
              window.dispatchEvent(
                new CustomEvent('vir-clock-progress', { detail: { progress: p } })
              );
            },
          },
          2.8
        );

        const card1 = dfCards[1];
        if (card1 && hasThreeCards) {
          mobileTL.to(
            card1,
            {
              clipPath: 'inset(0px 0px 100% 0px)',
              duration: 1.3,
              ease: 'none',
              onUpdate: function () {
                if (card1?.style) {
                  card1.style.pointerEvents = this.progress() >= 0.98 ? 'none' : 'auto';
                }
              },
            },
            8.0
          );

          const partingLeft = container.querySelector('.pj-parting-cloud-left');
          const partingRight = container.querySelector('.pj-parting-cloud-right');
          const partingMist = container.querySelector('.pj-parting-cloud-mist');
          const topBranding = container.querySelector('.pj-top-branding');

          if (partingLeft && partingRight) {
            gsap.set(partingLeft, { xPercent: 0, opacity: 1, scale: 1 });
            gsap.set(partingRight, { xPercent: 0, opacity: 1, scale: 1 });
            if (partingMist) gsap.set(partingMist, { opacity: 0.7 });

            mobileTL
              .to(partingLeft, { xPercent: -130, opacity: 0, scale: 1.15, duration: 1.3, ease: 'power2.inOut' }, 8.7)
              .to(partingRight, { xPercent: 130, opacity: 0, scale: 1.15, duration: 1.3, ease: 'power2.inOut' }, 8.7);

            if (partingMist) {
              mobileTL.to(partingMist, { opacity: 0, duration: 1.1, ease: 'power1.out' }, 8.7);
            }
          }

          if (topBranding) {
            gsap.set(topBranding, { opacity: 0.1, y: -20 });
            mobileTL.to(topBranding, { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out' }, 8.9);
          }

          mobileTL.to({}, { duration: 0.8 }, 10.2);
        }
      });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="df-sticky-container legacy-backdrop-wrapper">
      <div className="df-sticky-card df-card-statement" data-theme="basalt">
        <div className="legacy-backdrop-bg" aria-hidden="true">
          <img
            src={getMediaUrl('/media/lagecy.png')}
            alt="VIR Group Architecture"
            className="legacy-backdrop-img"
            loading="eager"
            onLoad={() => ScrollTrigger.refresh()}
          />
          <div className="legacy-backdrop-overlay" />
        </div>
        <div className="df-card-inner">{childArray[0]}</div>
      </div>

      <div className="df-sticky-card df-card-story" data-theme="white">
        <div className="df-card-inner">{childArray[1]}</div>
      </div>

      {childArray[2] && (
        <div className="df-sticky-card df-card-projects" data-theme="basalt">
          <div className="df-card-inner df-card-inner-projects">{childArray[2]}</div>
        </div>
      )}
    </div>
  );
}

export default LegacyBackdrop;
