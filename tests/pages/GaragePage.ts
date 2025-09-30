import { Page, Locator } from '@playwright/test';

export class GaragePage {
  readonly page: Page;
  readonly addCarButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addCarButton = page.getByRole('button', { name: /add car/i });
  }

  async isLoaded() {
    await this.addCarButton.waitFor();
  }
}
