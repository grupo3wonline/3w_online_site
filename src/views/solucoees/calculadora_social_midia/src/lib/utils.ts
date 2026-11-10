/**
 * Utilitários compartilhados.
 * Mantém funções puras e reutilizáveis (Clean Code / Single Responsibility).
 */

/** Constantes de identidade / contato da aplicação. */
export const SITE = {
  name: 'Calculadora de Redes Sociais',
  shortName: 'Calculadora Social',
  company: 'Grupo 3W Online',
  developer: 'HOTWYL | WILLFROMBRASIL',
  companyUrl: 'https://www.3wonline.com.br',
  ctaUrl: 'https://www.3wonline.com.br',
  email: 'contato@3wonline.com.br',
  whatsappDisplay: '(41) 99692-4829',
  whatsappLink: 'https://wa.me/5541996924829',
  baseUrl: 'https://app.3wonline.com.br/calculadora_social_midia/',
} as const

/** Formata um número como moeda brasileira (BRL). */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

/** Combina classes CSS ignorando valores falsy. Alternativa leve ao clsx. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
