import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import assert from 'assert';

setDefaultTimeout(30 * 1000); // 30 seconds per step

// ------------------ LOGIN ------------------
Given('I am logged in as {string}', async function (email) {
  // Go to base URL first
  await this.page.goto('http://localhost:5173/');

  // Set the user in localStorage directly
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

  // Navigate to homepage after login
  await this.page.goto('http://localhost:5173/');

  // Wait for page to confirm user is "logged in"
  await this.page.waitForSelector('text=Logout');
});

When('I click the logout button', async function () {
  await this.page.click('button:has-text("Logout")');
});

Then('I should be redirected to the homepage', async function () {
  await this.page.waitForURL('http://localhost:5173/');
  const content = await this.page.textContent('body');
  assert(content.includes('Logout')); // Ensures user is logged in
});

Then('I should be redirected to the initial homepage', async function () {
  await this.page.waitForURL('http://localhost:5173/');
  const content = await this.page.textContent('body');
  assert(content.includes('Reconnect with your belongings')); // Ensures logged out
});
