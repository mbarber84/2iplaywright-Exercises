import { Page } from '@playwright/test';
import BasePage from './BasePage';

export default class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async fillBillingDetails(details: {
    firstName: string;
    lastName: string;
    company: string;
    country: string;
    streetAddress: string;
    city: string;
    state: string;
    postcode: string;
    phone: string;
    email: string;
}) {
    await this.page.locator('#billing_first_name').fill(details.firstName);
    await this.page.locator('#billing_last_name').fill(details.lastName);
    await this.page.locator('#billing_company').fill(details.company);
    await this.page.evaluate(country => {
  const container = document.querySelector('#select2-billing_country-container');
  if (container) (container as HTMLElement).textContent = country;
}, details.country);
    await this.page.locator('#billing_address_1').fill(details.streetAddress);
    await this.page.locator('#billing_city').fill(details.city);
    await this.page.locator('#billing_state').fill(details.state);
    await this.page.locator('#billing_postcode').fill(details.postcode);
    await this.page.locator('#billing_phone').fill(details.phone);
    await this.page.locator('#billing_email').fill(details.email);
}
    async placeOrder() {
        await this.page.getByRole('button', { name: 'Place order' }).click();
    }

}