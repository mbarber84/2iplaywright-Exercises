import { Page } from '@playwright/test';
import BasePage from './BasePage';

export default class OrdersPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async getLatestOrderNumber(): Promise<string> {
    const orderNumber = await this.page
      .locator('a[href*="view-order"]') // first order link
      .first()
      .innerText();

    return orderNumber.replace('#', '').trim(); // remove #
  }
}
