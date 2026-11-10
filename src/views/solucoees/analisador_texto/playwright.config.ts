import { defineConfig, devices } from '@playwright/test'

/**
 * Testes E2E cobrindo fluxo, navegação e acessibilidade básica.
 * Sobe o preview do build de produção (base /analisador_texto/).
 */
export default defineConfig({
  testDir: './tests-e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'http://localhost:4173/analisador_texto/',
    trace: 'on-first-retry'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 5'] } }
  ],
  webServer: {
    command: 'npm run build:only && npm run preview',
    url: 'http://localhost:4173/analisador_texto/',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000
  }
})
