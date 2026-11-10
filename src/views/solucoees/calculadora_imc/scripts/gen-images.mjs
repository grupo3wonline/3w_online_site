// Gera as imagens de SEO usando o Chromium do Playwright (já instalado).
// - public/og-image.jpg  : card social 1200x630 a partir de scripts/og-template.html
// - public/screenshot.jpg: captura da home renderizada (requer preview rodando)
import { chromium } from '@playwright/test'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const publicDir = path.join(root, 'public')

const PREVIEW_URL = process.env.PREVIEW_URL || 'http://localhost:4188/calculadora_imc/'

const browser = await chromium.launch()

// 1) OG image a partir do template HTML
{
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
  const templateUrl = pathToFileURL(path.join(__dirname, 'og-template.html')).href
  await page.goto(templateUrl, { waitUntil: 'networkidle' })
  await page.screenshot({
    path: path.join(publicDir, 'og-image.jpg'),
    type: 'jpeg',
    quality: 88,
    clip: { x: 0, y: 0, width: 1200, height: 630 },
  })
  await page.close()
  console.log('og-image.jpg gerado')
}

// 2) Screenshot da aplicação (só se o preview estiver acessível)
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 750 } })
  await page.goto(PREVIEW_URL, { waitUntil: 'networkidle', timeout: 8000 })
  await page.waitForTimeout(1200)
  await page.screenshot({
    path: path.join(publicDir, 'screenshot.jpg'),
    type: 'jpeg',
    quality: 85,
  })
  await page.close()
  console.log('screenshot.jpg gerado')
} catch {
  console.warn('Preview indisponível — screenshot.jpg não atualizado. Rode o preview e defina PREVIEW_URL.')
}

await browser.close()
