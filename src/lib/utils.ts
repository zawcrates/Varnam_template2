import { clsx, type ClassValue } from 'clsx';
import { PureComponent } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple Tailwind CSS classes dynamically, handling conflicts and conditional logic.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
