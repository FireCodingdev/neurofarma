import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina classes do Tailwind, resolvendo conflitos automaticamente.
 * Usa clsx para construir a string e tailwind-merge para mesclar.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
