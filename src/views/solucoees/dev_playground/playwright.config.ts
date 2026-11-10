import { defineConfig, devices } from '@playwright/test'

/**
 * Testes E2E — navegação, fluxo e acessos.
 * Sobe o preview de produção (respeita o base path /dev_playground/).
 */
const BASE = 'http://localhost:4173/dev_playground/'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: BASE,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 5'] } },
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173',
    url: BASE,
    reuseExistingServer: !process.env.CI,
    timeout: 180000,
  },
})
