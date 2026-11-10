import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combina classes condicionais (clsx) e resolve conflitos do Tailwind (tailwind-merge).
 * Padrão utilizado por shadcn-vue.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
