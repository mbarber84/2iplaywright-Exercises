import { Page } from '@playwright/test';
import BasePage from './BasePage';

export default class AccountPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string) {
    await this.page.getByRole('textbox', { name: 'Username or email address\u00A0*' }).fill(username);
    await this.page.locator('#password').fill(password);
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }

  async logout() {
    await this.page.getByRole('link', { name: ' Logout' }).click();
  }
}
