import { useState, useEffect, useMemo } from 'react';
import { LanternData, ProtectedZone, BreakpointConfig, BreakpointConfigs } from '@/types/lantern';

// Centralized responsive configuration
export const lanternConfig: BreakpointConfigs = {
  mobile: {
    background: { count: 8, depth: 0.2, opacity: 1.0, blur: 0.5, scale: 12 },
    middle: { count: 6, depth: 0.5, opacity: 1.0, blur: 0.0, scale: 40 },
    foreground: { count: 4, depth: 0.9, opacity: 1.0, blur: 0.0, scale: 80 },
  },
  tablet: {
    background: { count: 12, depth: 0.2, opacity: 1.0, blur: 0.5, scale: 12 },
    middle: { count: 9, depth: 0.5, opacity: 1.0, blur: 0.0, scale: 40 },
    foreground: { count: 5, depth: 0.9, opacity: 1.0, blur: 0.0, scale: 80 },
  },
  desktop: {
    background: { count: 18, depth: 0.2, opacity: 1.0, blur: 0.5, scale: 12 },
    middle: { count: 14, depth: 0.5, opacity: 1.0, blur: 0.0, scale: 40 },
    foreground: { count: 8, depth: 0.9, opacity: 1.0, blur: 0.0, scale: 80 },
  },
  xl: {
    background: { count: 20, depth: 0.2, opacity: 1.0, blur: 0.5, scale: 12 },
    middle: { count: 15, depth: 0.5, opacity: 1.0, blur: 0.0, scale: 40 },
    foreground: { count: 8, depth: 0.9, opacity: 1.0, blur: 0.0, scale: 80 },
  },
};

// Default protected regions (Safe Zone in the center of the Hero screen)
export const DEFAULT_NO_FLY_ZONES: ProtectedZone[] = [
  { id: 'HeroNamesCenter', xMin: 30, xMax: 70, yMin: 0.30, yMax: 0.65 },
];

/**
 * Dynamically generates scattered lantern data outside of protected zones.
 * Composes them like an art-directed movie poster using a 12x8 column grid,
 * quadrant balancing, and physical pixel spacing checks.
 */
