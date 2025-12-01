const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

Before({ tags: "@login" }, async function () {
  this.browser = await chromium.launch();
  this.page = await this.browser.newPage();
});

After({ tags: "@login" }, async function () {
  if (this.browser) {
    await this.browser.close();
  }
});


Given('I have an account with email {string} and password {string}', async function (email, password) {
  // For testing, we assume this account exists
  this.testUser = { email, password };
});

When('I enter my email {string} and password {string}', async function (email, password) {
  await page.goto('http://localhost:5173/login');
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
});

When('I click the login button', async function () {
  await page.click('button:has-text("Login")');
});

Then('I should be redirected to the homepage', async function () {
  await page.waitForURL('http://localhost:5173/'); 
  assert.strictEqual(page.url(), 'http://localhost:5173/');
});
