import { Page, Locator } from '@playwright/test';

export class GaragePage {
  readonly page: Page;
  readonly addCarButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Селектор кнопки Add Car на сторінці гаража
    this.addCarButton = page.locator('button:has-text("Add car")');
  }

  async open() {
    await this.page.goto(`${process.env.BASE_URL}/garage`);
  }
}




