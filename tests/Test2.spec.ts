import { test, expect, Page } from '@playwright/test';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderReceivedPage from './pages/OrderReceivedPage';
import OrdersPage from './pages/OrdersPage';

test('Test 2 (POM)', async ({ page }) => {
    const home = new HomePage(page as Page);
    const account = new AccountPage(page as Page);
    const shop = new ShopPage(page as Page);
    const cart = new CartPage(page as Page);
    const checkout = new CheckoutPage(page as Page);
    const orderReceived = new OrderReceivedPage(page);
    const ordersPage = new OrdersPage(page);

    await home.goto('');
    await home.dismissCookies();

    // Login flow
    await home.goToMyAccount();
    await account.login('hello@2itesting.co.uk', '12iTestingProject');

    // Shop: add item, view cart, try coupons, remove item
    await home.goToShop();
    await shop.addPoloToCart();
    await shop.viewCart();

    // place order
    await cart.proceedToCheckout();
    await checkout.fillBillingDetails({
        firstName: 'Test',
        lastName: 'User',
        company: 'Edgewords',
        country: 'United Kingdom',
        streetAddress: '123 Test St',
        city: 'Testville',
        state: 'Testshire',
        postcode: 'TE57 1NG',
        phone: '01234567890',
        email: 'hello@2itesting.co.uk'
    });
    await checkout.placeOrder();
    
 // Capture order number from confirmation page
  const receivedOrderNumber = await orderReceived.getOrderNumber();

  // Navigate to My Account orders
  await page.goto('https://www.edgewordstraining.co.uk/demo-site/my-account/orders/');
  const accountOrderNumber = await ordersPage.getLatestOrderNumber();

  // Compare
  expect(receivedOrderNumber).toBe(accountOrderNumber);

});