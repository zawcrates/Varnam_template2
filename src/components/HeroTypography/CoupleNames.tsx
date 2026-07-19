import React from 'react';

interface CoupleNamesProps {
  groomName: string;
  brideName: string;
  nameSize: string;
  andSize: string;
  letterSpacing: string;
  gap: string; // Vertical spacing/gap
  color?: string;
  textShadow?: string;
}

export function CoupleNames({
  groomName,
  brideName,
  nameSize,
  andSize,
  letterSpacing,
  gap,
  color = '#E9C97D',
  textShadow = '0 2px 4px rgba(0, 0, 0, 0.8), 0 4px 12px rgba(0, 0, 0, 0.5), 0 0 12px rgba(233, 201, 125, 0.35), 0 0 25px rgba(233, 201, 125, 0.18)',
}: CoupleNamesProps) {
  const glowStyle = {
    color,
    textShadow,
    fontWeight: 300,
  };

  return (
    <div 
      className="flex flex-col items-center select-none text-center"
      style={{ gap }}
    >
      {/* Groom Name */}
      <h2
        className="font-sunroll uppercase tracking-wider leading-tight"
        style={{
          ...glowStyle,
          fontSize: nameSize,
          letterSpacing,
        }}
      >
        {groomName}
      </h2>

      {/* "Weds" Connector */}
      <span
        className="font-whitley tracking-normal leading-none my-[-0.15em]"
        style={{
          ...glowStyle,
          fontSize: `calc(${andSize} * 2.2)`,
          textTransform: 'none',
          opacity: 0.95,
        }}
      >
        Weds
      </span>

      {/* Bride Name */}
      <h2
        className="font-sunroll uppercase tracking-wider leading-tight"
        style={{
          ...glowStyle,
          fontSize: nameSize,
          letterSpacing,
        }}
      >
        {brideName}
      </h2>
    </div>
  );
}
