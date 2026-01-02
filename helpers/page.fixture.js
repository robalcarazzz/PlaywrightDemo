import { test as base } from '@playwright/test';
import { HomePage } from '../pages/homepage.js';
import { Products } from '../pages/productspage.js';
import { Navigation } from '../pages/navigation.js';
import { CartPage } from '../pages/cart.js';
import { LoginPage } from '../pages/loginPage.js';
import { Payment } from '../pages/payment.js';

function createPageObjects(page) {
  return {
    homePage: new HomePage(page),
    productsPage: new Products(page),
    navigation: new Navigation(page),
    cartPage: new CartPage(page),
    loginPage: new LoginPage(page),
    payment: new Payment(page),
  };
}
export const test = base.extend({
  homePage: async ({ page }, use) => {
    const pageObjects = createPageObjects(page);
    await use(pageObjects.homePage);
  },
  productsPage: async ({ page }, use) => {
    const pageObjects = createPageObjects(page);
    await use(pageObjects.productsPage);
  },
  navigation: async ({ page }, use) => {
    const pageObjects = createPageObjects(page);
    await use(pageObjects.navigation);
  },
  cartPage: async ({ page }, use) => {
    const pageObjects = createPageObjects(page);
    await use(pageObjects.cartPage);
  },
  loginPage: async ({ page }, use) => {
    const pageObjects = createPageObjects(page);
    await use(pageObjects.loginPage);
  },
  payment: async ({ page }, use) => {
    const pageObjects = createPageObjects(page);
    await use(pageObjects.payment);
  },
});

export { test };
