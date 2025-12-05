import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import assert from 'assert';

setDefaultTimeout(30 * 1000); // 30 seconds per step

// ---------------------- LOGIN ----------------------

Given('I log in as {string}', async function (email) {
  // Go to base URL first
  await this.page.goto('http://localhost:5173/');

  // Write user directly to localStorage
  await this.page.evaluate((email) => {
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: 1,
        email: email,
        name: 'Test User',
        profileImage: null
      })
    );
  }, email);

  // Reload homepage so UI updates
  await this.page.goto('http://localhost:5173/');
  await this.page.waitForSelector('text=Logout');
  await this.page.waitForSelector('text=My Claims', { timeout: 5000 });
});

// ---------------------- NAVIGATION ----------------------
When('I click {string} in the navigation', async function (linkText) {
  await this.page.locator(`button:has-text("${linkText}")`).click();
  await this.page.waitForTimeout(1000);
});

Then('I should be on the found items page', async function () {
  await this.page.waitForSelector('text=All Found Items', { timeout: 5000 });
});

// ---------------------- ITEM DETAIL ----------------------
When('I click on the first item card', async function () {
  await this.page.locator('.item-card').first().click();
  await this.page.waitForTimeout(1000);
});

Then('I should see the item detail page', async function () {
  await this.page.waitForSelector('text=Found By', { timeout: 5000 });
  await this.page.waitForSelector('text=Is This Yours?', { timeout: 5000 });
});

// ---------------------- CLAIM ITEM ----------------------
When('I click the "Claim This Item" button', async function () {
  await this.page.locator('button.claim-button:has-text("Claim This Item")').click();
  await this.page.waitForTimeout(500);
});

Then('I should see the claim modal', async function () {
  await this.page.waitForSelector('text=Claim:', { timeout: 5000 });
});

When('I fill in the claim security answer with {string}', async function (answer) {
  const modal = this.page.locator('.modal-overlay');
  await modal.waitFor({ state: 'visible', timeout: 5000 });
  const textarea = modal.locator('textarea[placeholder*="answer"]').first();
  await textarea.fill(answer);
});

When('I fill in the claim security answers with:', async function (dataTable) {
  const modalContent = this.page.locator('.modal-content');
  await modalContent.waitFor({ state: 'visible', timeout: 5000 });

  const answers = {};
  dataTable.rows().forEach(([key, value]) => {
    answers[key] = value;
  });

  const textareas = modalContent.locator('textarea');
  await textareas.first().waitFor({ state: 'visible', timeout: 5000 });

  const count = await textareas.count();
  if (count >= 1 && answers.answer1) await textareas.nth(0).fill(answers.answer1);
  if (count >= 2 && answers.answer2) await textareas.nth(1).fill(answers.answer2);
  if (count >= 3 && answers.answer3) await textareas.nth(2).fill(answers.answer3);

  await this.page.waitForTimeout(200); 
});


When('I click the "Submit Claim" button in the modal', async function () {
  const modal = this.page.locator('.modal-overlay');
  const submitBtn = modal.locator('button.submit-btn:has-text("Submit Claim")');
  await submitBtn.waitFor({ state: 'visible', timeout: 5000 });
  await submitBtn.click();
});

Then('I should see the error message {string}', async function (errorMessage) {
  await expect(this.page.locator(`text=${errorMessage}`)).toBeVisible({ timeout: 5000 });
  await this.page.click('button:has-text("✕")');
});

// ---------------------- LOGOUT ----------------------

When('I click the logout button', async function () {
  await this.page.click('button:has-text("Logout")');
});

Then('I should be redirected to the initial homepage', async function () {
  await this.page.waitForURL('http://localhost:5173/');
  const content = await this.page.textContent('body');
  assert(content.includes('Reconnect with your belongings'));
});
