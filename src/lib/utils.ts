import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn — combine class names with tailwind-merge for conflict resolution.
 *
 * Uses clsx for conditional classes and tailwind-merge to deduplicate
 * conflicting Tailwind utilities (last one wins).
 *
 * @example
 * cn('p-4', condition && 'bg-primary', 'text-white')
 * // => 'p-4 text-white bg-primary' (if condition is true)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}