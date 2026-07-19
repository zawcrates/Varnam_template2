import React, { useRef, useEffect, useState } from 'react';
import { LanternData } from '@/types/lantern';
import { useLanternAnimation } from '@/hooks/useLanternAnimation';
import { LanternGlow } from './LanternGlow';
import { gsap } from '@/lib/gsap';

interface LanternProps {
  lantern: LanternData;
  documentHeight: number;
  depth: number;
  debugMode?: boolean;
}

/**
 * Individual Lantern component that renders an outer wrapper (for absolute positioning and scroll parallax)
 * and an inner wrapper (for continuous floating, swaying, horizontal drift, scaling, and glow).
 */
export const Lantern: React.FC<LanternProps> = React.memo(({
  lantern,
  documentHeight,
  depth,
  debugMode = false,
}) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  
  // Real-time animation variables for the debug panel
  const [debugStats, setDebugStats] = useState({ y: 0, rotation: 0, opacity: 1 });

  // Initialize the double-wrapper GSAP animation
  useLanternAnimation(lantern, outerRef, innerRef, depth);

  // Real-time stats update loop for the debug panel
  useEffect(() => {
    if (!debugMode) return;
    const outerEl = outerRef.current;
    const innerEl = innerRef.current;
    if (!outerEl || !innerEl) return;

    let animId: number;
    const updateStats = () => {
      // Retrieve current animated values directly from GSAP for 100% accuracy and zero layout thrashing
      const currentY = parseFloat(gsap.getProperty(innerEl, 'y') as string) || 0;
      const currentRot = parseFloat(gsap.getProperty(innerEl, 'rotation') as string) || 0;
      const currentOpacity = parseFloat(gsap.getProperty(innerEl, 'opacity') as string) || lantern.opacity;

      setDebugStats({
        y: Math.round(currentY * 100) / 100,
        rotation: Math.round(currentRot * 100) / 100,
        opacity: Math.round(currentOpacity * 100) / 100,
      });

      animId = requestAnimationFrame(updateStats);
    };

    updateStats();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [debugMode, lantern.opacity]);

  // Translate normalized pagePosition (0 to 1) into actual vertical pixel offset
  const actualY = documentHeight * lantern.pagePosition;

  // Layer description labels
  const layerLabel = {
    1: 'Background',
    2: 'Middle',
    3: 'Foreground',
  }[lantern.layerIndex];

  // Color grading and depth filters - Only background gets a very subtle 0.5px blur
  const layerFilter = lantern.layerIndex === 1 ? 'blur(0.5px)' : 'none';

  return (
    <div
      ref={outerRef}
      className="absolute select-none pointer-events-none"
      style={{
        left: `${lantern.x}%`,
        top: `${actualY}px`,
        width: `${lantern.scale}px`,
        height: `${lantern.scale * 1.33}px`,
        zIndex: lantern.layerIndex === 1 ? 5 : lantern.layerIndex === 2 ? 12 : 11,
        willChange: 'transform',
      }}
    >
      <div
        ref={innerRef}
        className="w-full h-full relative"
        style={{
          opacity: 1, // Constrain opacity to 1.0 (no transparency or scrolling fades)
          transform: `rotate(${lantern.rotation}deg)`,
          filter: layerFilter,
          willChange: 'transform, opacity',
        }}
      >
        {/* Soft Radial Ambient Glow */}
        <LanternGlow layerIndex={lantern.layerIndex} />

        {/* Lantern Image Asset */}
        <img
          src="/images/lantern.png"
          alt="Glowing sky lantern"
          className="w-full h-full object-contain block drop-shadow-[0_8px_16px_rgba(255,150,50,0.2)]"
          referrerPolicy="no-referrer"
        />

        {/* Blue circle at the anchor point (center of the inner wrapper) */}
        {debugMode && (
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_8px_rgba(0,0,255,0.8)] z-[100]" 
            title="Anchor Point"
          />
        )}

        {/* Debug Overlay Panel */}
        {debugMode && (
          <div className="absolute top-[-105px] left-0 bg-red-950/95 text-[9px] font-mono text-white p-2 rounded border border-red-500/50 min-w-[125px] shadow-lg pointer-events-auto leading-tight z-[99]">
            <div className="font-bold border-b border-white/30 pb-0.5 mb-0.5 uppercase tracking-wide text-red-300">
              ID: {lantern.id} ({layerLabel})
            </div>
            <div>Z-Index: {lantern.layerIndex === 1 ? 5 : lantern.layerIndex === 2 ? 12 : 11}</div>
            <div>Depth: {depth}</div>
            <div>dY: {debugStats.y}px</div>
            <div>Rot: {debugStats.rotation}°</div>
            <div>Opacity: {debugStats.opacity}</div>
          </div>
        )}
      </div>
    </div>
  );
});

Lantern.displayName = 'Lantern';
