import { expect } from "@playwright/test";
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = 'input[type="email"]';
    this.passwordInput = 'input[type="password"]';
    this.submitBtn = 'button[type="submit"]';
    
    this.profileDropdown = '#dropdownMenuButtonProfile';
    this.emailErrorMsg = '#Email-error';
    this.passwordErrorMsg = '#Password-error';
    this.loginErrorMsg = '.error-msg.validation-summary-errors';
  }

  async navigateToLogin() {
    await this.page.goto('/auth/signin');
  }

  async loginWithCredentials(email, password) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.submitBtn);
  }

async verifyLoginSuccess() {
    await this.page.waitForURL(/\/member\/account$/, { timeout: 30000 });
    await expect(this.page).toHaveURL(/\/member\/account$/);
  }
 async verifyEmailError(expectedText) {
    await expect(this.page.locator(this.emailErrorMsg)).toHaveText(expectedText);
  } 
  
  async verifyPasswordError(expectedText) {
    await expect(this.page.locator(this.passwordErrorMsg)).toHaveText(expectedText);
  }

  async verifyLoginError(expectedText) {
    await expect(this.page.locator(this.loginErrorMsg)).toHaveText(expectedText);
  }


}
