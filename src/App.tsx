import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LenisProvider } from '@/components/LenisProvider';
import { useActiveBreakpoint } from '@/hooks';
import { HeroTypography } from '@/components/HeroTypography/HeroTypography';
import { CoupleNames } from '@/components/HeroTypography/CoupleNames';
import { EventsSection, EnrouteSection, BannerSection, LanternEngine } from '@/components';
import { invitationData } from '@/data/invitationData';

gsap.registerPlugin(ScrollTrigger);

// Export invitationData so it can be managed and edited easily from App.tsx
export { invitationData } from '@/data/invitationData';

// ─── Top Couple Names Config ────────────────────────────────────────────────
const topNamesConfig = {
  mobile: {
    top: '12vh',
    nameSize: '1.4rem',
    andSize: '0.65rem',
    spacing: '0.08em',
    gap: '0.15rem',
  },
  tablet: {
    top: '14vh',
    nameSize: '2.6rem',
    andSize: '1.1rem',
    spacing: '0.12em',
    gap: '0.2rem',
  },
  desktop: {
    top: '15vh',
    nameSize: '3.6rem',
    andSize: '1.6rem',
    spacing: '0.18em',
    gap: '0.3rem',
  },
  xl: {
    top: '15vh',
    nameSize: '4.0rem',
    andSize: '1.8rem',
    spacing: '0.2em',
    gap: '0.35rem',
  },
};

// ─── Background Image Config ─────────────────────────────────────────────────
const backgroundConfig = {
  mobile: {
    backgroundSize: '100% auto',
    backgroundPositionX: 'center',
    backgroundPositionY: '0px',
  },
  tablet: {
    backgroundSize: '100% auto',
    backgroundPositionX: 'center',
    backgroundPositionY: '0px',
  },
  desktop: {
    backgroundSize: '100% auto',
    backgroundPositionX: 'center',
    backgroundPositionY: '0px',
  },
  xl: {
    backgroundSize: '100% auto',
    backgroundPositionX: 'center',
    backgroundPositionY: '0px',
  },
};

// ─── Stage Image Config ───────────────────────────────────────────────────────
// bottom: negative values move the stage down past the hero boundary (into spacer zone)
const stageConfig = {
  mobile: {
    bottom: '-300px',
    width: '110%',
  },
  tablet: {
    bottom: '-1700px',
    width: '105%',
  },
  desktop: {
    bottom: '-3700px',
    width: '100%',
  },
  xl: {
    bottom: '-4450px',
    width: '100%',
  },
};

// ─── App Component ────────────────────────────────────────────────────────────
export default function App() {
  const activeBreakpoint = useActiveBreakpoint();
  const backgroundRef = useRef<HTMLDivElement>(null);

  const currentConfig = backgroundConfig[activeBreakpoint];
  const currentStageConfig = stageConfig[activeBreakpoint];

  const isDesktop = activeBreakpoint === 'desktop' || activeBreakpoint === 'xl';
  const isMobile = activeBreakpoint === 'mobile';

  useEffect(() => {
    const bgEl = backgroundRef.current;
    if (!bgEl) return;

    // Desktop: background is absolutely positioned and fully static — no movement.
    // Mobile/Tablet: gentle upward parallax so the sunset drifts slower than content.
    if (isDesktop) {
      gsap.killTweensOf(bgEl);
      gsap.set(bgEl, { clearProps: 'transform' });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(bgEl, {
        y: () => -ScrollTrigger.maxScroll(window) * 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, [activeBreakpoint, isDesktop]);

  // Background layer height — desktop locks to viewport; mobile/tablet taller for parallax
  const bgHeight = isDesktop ? '100vh' : isMobile ? '160vh' : '140vh';

  // Stage anchored absolutely to bottom of hero section
  const stageStyle = {
    position: 'absolute' as const,
    bottom: currentStageConfig.bottom,
    left: '50%',
    width: currentStageConfig.width,
    zIndex: 10,
    transform: 'translateX(-50%)',
  };

  // Spacer below hero to make room for the stage overlay before next section
  const bottomOffsetPx = Math.abs(parseInt(currentStageConfig.bottom, 10) || 0);

  const currentTopConfig = topNamesConfig[activeBreakpoint] || topNamesConfig.desktop;
  const { groomName, brideName } = invitationData.hero;

  return (
    <LenisProvider enabled={true}>
      <div
        className="w-full m-0 p-0 overflow-x-hidden"
        style={{ backgroundColor: '#030303' }}
      >
        {/* ── Hero Section: 100vh with sunset background, names, stage ── */}
        <div className="relative w-full h-screen overflow-visible">

          {/* Sunset background — ABSOLUTE inside hero only. Does NOT bleed into other sections. */}
          <div
            ref={backgroundRef}
            className="absolute top-0 left-0 w-full pointer-events-none z-0"
            style={{
              backgroundImage: "url('/images/Sunset.png')",
              backgroundRepeat: 'no-repeat',
              backgroundSize: currentConfig.backgroundSize,
              backgroundPosition: `${currentConfig.backgroundPositionX} ${currentConfig.backgroundPositionY}`,
              height: bgHeight,
              willChange: 'transform',
            }}
          />

          {/* Floating Lanterns — cinematic layer over background */}
          <LanternEngine />

          {/* Top couple names — overlaid at the top of the hero */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-6xl text-center select-none z-20 pointer-events-none"
            style={{ top: currentTopConfig.top }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <CoupleNames
              groomName={groomName}
              brideName={brideName}
              nameSize={currentTopConfig.nameSize}
              andSize={currentTopConfig.andSize}
              letterSpacing={currentTopConfig.spacing}
              gap={currentTopConfig.gap}
              color="#ffffff"
              textShadow="none"
            />
          </motion.div>

          {/* Hero Typography details placard */}
          <HeroTypography />

          {/* Stage image anchored to bottom of hero */}
          <div style={stageStyle}>
            <img
              src="/images/stage.png"
              alt="Stage Backdrop"
              className="w-full h-auto object-contain block"
              referrerPolicy="no-referrer"
            />
          </div>

        </div>

        {/* Spacer — creates scroll room for the overflowing stage image */}
        <div
          style={{
            width: '100%',
            height: `${bottomOffsetPx}px`,
            backgroundColor: 'transparent',
          }}
        />

        {/* ── Content Sections — solid dark bg, fully isolated from sunset ── */}
        <EventsSection />
        <EnrouteSection />
        <BannerSection />

      </div>
    </LenisProvider>
  );
}
