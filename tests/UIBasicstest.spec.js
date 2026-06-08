const {test, expect} = require('@playwright/test')

test.only("Browser context playwright test", async ({browser})=>
{
const context = await browser.newContext();
const page = await context.newPage();
// adding this code to validate the aborting  of css file and its impact on the page
//await page.route("**/*.css", route => route.abort()); // to block the css file and check the impact on the page
await page.route("**/*.{jpg,png,jpeg}", route => route.abort());

  const userName = page.locator("input#username");
  const Password = page.locator("[type='password']");
  const signIn   = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");
  page.on('request', request => console.log('>>', request.method(), request.url()));
  page.on('response', response => console.log('<<', response.status(), response.url()));

//playwright code

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log (await page.title());
await userName.fill("rahulshetty");
await Password.fill("learning2");
await signIn.click();

console.log(await page.locator("[style*='block']").textContent());
await expect( page.locator("[style*='block']")).toContainText('Incorrect');

await userName.fill("");
await userName.fill("rahulshettyacademy");
await Password.fill("");
await Password.fill("Learning@830$3mK2");
await signIn.click();
//console.log(await cardTitles.first().textContent());  // cardTitles is the parent element.  first()retrives the first element from the list and 
//console.log(await cardTitles.nth(1).textContent()); // nth(x) retrives xth element from the list
const allTitles = await cardTitles.allTextContents();  // allTestContents() retrives the entire texts on the list. this method will not wait until the page loads as it doesnt have that feature by default
console.log(allTitles);
});




// launching page with only page fixture, when no customization required on the browser context or cookies
test("Page playwright test", async ({page})=>
{

await page.goto("https://www.google.com")

// to get the title
console.log (await page.title());
await expect.toHaveTitle("Google");
});

// validate UI controls using Playwright
test("UI Controls", async ({page})=>
{
const userName = page.locator("input#username");
  const Password = page.locator("[type='password']");
  const signIn = page.locator("#signInBtn");
  const selectDropdown = page.locator("select.form-control");
   const radioButton = page.locator(".radiotextsty");
  const okButton = page.locator("#okayBtn");
  const documentLink = page.locator("[href*='documents-request']");
  
  
//playwright code

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log (await page.title());
await userName.fill("rahulshettyacademy");
await Password.fill("Learning@830$3mK2");


await radioButton.last().click();
await okButton.click();
await expect (radioButton.last()).toBeChecked();
//console.log (radioButton.last().isChecked());
await selectDropdown.selectOption("consult"); 

const Agreestmt = page.locator("#terms");

//old code
// await Agreestmt.click();
// await expect(Agreestmt).toBeChecked();
// await Agreestmt.uncheck(); // for uncheck we dont have any like toBechecked, we can handle it otherway
// expect (await (Agreestmt.isChecked()).toBeFalsy());

//new code


await Agreestmt.click();
await expect(Agreestmt).toBeChecked();

await Agreestmt.click(); // toggle off
await expect(Agreestmt).not.toBeChecked();

await expect(documentLink).toHaveAttribute("class","blinkingText");

//await signIn.click();
//await page.pause();

});

//validating child window

test("Child Window", async ({browser})=>
{
  const context = await browser.newContext();
  const page = await context.newPage();

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const documentLink = page.locator("[href*='documents-request']");
  const [newPage] = await  Promise.all(
  [
    context.waitForEvent('page'), // listens for any new page (promise - pending, rejected, fulfilled)
    documentLink.click(),
  ]) // new page opened , asynchronously perform 2 actions parallely
  
 const  text = await newPage.locator(".red").textContent();
 console.log(text);

 const arrayText = text.split("@");
 const domain = arrayText[1].split(" ")[0]
 //console.log(domain);
 await page.locator("#username").fill(domain);
 //console.log(await page.locator("#username").textContent()); // will return the value only if the element is attached to dom
  console.log(await page.locator("#username").inputValue()); // use to retrive when you update the form dynaically in the run time in text or edit boxes




});