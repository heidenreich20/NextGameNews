import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir:  './tests/e2e',
  timeout:  60_000,
  expect:   { timeout: 15_000 },
  use: {
    baseURL:    'http://localhost:3000',
    screenshot: 'only-on-failure',
    video:      'retain-on-failure',
  },
  webServer: {
    command:             'npm run dev',
    url:                 'http://localhost:3000',
    reuseExistingServer: true,
    timeout:             120_000,
  },
})