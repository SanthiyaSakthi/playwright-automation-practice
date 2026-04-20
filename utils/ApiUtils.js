import { expect } from '@playwright/test';

class ApiUtils {

  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }
// Method to get token by logging in with user credentials
  async getToken() {
    const loginResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/auth/login',
      {
        data: this.loginPayload,
      }
    );

    expect(loginResponse.ok()).toBeTruthy();

    const loginResponseJson = await loginResponse.json();
    console.log('Login response:', loginResponseJson);

    return loginResponseJson.token;
  }


// Method to create order and return token and orderId
  async createOrder(orderPayload) {
    const response = {};

    response.token = await this.getToken();

    // Create order
    const orderResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/order/create-order',
      {
        data: {
          orders: [
            {
              country: orderPayload.country,
              productOrderedId: orderPayload.productOrderedId,
            },
          ],
        },
        headers: {
          Authorization: response.token,
          'Content-Type': 'application/json',
        },
      }
    );

    const orderResponseJson = await orderResponse.json();

    console.log('Order response:', orderResponseJson);
    console.log('Order status:', orderResponse.status());

    expect(orderResponse.ok()).toBeTruthy();

    response.orderId = orderResponseJson.orders[0];

    return response;
  }
}

export default ApiUtils;