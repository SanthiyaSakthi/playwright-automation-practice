class LoginPage {


  constructor(page)
  {
    this.page = page;
    this.userName = page.locator ('#userEmail');
    this.password = page.locator ('#userPassword');;
    this.signInBtn =  page.locator ("[type='submit']");
  }

  async goto()
  {
  await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  }

  // reusable utility for login
  async validLogin(username, password)
  {
  
  await this.userName.fill (username);
 
  await this.password.fill (password);
  await this.signInBtn.click ();
   await this.page.waitForLoadState ('networkidle'); // sometimes it is not workng so going with waitfor()
    
  }
}
export default LoginPage;