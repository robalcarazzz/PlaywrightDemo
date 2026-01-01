import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  authPage: async ({ page }, use) => {
    await page.goto('https://automationexercise.com/');
    await expect(page).toHaveURL(/automationexercise.com/);

    await page.click('a[href="/login"]');
    await page.fill('input[data-qa="login-email"]', 'robalcaraz0512@gmail.com');
    await page.fill('input[data-qa="login-password"]', 'january2026');
    await page.click('button[data-qa="login-button"]');

    await use(page);
  }
});

export { expect };
