/**
 * Utilitários de data em português, sem dependências externas.
 * Cálculo de prazo considerando apenas dias úteis (seg–sex).
 */

/** Adiciona um número de dias corridos a uma data. */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/** Verifica se a data cai em um dia útil (segunda a sexta). */
export function isBusinessDay(date: Date): boolean {
  const day = date.getDay();
  return day !== 0 && day !== 6;
}

/**
 * Retorna a data resultante após somar uma quantidade de dias úteis,
 * a partir (exclusive) da data informada.
 */
export function addBusinessDays(start: Date, businessDays: number): Date {
  const result = new Date(start);
  let remaining = Math.max(0, Math.ceil(businessDays));
  while (remaining > 0) {
    result.setDate(result.getDate() + 1);
    if (isBusinessDay(result)) remaining -= 1;
  }
  return result;
}

/** Formata uma data no padrão brasileiro (dd/mm/aaaa). */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/** Formata uma data por extenso (ex.: 23 de setembro de 2026). */
export function formatDateLong(date: Date): string {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
