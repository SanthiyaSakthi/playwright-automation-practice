// @ts-check
import {defineConfig, devices} from '@playwright/test';
//import { config } from 'node:process';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',
  retries:1, // makes the test automatically rerun again one time if the tets fails
  workers:3, // decides the number of workers for the parallel execution
  timeout: 40 * 1000,
  expect: {
    timeout: 40 * 1000,
  },
  reporter: 'html',

  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        trace: 'retain-on-failure', //off, on, retain-onfailure are the options available.
        screenshot: 'off',
        ...devices['iPhone 11 Pro Max'] // makes the emulator browser opens for iPhone 11 Pro Max
      },
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,

        trace: 'retain-on-failure', //off, on, retain-onfailure
        screenshot: 'on',
        video:'retain-on-failure',
        ignorehttpserror: true,
        permissions:['geolocation'],
        //viewport: {width:720,height:720} // makes the emulator browser to open for the specific width and height.
      },
    },
  ],
};

module.exports = config;
