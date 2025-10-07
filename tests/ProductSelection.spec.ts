import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import credentials from '../data/credentials.json';
import { clickAddToCartForProduct } from '../utils/utils';

dotenv.config();

const baseUrl = process.env.BASE_URL as string;
const productName = 'Sauce Labs Backpack'; // You can parameterize this if needed

let loginPage: LoginPage;
let productPage: ProductsPage;
let user = credentials[0];

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  productPage = new ProductsPage(page);

  await loginPage.goto(baseUrl);
  await loginPage.login(user.username, user.password);
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({ path: `screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`, fullPage: true });
  }
  await page.close();
});

test('Validate product is getting selected', async ({ page }) => {
  // Validate product is visible
  const isVisible = await productPage.isProductVisible(productName);
  expect(isVisible, `Product "${productName}" should be visible after login`).toBeTruthy();

  // Click product and validate
  await productPage.getProductByName(productName).click();
  await expect(page.getByText(productName)).toBeVisible();

  // Add to cart and validate in cart
  await clickAddToCartForProduct(page, productName);
  await productPage.navigateToCart();
  await expect(page.getByText(productName)).toBeVisible();

  // Proceed to checkout
  await productPage.proceedToCheckout();
});
test('Validate product is not visible when it does not exist', async ({ page }) => {
    const nonExistentProductName = 'Non Existent Product';

    // Validate product is not visible
    const isVisible = await productPage.isProductVisible(nonExistentProductName);
    expect(isVisible, `Product "${nonExistentProductName}" should not be visible`).toBeFalsy();

    // Try to get the product element and expect it not to be present
    const productElement = await productPage.getProductByName(nonExistentProductName);
    expect(await productElement.count()).toBe(0);
});

test('Validate multiple products can be added to cart', async ({ page }) => {
    const productsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

    for (const name of productsToAdd) {
        const isVisible = await productPage.isProductVisible(name);
        expect(isVisible, `Product "${name}" should be visible`).toBeTruthy();
        await clickAddToCartForProduct(page, name);
    }

    await productPage.navigateToCart();

    for (const name of productsToAdd) {
        await expect(page.getByText(name)).toBeVisible();
    }

    await productPage.proceedToCheckout();      
    });

