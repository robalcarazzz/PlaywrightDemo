import { test as base, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

export const test = base.extend({
  authPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://automationexercise.com/');
    await expect(page).toHaveURL(/automationexercise\.com\/$/);

    const email = process.env.LOGIN_EMAIL;
    const password = process.env.LOGIN_PASSWORD;

    if (!email || !password) {
      throw new Error('LOGIN_EMAIL and LOGIN_PASSWORD must be set in .env file');
    }

    await page.click('a[href="/login"]');
    await page.fill('[data-qa="login-email"]', email);
    await page.fill('[data-qa="login-password"]', password);
    await page.click('[data-qa="login-button"]');

    await expect(page.locator('a i.fa.fa-user').locator('..')).toContainText('Logged in as');
    await use(page);

    await context.close();
  },
});

export { expect };

