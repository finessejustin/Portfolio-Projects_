// tests/checkout.spec.js
const { test, expect } = require('@playwright/test');

test.describe('E-Commerce Checkout Flow', () => {
  test('Complete purchase with card payment', async ({ page }) => {
    // Navigate to product
    await page.goto('https://demo-store.com/product/headphones');
    
    // Add to cart
    await page.click('button:has-text("Add to Cart")');
    await expect(page.locator('.cart-count')).toHaveText('1');
    
    // Go to cart
    await page.click('a[href="/cart"]');
    
    // Checkout
    await page.click('button:has-text("Checkout")');
    
    // Fill shipping
    await page.fill('#email', 'test@example.com');
    await page.fill('#fullname', 'John Doe');
    await page.fill('#address', '123 Lagos Street');
    await page.selectOption('#country', 'NG');
    
    // Continue to payment
    await page.click('button:has-text("Continue to Payment")');
    
    // Handle Paystack iframe
    const paymentFrame = page.frameLocator('iframe[src*="paystack"]');
    await paymentFrame.fill('input[name="cardnumber"]', '4084084084084081');
    await paymentFrame.fill('input[name="expirydate"]', '12/25');
    await paymentFrame.fill('input[name="cvv"]', '123');
    await paymentFrame.click('button:has-text("Pay")');
    
    // Verify success
    await page.waitForURL('**/confirmation/**');
    await expect(page.locator('.success-message')).toBeVisible();
  });
});
