// @ts-check
import { defineConfig, devices } from '@playwright/test';
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
const config = ({
  testDir: './tests',
  timeout: 40*1000,
  expect:{
 timeout: 40*1000,
  },
  //reporter :'html',
  reporter: [['line'], ['allure-playwright']],
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
   
   browserName : 'chromium',
   headless: false,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    
    trace: 'retain-on-failure', //off, on, retain-onfailure
    screenshot: 'on',
  },

  
});

module.exports = config