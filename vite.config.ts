import { defineConfig, loadEnv, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

/**
 * Plugin de desenvolvimento que intercepta /api.php e faz o fetch
 * server-side (Node), ocultando os endpoints externos do DevTools do browser.
 *
 * As URLs dos endpoints são lidas do .env (sem prefixo VITE_ → só Node, nunca
 * expostas ao bundle do browser). Em produção o PHP faz o mesmo via getenv().
 */
function apiProxyDevPlugin(env: Record<string, string>): Plugin {
  // URLs lidas do .env, com fallback idêntico ao api-config.php
  const urls = {
    ipv4:         env.API_EXT_IPV4           || 'https://api4.ipify.org',
    ipv6:         env.API_EXT_IPV6           || 'https://api6.ipify.org',
    geoip:        env.API_EXT_GEOIP          || 'https://ipwho.is',
    geoipFallback:env.API_EXT_GEOIP_FALLBACK || 'https://ipapi.co/json/',
    dns:          env.API_EXT_DNS            || 'https://dns.google/resolve',
    rdap:         env.API_EXT_RDAP           || 'https://rdap.org/domain',
    cepBrasilapi: env.API_EXT_CEP_BRASILAPI  || 'https://brasilapi.com.br/api/cep/v2',
    cepViacep:    env.API_EXT_CEP_VIACEP     || 'https://viacep.com.br/ws',
    cnpj:         env.API_EXT_CNPJ           || 'https://brasilapi.com.br/api/cnpj/v1',
  }

  // Espelha a lógica de resolveUrl() em public/api.php
  function resolveTarget(t: number, v: string, q: string): string | null {
    const cleanIp     = (s: string) => s.replace(/[^0-9a-fA-F.:]/g, '')
    const cleanDomain = (s: string) => s.toLowerCase().replace(/[^a-z0-9.-]/g, '')
    const cleanDigits = (s: string) => s.replace(/\D/g, '')
    const cleanDnsType = (s: string): string => {
      const allowed = ['A', 'AAAA', 'MX', 'NS', 'TXT', 'CNAME', 'SOA', 'PTR', 'SRV', 'CAA']
      const up = s.toUpperCase().replace(/[^A-Z]/g, '')
      return allowed.includes(up) ? up : 'A'
    }

    switch (t) {
      case 1: return `${urls.ipv4}?format=json`
      case 2: return `${urls.ipv6}?format=json`
      case 3: { const ip = cleanIp(v); return ip ? `${urls.geoip}/${ip}` : `${urls.geoip}/` }
      case 4: return urls.geoipFallback
      case 5: {
        const name = encodeURIComponent(cleanDomain(v))
        const type = cleanDnsType(q)
        return name ? `${urls.dns}?name=${name}&type=${type}` : null
      }
      case 6: { const d = cleanDomain(v); return d ? `${urls.rdap}/${d}` : null }
      case 7: { const c = cleanDigits(v); return c.length === 8  ? `${urls.cepBrasilapi}/${c}` : null }
      case 8: { const c = cleanDigits(v); return c.length === 8  ? `${urls.cepViacep}/${c}/json/` : null }
      case 9: { const c = cleanDigits(v); return c.length === 14 ? `${urls.cnpj}/${c}` : null }
      default: return null
    }
  }

  return {
    name: 'api-proxy-dev',
    configureServer(server) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      server.middlewares.use(async (req: any, res: any, next: () => void) => {
        if (!req.url?.startsWith('/api.php')) return next()

        const urlObj = new URL(req.url as string, 'http://localhost')

        // Endpoint: gerar token HMAC (dev retorna token fictício)
        if (urlObj.searchParams.get('action') === 'token') {
          const window60 = Math.floor(Date.now() / 60_000)
          const devToken = `dev-${window60}`
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 'no-store')
          res.end(JSON.stringify({ token: devToken, ttl: 60 - (Math.floor(Date.now() / 1_000) % 60) }))
          return
        }

        // Preflight OPTIONS
        if ((req as any).method === 'OPTIONS') {
          res.statusCode = 204
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-3W-Token, X-3W-CSRF, X-3W-RC, X-3W-TS')
          res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
          res.end()
          return
        }

        const t   = parseInt(urlObj.searchParams.get('t') ?? '0', 10)
        const v   = urlObj.searchParams.get('v') ?? ''
        const q   = urlObj.searchParams.get('q') ?? ''
        const targetUrl = resolveTarget(t, v, q)

        if (!targetUrl) {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Invalid request' }))
          return
        }

        try {
          const headers: Record<string, string> = {
            'User-Agent': 'Mozilla/5.0 (compatible; Vite-Dev-Proxy/1.0)',
            'Accept': t === 6
              ? 'application/rdap+json, application/json'
              : 'application/json',
          }
          const upstream = await fetch(targetUrl, {
            headers,
            signal: AbortSignal.timeout(15_000),
          })
          const body = await upstream.text()
          res.statusCode = upstream.status
          const ct = upstream.headers.get('content-type') || 'application/json'
          res.setHeader('Content-Type', ct)
          res.setHeader('Cache-Control', 'no-store')
          res.end(body)
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err)
          res.statusCode = 502
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Proxy error', message: msg }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  // loadEnv com prefixo '' carrega TODAS as vars do .env,
  // incluindo as sem VITE_ (disponíveis apenas aqui no Node, nunca no bundle).
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // base: define o caminho raiz dos assets no build.
    // '/' para deploy na raiz; '/subdir/' se hospedar em subdiretório.
    base: env.VITE_BASE || '/',

    plugins: [vue(), apiProxyDevPlugin(env)],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 3000,
      host: true,
    },
    build: {
      target: 'es2020',
      // Alerta para chunks acima de 500KB
      chunkSizeWarningLimit: 500,
      rollupOptions: {
        output: {
          manualChunks: {
            // Core Vue
            'vendor-vue': ['vue', 'vue-router', 'pinia'],
            // UI e ícones
            'vendor-ui': ['sweetalert2', '@iconify/vue'],
            // Utilitários
            'vendor-utils': ['dompurify', 'fuse.js', 'date-fns', 'maska', 'zod'],
            // OCR (pesado — separado por razões de performance)
            'vendor-ocr': ['tesseract.js'],
            // QR Code
            'vendor-qr': ['qrcode'],
          },
        },
      },
    },
  }
})
