import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config(); 

console.log('✅ Loaded baseURL from env:', process.env.BASE_URL);

export default defineConfig({
  // 🔹 крок 1: запускаємо setup перед тестами
  testDir: path.join(__dirname, 'tests'),
  
 // globalSetup: path.resolve(__dirname, './tests/setup/global-setup.ts'),

  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    httpCredentials: {
      username: process.env.HTTP_USERNAME || '',
      password: process.env.HTTP_PASSWORD || ''
    },

    // 🔹 крок 2: підключаємо готовий storage state
    storageState: 'storageState.json',
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

  reporter: [['list'], ['html']],
  timeout: 80000,
});
