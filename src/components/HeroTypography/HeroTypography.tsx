import React from 'react';
import { motion } from 'motion/react';
import { useActiveBreakpoint } from '@/hooks';
import { invitationData } from '@/data/invitationData';

// Import subcomponents
import { Heading } from './Heading';
import { CoupleNames } from './CoupleNames';
import { InvitationMessage } from './InvitationMessage';
import { WeddingDetails } from './WeddingDetails';
import { Divider } from './Divider';

// Centralized configuration controlling font sizes, spacing, section gaps, and overall top Y offset.
// Highly calibrated for a perfect vertical rhythm matching a premium royal design.
const heroTypography = {
  mobile: {
    top: '5vh',
    offset: '870px',
    sectionGap: '0.85rem',
    headingSize: '0.58rem',
    headingSpacing: '0.14em',
    coupleNameSize: '1.8rem',
    coupleAndSize: '0.85rem',
    coupleSpacing: '0.08em',
    coupleGap: '0.35rem',
    msgSize: '0.68rem',
    msgLineHeight: '1.5',
    monthSize: '0.9rem',
    dateSize: '1.1rem',
    timeSize: '0.85rem',
    venueSize: '0.9rem',
    addressSize: '0.7rem',
    detailsGap: '0.45rem',
  },
  tablet: {
    top: '8vh',
    offset: '1420px',
    sectionGap: '1.4rem',
    headingSize: '0.72rem',
    headingSpacing: '0.18em',
    coupleNameSize: '2.4rem',
    coupleAndSize: '1.1rem',
    coupleSpacing: '0.12em',
    coupleGap: '0.6rem',
    msgSize: '0.82rem',
    msgLineHeight: '1.65',
    monthSize: '1.2rem',
    dateSize: '1.7rem',
    timeSize: '1.1rem',
    venueSize: '1.2rem',
    addressSize: '0.85rem',
    detailsGap: '0.65rem',
  },
  desktop: {
    top: '10vh',
    offset: '2720px',
    sectionGap: '2.2rem', // Generous space
    headingSize: '1.05rem', // Increased text size
    headingSpacing: '0.24em',
    coupleNameSize: '4.4rem', // Increased text size
    coupleAndSize: '1.65rem', // Increased text size
    coupleSpacing: '0.22em',
    coupleGap: '1.1rem',
    msgSize: '1.15rem', // Increased text size
    msgLineHeight: '1.85',
    monthSize: '1.8rem', // Increased text size
    dateSize: '2.9rem', // Increased text size
    timeSize: '1.6rem', // Increased text size
    venueSize: '1.8rem', // Increased text size
    addressSize: '1.15rem', // Increased text size
    detailsGap: '1.1rem',
  },
  xl: {
    top: '11vh',
    offset: '2720px',
    sectionGap: '2.4rem',
    headingSize: '1.15rem',
    headingSpacing: '0.26em',
    coupleNameSize: '4.8rem',
    coupleAndSize: '1.8rem',
    coupleSpacing: '0.25em',
    coupleGap: '1.2rem',
    msgSize: '1.25rem',
    msgLineHeight: '1.9',
    monthSize: '2.0rem',
    dateSize: '3.2rem',
    timeSize: '1.8rem',
    venueSize: '2.0rem',
    addressSize: '1.25rem',
    detailsGap: '1.2rem',
  },
};

export function HeroTypography() {
  const activeBreakpoint = useActiveBreakpoint();
  const currentConfig = heroTypography[activeBreakpoint] || heroTypography.desktop;
  
  // Destructure content from our brand-editable data
  const {
    groomName,
    brideName,
    message,
    month,
    day,
    date,
    year,
    time,
    venue,
    address,
  } = invitationData.hero;

  // Single-group elegant cinematic entry transition
  const groupVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1], // Custom power3.out smooth bezier curve
      },
    },
  };

  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center w-[calc(100%-24px)] md:w-[calc(100%-48px)] max-w-6xl text-center select-none z-20 pointer-events-none backdrop-blur-[3px] bg-gradient-to-b from-black/25 to-black/10 rounded-[2.5rem] border border-[#E9C97D]/10 shadow-[0_30px_100px_rgba(0,0,0,0.7)] py-[65px] px-[49px] md:py-[89px] md:px-[73px]"
      style={{
        top: `calc(${currentConfig.top} + ${currentConfig.offset})`,
        gap: currentConfig.sectionGap,
      }}
      variants={groupVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Top Divider Ornament */}
      <Divider />

      {/* Together with their families (with top padding wrapper) */}
      <div className="pt-4 md:pt-6 lg:pt-8">
        <Heading 
          fontSize={currentConfig.headingSize} 
          letterSpacing={currentConfig.headingSpacing} 
        />
      </div>

      {/* Large Couple Names */}
      <CoupleNames
        groomName={groomName}
        brideName={brideName}
        nameSize={currentConfig.coupleNameSize}
        andSize={currentConfig.coupleAndSize}
        letterSpacing={currentConfig.coupleSpacing}
        gap={currentConfig.coupleGap}
      />

      {/* Invitation Paragraph */}
      <InvitationMessage
        message={message}
        fontSize={currentConfig.msgSize}
        lineHeight={currentConfig.msgLineHeight}
      />

      {/* Divider Ornament between message and date/time */}
      <Divider />

      {/* Wedding Details (with bottom padding wrapper) */}
      <div className="pb-4 md:pb-6 lg:pb-8 w-full flex flex-col items-center">
        <WeddingDetails
          month={month}
          day={day}
          date={date}
          year={year}
          time={time}
          venue={venue}
          address={address}
          monthSize={currentConfig.monthSize}
          dateSize={currentConfig.dateSize}
          timeSize={currentConfig.timeSize}
          venueSize={currentConfig.venueSize}
          addressSize={currentConfig.addressSize}
          gap={currentConfig.detailsGap}
        />
      </div>

      {/* Bottom Divider Ornament */}
      <Divider />
    </motion.div>
  );
}
