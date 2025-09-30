import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  globalSetup: path.resolve(__dirname, './tests/setup/global-setup.ts'),
  use: {
  baseURL: process.env.BASE_URL,
  httpCredentials: {
    username: process.env.HTTP_USERNAME || '',
    password: process.env.HTTP_PASSWORD || '',
  },
  storageState: 'storageState.json',
    headless: true,
  },
  projects: [
    { name: 'Desktop Chrome', use: { ...devices['Desktop Chrome'] } },
  ],
});

