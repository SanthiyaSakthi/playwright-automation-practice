import {test, expect} from '@playwright/test';

test("Iframe Validation  ", async({page})=>
{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");


const framesPage = page.frameLocator("#courses-iframe");

 await framesPage.locator("li a[href*='lifetime-access']:visible").click(); //when one hidden and visible, it selects the visible element
console.log("locator clicked");

 //const textcheck = await framesPage.locator(".text h2").textContent();
const textcheck = await framesPage.locator(".text h2").innerText();
console.log(textcheck +" this is the text")

}) 
