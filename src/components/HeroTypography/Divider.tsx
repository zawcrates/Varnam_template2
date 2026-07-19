import React from 'react';

export function Divider() {
  return (
    <div className="flex items-center justify-center py-2 w-full max-w-[120px] md:max-w-[180px] opacity-80 select-none">
      <svg
        width="140"
        height="16"
        viewBox="0 0 140 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto text-[#E9C97D]"
        style={{ filter: 'drop-shadow(0 0 6px rgba(233,201,125,0.2))' }}
      >
        {/* Elegant thin lines extending outwards */}
        <line x1="10" y1="8" x2="55" y2="8" stroke="#E9C97D" strokeWidth="0.5" strokeLinecap="round" />
        <line x1="85" y1="8" x2="130" y2="8" stroke="#E9C97D" strokeWidth="0.5" strokeLinecap="round" />
        
        {/* Subtle decorative dot highlights */}
        <circle cx="48" cy="8" r="1" fill="#E9C97D" />
        <circle cx="92" cy="8" r="1" fill="#E9C97D" strokeWidth="0.5" />

        {/* Central royal diamond motif */}
        <path d="M70 2L75 8L70 14L65 8Z" fill="#E9C97D" stroke="#E9C97D" strokeWidth="0.5" />
        <circle cx="70" cy="8" r="1.5" fill="#111" />
      </svg>
    </div>
  );
}
