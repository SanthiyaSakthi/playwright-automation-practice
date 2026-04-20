import ExcelJS from 'exceljs';
import {test, expect} from '@playwright/test';

async function writeExcel(searchText, replaceText, filepath) {

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filepath);

  const worksheet = workbook.getWorksheet('Sheet1');

  const output = await readExcel(worksheet, searchText);

  // ⭐ VERY IMPORTANT FIX
  if (output.row === -1 || output.column === -1) {
    console.log("❌ Search text NOT found in Excel");
    return;
  }

  const cell = worksheet.getCell(output.row, output.column);
  cell.value = replaceText;

  await workbook.xlsx.writeFile(filepath);

  console.log("✅ Excel updated successfully");
}

// Reading the excel file

async function readExcel(worksheet, searchText) {

  let output = { row: -1, column: -1 };

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.column = colNumber;
      }
    });
  });

  return output;
}

//writeExcel("Banana", "Republic", "C:/Santhiya/Automation/download.xlsx");
 // Playwright end to end flow

 test("Validating Excel end to end flow", async({page})=>
 {
  const textSearch = 'Mango';
  const updatedValue = '350';
 await page.goto ("https://rahulshettyacademy.com/upload-download-test/index.html")
 const downloadPromise = page.waitForEvent('downlod');
 await page.getByRole('button',{name: 'Download'}).click();
 await downloadPromise;
 writeExcel(textSearch, updatedValue, "C:/Santhiya/Automation/download.xlsx");
 await page.locator("#fileinput").click();
 await page.locator("#fileinput").setInputFiles("C:/Santhiya/Automation/download.xlsx"); // setinput files works only if the locator has "type= file attribute"

const textlocator = page.getByText(textSearch);
const desiredRow = await page.getByRole('row').filter({has:textlocator});
await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updatedValue);


 });