export function generateLanterns(
  config: BreakpointConfig,
  noFlyZones: ProtectedZone[] = DEFAULT_NO_FLY_ZONES
): LanternData[] {
  const lanterns: LanternData[] = [];
  
  // Retrieve live viewport dimensions to run physical pixel checks
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1440;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 900;

  // Grid dimensions
  const cols = 12;
  const rows = 8;
  
  // Distribute target count evenly across all 4 quadrants to maintain perfect visual weight balance
  const bgCount = config.background.count;
  const midCount = config.middle.count;
  const fgCount = config.foreground.count;
  
  const quadBg = Math.floor(bgCount / 4);
  const quadMid = Math.floor(midCount / 4);
  const quadFg = Math.floor(fgCount / 4);
  
  // Track remainder offsets to distribute evenly
  let extraBg = bgCount % 4;
  let extraMid = midCount % 4;
  let extraFg = fgCount % 4;

  // Helper to gather eligible cells inside a quadrant
  const getQuadrantCells = (qIndex: number) => {
    const cells: { col: number; row: number }[] = [];
    const colStart = qIndex % 2 === 0 ? 0 : 6;
    const colEnd = qIndex % 2 === 0 ? 5 : 11;
    const rowStart = qIndex < 2 ? 0 : 4;
    const rowEnd = qIndex < 2 ? 3 : 7;
    
    for (let r = rowStart; r <= rowEnd; r++) {
      for (let c = colStart; c <= colEnd; c++) {
        // Calculate normalized distance from the grid center (col = 5.5, row = 3.5)
        const dx = (c - 5.5) / 6;
        const dy = (r - 3.5) / 4;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Exclude cells that fall in the center oval safe area (dist < 0.42)
        if (dist >= 0.42) {
          cells.push({ col: c, row: r });
        }
      }
    }
    // Shuffle cells to randomize grid cell assignment order
    return cells.sort(() => Math.random() - 0.5);
  };

  // Helper to retrieve physical pixel distance limit between two layers
  const getMinSpacingLimit = (layerA: number, layerB: number) => {
    if (layerA === 3 && layerB === 3) return 150; // Large ↔ Large
    if (layerA >= 2 && layerB >= 2) return 110;  // Medium ↔ Medium
    return 80;                                    // Small ↔ Small / mixed
  };

  let globalId = 0;

  // Process all 4 quadrants independently
  for (let q = 0; q < 4; q++) {
    const cells = getQuadrantCells(q);
    
    // Distribute base counts and remainder counts
    const targetBg = quadBg + (extraBg > 0 ? 1 : 0);
    const targetMid = quadMid + (extraMid > 0 ? 1 : 0);
    const targetFg = quadFg + (extraFg > 0 ? 1 : 0);
    
    if (extraBg > 0) extraBg--;
    if (extraMid > 0) extraMid--;
    if (extraFg > 0) extraFg--;
    
    const quadTargets = [
      { layerIndex: 3, count: targetFg, minSize: 80, maxSize: 130, blur: config.foreground.blur },
      { layerIndex: 2, count: targetMid, minSize: 40, maxSize: 70, blur: config.middle.blur },
      { layerIndex: 1, count: targetBg, minSize: 12, maxSize: 35, blur: config.background.blur },
    ];
    
    let cellIndex = 0;
    
    quadTargets.forEach(({ layerIndex, count, minSize, maxSize, blur }) => {
      let placedCount = 0;
      let cellAttempts = 0;
      
      while (placedCount < count && cellIndex < cells.length && cellAttempts < 50) {
        cellAttempts++;
        const cell = cells[cellIndex];
        
        // Calculate cell center percentage coordinates
        const cellX = (cell.col + 0.5) * (100 / cols);
        const cellY = (cell.row + 0.5) * (1.0 / rows);
        
        // Apply a slight random layout offset (15px offset is roughly 1% horizontally, 0.015 vertically)
        const offsetX = (Math.random() - 0.5) * 2.0; // +/- 1.0% in X
        const offsetY = (Math.random() - 0.5) * 0.035; // +/- 0.0175 in Y
        
        // Constrain coordinates to screen edge bounds
        const x = Math.min(Math.max(cellX + offsetX, 1), 99);
        const pagePosition = Math.min(Math.max(cellY + offsetY, 0.01), 0.99);
        
        // Confirm coordinate resides outside Names Safe Zone
        const overlapsSafeZone = noFlyZones.some(zone => 
          pagePosition >= zone.yMin && pagePosition <= zone.yMax &&
          x >= zone.xMin && x <= zone.xMax
        );
        
        if (overlapsSafeZone) {
          cellIndex++;
          continue;
        }

        const size = minSize + Math.random() * (maxSize - minSize);
        
        // Calculate physical positioning in pixels to perform accurate spacing checks
        const xPx = (x / 100) * vw;
        const yPx = pagePosition * vh;
        
        const isTooClose = lanterns.some(other => {
          const otherXPx = (other.x / 100) * vw;
          const otherYPx = other.pagePosition * vh;
          const distance = Math.sqrt((xPx - otherXPx) ** 2 + (yPx - otherYPx) ** 2);
          const limit = getMinSpacingLimit(layerIndex, other.layerIndex);
          return distance < limit;
        });
        
        if (!isTooClose) {
          const floatDistance = 10 + Math.random() * 8; // 10px to 18px float distance
          const floatDuration = 5 + Math.random() * 5; // 5s to 10s float speed
          const delay = Math.random() * 4;
          const glowSize = layerIndex === 1 ? 25 : layerIndex === 2 ? 40 : 60;
          const driftDirection = Math.random() > 0.5 ? 1 : -1;
          const initialRotation = (Math.random() - 0.5) * 12;

          lanterns.push({
            id: globalId++,
            x,
            pagePosition,
            scale: size,
            opacity: 1.0,
            rotation: initialRotation,
            floatDistance,
            floatDuration,
            delay,
            blur,
            glowSize,
            driftDirection,
            layerIndex,
          });
          
          placedCount++;
          cellIndex++;
          cellAttempts = 0; // reset for next item
        } else {
          cellIndex++;
        }
      }
    });
  }

  return lanterns;
}

