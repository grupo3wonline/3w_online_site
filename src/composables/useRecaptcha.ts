/**
 * useRecaptcha — integração com Google reCAPTCHA v3.
 *
 * reCAPTCHA v3 é invisível ao usuário: gera um score (0.0–1.0) baseado em
 * comportamento. O token deve ser verificado no servidor com a chave secreta.
 * Scores >= 0.5 indicam usuário legítimo.
 *
 * IMPORTANTE: a chave secreta NUNCA deve estar no cliente.
 */
declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string

let scriptLoaded = false
let scriptLoading = false
const callbacks: Array<() => void> = []

/** Carrega o script do reCAPTCHA v3 dinamicamente (somente uma vez). */
function loadScript(): Promise<void> {
  return new Promise((resolve) => {
    if (scriptLoaded) { resolve(); return }

    callbacks.push(resolve)
    if (scriptLoading) return

    scriptLoading = true
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`
    script.async = true
    script.defer = true
    script.onload = () => {
      scriptLoaded = true
      scriptLoading = false
      callbacks.forEach((cb) => cb())
      callbacks.length = 0
    }
    script.onerror = () => {
      // Degradação graciosa — não bloqueia o formulário
      scriptLoaded = true
      scriptLoading = false
      callbacks.forEach((cb) => cb())
      callbacks.length = 0
    }
    document.head.appendChild(script)
  })
}

export function useRecaptcha() {
  /**
   * Executa o reCAPTCHA v3 e retorna o token gerado.
   * @param action — nome da ação (ex: 'contact_submit', 'privacy_request')
   * @returns token string ou '' em caso de falha
   */
  async function execute(action: string): Promise<string> {
    if (!SITE_KEY) {
      console.warn('[reCAPTCHA] VITE_RECAPTCHA_SITE_KEY não definida.')
      return ''
    }

    try {
      await loadScript()

      return new Promise<string>((resolve) => {
        window.grecaptcha.ready(async () => {
          try {
            const token = await window.grecaptcha.execute(SITE_KEY, { action })
            resolve(token)
          } catch {
            // Degradação graciosa
            resolve('')
          }
        })
      })
    } catch {
      return ''
    }
  }

  return { execute }
}
