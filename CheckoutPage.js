// pages/CheckoutPage.js
class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.emailInput = '#email';
    this.addressInput = '#address';
    this.continueButton = 'button:has-text("Continue to Payment")';
  }
  
  async fillShippingDetails(customerData) {
    await this.page.fill(this.emailInput, customerData.email);
    await this.page.fill(this.addressInput, customerData.address);
    // ... more fields
  }
  
  async continueToPayment() {
    await this.page.click(this.continueButton);
  }
}

module.exports = { CheckoutPage };
