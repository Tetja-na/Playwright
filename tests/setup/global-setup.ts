import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

async function globalSetup() {
  const browser = await chromium.launch({ headless: false }); // видимий браузер для перевірки
  const page = await browser.newPage({
    httpCredentials: {
      username: process.env.HTTP_USERNAME ?? 'guest',
      password: process.env.HTTP_PASSWORD ?? 'welcome2qauto',
    },
  });

  console.log('➡️ Відкриваємо сторінку:', process.env.BASE_URL);
  await page.goto(process.env.BASE_URL ?? 'https://qauto.forstudy.space/');

  // зробимо скріншот щоб бачити, що реально відкрилось
  await page.screenshot({ path: 'before-login.png' });

  // чекаємо на кнопку Sign in
  const signInButton = page.getByRole('button', { name: /sign in/i });
  await signInButton.waitFor({ state: 'visible', timeout: 15000 });
  await signInButton.click();

  await page.fill('#signinEmail', process.env.USER_EMAIL!);
  await page.fill('#signinPassword', process.env.USER_PASSWORD!);
  await page.getByRole('button', { name: /login/i }).click();

  // ще один скріншот після логіну
  await page.screenshot({ path: 'after-login.png' });

  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;

