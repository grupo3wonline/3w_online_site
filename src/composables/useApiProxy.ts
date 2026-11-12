/**
 * useApiProxy — centralizador de chamadas a APIs externas.
 *
 * Em desenvolvimento (Vite), o middleware `api-proxy-dev` em vite.config.ts
 * intercepta as requisições e faz o fetch server-side, de modo que o browser
 * só vê chamadas para /api.php — sem expor os endpoints reais no DevTools.
 *
 * Em produção (HostGator), `public/api.php` atua como proxy PHP
 * com whitelist de serviços e sanitização de parâmetros.
 *
 * secureFetch() adiciona automaticamente:
 *  - X-Requested-With: XMLHttpRequest   (força CORS preflight)
 *  - X-3W-Token: <hmac-token>           (integridade de requisição)
 *  - X-3W-CSRF: <uuid-localStorage>     (CSRF token cliente)
 *  - X-3W-RC: <recaptchaToken>          (reCAPTCHA v3, se configurado)
 *  - X-3W-TS: <turnstileToken>          (Turnstile, se configurado)
 *
 * Mapeamento de tipos (t):
 *   1 → IPv4 pública  (api4.ipify.org)
 *   2 → IPv6 pública  (api6.ipify.org)
 *   3 → GeoIP         (ipwho.is)
 *   4 → GeoIP fallback (ipapi.co)
 *   5 → DNS lookup    (dns.google)
 *   6 → WHOIS / RDAP  (rdap.org)
 *   7 → CEP BrasilAPI (brasilapi.com.br/api/cep/v2)
 *   8 → ViaCEP        (viacep.com.br)
 *   9 → CNPJ          (brasilapi.com.br/api/cnpj/v1)
 */
import { useCSRFToken }       from './useCSRFToken'
import { useRecaptcha }       from './useRecaptcha'
import { useTurnstile, getTurnstileCache } from './useTurnstile'

/* ── Constantes ─────────────────────────────────────────────────────────── */
const BASE = import.meta.env.VITE_API_PROXY || '/api.php'

/* ── URL Builder ────────────────────────────────────────────────────────── */
function buildUrl(t: number, v?: string, extras?: Record<string, string>): string {
  const p = new URLSearchParams({ t: String(t), _hp: '' }) // _hp sempre vazio (honeypot PHP)
  if (v !== undefined && v !== '') p.set('v', v)
  if (extras) {
    for (const [k, val] of Object.entries(extras)) {
      if (val !== undefined && val !== '') p.set(k, val)
    }
  }
  return `${BASE}?${p.toString()}`
}

/* ── Cache do token HMAC (módulo-level, persiste entre componentes) ─────── */
let _hmacToken   = ''
let _hmacExpiry  = 0

async function fetchHmacToken(): Promise<string> {
  if (_hmacToken && Date.now() < _hmacExpiry - 5_000) return _hmacToken
  try {
    const r = await fetch(`${BASE}?action=token`, {
      cache: 'no-store',
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    })
    if (!r.ok) return _hmacToken
    const { token, ttl } = (await r.json()) as { token: string; ttl: number }
    _hmacToken  = token
    _hmacExpiry = Date.now() + Number(ttl) * 1_000
    return _hmacToken
  } catch {
    return _hmacToken // retorna token anterior se offline
  }
}

/* ── Singletons (inicializados na primeira chamada) ─────────────────────── */
let _csrf:      ReturnType<typeof useCSRFToken>  | undefined
let _recaptcha: ReturnType<typeof useRecaptcha>  | undefined
let _turnstile: ReturnType<typeof useTurnstile>  | undefined

/* ══════════════════════════════════════════════════════════════════════════
 * Composable principal
 * ══════════════════════════════════════════════════════════════════════════ */
export function useApiProxy() {
  if (!_csrf)      _csrf      = useCSRFToken()
  if (!_recaptcha) _recaptcha = useRecaptcha()
  if (!_turnstile) _turnstile = useTurnstile()

  /* ── secureFetch — wrapper seguro para todas as chamadas ao proxy ──────── */
  async function secureFetch(
    url: string,
    options?: RequestInit,
    /** Token Turnstile já obtido pelo widget visível no formulário.
     *  Quando fornecido, o secureFetch usa-o diretamente em vez de
     *  chamar useTurnstile.execute() em background. */
    widgetTsToken?: string
  ): Promise<Response> {
    const headers = new Headers(options?.headers)

    // Headers obrigatórios
    headers.set('X-Requested-With', 'XMLHttpRequest')
    headers.set('X-3W-CSRF', _csrf!.getToken())

    // HMAC token (nosso servidor — rápido)
    // reCAPTCHA com timeout curto (1.5s) para não bloquear chamadas automáticas de mount
    const rcRace = Promise.race([
      _recaptcha!.execute('proxy_query'),
      new Promise<string>(resolve => setTimeout(() => resolve(''), 1_500)),
    ])

    const [hmacRes, rcRes] = await Promise.allSettled([
      fetchHmacToken(),
      rcRace,
    ])

    if (hmacRes.status === 'fulfilled' && hmacRes.value)
      headers.set('X-3W-Token', hmacRes.value)
    if (rcRes.status === 'fulfilled' && rcRes.value)
      headers.set('X-3W-RC', rcRes.value)

    // Turnstile — NUNCA bloqueia o secureFetch:
    //  1. usa token do widget visível (melhor — verificação real do usuário)
    //  2. usa token cacheado de verificação anterior (rápido)
    //  3. não envia (a chamada prossegue sem Turnstile; PHP aceita token vazio)
    // NÃO chama _turnstile!.execute() aqui — evita timeout de 15s que bloqueava
    // chamadas automáticas (mount) e quebrava AbortSignal
    const tsToken = widgetTsToken !== undefined
      ? widgetTsToken
      : getTurnstileCache()
    if (tsToken) headers.set('X-3W-TS', tsToken)

    return fetch(url, { ...options, headers })
  }

  return {
    /* ── URL builders ─────────────────────────────────────────────────── */
    /** IP público IPv4 do usuário */
    ipv4Url: (): string => buildUrl(1),

    /** IP público IPv6 do usuário */
    ipv6Url: (): string => buildUrl(2),

    /** Geolocalização de um IP (omita `ip` para auto-detect) */
    geoipUrl: (ip = ''): string => buildUrl(3, ip),

    /** GeoIP fallback */
    geoipFallUrl: (): string => buildUrl(4),

    /** Consulta DNS via dns.google */
    dnsUrl: (name: string, type: string): string => buildUrl(5, name, { q: type }),

    /** WHOIS / RDAP via rdap.org */
    rdapUrl: (domain: string): string => buildUrl(6, domain),

    /** CEP via BrasilAPI v2 (retorna coordenadas GPS) */
    cepUrl: (cep: string): string => buildUrl(7, cep),

    /** CEP via ViaCEP */
    viaCepUrl: (cep: string): string => buildUrl(8, cep),

    /** CNPJ via BrasilAPI (dados Receita Federal + QSA) */
    cnpjUrl: (cnpj: string): string => buildUrl(9, cnpj),

    /* ── Wrapper seguro ───────────────────────────────────────────────── */
    secureFetch,
  }
}
