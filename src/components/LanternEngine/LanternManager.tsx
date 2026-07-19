import React from 'react';
import { useLanternGenerator, lanternConfig } from '@/hooks/useLanternGenerator';
import { LanternLayer } from './LanternLayer';

interface LanternManagerProps {
  activeBreakpoint: 'mobile' | 'tablet' | 'desktop' | 'xl';
  debugMode?: boolean;
}

/**
 * Coordinates the active lantern generation list and distributes them across three discrete depth layers.
 */
export const LanternManager: React.FC<LanternManagerProps> = React.memo(({
  activeBreakpoint,
  debugMode = false,
}) => {
  // Query configurations and generate the dynamic layout based on active breakpoint and page length
  const { lanterns, documentHeight } = useLanternGenerator(activeBreakpoint);
  
  // Extract configurations for each layer
  const config = lanternConfig[activeBreakpoint] || lanternConfig.desktop;

  return (
    <div 
      className="absolute top-0 left-0 w-full pointer-events-none overflow-visible"
      style={{ height: `${documentHeight}px` }}
    >
      {/* 1. Background Lanterns Layer (depth = 0.25) */}
      <LanternLayer
        lanterns={lanterns}
        layerIndex={1}
        documentHeight={documentHeight}
        depth={config.background.depth}
        debugMode={debugMode}
      />

      {/* 2. Middle Lanterns Layer (depth = 0.55) */}
      <LanternLayer
        lanterns={lanterns}
        layerIndex={2}
        documentHeight={documentHeight}
        depth={config.middle.depth}
        debugMode={debugMode}
      />

      {/* 3. Foreground Lanterns Layer (depth = 0.90) */}
      <LanternLayer
        lanterns={lanterns}
        layerIndex={3}
        documentHeight={documentHeight}
        depth={config.foreground.depth}
        debugMode={debugMode}
      />
    </div>
  );
});

LanternManager.displayName = 'LanternManager';
