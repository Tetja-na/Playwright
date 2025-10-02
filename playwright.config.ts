import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: './global-setup.ts',  // <-- шлях до файлу як рядок
  testDir: './tests',
use: {
  baseURL: process.env.BASE_URL,
  httpCredentials: {
    username: process.env.HTTP_USERNAME || '',
    password: process.env.HTTP_PASSWORD || '',
  },
  storageState: 'storageState.json',

    headless: false,
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});

