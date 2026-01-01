import { test, expect } from '../helpers/auth.fixture.js';
import { Navigation } from '../pages/navigation.js';
import { HomePage } from '../pages/homepage.js';
import { ProductsPage } from '../pages/productspage.js';
import { CartPage } from '../pages/cart.js';
import { LoginPage } from '../pages/loginPage.js';

let navigation;
let homePage;
let productsPage;
let cartPage;
let loginPage;

test.describe('Registration - Login flow', () => {
  test.beforeEach(async ({ page }) => {
    navigation = new Navigation(page);
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    await page.goto('https://automationexercise.com/');
  });

  test('Register User', async ({ page }) => {
    await homePage.isVisible();
    await navigation.signUpLogin();
    await loginPage.verifyLoginFormIsVisible();
    await loginPage.verifySignupFormIsVisible();
    const generatedName = await loginPage.signup();
    await loginPage.fillAccountInformationForm({
      title: 'Mr',
      day: '10',
      month: '5',     // May
      year: '1985',
      firstName: 'John',
      lastName: 'Smith',
      company: 'QA Testing Ltd',
      address: '456 Elm Street',
      country: 'Canada',
      state: 'Ontario',
      city: 'Toronto',
      zipcode: 'M5V 2T6',
      mobile: '4165550198'
    });
    await loginPage.createAccount();
    await loginPage.continue();
    await loginPage.verifyLoggedInAs(generatedName);
    await navigation.deleteAccount();
    await loginPage.verifyAccountDeleted();
    await loginPage.continue();
  });
});

test.describe('Cart Testing', () => {
  test.beforeEach(async ({ authPage }) => {
    navigation = new Navigation(authPage);
    homePage = new HomePage(authPage);
    productsPage = new ProductsPage(authPage);
    cartPage = new CartPage(authPage);
  });

  test('Add product to cart', async ({ authPage }) => {
    await homePage.isVisible();
    await navigation.openProductsPage();
    await productsPage.isVisible();
    await productsPage.waitForProductsToLoad();
    await productsPage.hoverOverProduct(0);
    await productsPage.clickAddToCartForHoveredProduct(0);
    await productsPage.continueShopping();
    await productsPage.hoverOverProduct(1);
    await productsPage.clickAddToCartForHoveredProduct(1);
    await navigation.viewCart();
    await cartPage.verifyProductInCart(1, {
      description: 'Blue Top',
      price: 'Rs. 500',
      quantity: '1',
      total: 'Rs. 500'
    });
    await cartPage.verifyProductInCart(2, {
      description: 'Men Tshirt',
      price: 'Rs. 400',
      quantity: '1',
      total: 'Rs. 400'
    });
    await cartPage.clearCart();
  });

  test('Verify Product quantity in Cart', async ({ authPage }) => {
    await homePage.isVisible();
    await navigation.openProductsPage();
    await productsPage.isVisible();
    await productsPage.waitForProductsToLoad();
    await productsPage.hoverOverProduct(0);
    await productsPage.clickAddToCartForHoveredProduct(0);
    await productsPage.continueShopping();
    await productsPage.hoverOverProduct(0);
    await productsPage.clickAddToCartForHoveredProduct(0);
    await navigation.viewCart();
    await cartPage.verifyProductInCart(1, {
      description: 'Blue Top',
      price: 'Rs. 500',
      quantity: '2',
      total: 'Rs. 1000'
    });
    await cartPage.clearCart();
  });

});
