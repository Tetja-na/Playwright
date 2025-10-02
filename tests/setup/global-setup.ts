import { chromium, FullConfig } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch(); // 👈 правильний запуск браузера
  const page = await browser.newPage();

  await page.goto('https://qauto.forstudy.space/login');

  await page.fill('#email', process.env.USER_EMAIL || '');
  await page.fill('#password', process.env.USER_PASSWORD || '');
  await page.click('button[type="submit"]');

  // Очікуємо на редирект після логіну
  await page.waitForURL('**/garage');

  // Зберігаємо сесію
  await page.context().storageState({ path: 'auth.json' });

  await browser.close();
}

