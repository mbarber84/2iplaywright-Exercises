import { Page } from '@playwright/test';
import BasePage from './BasePage';

export default class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async applyCoupon(code: string) {
    const coupon = this.page.getByRole('textbox', { name: 'Coupon:' });
    await coupon.fill(code);
    await this.page.getByRole('button', { name: 'Apply coupon' }).click();
  }

  async removeItem() {
    // Try the [Remove] link, then fallback to 'Remove this item'
    const removeLink = this.page.getByRole('link', { name: '[Remove]' });
    if (await removeLink.count() > 0) {
      await removeLink.first().click();
      return;
    }
    const removeText = this.page.getByRole('link', { name: 'Remove this item' });
    if (await removeText.count() > 0) await removeText.first().click();
  }
    async proceedToCheckout() {
    await this.page.getByRole('link', { name: 'Proceed to checkout' }).click();
    }
}
