import React from 'react';

interface WeddingDetailsProps {
  month: string;
  day: string;
  date: string;
  year: string;
  time: string;
  venue: string;
  address: string;
  
  // Font sizes for responsiveness
  monthSize: string;
  dateSize: string;
  timeSize: string;
  venueSize: string;
  addressSize: string;
  
  // Layout spacing
  gap: string;
}

export function WeddingDetails({
  month,
  day,
  date,
  year,
  time,
  venue,
  address,
  monthSize,
  dateSize,
  timeSize,
  venueSize,
  addressSize,
  gap,
}: WeddingDetailsProps) {
  const glowStyle = {
    color: '#E9C97D',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.8), 0 4px 12px rgba(0, 0, 0, 0.5), 0 0 12px rgba(233, 201, 125, 0.35), 0 0 25px rgba(233, 201, 125, 0.18)',
    fontWeight: 300,
  };

  return (
    <div 
      className="flex flex-col items-center select-none text-center w-full"
      style={{ gap }}
    >
      {/* Month Section */}
      <div className="uppercase tracking-[0.35em]" style={{ ...glowStyle, fontSize: monthSize }}>
        {month}
      </div>

      {/* Date Row (Day | Date | Year) */}
      <div 
        className="flex items-center justify-center font-sunroll uppercase tracking-[0.2em]" 
        style={{ ...glowStyle, fontSize: dateSize }}
      >
        <span>{day}</span>
        <span className="mx-3 md:mx-4 font-light text-[#E9C97D]/50">|</span>
        <span className="text-[#E9C97D]">{date}</span>
        <span className="mx-3 md:mx-4 font-light text-[#E9C97D]/50">|</span>
        <span>{year}</span>
      </div>

      {/* Time Slot Section */}
      <div className="uppercase tracking-[0.25em]" style={{ ...glowStyle, fontSize: timeSize }}>
        {time}
      </div>

      {/* Venue & Address Block */}
      <div className="flex flex-col items-center justify-center gap-1 md:gap-2 mt-1">
        {/* Venue */}
        <div className="uppercase tracking-[0.25em]" style={{ ...glowStyle, fontSize: venueSize }}>
          {venue}
        </div>
        {/* Address */}
        <div 
          className="uppercase tracking-[0.18em] opacity-95 max-w-[90vw] md:max-w-xl leading-relaxed" 
          style={{ ...glowStyle, fontSize: addressSize }}
        >
          {address}
        </div>
      </div>
    </div>
  );
}
