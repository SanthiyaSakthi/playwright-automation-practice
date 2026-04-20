

// making it as named imports
import { LoginPage } from '../pageobjects_ts/LoginPage.ts';
import { DashboardPage } from '../pageobjects_ts/DashboardPage.ts'; 
import { CartPage } from '../pageobjects_ts/CartPage.ts';
import { Page } from '@playwright/test';
 
export class POManager
{

    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage;
  constructor(page: Page)
  {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.cartPage = new CartPage(this.page);
  }

 

  getLoginPage()
  {
    return this.loginPage;
  }

  getDashboardPage(){
    return this.dashboardPage;

  }

  getCartPage(){
    return this.cartPage;

  }
}
export default POManager;