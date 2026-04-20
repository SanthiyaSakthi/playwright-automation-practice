class DashboardPage
{
  constructor(page)
  {
    this.page = page;
    this.products = page.locator ('#products .card  .card-body');
    this.cart = page.locator ("[routerlink*='cart']");


  }
  async searchProduct(productName)
  {
    //const products = page.locator ('#products .card  .card-body');
      await this.products.first ().waitFor ();
      const count = await this.products.count ();
      console.log (await this.products.allTextContents ());
    
      for (let i = 0; i < count; i++) {
        const title = await this.products.nth (i).locator ('b').textContent ();
        // adding the product to the cart
    
        if (title === productName) {
          await this.products.nth (i).locator ('text=Add To Cart').click ();
          console.log (title + ' is added to Cart');
          break;
        }
      }
    
  }

  async navigateToCart()
  {
     await  this.cart.click ();
  }
}
export default DashboardPage;