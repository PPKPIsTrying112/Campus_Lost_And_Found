import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import assert from 'assert';
import path from 'path';

setDefaultTimeout(30 * 1000); // 30 seconds per step

// Test image used for uploads
const testImagePath = path.resolve('tests/assets/test-image.png');

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
});

// ---------------------- POST FOUND ITEM ----------------------

When('I navigate to the create found item page', async function () {
  await this.page.click('text=Found an item?');
  await this.page.waitForURL('**/create-found-item');
  await this.page.waitForSelector('h2:has-text("Post a Found Item")');
});

When('I fill out the found item form correctly', async function () {
  this.foundItemTitle = 'Black Wallet';

  await this.page.fill('input[placeholder="e.g. Black Leather Wallet"]', this.foundItemTitle);
  await this.page.fill('textarea[placeholder="Provide a detailed description..."]', 'Leather wallet with ID and cash');

  // Select item category
  await this.page.selectOption('select', 'Wallet');

  await this.page.fill('input[placeholder="e.g. Powell Library"]', 'Powell Library');
  await this.page.fill('input[type="date"]', '2025-12-03');
  await this.page.fill('input[type="time"]', '12:00');

  await this.page.setInputFiles('input[type="file"]', testImagePath);

  // Security questions
  await this.page.fill('input[placeholder="Question 1 (required)"]', 'Where did you find it?');
  await this.page.fill('input[placeholder="Question 2 (optional)"]', 'Near library');
  await this.page.fill('input[placeholder="Question 3 (optional)"]', 'On the floor');
});

When('I submit the form', async function () {
  await this.page.click('button[type="submit"]');
});

Then('I should be redirected to the found items page', async function () {
  await this.page.waitForURL('**/found-items');
});

Then('I should see my newly created item in the list', async function () {
  const itemSelector = `text=${this.foundItemTitle}`;
  await this.page.waitForSelector(itemSelector, { timeout: 5000 });
  const isVisible = await this.page.isVisible(itemSelector);
  assert.strictEqual(isVisible, true, 'The new item should appear in the found items list.');
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
