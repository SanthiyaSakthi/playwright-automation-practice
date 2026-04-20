import { test, expect } from "@playwright/test";

test("Pop up Validations", async({page})=>
{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
// await page.goto("http://www.google.com");
// await page.goBack();
// await page.goForward();

await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden(); // checking if the element is hidden
//page.pause();
page.on('dialog', dialog => dialog.accept()); // to click confirm on the alert box
await page.locator("#confirmbtn").click();
await page.locator("#mousehover").hover();

const framesPage = page.frameLocator("#courses-iframe");

await framesPage.locator("li a[href*='lifetime-access']:visible").click(); //when one hidden and visible, it selects the visible element
console.log("locator clicked");
//const textcheck = await framesPage.locator(".text h2").textContent();
const textcheck = await framesPage.locator(".text h2").innerText();
 console.log(textcheck.split("")[1]);



 
}) 

test("screenhots and visual comparision", async({page})=>
{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#displayed-text").screenshot({path: 'partialElement.png'});
await page.locator("#hide-textbox").click();
await page.screenshot({path: 'screenshot.png'});
await expect(page.locator("#displayed-text")).toBeHidden();

});

// visual testing
test("visual testing", async({page})=>
{
 await page.goto("https:www.google.com");
 expect(await page.screenshot()).toMatchSnapshot('landing.png');

})