import { defineConfig, devices } from '@playwright/test'

const BASE = 'http://localhost:4173/calculadora_preco/'

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  fullyParallel: true,
  retries: 0,
  reporter: [['list']],
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
