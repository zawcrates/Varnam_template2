import React from 'react';
import { LanternData } from '@/types/lantern';
import { Lantern } from './Lantern';

interface LanternLayerProps {
  lanterns: LanternData[];
  layerIndex: number;
  documentHeight: number;
  depth: number;
  debugMode?: boolean;
}

/**
 * Renders all lanterns belonging to a specific depth layer (e.g. background, middle, foreground).
 */
export const LanternLayer: React.FC<LanternLayerProps> = React.memo(({
  lanterns,
  layerIndex,
  documentHeight,
  depth,
  debugMode = false,
}) => {
  // Filter lanterns to render only those in the current layer index
  const layerLanterns = lanterns.filter((l) => l.layerIndex === layerIndex);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
      {layerLanterns.map((lantern) => (
        <Lantern
          key={lantern.id}
          lantern={lantern}
          documentHeight={documentHeight}
          depth={depth}
          debugMode={debugMode}
        />
      ))}
    </div>
  );
});

LanternLayer.displayName = 'LanternLayer';
