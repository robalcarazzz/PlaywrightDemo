import { expect } from '@playwright/test';

class Navigation {
  constructor(page) {
    this.page = page;
  }

  async openProductsPage() {
    await this.page.click('a[href="/products"]');
  }

  async viewCart() {
    await this.page.click('a[href="/view_cart"]');
  }

  async signUpLogin() {
    await this.page.click('a[href="/login"]');
  }

}

export { Navigation };