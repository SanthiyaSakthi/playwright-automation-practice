import {test as baseTest} from '@playwright/test';

type TestData = {
  username_input: string;
  password_input: string;
  productName: string;
  CcNumber: string;
  CvvCode: string;
  expiry_Month: string;
  expiry_Date: string;
};

export const customtest = baseTest.extend<{testDataForOrder: TestData}>({
  testDataForOrder: async ({}, use) => {
    const testData: TestData = {
      username_input: 'santhiyavect@gmail.com',
      password_input: 'Password@123',
      productName: 'ZARA COAT 3',
      CcNumber: '4542 9936 9297 2263',
      CvvCode: '341',
      expiry_Month: '05',
      expiry_Date: '15',
    };
    await use(testData);
  },
});
