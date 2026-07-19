import React, { createContext, useContext, ReactNode } from 'react';
import { useLenis } from '@/hooks/useLenis';

interface LenisProviderProps {
  children: ReactNode;
  enabled?: boolean;
}

const LenisContext = createContext<React.RefObject<any> | null>(null);

/**
 * Global provider to enable Lenis smooth scrolling.
 * Wrap the root component (App.tsx) with this to get beautiful smooth scrolls.
 */
export const LenisProvider: React.FC<LenisProviderProps> = ({ children, enabled = true }) => {
  const lenisRef = useLenis(enabled);

  return (
    <LenisContext.Provider value={lenisRef as any}>
      {children}
    </LenisContext.Provider>
  );
};

export const useLenisContext = () => {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error('useLenisContext must be used within a LenisProvider');
  }
  return context;
};
