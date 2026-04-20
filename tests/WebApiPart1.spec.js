import { test, expect, request } from '@playwright/test';
import ApiUtils from '../utils/ApiUtils';

const loginPayload = {
  userEmail: 'santhiyavect@gmail.com',
  userPassword: 'Password@123',
};

const orderPayload = {
  country: 'Cuba',
  productOrderedId: '6960eac0c941646b7a8b3e68',
};

const productName = 'ZARA COAT 3';

let token;
let orderId;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPayload);

  const response = await apiUtils.createOrder(orderPayload);

  token = response.token;
  orderId = response.orderId;

  console.log('Token:', token);
  console.log('Order Id:', orderId);
});

test('Skip the loginpage through setting api token in window local storage', async ({
  page,
}) => {
  await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, token);

  await page.goto('https://rahulshettyacademy.com/client');

  await expect(page).toHaveTitle("Let's Shop");

  await page.waitForLoadState('networkidle');

  const products = page.locator('#products .card-body');
  await products.first().waitFor();

  const count = await products.count();

  for (let i = 0; i < count; i++) {
    const title = await products.nth(i).locator('b').textContent();

    if (title?.trim() === productName) {
      await products.nth(i).locator('text=Add To Cart').click();
      console.log(`${productName} added to cart`);
      break;
    }
  } 

  await page.locator("[routerlink*='myorders']").click();

  const rows = page.locator('tbody tr');
  await rows.first().waitFor();

  const rowCount = await rows.count();

  for (let i = 0; i < rowCount; i++) {
    const currentOrderId = await rows.nth(i).locator('th').textContent();

    if (orderId.includes(currentOrderId.trim())) {
      await rows.nth(i).locator('button').first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator('.col-text').textContent();
  console.log('Expected Order Id:', orderId);
console.log('Actual Order Id text:', orderIdDetails);

expect(orderIdDetails.trim()).toContain(orderId);

  //expect(orderId.includes(orderIdDetails.trim())).toBeTruthy();
});



