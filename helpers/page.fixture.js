import { test as base } from '@playwright/test';
import { HomePage } from '../pages/homepage.js';
import { Products } from '../pages/productspage.js';
import { Navigation } from '../pages/navigation.js';
import { CartPage } from '../pages/cart.js';
import { LoginPage } from '../pages/loginPage.js';
import { Payment } from '../pages/payment.js';

const pageClasses = {
  homePage: HomePage,
  productsPage: Products,
  navigation: Navigation,
  cartPage: CartPage,
  loginPage: LoginPage,
  payment: Payment,
};

export const test = base.extend({
  pageObjects: async ({ page }, use) => {
    const pageObjects = Object.fromEntries(
      Object.entries(pageClasses).map(([key, PageClass]) => [key, new PageClass(page)])
    );
    await use(pageObjects);
  },
});

Object.entries(pageClasses).forEach(([name, _]) => {
  test[name] = async ({ pageObjects }, use) => await use(pageObjects[name]);
});

export { expect } from '@playwright/test';
