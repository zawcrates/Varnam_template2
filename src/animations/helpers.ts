/**
 * Reusable animation utility templates and configuration helpers.
 * Contains Framer Motion variants and GSAP helper specifications.
 */

// ==========================================
// 1. Framer Motion Transition Presets
// ==========================================

export const EASE_CUSTOM = [0.16, 1, 0.3, 1]; // Premium custom cubic bezier easing

export const transitionDefaults = {
  duration: 1.0,
  ease: EASE_CUSTOM,
};

// ==========================================
// 2. Framer Motion Variant Templates
// ==========================================

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      ...transitionDefaults,
      delay: customDelay,
    },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    transition: {
      ...transitionDefaults,
      delay: customDelay,
    },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      ...transitionDefaults,
      delay: customDelay,
    },
  }),
};

// Stagger Container
export const staggerContainer = {
  hidden: {},
  visible: (staggerVal: number = 0.1) => ({
    transition: {
      staggerChildren: staggerVal,
    },
  }),
};

// ==========================================
// 3. GSAP Scrolling Helpers Config Generator
// ==========================================

interface GSAPScrollTriggerConfig {
  trigger: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean | string | HTMLElement;
  markers?: boolean;
}

/**
 * Generates a standard ScrollTrigger configuration object for consistent GSAP setups.
 */
export function createScrollTriggerConfig({
  trigger,
  start = 'top 80%',
  end = 'bottom 20%',
  scrub = false,
  pin = false,
  markers = false,
}: GSAPScrollTriggerConfig) {
  return {
    trigger,
    start,
    end,
    scrub,
    pin,
    markers,
  };
}
