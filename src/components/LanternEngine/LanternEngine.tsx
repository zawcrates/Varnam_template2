import React from 'react';
import { useActiveBreakpoint } from '@/hooks';
import { LanternManager } from './LanternManager';

// Debug toggle to display bounding boxes and live animation metrics (translateY, rotation, opacity)
const DEBUG_LANTERNS = false;

/**
 * Main entrance wrapper for the premium cinematic Lantern Engine.
 * Detects breakpoint dynamically and starts the manager.
 */
export const LanternEngine: React.FC = () => {
  const activeBreakpoint = useActiveBreakpoint();

  return (
    <LanternManager
      activeBreakpoint={activeBreakpoint}
      debugMode={DEBUG_LANTERNS}
    />
  );
};
