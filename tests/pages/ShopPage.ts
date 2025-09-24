import { Page } from '@playwright/test';
import BasePage from './BasePage';

export default class ShopPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async addPoloToCart() {
    await this.page.getByRole('link', { name: 'Add “Polo” to your cart' }).click();
  }

  async viewCart() {
    await this.page.getByTitle('View cart').click();
  }
}
