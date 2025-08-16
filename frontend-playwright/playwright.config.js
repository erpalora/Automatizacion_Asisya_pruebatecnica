// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    headless: false,          // ver el navegador
    video: 'on',              // graba video de cada test
    screenshot: 'only-on-failure',
  },
  reporter: [['html', { open: 'never' }]], // reporte HTML
});