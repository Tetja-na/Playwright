import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';

test.describe('Registration form tests (POM)', () => {
  const prefix = 'aqa';

  test.beforeEach(async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.openSignUpForm();
  });

  test('✅ Positive: successful registration', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const email = `${prefix}-${Date.now()}@test.com`;

    await registrationPage.fillForm({
      name: 'Test',
      lastName: 'User',
      email: email,
      password: 'Test1234',
      repeatPassword: 'Test1234',
    });

    expect(await registrationPage.isRegisterButtonEnabled()).toBe(true);

    await registrationPage.clickRegister();
    await expect(page).toHaveURL(/.*garage/);
  });

  test('❌ Negative: empty name disables Register button', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.fillForm({
      lastName: 'User',
      email: `${prefix}-${Date.now()}@test.com`,
      password: 'Test1234',
      repeatPassword: 'Test1234',
    });

    expect(await registrationPage.isRegisterButtonEnabled()).toBe(false);
  });

  test('❌ Negative: invalid email disables Register button', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.fillForm({
      name: 'Test',
      lastName: 'User',
      email: 'invalidEmail',
      password: 'Test1234',
      repeatPassword: 'Test1234',
    });

    expect(await registrationPage.isRegisterButtonEnabled()).toBe(false);
  });

  test('❌ Negative: short password disables Register button', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.fillForm({
      name: 'Test',
      lastName: 'User',
      email: `${prefix}-${Date.now()}@test.com`,
      password: '123',
      repeatPassword: '123',
    });

    expect(await registrationPage.isRegisterButtonEnabled()).toBe(false);
  });

  test('❌ Negative: password mismatch disables Register button', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.fillForm({
      name: 'Test',
      lastName: 'User',
      email: `${prefix}-${Date.now()}@test.com`,
      password: 'Test1234',
      repeatPassword: 'Other1234',
    });

    expect(await registrationPage.isRegisterButtonEnabled()).toBe(false);
  });

  test('❌ Negative: empty last name disables Register button', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await registrationPage.fillForm({
      name: 'Test',
      email: `${prefix}-${Date.now()}@test.com`,
      password: 'Test1234',
      repeatPassword: 'Test1234',
    });

    expect(await registrationPage.isRegisterButtonEnabled()).toBe(false);
  });
});