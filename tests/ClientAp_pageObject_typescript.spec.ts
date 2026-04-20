import { test, expect } from '@playwright/test';
//import { POManager } from '../pageobjects/POManager';
import POManager from '../pageobjects_ts/POManager.ts';
//JSON -> String --> js object
const dataSet = JSON.parse(JSON.stringify(require("../testdata/ClientAp_pageObject_TestData.json")));


test.only('Client App page _End to End', async ({ page }) => {
  //Page locators
  const username = page.locator('#userEmail');
  const password = page.locator('#userPassword');
  const signInBtn = page.locator("[type='submit']");


  //Page Object Implementation
  // Application fow
  
  const pomanager = new POManager(page);
  console.log(POManager + "POManager print:");

  const loginPage = pomanager.getLoginPage();
  await loginPage.goto();
  await loginPage.validLogin(dataSet.username_input, dataSet.password_input);

  //  // Wait for page to stabilize
  //   await page.waitForLoadState('load');

  //   console.log (await page.title());
  //   await expect(page).toHaveTitle("Let's Shop");


  const products = page.locator('#products .card  .card-body h5 b');

  // selecting product from the listed products and adding to cart
  const dashboardPage = pomanager.getDashboardPage();
  await dashboardPage.searchProduct(dataSet.productName);
  await dashboardPage.navigateToCart();

  const cartPage = pomanager.getCartPage();
  await cartPage.verifyProductDisplayed(dataSet.productName);
  await cartPage.checkout();

  //Rahulshetty checkout page

  const countryDropdown = page.locator("[placeholder*='Country']");
  await countryDropdown.pressSequentially('ind', { delay: 150 }); //pres sequentially used when you need to type letters one by one
  const countryOptions = page.locator('.ta-results');
  await countryOptions.waitFor();
  const optionsCount = await countryOptions.locator('button').count();

  for (let i = 0; i < optionsCount; ++i) {
    const text = await countryOptions.locator('button').nth(i).textContent();
    if (text === ' India') {
      await countryOptions.locator('button').nth(i).click();
      break;
    }
  }
  expect(page.locator(".user__name [type='text']").first()).toHaveText(
    dataSet.username_input
  );
  //await page.locator ('.action__submit').click ();  (it should click submit after filling all the sections)

  // Fill the other information in the checkoutpage 

  const paymentMethod = page.locator(
    '.payment__type.payment__type--cc.active'
  );

  const creditParentDiv = page.locator('.form__cc');
  let paymentMode: any;
   paymentMode = await paymentMethod.textContent();
  if (paymentMode.includes('Credit Card')) {
    // fill personal information
    const creditCardNumber = creditParentDiv.locator('input[type="text"]').first();
    await creditCardNumber.clear();
    await creditCardNumber.fill(dataSet.CcNumber);

    console.log("inside credit card loop");


    const CvvCode_input = creditParentDiv
      .locator('text=CVV Code')
      .locator('..')
      .locator('input');

    const expiry_Month_input = page.locator('select.input.ddl').nth(0);
    const expiry_Date_input = page.locator('select.input.ddl').nth(1);

    await expect(expiry_Month_input).toBeVisible();
    console.log(await expiry_Month_input.textContent());
    await expiry_Month_input.selectOption({ label: dataSet.expiry_Month });

    await expect(expiry_Date_input).toBeVisible();
    await expiry_Date_input.selectOption({ label: dataSet.expiry_Date });
    //page.pause();


    await expect(CvvCode_input).toBeVisible();
    await CvvCode_input.fill(dataSet.CvvCode);
    console.log("CVV line executed")

    await page
      .locator('text=Name on Card')
      .locator('..')
      .locator('input')
      .fill('Santhiya');
    console.log(" Name filled");
    //   await page
    //     .locator ('text=Apply Coupon')
    //     .locator ('..')
    //     .locator ('input')
    //     .fill ('rahulshetty');
    //   await page.getByRole ('button', {name: 'Apply Coupon'}).click ();
  }


  await page.locator('.action__submit').click();
  console.log('went to final page');

  const orderConfirmation = page.locator(".hero-primary");


  await expect(orderConfirmation).toHaveText(" Thankyou for the order. ");
  let orderId: any;
   orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);

  // clicking Order page button
  // await page.locator("[routerlink*='/dashboard/myorders']").first().click();
  await page.locator("button[routerlink*='/dashboard/myorders']").click();
  console.log("clicked Order id button");
  const orderTable = page.locator(".table tbody");
  await orderTable.waitFor();

  //const orderId_list = page.locator(".table tbody th");
  const orderId_list_rows = page.locator(".table tbody tr");

  const orderId_Count = await orderId_list_rows.count();


  for (let i = 0; i < orderId_Count; ++i) {
    const currentOrderId = await orderId_list_rows.nth(i).locator("th").textContent();

    if (orderId.includes(currentOrderId)) {
      console.log(currentOrderId + " : current order ID");
      console.log(orderId + " : order ID");
      await orderId_list_rows.nth(i).locator("button").first().click();
      break;
    }

  }
  const orderIDDetails = await page.locator(".col-text").textContent();

  expect(orderId.includes(orderIDDetails)).toBeTruthy();

});

