import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    headless: true,
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    screenshot: 'on',          // guarda screenshot en éxito y falla
    video: 'on',               // evidencia en video
    trace: 'retain-on-failure' // trazas si falla
  },
  projects: [
    { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});