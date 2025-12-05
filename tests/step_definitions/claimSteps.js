import { Given, When, Then } from '@cucumber/cucumber';

Given('I am on the homepage', async function () {
  await this.page.goto('http://localhost:5173');
  await this.page.waitForLoadState('networkidle');
});

When('I click the {string} button in the header', async function (buttonText) {
  await this.page.waitForSelector('button', { timeout: 10000 });
  await this.page.getByRole('button', { name: buttonText }).click();
  await this.page.waitForTimeout(1000);
});

When('I enter email {string} and password {string}', async function (email, password) {
  const inputs = await this.page.locator('input');
  await inputs.nth(0).fill(email);
  await inputs.nth(1).fill(password);
});

When('I click the Login submit button', async function () {
  await this.page.locator('button:has-text("Login")').last().click();
  await this.page.waitForTimeout(2000);
});

Then('I should be logged in successfully', async function () {
  await expect(this.page.locator('text=Logout')).toBeVisible({ timeout: 10000 });
  await expect(this.page.locator('text=My Claims')).toBeVisible();
});

When('I click {string} in the navigation', async function (linkText) {
  await this.page.locator(`button:has-text("${linkText}")`).click();
  await this.page.waitForTimeout(1000);
});

Then('I should be on the found items page', async function () {
  await expect(this.page.locator('text=All Found Items')).toBeVisible();
});

When('I click on the first item card', async function () {
  await this.page.locator('.item-card').first().click();
  await this.page.waitForTimeout(1000);
});

Then('I should see the item detail page', async function () {
  await expect(this.page.locator('text=Found By')).toBeVisible();
  await expect(this.page.locator('text=Is This Yours?')).toBeVisible();
});

When('I click the {string} button', async function (buttonText) {
  await this.page.locator(`button:has-text("${buttonText}")`).click();
  await this.page.waitForTimeout(500);
});

Then('I should see the claim modal', async function () {
  await expect(this.page.locator('text=Claim:')).toBeVisible({ timeout: 5000 });
});

When('I fill in the security answer with {string}', async function (answer) {
  await this.page.locator('textarea[placeholder*="answer"]').fill(answer);
});

Then('I should see the error message {string}', async function (errorMessage) {
  await expect(this.page.locator(`text=${errorMessage}`)).toBeVisible({ timeout: 5000 });
});