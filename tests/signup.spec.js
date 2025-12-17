import { test } from '@playwright/test';
import { SignupPage } from '../pages/signup.js';
import { LoginPage } from '../pages/loginPage.js';
import { generateEmail } from '../utils/helpers.js';
import 'dotenv/config';

const BASE_EMAIL = process.env.BASE_EMAIL;
const PASSWORD = process.env.PASSWORD; //
const PASSWORD_WEAK = process.env.PASSWORD_WEAK;

const uniqueEmail = generateEmail(BASE_EMAIL);

let signupPage;
let loginPage;

test.describe('@signup Signup Tests', () => {

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page);
    loginPage = new LoginPage(page);
    await signupPage.navigateToSignup();
  });



  test('SC 01: should sign up with unique email and login successfully @smoke', async ({ page }) => {
    test.setTimeout(65000); 
    await signupPage.createNewUser(uniqueEmail, PASSWORD);
    await signupPage.verifyLoginSuccess();
   // await signupPage.selectCountryAndGeo();
   // await signupPage.waitForSidebarLoader();
    await signupPage.waitForDashboard();
    await signupPage.signOut();
    await loginPage.loginWithCredentials(uniqueEmail, PASSWORD);
  });


  test('SC 02: Signup with already used email alias should fail @regression', async ({ page }) => {

    await signupPage.createNewUser(uniqueEmail, PASSWORD);
    await signupPage.verifyEmailTakenError(uniqueEmail);

  });

  test('SC 03: Signup with weak password should show validation error @regression', async ({ page }) => {


    const weakEmail = generateEmail(BASE_EMAIL);
    await signupPage.createNewUser(weakEmail, PASSWORD_WEAK); 
    await signupPage.verifyWeakPasswordError();
  });


});
