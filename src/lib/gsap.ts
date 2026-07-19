import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Global configuration defaults
gsap.config({
  nullTargetWarn: false, // Prevents spam warning console logs in development
});

export { gsap, ScrollTrigger };
