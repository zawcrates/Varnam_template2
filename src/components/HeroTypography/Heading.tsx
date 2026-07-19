import React from 'react';

interface HeadingProps {
  fontSize: string;
  letterSpacing: string;
}

export function Heading({ fontSize, letterSpacing }: HeadingProps) {
  return (
    <div className="flex flex-col items-center select-none text-center">
      <span
        className="font-sunroll text-[#E9C97D] uppercase tracking-widest leading-none"
        style={{
          fontSize,
          letterSpacing,
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.8), 0 4px 12px rgba(0, 0, 0, 0.5), 0 0 12px rgba(233, 201, 125, 0.35), 0 0 25px rgba(233, 201, 125, 0.18)',
          fontWeight: 300,
        }}
      >
        Together With Their Families
      </span>
    </div>
  );
}
