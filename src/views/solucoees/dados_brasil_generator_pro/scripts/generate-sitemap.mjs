/**
 * Gera public/sitemap.xml a partir das rotas estáticas + registro de ferramentas.
 * Executado antes do build (prebuild).
 */
import { writeFileSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const BASE = 'https://www.3wonline.com.br/dados_brasil_generator_pro'

// Extrai os slugs de src/data/tools.ts sem precisar compilar TS
const toolsSrc = readFileSync(resolve(root, 'src/data/tools.ts'), 'utf-8')
const slugs = [...toolsSrc.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])

const staticRoutes = [
  { path: '/', priority: '1.0', freq: 'weekly' },
  { path: '/privacidade', priority: '0.3', freq: 'yearly' },
  { path: '/termos', priority: '0.3', freq: 'yearly' },
  { path: '/cookies', priority: '0.3', freq: 'yearly' },
]

const toolRoutes = slugs.map((slug) => ({
  path: `/ferramentas/${slug}`,
  priority: '0.8',
  freq: 'monthly',
}))

const today = new Date().toISOString().split('T')[0]
const all = [...staticRoutes, ...toolRoutes]

const urls = all
  .map(
    (r) =>
      `  <url>\n    <loc>${BASE}${r.path === '/' ? '/' : r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.freq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

writeFileSync(resolve(root, 'public/sitemap.xml'), xml, 'utf-8')
console.log(`sitemap.xml gerado com ${all.length} URLs.`)
