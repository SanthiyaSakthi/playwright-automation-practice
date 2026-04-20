import { test, expect } from "@playwright/test";
const emailAddress = "santhiya@eventhub.com";
const password = "Santhiya@123";

test("Assignment1", async({page})=>
{

await page.goto("https://eventhub.rahulshettyacademy.com/login");
await page.getByPlaceholder("you@email.com").fill(emailAddress);
await page.getByLabel("Password").fill(password);
await page.locator("#login-btn").click();
const browserEvent =  page.getByRole('link', { name: 'Browse Events →' });
await expect(browserEvent).toBeVisible();

  await page.getByRole('button', { name: 'Admin' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();
let title = `Test Event ${Date.now()}`;

  await page.getByTestId('event-title-input').fill(title);
  await page.locator("textarea[placeholder='Describe the event…']").fill(title +"'s Description");
  await page.getByLabel("City").fill("Coimbatore");
   await page.getByLabel("Venue").fill("Hotel Saro");

const futureDate = futureDateValue();

await page.getByLabel('Event Date & Time').fill(futureDate);

console.log("Event Date selected:", futureDate);
await page.getByLabel("Price ($)").fill("1000");
await page.getByPlaceholder("e.g. 500").fill("100");

await page.locator("#add-event-btn").click();
const toastMessage = page.getByText('Event created!');

await expect(toastMessage).toBeVisible()

// Event card and capture seats



});






// function to fill the future date value
function futureDateValue(daysToAdd = 5) {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2,'0');
  const day = String(date.getDate()).padStart(2,'0');

  const hours = String(Math.floor(Math.random()*23)).padStart(2,'0');
  const minutes = "00";

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}