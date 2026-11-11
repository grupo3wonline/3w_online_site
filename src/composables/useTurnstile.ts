/**
 * useTurnstile — integração com Cloudflare Turnstile (modo invisível).
 *
 * Turnstile é a alternativa à reCAPTCHA da Cloudflare.
 * No modo interaction-only, não exige interação a menos que o navegador
 * seja detectado como suspeito.
 *
 * IMPORTANTE: a chave secreta NUNCA deve estar no cliente.
 * O tipo global `window.turnstile` é declarado em AppTurnstile.vue.
 */

const TS_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined

declare global {
  interface Window {
    _onTurnstileLoad?: () => void
  }
}

let scriptLoaded  = false
let scriptLoading = false
const callbacks: Array<() => void> = []

/** Token cache — tokens Turnstile são válidos por ~300s */
let _cachedToken = ''
let _cacheExpiry  = 0
let _widgetId     = ''
let _container: HTMLElement | null = null

function loadScript(): Promise<void> {
  return new Promise((resolve) => {
    if (scriptLoaded) { resolve(); return }
    callbacks.push(resolve)
    if (scriptLoading) return
    scriptLoading = true

    window._onTurnstileLoad = () => {
      scriptLoaded  = true
      scriptLoading = false
      callbacks.forEach((cb) => cb())
      callbacks.length = 0
    }

    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=_onTurnstileLoad&render=explicit'
    script.async = true
    script.defer = true
    script.onerror = () => {
      // Degradação graciosa — não bloqueia o formulário
      scriptLoaded  = true
      scriptLoading = false
      callbacks.forEach((cb) => cb())
      callbacks.length = 0
    }
    document.head.appendChild(script)
  })
}

export function useTurnstile() {
  /**
   * Executa o Turnstile e retorna o token gerado.
   * Reutiliza token em cache se ainda válido.
   * @param action — nome da ação (ex: 'proxy_query')
   * @returns token string ou '' em caso de falha/sem configuração
   */
  async function execute(action = 'proxy_query'): Promise<string> {
    if (!TS_SITE_KEY) return ''

    // Reutiliza token em cache (~5 min de validade)
    if (_cachedToken && Date.now() < _cacheExpiry) return _cachedToken

    try {
      await loadScript()
      if (!window.turnstile) return ''

      // Container invisível reutilizado
      if (!_container) {
        _container = document.createElement('div')
        _container.style.cssText =
          'position:fixed;bottom:0;right:0;visibility:hidden;pointer-events:none;z-index:-1'
        document.body.appendChild(_container)
      }

      // Remove widget anterior
      if (_widgetId) {
        try { window.turnstile.remove(_widgetId) } catch { /* ignore */ }
        _widgetId = ''
      }

      return await new Promise<string>((resolve, reject) => {
        const tid = setTimeout(() => reject(new Error('Turnstile timeout')), 15_000)

        _widgetId = window.turnstile!.render(_container!, {
          sitekey: TS_SITE_KEY,
          appearance: 'interaction-only',
          action,
          callback: (token: string) => {
            clearTimeout(tid)
            _cachedToken = token
            _cacheExpiry = Date.now() + 290_000
            resolve(token)
          },
          'error-callback': () => {
            clearTimeout(tid)
            reject(new Error('Turnstile error'))
          },
          'expired-callback': () => {
            clearTimeout(tid)
            reject(new Error('Turnstile challenge timeout'))
          },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any)
      })
    } catch {
      return '' // Degradação graciosa
    }
  }

  return { execute, hasSiteKey: !!TS_SITE_KEY }
}
