import { expect } from '@playwright/test';

class ProductsPage {
  constructor(page) {
    this.page = page;
  }

  async isVisible() {
    await expect(this.page.locator('.features_items')).toBeVisible();
  }

  async waitForProductsToLoad() {
    await this.page.waitForSelector('.features_items', { state: 'visible', timeout: 10000 });
    await this.page.waitForSelector('.product-image-wrapper', { state: 'visible', timeout: 10000 });
  }

  async hoverOverProduct(position) {
    const product = this.page.locator('.product-image-wrapper').nth(position);
    await product.hover();
  }

  async clickAddToCartForHoveredProduct(position) {
    const product = this.page.locator('.product-image-wrapper').nth(position);
    const addToCartButton = product.locator('a.btn.btn-default.add-to-cart').nth(1); // nth(1) = overlay button

    await addToCartButton.waitFor({ state: 'visible', timeout: 10000 });
    await addToCartButton.click();
  }

  async continueShopping() {
    const continueButton = this.page.locator('button:has-text("Continue Shopping")');
    await continueButton.waitFor({ state: 'visible', timeout: 10000 });
    await continueButton.click();
    await continueButton.waitFor({ state: 'hidden', timeout: 5000 });
  }
}

export { ProductsPage };
