import { chromium, FullConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

async function globalSetup(config: FullConfig) {
  const baseURL = process.env.BASE_URL!;
  const httpUsername = process.env.HTTP_USERNAME!;
  const httpPassword = process.env.HTTP_PASSWORD!;

  const userEmail = process.env.USER_EMAIL!;
  const userPassword = process.env.USER_PASSWORD!;

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    baseURL,
    httpCredentials: {
      username: httpUsername,
      password: httpPassword,
    },
  });

  const page = await context.newPage();

  console.log('Переходимо на сайт:', baseURL);
  await page.goto(baseURL, { waitUntil: 'domcontentloaded', timeout: 30000 });

  console.log(' Поточна сторінка після goto:', page.url());

  // Чекаємо появи кнопки "Sign In"
  await page.waitForSelector('button:has-text("Sign In")', { timeout: 20000 });
  console.log('Кнопка Sign In знайдена');

  await page.locator('button:has-text("Sign In")').click();

  await page.fill('#signinEmail', userEmail);
  await page.fill('#signinPassword', userPassword);
  await page.getByRole('button', { name: /login/i }).click();

  await page.waitForURL('**/panel/garage', { timeout: 15000 });
  console.log('Успішно зайшли в гараж:', page.url());

  await context.storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;

