import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://qauto.forstudy.space',
    headless: true, // можна зробити false для дебага
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    httpCredentials: {
      username: 'guest',
      password: 'welcome2qauto'
    }
  },

  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  reporter: [['list'], ['html']], // html-звіт буде у папці playwright-report
  timeout: 80000, 
});