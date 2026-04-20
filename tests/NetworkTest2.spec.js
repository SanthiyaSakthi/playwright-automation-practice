import {test, expect} from '@playwright/test';

test ('Security test intercept', async({page}) => {
  //Page locators
  const username = page.locator ('#userEmail');
  const password = page.locator ('#userPassword');
  const signInBtn = page.locator ("[type='submit']");

  // User input data
  const url = 'https://rahulshettyacademy.com/client/#/auth/login';
  const username_input = 'santhiyavect@gmail.com';
  const password_input = 'Password@123';

  // Application fow
  await page.goto (url);
  await username.fill ('');
  await username.fill (username_input);
  await password.fill ('');
  await password.fill (password_input);
  await signInBtn.click ();

  console.log (await page.title ());
  await expect.toHaveTitle ("Let's Shop");

  await page.waitForLoadState ('networkidle');

  await page.locator ("button[routerlink*='/dashboard/myorders']").click ();
  console.log ('clicked Order id button');

  await page.route (
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
    route =>
      route.continue ({
        url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=62661f884b053f6765465b6',
      }) // route.continue() is used to continue the request without modifying it,
    //  but here we are modifying the url to get the order details of another order id
  );
  await page.locator ("button:has-text('View')").first ().click ();
  await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
});
