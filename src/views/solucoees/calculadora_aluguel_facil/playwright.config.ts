import { defineConfig, devices } from '@playwright/test'

const BASE = '/calculadora_aluguel_facil/'
const PORT = 8080

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: `http://localhost:${PORT}${BASE}`,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 5'] } }
  ],
  webServer: {
    command: 'npm run preview',
    url: `http://localhost:${PORT}${BASE}`,
    reuseExistingServer: true,
    timeout: 60000
  }
})
