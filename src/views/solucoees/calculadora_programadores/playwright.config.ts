import { defineConfig, devices } from "@playwright/test";

/**
 * Testes E2E: navegacao, fluxo, acessos e funcionalidades.
 * Sobe o preview do build no base path /calculadora_programadores/.
 */
export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    baseURL: "http://localhost:8080/calculadora_programadores/",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 5"] } },
  ],
  webServer: {
    command: "npm run build && npm run preview -- --port 8080 --host",
    url: "http://localhost:8080/calculadora_programadores/",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