/**
 * Hook to manage page height measurements and dynamic lantern generation.
 */
export function useLanternGenerator(
  activeBreakpoint: 'mobile' | 'tablet' | 'desktop' | 'xl',
  noFlyZones: ProtectedZone[] = DEFAULT_NO_FLY_ZONES
) {
  const [documentHeight, setDocumentHeight] = useState(1000);

  // Generate lanterns whenever the active breakpoint changes
  const lanterns = useMemo(() => {
    const config = lanternConfig[activeBreakpoint] || lanternConfig.desktop;
    
    // Customize safe zone horizontally based on active breakpoint to keep mobile untouched (30-70)
    // while expanding the horizontal bounds for wider placards on tablet/desktop layouts.
    const customNoFlyZones: ProtectedZone[] = [
      {
        id: 'HeroNamesCenter',
        xMin: activeBreakpoint === 'mobile' ? 30 : activeBreakpoint === 'tablet' ? 25 : 22,
        xMax: activeBreakpoint === 'mobile' ? 70 : activeBreakpoint === 'tablet' ? 75 : 78,
        yMin: 0.30,
        yMax: 0.65
      }
    ];
    
    return generateLanterns(config, customNoFlyZones);
  }, [activeBreakpoint]);

  // Handle viewport height tracking (constrains lanterns strictly to the Hero section)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const measureHeight = () => {
      // Set to viewport height so all pagePositions map to the Hero section viewport
      setDocumentHeight(window.innerHeight);
    };

    // Initial measurement
    measureHeight();

    const resizeObserver = new ResizeObserver(() => {
      measureHeight();
    });
    
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Print diagnostic log output for debugging
  useEffect(() => {
    console.log(`=== LANTERN ENGINE GENERATION SUMMARY ===`);
    console.log(`Total lanterns generated: ${lanterns.length}`);
    const layerCounts = { 1: 0, 2: 0, 3: 0 };
    lanterns.forEach(l => {
      layerCounts[l.layerIndex as 1 | 2 | 3]++;
    });
    console.log(`Layer 1 (Background): ${layerCounts[1]}`);
    console.log(`Layer 2 (Middle): ${layerCounts[2]}`);
    console.log(`Layer 3 (Foreground): ${layerCounts[3]}`);
    console.log('--------------------------------');

    lanterns.forEach((lantern) => {
      const layerName = lantern.layerIndex === 1 ? 'Background' : lantern.layerIndex === 2 ? 'Middle' : 'Foreground';
      const depth = lantern.layerIndex === 1 ? 0.25 : lantern.layerIndex === 2 ? 0.55 : 0.9;
      const zIndex = lantern.layerIndex === 1 ? 5 : lantern.layerIndex === 2 ? 12 : 11;
      const computedY = Math.round(documentHeight * lantern.pagePosition);

      console.log(`Lantern #${lantern.id + 1}`);
      console.log(`Layer: ${layerName}`);
      console.log(`pagePosition: ${lantern.pagePosition}`);
      console.log(`computedY: ${computedY}px`);
      console.log(`x: ${lantern.x}%`);
      console.log(`depth: ${depth}`);
      console.log(`z-index: ${zIndex}`);
      console.log('--------------------------------');
    });
  }, [lanterns, documentHeight]);

  return {
    lanterns,
    documentHeight,
  };
}
