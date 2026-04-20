import { test, expect } from '@playwright/test';

test('Client App page _End to End', async ({browser, page}) => {
  //Page locators
  const username = page.locator ('#userEmail');
  const password = page.locator ('#userPassword');
  const signInBtn = page.locator ("[type='submit']");

  // User input data
  const url = 'https://rahulshettyacademy.com/client/#/auth/login';
  const username_input = 'santhiyavect@gmail.com';
  const password_input = 'Password@123';
  const productName = 'ZARA COAT 3';
  const CcNumber = '4542 9936 9297 2263';
  const CvvCode = '341';
  const expiry_Month = '05';
  const expiry_Date = '15';

  // Application fow
  await page.goto (url);
  await username.fill ('');
  await username.fill (username_input);
  await password.fill ('');
  await password.fill (password_input);
  await signInBtn.click ();

  console.log (await page.title ());
  await expect.toHaveTitle ("Let's Shop");

  await page.waitForLoadState ('networkidle'); // sometimes it is not workng so going with waitfor()
  // const products = page.locator('#products .card  .card-body h5 b');

  // selecting product from the listed products and adding to cart
  const products = page.locator ('#products .card  .card-body');
  await products.first ().waitFor ();
  const count = await products.count ();
  console.log (await products.allTextContents ());

  for (let i = 0; i < count; i++) {
    const title = await products.nth (i).locator ('b').textContent ();

    if (title === productName) {
      await products.nth (i).locator ('text=Add To Cart').click ();
      console.log (title + ' is added to Cart');
      break;
    }
  }

  //  Rahulshetty code for cart page validation
  //    to check if the added product zara coat is visibe on cart page

  //    from next line to until, page.pause commenting it
  await page.locator ("[routerlink*='cart']").click ();
  await page.locator ('div li').first ().waitFor ();

  const isProductVisible = await page
    .locator ("h3:has-text('Zara Coat 3')")
    .isVisible ();
  expect (isProductVisible).toBeTruthy ();
  console.log (isProductVisible, 'Product visible');

  // Validating the cart page
  /*const cartPage = page.locator("button[class='btn btn-custom'] i[class='fa fa-shopping-cart']"); // cart button css--> [routerlink*='cart']
  await cartPage.click();
  console.log(await page.locator("div[class='heading cf'] h1").textContent()); // prints My Cart in console

  await page.locator("div li").first().waitFor();  // to make it wait until the page is loaded with all the products listed.

const cart = page.locator("div[class='cart']")

 const cartCount =  await cart.count();

 for(let i=0; i< cartCount; i++)
  {
    const CardTitle= await cart.locator("div[class='cartSection'] h3").textContent();  

    if(CardTitle == productName)
    {

      const OrderId = await cart.locator("div[class='cartSection'] p").nth(i).textContent();
      console.log(OrderId + " is the Order for the product added to Cart");
      break;
    }

  } */

  // Validating the checkout page

  /*const checkoutButton = page.locator("li[class='totalRow'] button[type='button']"); //alternate css for checkout button is,("text=Checkout")
  await checkoutButton.textContent();
  console.log(await checkoutButton.textContent());
  await checkoutButton.click();

  await page.locator("//div[@class='payment']").waitFor();

  // payment method

  const paymentMethod = page.locator(".payment__type.payment__type--cc.active");
  const paymentMode= await paymentMethod.textContent();
  if(paymentMode == "Credit Crad")
  {
    // fill personal information
   const creditCardNumber =   page.locator('input[type="text"]');
   await creditCardNumber.fill("");
   await creditCardNumber.fill(CcNumber);

   const CvvCode_input = page.locator("text=CVV Code").locator("..").locator("input");
   const expiry_Date_input = page.locator("select.input.ddl").last();
   const expiry_Month_input = page.locator("select.input.ddl").first();

   await expiry_Date_input.selectOption(expiry_Date);
   console.log("expiry date is" + await expiry_Date_input.selectOption(expiry_Date));
   
    await expiry_Month_input.selectOption(expiry_Month);
     console.log("expiry Month  is" + await expiry_Month_input.selectOption(expiry_Month));

await CvvCode_input.fill(CvvCode);

await page.locator("text=Name on Card").locator("..").locator("input").fill("Santhiya");
await page.locator("text=Apply Coupon").locator("..").locator("input").fill("rahulshetty");
await page.getByRole('button', { name: 'Apply Coupon' }).click();

await page.locator(".user__name input").first().fill("");

await page.locator(".user__name input").first().fill("santhiyavect@gmail.com");
await page.getByPlaceholder("Select Country").pressSequentially("ind");
await page.locator(".ta-results button").filter({ hasText: "India" }).click();

await page.locator(".action__submit").click();
console.log("went to final page")
  }
*/

  //Rahulshetty checkout page
  const checkoutButton = page.locator ('text=Checkout').click ();

  const countryDropdown = page.locator ("[placeholder*='Country']");
  await countryDropdown.pressSequentially ('ind', {delay: 150}); //pres sequentially used when you need to type letters one by one
  const countryOptions = page.locator ('.ta-results');
  await countryOptions.waitFor ();
  const optionsCount = await countryOptions.locator ('button').count ();

  for (let i = 0; i < optionsCount; ++i) {
    const text = await countryOptions.locator ('button').nth (i).textContent ();
    if (text === ' India') {
      await countryOptions.locator ('button').nth (i).click ();
      break;
    }
  }
  expect (page.locator (".user__name [type='text']").first ()).toHaveText (
    username_input
  );
  //await page.locator ('.action__submit').click ();  (it should click submit after filling all the sections)

  // Fill the other information in the checkoutpage 

  const paymentMethod = page.locator (
    '.payment__type.payment__type--cc.active'
  );

  const creditParentDiv = page.locator('.form__cc');
  const paymentMode = await paymentMethod.textContent();
  if (paymentMode.includes('Credit Card')) {
    // fill personal information
    const creditCardNumber = creditParentDiv.locator ('input[type="text"]').first();
    await creditCardNumber.clear();
    await creditCardNumber.fill (CcNumber);

    console.log("inside credit card loop");
   

    const CvvCode_input = creditParentDiv
      .locator ('text=CVV Code')
      .locator ('..')
      .locator ('input');
   
    const expiry_Month_input = page.locator ('select.input.ddl').nth(0);
     const expiry_Date_input = page.locator ('select.input.ddl').nth(1);

    await expect(expiry_Month_input).toBeVisible();
    console.log(await expiry_Month_input.textContent());
await expiry_Month_input.selectOption({ label: expiry_Month });

    await expect(expiry_Date_input).toBeVisible();
await expiry_Date_input.selectOption({ label: expiry_Date });
 //page.pause();


    await expect(CvvCode_input).toBeVisible();
    await CvvCode_input.fill (CvvCode);
    console.log("CVV line executed")

    await page
      .locator ('text=Name on Card')
      .locator ('..')
      .locator ('input')
      .fill ('Santhiya');
      console.log(" Name filled");
  //   await page
  //     .locator ('text=Apply Coupon')
  //     .locator ('..')
  //     .locator ('input')
  //     .fill ('rahulshetty');
  //   await page.getByRole ('button', {name: 'Apply Coupon'}).click ();
   }


    await page.locator ('.action__submit').click ();
    console.log ('went to final page');

const orderConfirmation =  page.locator(".hero-primary");
 

 await expect(orderConfirmation).toHaveText(" Thankyou for the order. ");
 const OrderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
 console.log(OrderId);

 // clicking Order page button
 // await page.locator("[routerlink*='/dashboard/myorders']").first().click();
   await page.locator("button[routerlink*='/dashboard/myorders']").click();
   console.log("clicked Order id button");
   const orderTable = page.locator(".table tbody");
   await orderTable.waitFor();

  //const orderId_list = page.locator(".table tbody th");
 const orderId_list_rows = page.locator(".table tbody tr");

  const orderId_Count =  await orderId_list_rows.count();


  for(let i=0; i<orderId_Count; ++i)
  {
    const currentOrderId = await orderId_list_rows.nth(i).locator("th").textContent();

    if(OrderId.includes(currentOrderId))
    {
      console.log(currentOrderId + " : current order ID");
       console.log(OrderId + " : order ID");
       await orderId_list_rows.nth(i).locator("button").first().click();
       break;
   }

}
const orderIDDetails = await page.locator(".col-text").textContent();
 
  expect(OrderId.includes(orderIDDetails)).toBeTruthy();

});

 