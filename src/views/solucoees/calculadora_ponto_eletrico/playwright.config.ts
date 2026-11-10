import { defineConfig, devices } from '@playwright/test'

const BASE = 'http://localhost:4173/calculadora_ponto_eletrico/'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: BASE,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run preview',
    url: BASE,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
