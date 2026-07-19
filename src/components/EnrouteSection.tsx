import React from 'react';

export function EnrouteSection() {
  return (
    <div id="enroute-section" className="relative w-full overflow-hidden flex flex-col items-center justify-center bg-transparent">
      {/* Background Section Image Enroute.png */}
      <img
        src="/images/Enroute.png"
        alt="Enroute Section"
        className="w-full h-auto block select-none pointer-events-none"
        referrerPolicy="no-referrer"
      />

      {/* Embedded Google Map fitting the inner shape of the wooden board */}
      <div
        className="absolute pointer-events-auto"
        style={{
          left: '10.0%',
          width: '80.0%',
          top: '36.3%',
          height: '21.8%',
          zIndex: 10,
        }}
      >
        <iframe
          title="Venue Location Map"
          src="https://maps.google.com/maps?q=The%20Grand%20Ballroom%20New%20York&t=&z=14&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full rounded-[6px] sm:rounded-[10px] md:rounded-[12px] border border-[#7a6d5d]/10"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{
            filter: 'sepia(0.4) saturate(1.2) contrast(1.1) brightness(0.95)',
            mixBlendMode: 'multiply',
            opacity: 0.85,
          }}
        />

        {/* Floating "Open in Maps" button inside the map */}
        <a
          href="https://maps.google.com/?q=The+Grand+Ballroom+New+York"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm border border-[#d8c3a5] text-[#7a6d5d] hover:bg-[#7a6d5d] hover:text-white active:scale-95 transition-all duration-300 px-2 py-0.5 rounded text-[8px] sm:text-[9px] md:text-xs font-semibold shadow-md flex items-center gap-1 cursor-pointer"
        >
          <span>Open in Maps</span>
          <span className="text-[0.8em]">↗</span>
        </a>
      </div>
    </div>
  );
}
