import { useState, useEffect } from 'react';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'xl';

/**
 * Custom hook that listens to window resize events and returns the current active breakpoint
 * mapped to 'mobile' | 'tablet' | 'desktop' | 'xl'.
 * This is perfect for dynamic layout properties controlled programmatically in TypeScript/React.
 */
export function useActiveBreakpoint(): Breakpoint {
  // Safe default for server-side execution if ever rendered server-side
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const getBreakpoint = (width: number): Breakpoint => {
      if (width < 768) return 'mobile';
      if (width < 1024) return 'tablet';
      if (width < 1280) return 'desktop';
      return 'xl';
    };

    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    // Initialize on mount
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}
