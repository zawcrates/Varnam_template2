import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useActiveBreakpoint } from '@/hooks';
import { invitationData } from '@/data/invitationData';

// Independent configuration object for easy customization and repositioning of the event card.
// You can adjust the width, vertical 'top' offset percentage, and X/Y fine-tuning offsets.
const cardConfig = {
  mobile: {
    width: '280px',
    top: '38%', // Position vertically inside the empty area of event.png
    offsetX: '0px',
    offsetY: '160px',
    titleSize: 'text-2xl tracking-[0.25em]',
    imageSize: 'w-[100px] h-[110px]',
    detailsSize: 'text-[12px] tracking-[0.1em]',
    gap: 'gap-1',
    lineMargin: 'my-1',
  },
  tablet: {
    width: '380px',
    top: '38%',
    offsetX: '0px',
    offsetY: '220px',
    titleSize: 'text-3xl tracking-[0.28em]',
    imageSize: 'w-[140px] h-[140px]',
    detailsSize: 'text-[15px] tracking-[0.12em]',
    gap: 'gap-2',
    lineMargin: 'my-2',
  },
  desktop: {
    width: '460px',
    top: '38%',
    offsetX: '0px',
    offsetY: '280px',
    titleSize: 'text-4xl tracking-[0.3em]',
    imageSize: 'w-[180px] h-[180px]',
    detailsSize: 'text-[18px] tracking-[0.15em]',
    gap: 'gap-3',
    lineMargin: 'my-3',
  },
  xl: {
    width: '520px',
    top: '38%',
    offsetX: '0px',
    offsetY: '320px',
    titleSize: 'text-5xl tracking-[0.32em]',
    imageSize: 'w-[200px] h-[200px]',
    detailsSize: 'text-[21px] tracking-[0.18em]',
    gap: 'gap-3.5',
    lineMargin: 'my-4',
  }
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '110%' : '-110%',
    opacity: 0,
  }),
  center: {
    x: '0%',
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.35 }
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '110%' : '-110%',
    opacity: 0,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.35 }
    }
  })
};

export function EventsSection() {
  const activeBreakpoint = useActiveBreakpoint();
  const currentCard = cardConfig[activeBreakpoint] || cardConfig.desktop;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const events = invitationData.events || [
    {
      title: "RECEPTION",
      day: invitationData.hero.day,
      month: invitationData.hero.month,
      date: invitationData.hero.date,
      year: invitationData.hero.year,
      time: invitationData.hero.time,
      venue: invitationData.hero.venue,
      address: invitationData.hero.address,
    }
  ];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return events.length - 1;
      if (nextIndex >= events.length) return 0;
      return nextIndex;
    });
  };

  const currentEvent = events[currentIndex];

  return (
    <div id="events-section" className="relative w-full overflow-hidden flex flex-col items-center justify-center bg-transparent">
      {/* Background Section Image event.png */}
      <img
        src="/images/event.png"
        alt="Events Section Background"
        className="w-full h-auto block select-none pointer-events-none"
        referrerPolicy="no-referrer"
      />

      {/* Positioning Wrapper for the Card Carousel */}
      <div
        className="absolute left-1/2 select-none overflow-visible"
        style={{
          width: currentCard.width,
          top: currentCard.top,
          transform: `translate(calc(-50% + ${currentCard.offsetX}), calc(-50% + ${currentCard.offsetY}))`,
          zIndex: 10,
        }}
      >
        {/* Static Invisible Spacer image to establish dimensions and aspect ratio dynamically */}
        <img
          src="/images/Card.png"
          alt="Event Card Spacer"
          className="w-full h-auto object-contain invisible pointer-events-none select-none"
          referrerPolicy="no-referrer"
        />

        {/* Carousel Transition Container */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing pointer-events-auto"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(e, info) => {
                if (info.offset.x < -60) {
                  paginate(1);
                } else if (info.offset.x > 60) {
                  paginate(-1);
                }
              }}
            >
              <img
                src="/images/Card.png"
                alt="Event Card Layout"
                className="w-full h-auto object-contain block pointer-events-none select-none"
                referrerPolicy="no-referrer"
              />

              {/* Beautiful event content over the card.png */}
              <div className="absolute inset-0 text-center text-[#4c3b2b] pointer-events-none select-none">
                {/* 1. Event Title - Perfectly centered between the two decorative lines */}
                <div className="absolute top-[25.2%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-[10%]">
                  <h3 className={`font-serif font-bold uppercase text-[#4a3f35] ${currentCard.titleSize}`}>
                    {currentEvent.title}
                  </h3>
                </div>

                {/* 3. Event Details: Date, Time, Venue - Centered in the middle empty region of the card */}
                <div className={`absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center ${currentCard.gap} ${currentCard.detailsSize} font-serif px-[10%]`}>
                  <div className="flex flex-col items-center leading-normal">
                    <span className="uppercase text-[#8f7d6a] font-sans font-semibold text-[0.75em] tracking-widest">Date</span>
                    <span className="font-semibold text-[#4a3f35] mt-0.5">
                      {currentEvent.day}, {currentEvent.month} {currentEvent.date}, {currentEvent.year}
                    </span>
                  </div>

                  <div className="flex flex-col items-center leading-normal">
                    <span className="uppercase text-[#8f7d6a] font-sans font-semibold text-[0.75em] tracking-widest">Time</span>
                    <span className="font-medium text-[#4a3f35] mt-0.5">{currentEvent.time}</span>
                  </div>

                  <div className="flex flex-col items-center leading-normal">
                    <span className="uppercase text-[#8f7d6a] font-sans font-semibold text-[0.75em] tracking-widest">Venue</span>
                    <span className="font-semibold text-[#4a3f35] mt-0.5">{currentEvent.venue}</span>
                    <span className="text-[0.85em] text-[#7a6d5d] tracking-wide mt-1">{currentEvent.address}</span>
                  </div>

                  {/* Elegant Bottom Divider */}
                  <div className={`flex items-center justify-center gap-2 w-full max-w-[50%] mx-auto opacity-70 ${currentCard.lineMargin}`}>
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-[#b59d7c] to-transparent flex-grow" />
                    <span className="text-[#b59d7c] text-[0.7em]">◆</span>
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-[#b59d7c] to-transparent flex-grow" />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Buttons */}
        {events.length > 1 && (
          <>
            <button
              onClick={() => paginate(-1)}
              className="absolute left-[-35px] sm:left-[-60px] md:left-[-90px] lg:left-[-110px] top-[50%] -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm border border-[#e5d5c0] text-[#7a6d5d] hover:bg-[#7a6d5d] hover:text-white active:scale-95 transition-all duration-300 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-md cursor-pointer pointer-events-auto"
              aria-label="Previous event"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-[-35px] sm:right-[-60px] md:right-[-90px] lg:right-[-110px] top-[50%] -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm border border-[#e5d5c0] text-[#7a6d5d] hover:bg-[#7a6d5d] hover:text-white active:scale-95 transition-all duration-300 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-md cursor-pointer pointer-events-auto"
              aria-label="Next event"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </>
        )}

        {/* Carousel Pagination Dots */}
        {events.length > 1 && (
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2 pointer-events-auto">
            {events.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? 'bg-[#7a6d5d] scale-110'
                    : 'bg-[#7a6d5d]/30 hover:bg-[#7a6d5d]/50'
                }`}
                aria-label={`Go to event slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

