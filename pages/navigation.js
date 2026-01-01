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

  async deleteAccount() {
    await this.page.click('a[href="/delete_account"]');
  }
}

export { Navigation };
