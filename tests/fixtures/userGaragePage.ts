import { test as base } from '@playwright/test';
import { GaragePage } from '../pages/GaragePage';

export const test = base.extend<{ userGaragePage: GaragePage }>({
  userGaragePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);
    await page.goto('/panel/garage'); // відкриваємо гараж одразу
    await use(garagePage);
  },
});

export { expect } from '@playwright/test';
