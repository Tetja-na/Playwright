import { test, expect } from '@playwright/test';

test('mock profile API response', async ({ page }) => {
  // 1. Логінимося через storageState (щоб не вводити дані кожного разу)
  await page.goto(process.env.BASE_URL + '/panel/garage');

  // 2. Підміняємо відповідь бекенду для профілю
  await page.route('**/api/users/profile', async (route) => {
    // fake response
    const mockProfile = {
      status: 'ok',
      data: {
        userId: 12345,
        photoFilename: null,
        name: 'Testsieger Gru',
        lastName: 'Gru',
        email: 'user1+qa21@test.com',
      },
    };

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockProfile),
    });
  });

  // 3. Переходимо на сторінку профілю
  await page.getByRole('link', { name: 'Profile' }).click();
  await page.waitForURL('**/panel/profile');

  // 4. Перевіряємо що на UI відобразилось саме наше мокане ім’я
  await expect(page.locator('text=Testsieger Gru')).toBeVisible();
  await expect(page.locator('text=Gru')).toBeVisible();

  console.log('✅ Профіль відображає мокані дані');
});
