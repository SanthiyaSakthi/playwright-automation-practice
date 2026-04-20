import {test, expect, request} from '@playwright/test';
import ApiUtils from '../utils/ApiUtils';

// intercepting response --Api response --{playwright fake response} --> browser renders the page based on the fake response

const loginPayload = {
  // userEmail: 'santhiyavect@gmail.com',
  //userPassword: 'Password@123',
  // below data is set to tets the "No orders" message scenario in Orders page
  userEmail: 'sakthi123@gmail.com',
  userPassword: 'Sakthi@123',
};

const orderPayload = {
  country: 'Cuba',
  productOrderedId: '6960eac0c941646b7a8b3e68',
};

const productName = 'ZARA COAT 3';

const fakePayLoadOrders = {data: [], message: 'No Orders'};

let token;
let orderId;

test.beforeAll (async () => {
  const apiContext = await request.newContext ();
  const apiUtils = new ApiUtils (apiContext, loginPayload);

  const response = await apiUtils.createOrder (orderPayload);

  token = response.token;
  orderId = response.orderId;

  console.log ('Token:', token);
  console.log ('Order Id:', orderId);
});

test ('Skip the loginpage through setting api token in window local storage', async ({
  page,
}) => {
  await page.addInitScript (value => {
    window.localStorage.setItem ('token', value);
  }, token);

  await page.goto ('https://rahulshettyacademy.com/client');

  await page.route (
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
    async route => {
      // *Intercept the API response and modify it */

      // request helps to convert the page to API request and fetch helps to get the response of that API request
      const response = await page.request.fetch (route.request ());
      const body = JSON.stringify (fakePayLoadOrders); // converting the fake payload (javascript object) to string because the response body is in string format

      // fulfill method is used to send the modified response back to the page
      route.fulfill ({
        response,
        body,
      });
    }
  );

  await page.locator ("button[routerlink*='/dashboard/myorders']").click ();
  await page.waitForResponse ('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');
 
  console.log (await page.locator ('.mt-4').textContent ());
});
