import { test as base, expect, Page } from '@playwright/test';

export const test = base.extend<{
  userGaragePage: Page; // тут явно вказуємо, що наша фікстура повертає сторінку
}>({
  userGaragePage: async ({ page }, use: (page: Page) => Promise<void>) => {
    await page.goto('/panel/garage'); // відкриваємо гараж
    await use(page); // віддаємо сторінку у тест
  },
});

export { expect };

