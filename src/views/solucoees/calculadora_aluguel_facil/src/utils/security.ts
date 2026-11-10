/**
 * Utilitários de segurança para o front-end.
 *
 * Como esta é uma aplicação 100% client-side (sem back-end nem persistência
 * de dados de terceiros), o foco de segurança está em:
 *  - Sanitização de entradas para evitar XSS refletido em qualquer render dinâmico
 *  - Isolamento/validação de dados no localStorage (evitar prototype pollution)
 *  - Normalização e limitação de valores numéricos das calculadoras
 */

/**
 * Remove caracteres potencialmente perigosos de uma string de texto livre.
 * Não substitui `v-text`/interpolação do Vue (que já escapa), mas protege
 * qualquer uso eventual de v-html ou concatenação em atributos.
 */
export function sanitizeText(input: unknown): string {
  if (typeof input !== 'string') return ''
  return input
    .replace(/[<>]/g, '') // remove sinais de tag
    .replace(/javascript:/gi, '') // remove protocolo perigoso
    .replace(/on\w+\s*=/gi, '') // remove handlers inline (onclick=, onerror=)
    .trim()
    .slice(0, 500) // limite defensivo de tamanho
}

/**
 * Escapa entidades HTML. Use quando precisar exibir texto do usuário
 * dentro de contexto HTML sem depender do escape automático do template.
 */
export function escapeHtml(input: unknown): string {
  if (typeof input !== 'string') return ''
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;'
  }
  return input.replace(/[&<>"'/]/g, (c) => map[c])
}

/**
 * Converte entrada em número seguro dentro de limites, evitando NaN/Infinity
 * e valores absurdos que quebrariam os cálculos.
 */
export function toSafeNumber(value: unknown, min = 0, max = 1_000_000_000): number {
  const n = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^\d.-]/g, ''))
  if (!Number.isFinite(n)) return min
  return Math.min(Math.max(n, min), max)
}

/** Chaves reservadas que nunca devem ser aceitas (proteção contra prototype pollution). */
const FORBIDDEN_KEYS = ['__proto__', 'constructor', 'prototype']

/**
 * Wrapper seguro para localStorage: valida JSON, ignora chaves perigosas e
 * nunca lança exceção (falha silenciosa e segura).
 */
export const safeStorage = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key)
      if (raw === null) return fallback
      const parsed = JSON.parse(raw)
      if (parsed && typeof parsed === 'object') {
        for (const k of FORBIDDEN_KEYS) {
          if (Object.prototype.hasOwnProperty.call(parsed, k)) return fallback
        }
      }
      return parsed as T
    } catch {
      return fallback
    }
  },
  set(key: string, value: unknown): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },
  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch {
      /* noop */
    }
  }
}

/**
 * Valida se uma URL externa é segura para abrir em nova aba
 * (apenas http/https, evita javascript:, data:, etc.).
 */
export function isSafeExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}
