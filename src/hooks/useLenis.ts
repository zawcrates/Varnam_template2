import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from '@/lib/gsap';

/**
 * Custom hook to easily initialize and manage Lenis smooth scrolling.
 * Seamlessly integrates Lenis with GSAP ScrollTrigger.
 * 
 * @param enabled Set to true to activate smooth scrolling, false to deactivate.
 */
export function useLenis(enabled: boolean = true) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Initialize Lenis instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Synchronize ScrollTrigger updates with Lenis scroll events
    lenis.on('scroll', () => {
      import('@/lib/gsap').then(({ ScrollTrigger }) => {
        ScrollTrigger.update();
      });
    });

    // Synchronize Lenis frames with the standard GSAP ticker
    const gsapTicker = (time: number) => {
      lenis.raf(time * 1000); // convert GSAP time (seconds) to milliseconds
    };
    
    gsap.ticker.add(gsapTicker);

    // Cleanup on unmount or when disabled
    return () => {
      gsap.ticker.remove(gsapTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  return lenisRef;
}
