import { defineConfig, devices } from '@playwright/test'

const BASE = '/orcamento_social_midia'
const PORT = 8080

/**
 * Configuração Playwright para testes e2e:
 * navegação, fluxo da calculadora, links e responsividade.
 * Sobe o preview de produção automaticamente.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'html',
  timeout: 30_000,
  use: {
    baseURL: `http://localhost:${PORT}${BASE}`,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 5'] } },
  ],
  webServer: {
    command: 'npm run build && node e2e/preview-server.mjs',
    url: `http://localhost:${PORT}${BASE}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
})
