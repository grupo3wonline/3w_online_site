/** Formata um valor numérico como moeda brasileira (BRL). */
export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

/** Formata um número de horas com uma casa decimal. */
export function formatHours(value: number): string {
  return `${value.toFixed(1)}h`;
}
