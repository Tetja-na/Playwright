import { test, expect } from '@playwright/test';

test.describe('Registration form tests', () => {
  const baseUrl = process.env.BASE_URL!;
  const prefix = 'aqa';

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
    await page.click('text=Sign up');
  });

  // ✅ Positive: кнопка працює, відкривається гараж
  test('✅ Positive: successful registration', async ({ page }) => {
    const email = `${prefix}-${Date.now()}@test.com`;

    await page.fill('#signupName', 'Test');
    await page.fill('#signupLastName', 'User');
    await page.fill('#signupEmail', email);
    await page.fill('#signupPassword', 'Test1234');
    await page.fill('#signupRepeatPassword', 'Test1234');

    // Кнопка активна
    await expect(page.locator('button:has-text("Register")')).toBeEnabled();

    // Натискаємо і перевіряємо, що перейшли в гараж
    await page.click('button:has-text("Register")');
    await expect(page).toHaveURL(/.*garage/);
  });

  // ❌ Negative 1: пусте поле Name
  test('❌ Negative: empty name disables Register button', async ({ page }) => {
    await page.fill('#signupLastName', 'User');
    await page.fill('#signupEmail', `${prefix}-${Date.now()}@test.com`);
    await page.fill('#signupPassword', 'Test1234');
    await page.fill('#signupRepeatPassword', 'Test1234');

    await expect(page.locator('button:has-text("Register")')).toBeDisabled();
  });

  // ❌ Negative 2: некоректний email
  test('❌ Negative: invalid email disables Register button', async ({ page }) => {
    await page.fill('#signupName', 'Test');
    await page.fill('#signupLastName', 'User');
    await page.fill('#signupEmail', 'invalidEmail');
    await page.fill('#signupPassword', 'Test1234');
    await page.fill('#signupRepeatPassword', 'Test1234');

    await expect(page.locator('button:has-text("Register")')).toBeDisabled();
  });

  // ❌ Negative 3: пароль занадто короткий
  test('❌ Negative: short password disables Register button', async ({ page }) => {
    await page.fill('#signupName', 'Test');
    await page.fill('#signupLastName', 'User');
    await page.fill('#signupEmail', `${prefix}-${Date.now()}@test.com`);
    await page.fill('#signupPassword', '123');
    await page.fill('#signupRepeatPassword', '123');

    await expect(page.locator('button:has-text("Register")')).toBeDisabled();
  });

  // ❌ Negative 4: паролі не співпадають
  test('❌ Negative: password mismatch disables Register button', async ({ page }) => {
    await page.fill('#signupName', 'Test');
    await page.fill('#signupLastName', 'User');
    await page.fill('#signupEmail', `${prefix}-${Date.now()}@test.com`);
    await page.fill('#signupPassword', 'Test1234');
    await page.fill('#signupRepeatPassword', 'Other1234');

    await expect(page.locator('button:has-text("Register")')).toBeDisabled();
  });

  // ❌ Negative 5: пусте поле Last Name
  test('❌ Negative: empty last name disables Register button', async ({ page }) => {
    await page.fill('#signupName', 'Test');
    await page.fill('#signupEmail', `${prefix}-${Date.now()}@test.com`);
    await page.fill('#signupPassword', 'Test1234');
    await page.fill('#signupRepeatPassword', 'Test1234');

    await expect(page.locator('button:has-text("Register")')).toBeDisabled();
  });
});