import { Page } from '@playwright/test';
import BasePage from './BasePage';

export default class OrderReceivedPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async getOrderNumber(): Promise<string> {
    const orderNumber = await this.page
      .locator('.woocommerce-order-overview__order strong')
      .innerText();
    return orderNumber.trim();
  }
}
