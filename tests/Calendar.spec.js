const {test,expect} = require("@playwright/test");

test("Calendar Validations", async({page})=>
{
const month = "8";
const date = "28";
const year = "2025";
const expectedList = [month,date,year];

await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
await page.locator(".react-date-picker__inputGroup").click();
await page.locator(".react-calendar__navigation__label").click();
await page.locator(".react-calendar__navigation__label").click();
await page.getByText(year).click();
page.locator(".react-calendar__year-view__months__month").nth(Number(month-1)).click();
//await page.locator("//abbr[text()='28']").click();
//await page.getByRole('button', { name: 'August 28,' }).click();

const inputs = page.locator(".react-date-picker__inputGroup input")
for(let i=0; i<expectedList.length; i++)
{
const value= await inputs.nth(i).inputValue();
expect(value).toEqual(expectedList[i]);
}

});