import { defineConfig, devices } from '@playwright/test'

const PORT = 4173
const BASE_PATH = '/calculadora_evento/'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${PORT}${BASE_PATH}`,
    trace: 'on-first-retry',
    permissions: ['clipboard-read', 'clipboard-write'],
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 5'] } },
  ],
  // Faz o build e sobe o preview antes dos testes
  webServer: {
    command: 'npm run build && npm run preview',
    url: `http://localhost:${PORT}${BASE_PATH}`,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
})
