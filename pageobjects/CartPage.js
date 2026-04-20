import {expect } from '@playwright/test';
class CartPage
{
  constructor(page)
  {
    this.page = page;
    this.products = page.locator ('#products .card  .card-body');
    this.cart = page.locator ("[routerlink*='cart']");
    this.cartParentElement = page.locator ('div li');
    this.checkOutButton = page.locator ('text=Checkout');

  }

  async verifyProductDisplayed(productName)
  {
await this.cartParentElement.first().waitFor ();
const isProductVisible = 
     await this.getProductLocator(productName).isVisible ();

  expect (isProductVisible).toBeTruthy ();
  console.log (isProductVisible, 'Product visible');
  }

   getProductLocator(productName) // in this method async is not needed bcoz it should return a locator not a promise
  {
  //return this.page.locator("h3:has-text('" + productName + "')");
  return this.page.locator(`h3:has-text("${productName}")`);
  }

  async checkout()
    {
await  this.checkOutButton.click ();
    }
  
}
export default CartPage;