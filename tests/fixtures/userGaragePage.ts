import { test as base, Browser } from '@playwright/test';
import { GaragePage } from '../../pages/GaragePage';
import path from 'path';
import fs from 'fs';
import { chromium } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export const test = base.extend<{ userGaragePage: GaragePage }>({
  userGaragePage: async ({ browser }: { browser: Browser }, use) => {
    const storagePath = path.resolve(__dirname, '../../storage/loggedUser.json');

    // Створюємо storage state, якщо його немає
    if (!fs.existsSync(storagePath)) {
      const browser2 = await chromium.launch();
      const page2 = await browser2.newPage();
      await page2.goto(process.env.BASE_URL!);

      // Логін
      await page2.fill('input[name="email"]', process.env.USER_EMAIL!);
      await page2.fill('input[name="password"]', process.env.USER_PASSWORD!);
      await page2.click('button[type="submit"]');

      // Чекаємо, поки з’явиться посилання на гараж
      await page2.waitForSelector('a[href="/garage"]', { timeout: 60000 });

      // Зберігаємо storage state
      await page2.context().storageState({ path: storagePath });
      await browser2.close();
    }

    // Створюємо контекст із залогіненим користувачем
    const context = await browser.newContext({ storageState: storagePath });
    const page = await context.newPage();
    const garagePage = new GaragePage(page);

    await use(garagePage);
    await context.close();
  },
});

export { expect } from '@playwright/test';

