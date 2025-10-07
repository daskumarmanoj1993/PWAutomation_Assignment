import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { LoginPage } from '../pages/LoginPage';
import credentials from '../data/credentials.json';
import { ProductsPage } from '../pages/ProductsPage';

dotenv.config();

const baseUrl = process.env.BASE_URL as string;

test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({ path: `screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`, fullPage: true });
    }
    await page.close();
  });

  for (const user of credentials) {
    test(`Validate login for accepted user: ${user.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productPage = new ProductsPage(page);

      await expect(loginPage.heading).toBeVisible();
      await loginPage.login(user.username, user.password);
      expect(await productPage.validateHeading()).toBeTruthy();
    });

    test(`Validate login error messages for user: ${user.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await expect(loginPage.heading).toBeVisible();

      const errorCases = [
        { username: '', password: user.password, expected: 'Epic sadface: Username is required' },
        { username: user.username, password: '', expected: 'Epic sadface: Password is required' },
        { username: '', password: '', expected: 'Epic sadface: Username is required' },
        { username: user.username, password: 'WrongPassword', expected: 'Epic sadface: Username and password do not match any user in this service' },
        { username: 'WrongUser', password: user.password, expected: 'Epic sadface: Username and password do not match any user in this service' }
      ];

      for (const { username, password, expected } of errorCases) {
        await loginPage.login(username, password);
        expect(await loginPage.getErrorMessage()).toBe(expected);
      }
    });
  }
});