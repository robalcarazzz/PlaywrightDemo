import { expect } from '@playwright/test';

class LoginPage {
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

  async signup() {
    const randomString = Math.random().toString(36).substring(2, 10); // 8 chars
    const name = `TestUser${randomString}`;
    const email = `test${randomString}@test.com`;

    await this.page.locator('[data-qa="signup-name"]').fill(name);
    await this.page.locator('[data-qa="signup-email"]').fill(email);
    await this.page.locator('[data-qa="signup-button"]').click();

    return name;
  }

  async fillAccountInformationForm(options = {}) {
    const title = options.title || 'Mr';
    await this.page.locator(`input[name="title"][value="${title}"]`).check();

    const password = options.password || `Pass${Math.random().toString(36).substring(2, 8)}123!`;
    await this.page.locator('[data-qa="password"]').fill(password);

    await this.page.locator('[data-qa="days"]').selectOption(options.day || '15');
    await this.page.locator('[data-qa="months"]').selectOption(options.month || '6');
    await this.page.locator('[data-qa="years"]').selectOption(options.year || '1990');

    if (options.newsletter !== false) {
      await this.page.locator('input#newsletter').check();
    }
    if (options.optin !== false) {
      await this.page.locator('input#optin').check();
    }

    await this.page.locator('[data-qa="first_name"]').fill(options.firstName || 'John');
    await this.page.locator('[data-qa="last_name"]').fill(options.lastName || 'Doe');
    await this.page.locator('[data-qa="company"]').fill(options.company || 'Test Company Inc.');
    await this.page.locator('[data-qa="address"]').fill(options.address || '123 Main Street');
    await this.page.locator('[data-qa="address2"]').fill(options.address2 || 'Apt 4B');
    await this.page.locator('[data-qa="country"]').selectOption(options.country || 'United States');
    await this.page.locator('[data-qa="state"]').fill(options.state || 'California');
    await this.page.locator('[data-qa="city"]').fill(options.city || 'Los Angeles');
    await this.page.locator('[data-qa="zipcode"]').fill(options.zipcode || '90001');
    await this.page.locator('[data-qa="mobile_number"]').fill(options.mobile || '5551234567');

    return { password };
  }

  async createAccount() {
    await this.page.locator('[data-qa="create-account"]').click();
  }

  async continue() {
    await this.page.locator('[data-qa="continue-button"]').click();
  }

  async verifyLoggedInAs(expectedName) {
    const loggedInLink = this.page.locator('a i.fa.fa-user').locator('..'); // parent <a>

    await expect(loggedInLink).toBeVisible();
    await expect(loggedInLink).toContainText('Logged in as');
    await expect(loggedInLink.locator('b')).toHaveText(expectedName);
  }

  async verifyAccountDeleted() {
    const deletedMessage = this.page.locator('[data-qa="account-deleted"]');
    await expect(deletedMessage).toBeVisible({ timeout: 10000 });
  }
  
}

export { LoginPage };
