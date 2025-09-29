// tests/setupStorage.spec.ts
import { test, chromium } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

test('create storage state', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(process.env.BASE_URL!);
  await page.fill('#username', process.env.USER_EMAIL!);
  await page.fill('#password', process.env.USER_PASSWORD!);
  await page.click('#loginBtn');

  await page.waitForSelector('#garageLink');

  const storagePath = path.resolve(__dirname, '../storage/loggedUser.json');
  await page.context().storageState({ path: storagePath });
  console.log('✅ Storage state saved at', storagePath);

  await browser.close();
});
