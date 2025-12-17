import {ERRORS} from '../utils/signupMessage'
import { expect } from '@playwright/test';

export class SignupPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = '[placeholder="First name"]';
    this.lastNameInput = '[placeholder="Last name"]';
    this.emailInput = '[placeholder="Email address"]';
    this.passwordInput = '[placeholder="Password"]';
    this.confirmPasswordInput = '[placeholder="Confirm Password"]';
    this.signupBtn = 'button[type=submit]';
    
    this.countryDd = '[title="-Select Country-"]';
    this.geoDbtn = '#select-geo';
    this.searchInput = '[type="search"]';
    this.searchResults = '.select2-results__options';
    this.sidebarLoader = '.sidebar-load-animation';
    this.profileDropdown = '#dropdownMenuButtonProfile';
    this.signOutBtn = '.dropdown-item';

    this.emailErrorLocator = '[data-valmsg-for="Email"]';
    this.passwordErrorLocator = '.error-msg.field-validation-error';
    
    this.loginSuccessModal = '#select-timezone-modal';


  }

  async navigateToSignup() {
    await this.page.goto('/auth/signup');
  }

  async createNewUser(email, password) {
    await this.page.fill(this.firstNameInput, 'Test');
    await this.page.fill(this.lastNameInput, 'User');
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.fill(this.confirmPasswordInput, password);
    await this.page.click(this.signupBtn);
  }
 //async selectCountryAndGeo() {
   //  await this.page.locator(this.countryDd).waitFor({ state: 'visible' });
     //await this.page.locator(this.countryDd).click({ force: true });
     //await this.page.locator(this.searchInput).fill('Bangladesh');
     //await this.page.locator(this.searchResults).first().click();
     //await this.page.locator(this.geoDbtn).click();
  //}
  //   async waitForSidebarLoader() {
  //   await this.page.waitForSelector(this.sidebarLoader, { state: 'visible' });
  //   await this.page.waitForSelector(this.sidebarLoader, { state: 'hidden' });

  //   await this.page.waitForSelector(this.sidebarLoader, { state: 'visible' });
  //   await this.page.waitForSelector(this.sidebarLoader, { state: 'hidden' });

  //   await this.page.waitForLoadState('load');
  // }



async waitForDashboard() {
  await expect(
    this.page.getByRole('button', { name: /Greetings!/ })
  ).toBeVisible({ timeout: 15000 });
}


  async verifyLoginSuccess(retries = 4) {
     for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            await expect(
                this.page.locator(this.loginSuccessModal)).toContainText('Update Your Timezone', { timeout: 7000 });
                console.log(`Modal found on attempt ${attempt}`);
                await this.page.screenshot({path: `screenshots/signup-success-${Date.now()}.png`,fullPage: true});
            return;

        } catch (error) {
            console.warn(`Attempt ${attempt} failed: ${error.message}`);

            if (attempt === retries) {
                throw new Error(`Modal not found after ${retries} retries`);
            }

            await this.page.waitForTimeout(2500);
        }
    }
}


  async signOut() {
    await this.page.waitForSelector(this.profileDropdown, { state: 'visible' });
    await this.page.locator(this.profileDropdown).click({force: true});
    await this.page.locator(this.signOutBtn).nth(2).click(); // Sign out
    await this.page.waitForLoadState('load');
  }

  //Validation Methods
  async verifyEmailTakenError(email) {
    await expect(this.page.locator(this.emailErrorLocator)).toHaveText(ERRORS.EMAIL_TAKEN(email),{timeout: 15000});
  }

  async verifyWeakPasswordError() {
    await expect(this.page.locator(this.passwordErrorLocator)).toHaveText(ERRORS.PASSWORD_WEAK,{timeout: 15000});
  }


}
