/**
 * Utilitários de segurança de entrada (client-side).
 * Objetivo: mitigar XSS/injeção ao processar dados do usuário
 * antes de renderizar em PDF, DOM ou armazenar localmente.
 */

/** Remove tags HTML e caracteres de controle de uma string. */
export function sanitizeText(input: string, maxLength = 500): string {
  if (typeof input !== 'string') return ''
  return (
    input
      .replace(/<[^>]*>/g, '') // remove tags
      // eslint-disable-next-line no-control-regex -- remoção intencional de caracteres de controle
      .replace(/[\u0000-\u001F\u007F]/g, '')
      .trim()
      .slice(0, maxLength)
  )
}

/** Escapa caracteres perigosos para inserção segura em HTML. */
export function escapeHtml(input: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }
  return String(input).replace(/[&<>"']/g, (c) => map[c])
}

/** Valida um e-mail de forma estrita (sem permitir payloads). */
export function isValidEmail(email: string): boolean {
  // Exige um domínio com ao menos um ponto e TLD com 2+ caracteres
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/
  return re.test(email) && email.length <= 254
}

/** Converte valor arbitrário em número seguro dentro de limites. */
export function safeNumber(value: unknown, min = 0, max = 1_000_000): number {
  const n = Number(value)
  if (!Number.isFinite(n)) return min
  return Math.min(Math.max(n, min), max)
}
