import { test, expect, request} from '@playwright/test';

const loginPayload = {
  userEmail: 'santhiyavect@gmail.com',
  userPassword: 'Password@123',
};

const orderPayload = {orders: [
  { country: 'Indonesia', productOrderedId: '6960eac0c941646b7a8b3e68' }
]}; // copied from the network tab in devtools for create order API call, we need to pass the product id in the payload to create the order for that product, we can get the product id from the response of the get products API call 

let token;
let orderId;

test.beforeAll ( async() => {
  const apiContext = await request.newContext ();
  const loginResponse = await apiContext.post (
    'https://rahulshettyacademy.com/api/ecom/auth/login',
    {
      data: loginPayload,
    }
  );
 // expect (loginResponse.status ()).toBe (200);
  expect (loginResponse.ok()).toBeTruthy ();
  const loginResponseJson = await loginResponse.json ();
  console.log (loginResponseJson);
   token = loginResponseJson.token;
  console.log (token);

  //create order API call to get the order ID for validating in the api call for creating order

 const orderResponse = await apiContext.post (
    'https://rahulshettyacademy.com/api/ecom/order/create-order',
    {
      data: orderPayload,
      headers: {
       'Authorization': token,
        'Content-Type': 'application/json',
      },
    }
  );

  const orderResponseJson = await orderResponse.json ();
  console.log (orderResponseJson);
   orderId = orderResponseJson.orders[0];
  console.log (orderId);
});


test('Client App page _End to End', async ({browser, page}) => {

page.addInitScript(value => {
  window.localStorage.setItem('token', value);
}, token); // this takes 2 arguments, first one is the function which will be executed in the browser context and second one is the value which we want to pass to that function
  


 
   const url = 'https://rahulshettyacademy.com/client';
 

await page.goto (url);
  console.log (await page.title ());
  await expect.toHaveTitle ("Let's Shop");

  await page.waitForLoadState ('networkidle'); 
  

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

    if(orderId.includes(currentOrderId))
    {
      console.log(currentOrderId + " : current order ID");
       console.log(orderId + " : order ID");
       await orderId_list_rows.nth(i).locator("button").first().click();
       break;
   }

}
const orderIDDetails = await page.locator(".col-text").textContent();
 
  expect(orderId.includes(orderIDDetails)).toBeTruthy();

});

 