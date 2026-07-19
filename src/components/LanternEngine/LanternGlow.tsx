import React from 'react';

interface LanternGlowProps {
  layerIndex: number;
}

/**
 * Renders a soft radial orange glow behind the lantern to simulate sunset lighting.
 * The glow intensity and blur adjust dynamically based on depth.
 */
export const LanternGlow: React.FC<LanternGlowProps> = React.memo(({ layerIndex }) => {
  // Layer-specific glow configurations
  const glowConfig = {
    1: { color: 'rgba(255,170,80,0.08)', blur: '15px' },
    2: { color: 'rgba(255,170,80,0.12)', blur: '22px' },
    3: { color: 'rgba(255,170,80,0.18)', blur: '35px' },
  }[layerIndex] || { color: 'rgba(255,170,80,0.12)', blur: '22px' };

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none select-none z-[-1]"
      style={{
        width: '180%',
        height: '180%',
        background: `radial-gradient(circle, ${glowConfig.color} 0%, transparent 70%)`,
        filter: `blur(${glowConfig.blur})`,
      }}
    />
  );
});

LanternGlow.displayName = 'LanternGlow';
