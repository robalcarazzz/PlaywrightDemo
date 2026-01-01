import { expect } from '@playwright/test';

class HomePage {
  constructor(page) {
    this.page = page;
  }

  async isVisible() {
    await expect(this.page.locator('#slider')).toBeVisible();
  }
}

export { HomePage };
