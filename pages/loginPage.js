import { expect } from '@playwright/test';

class LoginPage  {
  constructor(page) {
    this.page = page;
  }

  async verifyLoginFormIsVisible() {
    await expect(this.page.locator('[data-qa="login-email"]')).toBeVisible();
    await expect(this.page.locator('[data-qa="login-password"]')).toBeVisible();
    await expect(this.page.locator('[data-qa="login-button"]')).toBeVisible();
  }

  async verifySignupFormIsVisible() {
    await expect(this.page.locator('[data-qa="signup-name"]')).toBeVisible();
    await expect(this.page.locator('[data-qa="signup-email"]')).toBeVisible();
    await expect(this.page.locator('[data-qa="signup-button"]')).toBeVisible();
  }

  /**
   * Performs signup with randomly generated credentials
   * @returns {object} - Returns the generated name, email, and password
   */
  async signup() {
    const randomString = Math.random().toString(36).substring(2, 10); // 8 chars
    const name = `TestUser${randomString}`;
    const email = `test${randomString}@test.com`;
    const password = `Pass${randomString}123!`; // Strong enough for the site

    await this.page.locator('[data-qa="signup-name"]').fill(name);
    await this.page.locator('[data-qa="signup-email"]').fill(email);

    await this.page.locator('[data-qa="signup-button"]').click();

    return { name, email, password };
  }

}

export { LoginPage };