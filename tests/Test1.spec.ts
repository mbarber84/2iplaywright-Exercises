import { test, expect, Page } from '@playwright/test';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';

test('Test 1 Apply Discount Coupons Codes (POM)', async ({ page }) => {
    const home = new HomePage(page as Page);
    const account = new AccountPage(page as Page);
    const shop = new ShopPage(page as Page);
    const cart = new CartPage(page as Page);

    await home.goto('');
    await home.dismissCookies();

    // Login flow
    await home.goToMyAccount();
    await account.login('hello@2itesting.co.uk', '12iTestingProject');

    // Shop: add item, view cart, try coupons, remove item
    await home.goToShop();
    await shop.addPoloToCart();
    await shop.viewCart();

    // Try first coupon
    await cart.applyCoupon('Edgewords');
    // Remove item
    await cart.removeItem();

    // Add again and try second coupon
    await home.goToShop();
    await shop.addPoloToCart();
    await shop.viewCart();
    await cart.applyCoupon('2idiscount');
    await cart.removeItem();

    // Logout
    await home.goToMyAccount();
    await account.logout();
});