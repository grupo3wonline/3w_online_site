import { defineConfig, devices } from '@playwright/test'

const BASE = '/simuladores_empresariais/'
const PORT = 4173

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
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
    command: 'npm run build && npm run preview -- --port ' + PORT,
    url: `http://localhost:${PORT}${BASE}`,
    timeout: 180_000,
    reuseExistingServer: !process.env.CI,
  },
})
