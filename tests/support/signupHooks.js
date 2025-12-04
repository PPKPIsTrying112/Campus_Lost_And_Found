import { Before, After, setWorldConstructor } from '@cucumber/cucumber';
import { chromium } from 'playwright';

class SignupWorld {
  constructor() {
    this.browser = null;
    this.page = null;
  }
}

setWorldConstructor(SignupWorld);

// Only run for @signup scenarios
Before({ tags: "@signup", timeout: 60000 }, async function () {
  this.browser = await chromium.launch({ headless: false }); // headless: true for CI
  this.page = await this.browser.newPage();
  this.page.setDefaultTimeout(30000); // optional
});

After({ tags: "@signup" }, async function () {
  if (this.page) await this.page.close();
  if (this.browser) await this.browser.close();
});
