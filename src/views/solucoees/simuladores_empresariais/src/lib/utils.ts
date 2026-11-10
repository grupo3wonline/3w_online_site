import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Combina classes condicionais e resolve conflitos do Tailwind. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Formata um número como moeda brasileira (BRL). */
export function formatarMoeda(valor: number | string): string {
  const num = typeof valor === 'string' ? parseFloat(valor) : valor
  if (!isFinite(num)) return 'R$ 0,00'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(num)
}

/** Converte um valor (string com máscara ou número) para número seguro. */
export function paraNumero(valor: string | number | null | undefined): number {
  if (valor === null || valor === undefined || valor === '') return 0
  if (typeof valor === 'number') return isFinite(valor) ? valor : 0
  const limpo = valor
    .replace(/[^\d,.-]/g, '')
    .replace(/\./g, '')
    .replace(',', '.')
  const num = parseFloat(limpo)
  return isFinite(num) ? num : 0
}
