import React, { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { LanternData } from '@/types/lantern';

/**
 * Custom hook to execute and manage GSAP animations for individual lanterns.
 * Utilizes a double-wrapper layout to prevent ScrollTrigger and time-based animations from conflicting.
 */
export function useLanternAnimation(
  lantern: LanternData,
  outerRef: React.RefObject<HTMLDivElement | null>,
  innerRef: React.RefObject<HTMLDivElement | null>,
  depth: number
) {
  useEffect(() => {
    const outerEl = outerRef.current;
    const innerEl = innerRef.current;
    if (!outerEl || !innerEl) return;

    // Execute tweens within a GSAP Context for clean component lifecycle scoping
    const ctx = gsap.context(() => {
      // 1. Continuous Time-Based Floating and Swaying (Targeting the INNER wrapper)
      
      // Floating vertical translation: Y: 0 -> -floatDistance -> 0
      gsap.to(innerEl, {
        y: -lantern.floatDistance,
        duration: lantern.floatDuration / 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: lantern.delay,
      });

      // Swaying rotation: Rotate: -rotation -> +rotation -> -rotation
      gsap.to(innerEl, {
        rotation: lantern.rotation + (lantern.driftDirection * 3),
        duration: lantern.floatDuration,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: lantern.delay,
      });

      // Subtle horizontal drift: X: 0 -> (driftDirection * 10px) -> 0
      gsap.to(innerEl, {
        x: lantern.driftDirection * 10,
        duration: lantern.floatDuration * 1.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: lantern.delay,
      });

      // Subtle pulsing scale fluctuation: 1.0 -> 1.03 -> 1.0
      gsap.to(innerEl, {
        scale: 1.03,
        duration: lantern.floatDuration * 0.8,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: lantern.delay,
      });

      // 2. Scroll-Based Parallax Animation (Targeting the OUTER wrapper)
      // The scrollTrigger tracks the entire page's scroll timeline (top top to bottom bottom).
      // Utilizing a dynamic function for the y coordinate ensures responsiveness when height recalculates.
      gsap.to(outerEl, {
        y: () => {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          return -maxScroll * depth;
        },
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true, // Forces GSAP to re-evaluate the scroll height on resize
        },
      });
    });

    // Automatically clean up all timelines, tweens, and ScrollTriggers on unmount
    return () => {
      ctx.revert();
    };
  }, [lantern, outerRef, innerRef, depth]);
}
