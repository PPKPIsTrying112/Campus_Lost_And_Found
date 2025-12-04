import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import assert from 'assert';

setDefaultTimeout(30 * 1000);

// ------------------ SIGN UP STEPS ------------------
Given('I have not signed up yet', async function () {
  const timestamp = Date.now();
  this.generatedUsername = `user${timestamp}`;
  this.generatedEmail = `user${timestamp}@test.com`;
  this.generatedPassword = 'Password123';
});

When(
  'I enter my name {string}, email {string}, and password {string}',
  async function (name, email, password) {
    const page = this.page;

    await page.goto('http://localhost:5173/signup', { waitUntil: 'networkidle' });

    // Wait for inputs to appear
    const nameInput = await page.waitForSelector('input[name="name"]', { state: 'visible', timeout: 10000 });
    const emailInput = await page.waitForSelector('input[name="email"]', { state: 'visible', timeout: 10000 });
    const passwordInput = await page.waitForSelector('input[name="password"]', { state: 'visible', timeout: 10000 });

    // Fill inputs
    const finalName = this.generatedName || name;
    const finalEmail = this.generatedEmail || email;

    await nameInput.fill(finalName);
    await emailInput.fill(finalEmail);
    await passwordInput.fill(password);

    this.testUser = { name: finalName, email: finalEmail, password };
  }
);


When('I click the sign up button', async function () {
  await this.page.click('button:has-text("Sign Up")');
});

Then('I should be redirected to the homepage after signing up', async function () {
  await this.page.waitForURL('http://localhost:5173/');
  assert.strictEqual(await this.page.url(), 'http://localhost:5173/');
});
