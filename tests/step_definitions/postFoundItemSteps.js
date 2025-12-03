import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import assert from 'assert';
import path from 'path';

setDefaultTimeout(30 * 1000); // 30 seconds per step

const testImagePath = path.resolve('tests/assets/test-image.png');

Given('I am logged in', async function () {
  // Go to base URL first
  await this.page.goto('http://localhost:5173/');

  // Set the user in localStorage directly
  await this.page.evaluate(() => {
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: 1,
        email: 'testuser@example.com',
        name: 'Test User',
        profileImage: null
      })
    );
  });

  // Navigate to create found item page so the app recognizes the user as logged in
  await this.page.goto('http://localhost:5173/create-found-item');

  // Ensure page loaded
  await this.page.waitForSelector('h2:has-text("Post a Found Item")');
});


When('I navigate to the create found item page', async function () {
  // Click "Found an item?" button to go to the form
  await this.page.click('text=Found an item?');
  await this.page.waitForURL('**/create-found-item');
  await this.page.waitForSelector('h2:has-text("Post a Found Item")');
});

When('I fill out the found item form correctly', async function () {
  // Store the title for later assertion
  this.foundItemTitle = 'Black Wallet';

  await this.page.fill('input[placeholder="e.g. Black Leather Wallet"]', this.foundItemTitle);
  await this.page.fill('textarea[placeholder="Provide a detailed description..."]', 'Leather wallet with ID and cash');
  await this.page.selectOption('select', 'Wallet');
  await this.page.fill('input[placeholder="e.g. Powell Library"]', 'Powell Library');
  await this.page.fill('input[type="date"]', '2025-12-03');
  await this.page.fill('input[type="time"]', '12:00');
  await this.page.setInputFiles('input[type="file"]', testImagePath);
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
  const itemVisible = await this.page.isVisible(itemSelector);
  assert.strictEqual(itemVisible, true, 'Found item should be visible');
});
