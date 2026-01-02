import { expect } from '@playwright/test';

class CartPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Verifies that a product in the cart has the expected details visible
   * @param {number} productId - The product ID (e.g., 1 for Blue Top, 2 for Men Tshirt)
   * @param {object} expected - Expected values
   * @param {string} expected.description - Product name (e.g., "Blue Top")
   * @param {string} expected.price - Price text (e.g., "Rs. 500")
   * @param {string} expected.quantity - Quantity (e.g., "1")
   * @param {string} expected.total - Total price (e.g., "Rs. 500")
   */
  async verifyProductInCart(productId, { description, price, quantity, total }) {
    const row = this.page.locator(`#product-${productId}`);

    await expect(row.locator('.cart_description h4 a')).toHaveText(description);
    await expect(row.locator('.cart_price p')).toHaveText(price);
    await expect(row.locator('.cart_quantity button')).toHaveText(quantity);
    await expect(row.locator('.cart_total p')).toHaveText(total);
  }

  async clearCart() {
    while ((await this.page.locator('tbody tr').count()) > 0) {
      await this.page.locator('a.cart_quantity_delete').first().click();
      await this.page.waitForTimeout(500);
    }

    await expect(this.page.locator('text=Cart is empty!')).toBeVisible({ timeout: 10000 });
  }

  async proceedToCheckout() {
    await this.page.click('text=Proceed To Checkout');
  }

  async verifyDeliveryAddress({ fullName, addressLines = [], cityStateZip, country, phone }) {
    const deliverySection = this.page.locator('#address_delivery');

    await expect(deliverySection).toBeVisible();

    await expect(deliverySection.locator('.address_firstname.address_lastname')).toHaveText(
      fullName
    );

    if (addressLines.length > 0) {
      const lineLocators = deliverySection.locator('.address_address1.address_address2');
      for (let i = 0; i < addressLines.length; i++) {
        await expect(lineLocators.nth(i)).toHaveText(addressLines[i]);
      }
    }

    await expect(
      deliverySection.locator('.address_city.address_state_name.address_postcode')
    ).toHaveText(cityStateZip);

    await expect(deliverySection.locator('.address_country_name')).toHaveText(country);

    await expect(deliverySection.locator('.address_phone')).toHaveText(phone);
  }

  async verifyBillingAddress({ fullName, addressLines = [], cityStateZip, country, phone }) {
    const billingSection = this.page.locator('#address_invoice');

    await expect(billingSection).toBeVisible();

    await expect(billingSection.locator('.address_firstname.address_lastname')).toHaveText(
      fullName
    );

    if (addressLines.length > 0) {
      const lineLocators = billingSection.locator('.address_address1.address_address2');
      for (let i = 0; i < addressLines.length; i++) {
        await expect(lineLocators.nth(i)).toHaveText(addressLines[i]);
      }
    }

    await expect(
      billingSection.locator('.address_city.address_state_name.address_postcode')
    ).toHaveText(cityStateZip);

    await expect(billingSection.locator('.address_country_name')).toHaveText(country);

    await expect(billingSection.locator('.address_phone')).toHaveText(phone);
  }

  async placeOrder() {
    await this.page.click('text=Place Order');
  }
}

export { CartPage };
