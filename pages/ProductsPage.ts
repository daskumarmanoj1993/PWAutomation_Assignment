import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly productsCart: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByText('Swag Labs');
    this.productsCart = page.locator('[data-test="shopping-cart-link"]');
    this.checkoutButton = page.locator('[data-test="checkout"]')
  }
async validateHeading() {
    await this.heading.waitFor({ state: 'visible' });
    const text = await this.heading.textContent();
    return text === 'Swag Labs';
}
getProductByName(productName: string): Locator {
    return this.page
      .locator('[data-test="inventory-list"] div')
      .filter({ hasText: productName })
      .nth(1);
  }

  async isProductVisible(productName: string): Promise<boolean> {
    const product = this.getProductByName(productName);
    return await product.isVisible();
  }

  async navigateToCart() {
    await this.productsCart.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}