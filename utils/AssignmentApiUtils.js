import {expect,request} from '@playwright/test';

class AssignmentApiUtils {
  constructor (page, apiContext) {
    
    this.page = page;
    this.apiContext = apiContext;
  }

// This is for Assignment 1 - Method to login and go to events page by filling the login form
//  and clicking on the browse events link
  async loginAndGoToEvents (username, password) {

    await this.page.goto ('https://eventhub.rahulshettyacademy.com/login');
    await this.page.getByPlaceholder ('you@email.com').fill (username);
    await this.page.getByLabel ('Password').fill (password);
    await this.page.locator ('#login-btn').click ();
    const browserEvent = this.page.getByRole ('link', {
      name: 'Browse Events →',
    });
    await expect (browserEvent).toBeVisible ();

    await this.page.getByRole ('button', {name: 'Events'}).click ();
  }

  //Assignment 2 - Method to create a booking by making a POST request to the API with the required payload and return the booking id
  //Method to get the token by logging in with user credentials - Yahoo email and password

  async getToken (yahooUser) {
    const loginResponse = await this.apiContext.post (
      'https://api.eventhub.rahulshettyacademy.com/api/auth/login',
      {
        data: yahooUser,
      }
    );
    console.log(await loginResponse.status());
     console.log(await loginResponse.text());

    expect (loginResponse.ok ()).toBeTruthy ();
    

    const loginResponseJson = await loginResponse.json ();
    console.log ('Login response:', loginResponseJson);

    return loginResponseJson.token;
  }

  
  // Step 2: Fetch Events via API to get a valid event id for creating a booking
  async getEventResponse(token) {
    const eventsRes = await this.apiContext.get (
      'https://api.eventhub.rahulshettyacademy.com/api/events',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return eventsRes;
    // const eventsJson = await eventsRes.json ();
    // return eventsJson.data[0].id;
  }


  // Step 3 — Create a booking via API as Yahoo user and validate the response
  // Method to create a booking by making a POST request to the API with the required payload and return the booking id
  async createBooking(token, eventId) {
    const bookingPayload = {
      eventId: eventId,
      customerName : 'Santhiya Sakthi',
      customerEmail : 'iamsandysakthi@yahoo.com',
      customerPhone : '1234567890',
      quantity : 1
    };

    const bookingRes = await this.apiContext.post (
      'https://api.eventhub.rahulshettyacademy.com/api/bookings',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: bookingPayload,
      }
    );

    return bookingRes;

  }

// Step 4 — Login as Gmail user via browser UI

// Call your loginAs(page, GMAIL_USER) helper  -- Login as Gmail user via browser UI

  async loginAsGmailUser(gmailUser) {
    await this.page.goto ('https://eventhub.rahulshettyacademy.com/login');
    await this.page.getByPlaceholder ('you@email.com').fill (gmailUser.email);
    await this.page.getByLabel ('Password').fill (gmailUser.password);
    await this.page.locator ('#login-btn').click ();
   const browserEvent = this.page.getByRole ('link', {
      name: 'Browse Events →',
    });
    await expect (browserEvent).toBeVisible ();
    }
}

export default AssignmentApiUtils;
