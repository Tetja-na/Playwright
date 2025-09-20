import { Page, Locator } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly signUpTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpTab = page.locator('text=Sign up');
    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');
    this.registerButton = page.locator('button:has-text("Register")');
  }

  async goto() {
    await this.page.goto('/');
  }

  async openSignUpForm() {
    await this.signUpTab.click();
  }

  async fillForm({
    name,
    lastName,
    email,
    password,
    repeatPassword,
  }: {
    name?: string;
    lastName?: string;
    email?: string;
    password?: string;
    repeatPassword?: string;
  }) {
    if (name !== undefined) await this.nameInput.fill(name);
    if (lastName !== undefined) await this.lastNameInput.fill(lastName);
    if (email !== undefined) await this.emailInput.fill(email);
    if (password !== undefined) await this.passwordInput.fill(password);
    if (repeatPassword !== undefined) await this.repeatPasswordInput.fill(repeatPassword);
  }

  async isRegisterButtonEnabled(): Promise<boolean> {
    return await this.registerButton.isEnabled();
  }

  async clickRegister() {
    await this.registerButton.click();
  }
}

