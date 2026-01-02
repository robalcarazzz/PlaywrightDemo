import { test, expect } from '../helpers/auth.fixture.js';
import { Navigation } from '../pages/navigation.js';
import { HomePage } from '../pages/homepage.js';
import { ProductsPage } from '../pages/productspage.js';
import { CartPage } from '../pages/cart.js';
import { LoginPage } from '../pages/loginPage.js';
import { Payment } from '../pages/payment.js';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

let navigation;
let homePage;
let productsPage;
let cartPage;
let loginPage;
let payment;

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
      month: '5', // May
      year: '1985',
      firstName: 'John',
      lastName: 'Smith',
      company: 'QA Testing Ltd',
      address: '456 Elm Street',
      country: 'Canada',
      state: 'Ontario',
      city: 'Toronto',
      zipcode: 'M5V 2T6',
      mobile: '4165550198',
    });
    await loginPage.createAccount();
    await loginPage.continue();
    await loginPage.verifyLoggedInAs(generatedName);
    await navigation.deleteAccount();
    await loginPage.verifyAccountDeleted();
    await loginPage.continue();
  });

  test('Login User with incorrect email and password', async ({ page }) => {
    await homePage.isVisible();
    await navigation.signUpLogin();
    await loginPage.verifyLoginFormIsVisible();
    await loginPage.login('invalidemail@gmail.com', 'invalidpassword');
    await loginPage.verifyInvalidLoginError();
  });

  test('Logout User', async ({ page }) => {
    const email = process.env.LOGIN_EMAIL;
    const password = process.env.LOGIN_PASSWORD;
    await homePage.isVisible();
    await navigation.signUpLogin();
    await loginPage.verifyLoginFormIsVisible();
    await loginPage.login(email, password);
    await loginPage.logout();
    await navigation.isOnLoginPage();
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
      total: 'Rs. 500',
    });
    await cartPage.verifyProductInCart(2, {
      description: 'Men Tshirt',
      price: 'Rs. 400',
      quantity: '1',
      total: 'Rs. 400',
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
      total: 'Rs. 1000',
    });
    await cartPage.clearCart();
  });
});

test.describe('Place Order', () => {
  test.beforeEach(async ({ authPage }) => {
    navigation = new Navigation(authPage);
    homePage = new HomePage(authPage);
    productsPage = new ProductsPage(authPage);
    cartPage = new CartPage(authPage);
    payment = new Payment(authPage);
  });

  test('Pay and Confirm order', async ({ authPage }) => {
    const card_name = process.env.CARD_NAME;
    const card_number = process.env.CARD_NUMBER;
    const card_cvc = process.env.CARD_CVC;
    const card_expiry_month = process.env.CARD_EXPIRY_MONTH;
    const card_expiry_year = process.env.CARD_EXPIRY_YEAR;
    await homePage.isVisible();
    await navigation.openProductsPage();
    await productsPage.isVisible();
    await productsPage.waitForProductsToLoad();
    await productsPage.hoverOverProduct(0);
    await productsPage.clickAddToCartForHoveredProduct(0);
    await navigation.viewCart();
    await cartPage.proceedToCheckout();
    await cartPage.verifyDeliveryAddress({
      fullName: 'Mr. Rob Alcaraz',
      addressLines: ['Playwright', 'Main Address', 'Address 2'],
      cityStateZip: 'City State Zipcode',
      country: 'Canada',
      phone: '09000000000',
    });
    await cartPage.verifyBillingAddress({
      fullName: 'Mr. Rob Alcaraz',
      addressLines: ['Playwright', 'Main Address', 'Address 2'],
      cityStateZip: 'City State Zipcode',
      country: 'Canada',
      phone: '09000000000',
    });
    await cartPage.placeOrder();
    await payment.fillPaymentForm({
      nameOnCard: card_name,
      cardNumber: card_number,
      cvc: card_cvc,
      expiryMonth: card_expiry_month,
      expiryYear: card_expiry_year,
    });
    await payment.pay();
    await payment.verifyOrderPlaced();
  });
});
