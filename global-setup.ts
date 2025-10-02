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

  // ⬅️ тут важливий момент — httpCredentials
  const context = await browser.newContext({
    baseURL,
    httpCredentials: {
      username: httpUsername,
      password: httpPassword,
    },
  });

  const page = await context.newPage();
  await page.goto('/'); // тепер піде не на about:blank, а одразу на сайт

  // далі твій логін:
  await page.getByRole('button', { name: /sign in/i }).click();
  await page.fill('#signinEmail', userEmail);
  await page.fill('#signinPassword', userPassword);
  await page.getByRole('button', { name: /login/i }).click();

  await page.waitForURL('**/panel/garage', { timeout: 15000 });

  await context.storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;
