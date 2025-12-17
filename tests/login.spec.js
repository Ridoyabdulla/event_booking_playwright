import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import loginData from '../utils/loginData.json';
import 'dotenv/config';

test.describe('@login Login Flow Tests (data-driven)', () => {
  let loginPage;

    test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
  });

  for (const data of loginData) {

    const tags = data.valid ? '@smoke' : '@regression';

    test(`${data.TestCase} ${data.description} ${tags}`, async ({ page }) => {
      const email = data.email === 'env.BASE_EMAIL' ? process.env.BASE_EMAIL : data.email;
      const password = data.password === 'env.PASSWORD' ? process.env.PASSWORD : data.password;
      await loginPage.loginWithCredentials(email, password);

    if (data.valid) {

        await loginPage.verifyLoginSuccess();
      }
      
      else  {
        if (data.emailError) {
          await loginPage.verifyEmailError(data.emailError);

        }
        if (data.passwordError) {
          await loginPage.verifyPasswordError(data.passwordError);

        }
        if (data.loginError) {
          await loginPage.verifyLoginError(data.loginError);

          
        }
      
      }
    });
  }
});
