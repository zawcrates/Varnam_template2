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

// Centralized configuration for the Top Couple Names display at the beginning of the page
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

// Centralized responsive configuration for the background image.
// You can easily adjust the y (vertical position), x (horizontal position), and size for each breakpoint.
// - Use '100% auto' or 'contain' for mobile to display the image with its natural proportions.
// - Use negative values for y (e.g., '-50px') to shift the image upwards on desktop layouts.
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

// Centralized responsive configuration for the stage image layer.
// - bottom: vertical position anchored to the bottom (negative values move it down/overlay, positive values move it up).
// - width: the responsive width of the image.
const stageConfig = {
  mobile: {
    bottom: "-600px",
    width: "110%",
  },
  tablet: {
    bottom: "-1700px",
    width: "105%",
  },
  desktop: {
    bottom: "-3700px",
    width: "100%",
  },
  xl: {
    bottom: "-4450px",
    width: "100%",
  },
};

export default function App() {
  const activeBreakpoint = useActiveBreakpoint();
  const backgroundRef = useRef<HTMLDivElement>(null);

  const currentConfig = backgroundConfig[activeBreakpoint];
  const currentStageConfig = stageConfig[activeBreakpoint];

  useEffect(() => {
    const bgEl = backgroundRef.current;
    if (!bgEl) return;

    // Create fixed-position parallax translation (moving 30% slower than scroll rate)
    // Using a negative translation on a fixed container prevents stretching the document height
    const ctx = gsap.context(() => {
      gsap.to(bgEl, {
        y: () => -ScrollTrigger.maxScroll(window) * 0.7,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  // Inline styling applying the responsive configuration directly to the canvas wrapper
  const backgroundStyle = {
    backgroundColor: '#030303',
    width: '100vw',
    minHeight: '100vh',
  };

  // Dynamically computed style for the stage image layer using the exact bottom positioning
  const stageStyle = {
    position: 'absolute' as const,
    bottom: currentStageConfig.bottom,
    left: '50%',
    width: currentStageConfig.width,
    zIndex: 10,
    transform: 'translateX(-50%)',
  };

  // Dynamically calculate the scrollable spacer height so that the stage image is never cut off
  // even with deep negative 'bottom' offsets.
  const bottomOffsetPx = Math.abs(parseInt(currentStageConfig.bottom, 10) || 0);
  const spacerStyle = {
    width: '100%',
    height: `${bottomOffsetPx}px`,
    backgroundColor: 'transparent',
  };

  const currentTopConfig = topNamesConfig[activeBreakpoint] || topNamesConfig.desktop;
  const { groomName, brideName } = invitationData.hero;

  return (
    <LenisProvider enabled={true}>
      <div 
        className="relative overflow-x-hidden w-full m-0 p-0" 
        style={backgroundStyle}
      >
        {/* Parallax Sunset Background Layer (Moving 30% slower than scroll) */}
        <div 
          ref={backgroundRef}
          className="fixed top-0 left-0 w-full pointer-events-none z-0"
          style={{
            backgroundImage: "url('/images/Sunset.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: currentConfig.backgroundSize,
            backgroundPosition: `${currentConfig.backgroundPositionX} ${currentConfig.backgroundPositionY}`,
            height: '100vh',
            willChange: 'transform',
          }}
        />

        {/* Floating Lanterns Cinematic Layer */}
        <LanternEngine />
        {/* Hero Section (100vh) which anchors the stage image at its bottom boundary with overflow visible */}
        <div className="relative w-full h-screen overflow-visible">
          {/* Top Couple Names at the absolute beginning of the page */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-6xl text-center select-none z-20 pointer-events-none"
            style={{
              top: currentTopConfig.top,
            }}
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

          {/* Beautiful Custom Font Typography overlay */}
          <HeroTypography />

          {/* Responsive Stage Image Container */}
          <div style={stageStyle}>
            <img 
              src="/images/stage.png" 
              alt="Stage Backdrop" 
              className="w-full h-auto object-contain block"
              referrerPolicy="no-referrer"
            />
          </div>

        </div>

        {/* Scrollable boundary allowing the user to scroll vertically through the layout */}
        <div style={spacerStyle} />

        {/* New Events Section immediately after the Hero and stage spacing */}
        <EventsSection />

        {/* Enroute Section immediately after the Events Section */}
        <EnrouteSection />

        {/* Banner Section immediately after the Enroute Section */}
        <BannerSection />
      </div>
    </LenisProvider>
  );
}

