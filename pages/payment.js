import { expect } from '@playwright/test';

class Payment {
  constructor(page) {
    this.page = page;
  }

  async fillPaymentForm({ nameOnCard, cardNumber, cvc, expiryMonth, expiryYear }) {
    await this.page.locator('[data-qa="name-on-card"]').fill(nameOnCard);
    await this.page.locator('[data-qa="card-number"]').fill(cardNumber);
    await this.page.locator('[data-qa="cvc"]').fill(cvc);
    await this.page.locator('[data-qa="expiry-month"]').fill(expiryMonth);
    await this.page.locator('[data-qa="expiry-year"]').fill(expiryYear);
  }

  async pay() {
    await this.page.locator('[data-qa="pay-button"]').click();
  }

  async verifyOrderPlaced() {
    const successMessage = this.page.locator('[data-qa="order-placed"]');
    await expect(successMessage).toBeVisible({ timeout: 10000 });
  }
}

export { Payment };
