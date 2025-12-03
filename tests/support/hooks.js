import { Before, After, setWorldConstructor } from '@cucumber/cucumber';
import { chromium } from 'playwright';

class CustomWorld {
  constructor() {
    this.browser = null;
    this.page = null;
  }
}

setWorldConstructor(CustomWorld);

Before(async function () {
  this.browser = await chromium.launch({ headless: false }); // set true for CI
  this.page = await this.browser.newPage();
});

After(async function () {
  if (this.page) await this.page.close();
  if (this.browser) await this.browser.close();
});
