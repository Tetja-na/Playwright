// tests/setup/save-cookies.ts
import { test } from '@playwright/test';

test('save cookies', async ({ page }) => {
  await page.goto(process.env.BASE_URL || 'http://localhost:3000/login');
  // логін
  await page.fill('#username', 'user');
  await page.fill('#password', 'pass');
  await page.click('button[type=submit]');
  await page.waitForLoadState('networkidle');

  const cookies = await page.context().cookies();
  // Записуємо cookies в JSON
  const fs = require('fs');
  fs.writeFileSync('cookies.json', JSON.stringify(cookies));
});
