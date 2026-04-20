import base from '@playwright/test';

export const customtest = base.test.extend ({
  testDataForOrder: {
    username_input: 'santhiyavect@gmail.com',
    password_input: 'Password@123',
    productName: 'ZARA COAT 3',
    CcNumber: '4542 9936 9297 2263',
    CvvCode: '341',
    expiry_Month: '05',
    expiry_Date: '15',
  },
});
