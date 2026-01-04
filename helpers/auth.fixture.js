import { test as base, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const email = process.env.LOGIN_EMAIL?.trim();
const password = process.env.LOGIN_PASSWORD?.trim();

if (!email || !password) {
  throw new Error('LOGIN_EMAIL and LOGIN_PASSWORD must be defined in .env file');
}

export const test = base.extend({
  authPage: async ({ page }, use) => {
    await page.goto('https://automationexercise.com/');
    await expect(page).toHaveURL(/automationexercise\.com\/$/);

    await page.click('a[href="/login"]');
    await page.fill('[data-qa="login-email"]', email);
    await page.fill('[data-qa="login-password"]', password);
    await page.click('[data-qa="login-button"]');

    await expect(page.locator('a i.fa.fa-user').locator('..')).toContainText('Logged in as');

    await use(page);
  },
});

export { expect };
