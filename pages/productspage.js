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

  async clickViewProductByName(productName) {
    const link = this.page
      .locator('.features_items .col-sm-4')
      .filter({ hasText: productName })
      .locator('.choose ul li a:has-text("View Product")');

    await link.click();
  }

  async writeReview(name, email, reviewText) {
    await this.page.fill('#name', name);
    await this.page.fill('#email', email);
    await this.page.fill('#review', reviewText);

    await this.page.click('#button-review');

    const successMessage = this.page.locator(
      '.alert-success.alert span:has-text("Thank you for your review.")'
    );

    await successMessage.waitFor({ state: 'visible', timeout: 10000 });
  }

  async searchProduct(query, options = {}) {
    const timeout = options.timeout || 15000;

    if (!query || query.trim() === '') {
      throw new Error('Search query cannot be empty');
    }

    const searchInput = this.page.locator('#search_product');
    const searchButton = this.page.locator('#submit_search');

    await expect(searchInput).toBeVisible({ timeout });
    await expect(searchButton).toBeEnabled({ timeout });

    await searchInput.fill(query);
    await searchButton.click();

    console.log(`Searched for: "${query}"`);
  }

  async verifySearchResultsVisible(options = {}) {
    const { timeout = 15000, minResults = 1 } = options;

    // Verify the results header is visible
    await expect(
      this.page.locator('h2.title.text-center:has-text("Searched Products")')
    ).toBeVisible({
      timeout,
    });

    // Get product cards
    const productCards = this.page.locator('.features_items .col-sm-4 .product-image-wrapper');

    // Ensure at least one card is visible
    await expect(productCards.first()).toBeVisible({ timeout });

    // Check count
    const count = await productCards.count();
    expect(count).toBeGreaterThanOrEqual(minResults);

    console.log(`✅ Search results loaded: ${count} product(s) found`);
  }
}

export { ProductsPage };
