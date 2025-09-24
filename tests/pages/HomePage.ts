import { Page } from '@playwright/test';
import BasePage from './BasePage';

export default class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async dismissCookies() {
    // Dismiss may not always be present; guard with isVisible
    const dismiss = this.page.getByRole('link', { name: ' Dismiss' });
    if (await dismiss.count() > 0) await dismiss.first().click();
  }

  async goToMyAccount() {
    await this.page.locator('#menu-item-46').getByRole('link', { name: 'My account' }).click();
  }

  async goToShop() {
    await this.page.locator('#menu-item-43').getByRole('link', { name: 'Shop' }).click();
  }
}
