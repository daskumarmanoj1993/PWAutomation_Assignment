import { expect, Page } from '@playwright/test';

export async function clickButtonByName(page: Page, buttonName: string): Promise<void> {
  const button = page.getByRole('button', { name: buttonName });
  await expect(button).toBeVisible();
  await button.click();
}

export async function clickAddToCartForProduct(page: Page, productName: string): Promise<void> {
  const productCard = page.locator('[data-test="inventory-list"] div').filter({ hasText: productName }).first();
  const addToCartButton = productCard.getByRole('button', { name: 'Add to cart' });
  await addToCartButton.click();
}