/**
 * TypeScript definitions for the cinematic Lantern Engine.
 */

export interface LanternData {
  id: number;
  x: number;             // Horizontal position percentage (0 to 100)
  pagePosition: number;  // Normalized vertical page position (0 to 1)
  scale: number;         // Base scale multiplier
  opacity: number;       // Base opacity multiplier
  rotation: number;      // Initial rotation angle in degrees
  floatDistance: number; // Vertical floating range in pixels
  floatDuration: number; // Vertical floating speed in seconds
  delay: number;         // Animation starting delay in seconds
  blur: number;          // Blur filter value in pixels
  glowSize: number;      // Radial glow radius in pixels
  driftDirection: number;// Horizontal drift direction (-1 or 1)
  layerIndex: number;    // Depth layer index (1 = Background, 2 = Mid, 3 = Foreground)
}

export interface ProtectedZone {
  id: string;
  xMin: number;          // Horizontal start percentage (0 to 100)
  xMax: number;          // Horizontal end percentage (0 to 100)
  yMin: number;          // Vertical start position (0 to 1)
  yMax: number;          // Vertical end position (0 to 1)
}

export interface LayerConfig {
  count: number;
  depth: number;
  opacity: number;
  blur: number;
  scale: number;
}

export interface BreakpointConfig {
  background: LayerConfig;
  middle: LayerConfig;
  foreground: LayerConfig;
}

export interface BreakpointConfigs {
  mobile: BreakpointConfig;
  tablet: BreakpointConfig;
  desktop: BreakpointConfig;
  xl: BreakpointConfig;
}
