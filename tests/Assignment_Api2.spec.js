import { test, expect, request } from '@playwright/test';
import AssignmentApiUtils from "../utils/AssignmentApiUtils";



const BASE_URL = "https://eventhub.rahulshettyacademy.com";

//const API_URL = BASE_URL + "/api" ;

const yahooUser = {
  email: "iamsandysakthi@yahoo.com",
  password:"Santhiya@123"
};

const gmailUser = {
  email: "iamsandysakthi@gmail.com",
  password:"Santhiya@123"
};


test('Assignment 2 - Validate User restriction for booking details API', async ({ page }) => {

  //get the token by logging in with yahoo user credentials
  const apiContext = await request.newContext();

const assignmentApiUtils = new AssignmentApiUtils( page, apiContext);
const token = await assignmentApiUtils.getToken(yahooUser);

// Make API call to get events and validate the response
const eventsRes = await assignmentApiUtils.getEventResponse(token);

expect(eventsRes.ok()).toBeTruthy();

const eventsJson = await eventsRes.json();
console.log('Events response:', JSON.stringify(eventsJson, null, 2));

const eventId = eventsJson.data[0].id;

console.log('Event ID:', eventId);


// Step 3 — Create a booking via API as Yahoo user and validate the response and get the booking id

const bookingRes = await assignmentApiUtils.createBooking(token, eventId);
expect(bookingRes.ok()).toBeTruthy();

const bookingJson = await bookingRes.json();
console.log('Booking response:', JSON.stringify(bookingJson, null, 2)); 
// prints the booking response in a formatted way for better readability

const bookingId = bookingJson?.data?.id;

if (!bookingId) {
  throw new Error("Booking ID not found. Response: " + JSON.stringify(bookingJson));
}

console.log('Booking ID:', bookingId);

// Step 4 - Step 4 — Login as Gmail user via browser UI and validate that the booking created by
//  Yahoo user is not visible in the UI

await page.context().clearCookies();
await assignmentApiUtils.loginAsGmailUser(gmailUser);

// Step 5 — Navigate to Yahoo's booking URL as Gmail user

await page.goto(`${BASE_URL}/bookings/${bookingId}`, {
  waitUntil: 'networkidle'
});

// Step 6 — Validate that the booking details are not visible to Gmail user and appropriate error message is displayed
//- Assert text Access Denied is visible and Assert text You are not authorized to view this booking is visible

await expect(page.getByText(/Access Denied/i)).toBeVisible();

await expect(
  page.getByText(/You are not authorized to view this booking/i)
).toBeVisible();


});

