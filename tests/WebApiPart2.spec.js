import {test, expect} from '@playwright/test';
let webContext;

test.beforeAll (async ({browser}) => {
  const context = await browser.newContext ();
  const page = await context.newPage ();

  // User input data
  const url = 'https://rahulshettyacademy.com/client/#/auth/login';
  const username_input = 'santhiyavect@gmail.com';
  const password_input = 'Password@123';
  //Page locators
  const username = page.locator ('#userEmail');
  const password = page.locator ('#userPassword');
  const signInBtn = page.locator ("[type='submit']");

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
  await context.storageState ({path: 'state.json'}); // this will save the state of the browser after login,
  // so that we can use it in other tests without login again
  webContext = await browser.newContext ({storageState: 'state.json'}); // this will create a new context with the saved state,
  //  so that we can use it in other tests without login again
});

test ('Test 1: Client App with storage state -- added to cart', async () => {
  // User input data
  const url = 'https://rahulshettyacademy.com/client/#/auth/login';
  const username_input = 'santhiyavect@gmail.com';
  const password_input = 'Password@123';
  const productName = 'ZARA COAT 3';
  const CcNumber = '4542 9936 9297 2263';
  const CvvCode = '341';
  const expiry_Month = '05';
  const expiry_Date = '15';

  // launching the application with the logged in state
  const page = await webContext.newPage ();
  await page.goto (url);

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
  await page.locator ("[routerlink*='cart']").click ();
  await page.locator ('div li').first ().waitFor ();

  const isProductVisible = await page
    .locator ("h3:has-text('Zara Coat 3')")
    .isVisible ();
  expect (isProductVisible).toBeTruthy ();
  console.log (isProductVisible, 'Product visible');
});

test ('Test 2: Client App with storage state- print product list ', async () => {
  // User input data
  const url = 'https://rahulshettyacademy.com/client/#/auth/login';
  const username_input = 'santhiyavect@gmail.com';
  const password_input = 'Password@123';
  const productName = 'ZARA COAT 3';
  const CcNumber = '4542 9936 9297 2263';
  const CvvCode = '341';
  const expiry_Month = '05';
  const expiry_Date = '15';

  // launching the application with the logged in state
  const page = await webContext.newPage ();
  await page.goto (url);
  
  // selecting product from the listed products and adding to cart
  const products = page.locator ('#products .card  .card-body');
  await products.first ().waitFor ();
  const count = await products.count ();
  console.log (await products.allTextContents ());
});
