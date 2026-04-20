//import { LoginPage } from '../pageobjects/LoginPage';
//import { DashboardPage } from '../pageobjects/DashboardPage';

// making it as default import
import  LoginPage  from '../pageobjects/LoginPage.js';
import DashboardPage from '../pageobjects/DashboardPage.js'; 
import CartPage from '../pageobjects/CartPage.js';
 
class POManager
{
  constructor(page)
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