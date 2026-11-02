/**
 * useCSRFToken — gera e valida um token CSRF armazenado no localStorage.
 * Protege formulários contra Cross-Site Request Forgery.
 */
const STORAGE_KEY = '_3w_csrf'

export function useCSRFToken() {
  /** Lê o token existente ou cria um novo UUID e o persiste. */
  function getToken(): string {
    let token = localStorage.getItem(STORAGE_KEY)
    if (!token) {
      token = crypto.randomUUID()
      localStorage.setItem(STORAGE_KEY, token)
    }
    return token
  }

  /** Verifica se o token fornecido é idêntico ao armazenado. */
  function validateToken(t: string): boolean {
    return t === localStorage.getItem(STORAGE_KEY)
  }

  return { getToken, validateToken }
}
