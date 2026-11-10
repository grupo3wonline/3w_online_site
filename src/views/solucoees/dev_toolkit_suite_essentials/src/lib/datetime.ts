import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

/**
 * Formata uma data para o padrão brasileiro por extenso (ex.: 24 de setembro de 2026).
 */
export function formatLongDate(date: Date | number = new Date()): string {
  return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
}

/** Data/hora curta pt-BR (ex.: 24/09/2026 14:30). */
export function formatDateTime(date: Date | number = new Date()): string {
  return format(date, 'dd/MM/yyyy HH:mm', { locale: ptBR })
}
