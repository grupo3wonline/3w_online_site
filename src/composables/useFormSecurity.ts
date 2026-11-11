/**
 * useFormSecurity — utilitários de segurança para formulários.
 *
 * Inclui:
 * - Sanitização com DOMPurify (prevenção XSS)
 * - Detecção de SQL Injection e template injection
 * - Guard de submissão (evita disparos duplos e reloads acidentais)
 * - Cooldown de sessão por formulário
 */
import DOMPurify from 'dompurify'
import { ref } from 'vue'

/** Intervalo mínimo entre submissões do mesmo formulário (ms) */
const SUBMIT_COOLDOWN_MS = 15_000

/** Padrões que indicam tentativa de injeção */
const INJECTION_PATTERNS: RegExp[] = [
  // SQL Injection
  /('|--|;|\/\*|\*\/|xp_|EXEC\s|DROP\s|SELECT\s|INSERT\s|UPDATE\s|DELETE\s|UNION\s|CAST\s|CONVERT\s)/i,
  // XSS / Script tags
  /(<script|<\/script|javascript:|vbscript:|on\w+\s*=|expression\s*\()/i,
  // Template injection
  /(\{\{|\}\}|\$\{|<\?php|<%=)/i,
  // Path traversal
  /(\.\.\/|\.\.\\)/,
]

export function useFormSecurity() {
  /**
   * Sanitiza um valor de texto puro — remove qualquer HTML ou código.
   * Use em todos os campos de formulário antes de processar.
   */
  function sanitizeText(value: string): string {
    if (!value) return ''
    const result = DOMPurify.sanitize(value.trim(), { ALLOWED_TAGS: [], ALLOWED_ATTR: [] })
    // DOMPurify pode retornar TrustedHTML — converter para string
    return String(result)
  }

  /**
   * Sanitiza HTML controlado (rich-text limitado).
   * Permite apenas tags seguras: b, i, em, strong, br, p.
   */
  function sanitizeHtml(value: string): string {
    if (!value) return ''
    const result = DOMPurify.sanitize(value.trim(), {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br', 'p'],
      ALLOWED_ATTR: [],
    })
    return String(result)
  }

  /**
   * Detecta padrões de injeção (SQL, XSS, template).
   * @returns true se o valor parece suspeito
   */
  function looksLikeInjection(value: string): boolean {
    return INJECTION_PATTERNS.some((re) => re.test(value))
  }

  /**
   * Sanitiza todos os campos string de um objeto de formulário.
   */
  function sanitizeFormData<T extends Record<string, unknown>>(data: T): T {
    const sanitized: T = { ...data }
    for (const key in sanitized) {
      const val = sanitized[key]
      if (typeof val === 'string') {
        ;(sanitized as Record<string, unknown>)[key] = sanitizeText(val)
      }
    }
    return sanitized
  }

  /**
   * Verifica se qualquer campo contém padrões de injeção.
   * @returns array com nomes dos campos suspeitos
   */
  function detectInjectionAttempt<T extends Record<string, unknown>>(data: T): string[] {
    const suspicious: string[] = []
    for (const key in data) {
      const val = data[key]
      if (typeof val === 'string' && looksLikeInjection(val)) {
        suspicious.push(key)
      }
    }
    return suspicious
  }

  // ─── Guard de Submissão ──────────────────────────────────────────────────

  /**
   * Guard com cooldown por sessão.
   * Evita duplo envio e disparos acidentais no reload da página.
   *
   * @param formId — identificador único do formulário
   */
  function useSubmitGuard(formId: string) {
    const isSubmitting = ref(false)
    const storageKey = `_3w_submit_${formId}`

    /** Verifica se o formulário foi enviado recentemente (cooldown ativo). */
    function wasSubmittedRecently(): boolean {
      const lastSubmit = sessionStorage.getItem(storageKey)
      if (!lastSubmit) return false
      return Date.now() - parseInt(lastSubmit, 10) < SUBMIT_COOLDOWN_MS
    }

    /** Marca o formulário como enviado (inicia cooldown). */
    function markAsSubmitted(): void {
      sessionStorage.setItem(storageKey, Date.now().toString())
    }

    /** Limpa o cooldown manualmente (após reset do formulário). */
    function clearSubmitMark(): void {
      sessionStorage.removeItem(storageKey)
    }

    return { isSubmitting, wasSubmittedRecently, markAsSubmitted, clearSubmitMark }
  }

  return {
    sanitizeText,
    sanitizeHtml,
    sanitizeFormData,
    looksLikeInjection,
    detectInjectionAttempt,
    useSubmitGuard,
  }
}
