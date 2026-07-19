import React from 'react';

export function BannerSection() {
  return (
    <div id="banner-section" className="relative w-full overflow-hidden flex flex-col items-center justify-center bg-transparent">
      {/* Background Section Image Banner.png */}
      <img
        src="/images/Banner.png"
        alt="Banner Section"
        className="w-full h-auto block select-none pointer-events-none"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
