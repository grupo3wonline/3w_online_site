/**
 * Escapa caracteres HTML para prevenir XSS ao inserir texto do usuário
 * em conteúdo dinâmico (por exemplo, no HTML do SweetAlert2).
 */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Remove espaços perigosos e limita o tamanho de uma string de entrada. */
export function sanitizeText(input: string, maxLength = 200): string {
  return escapeHtml(input.trim().slice(0, maxLength));
}
