const { Given, Then } = require('@cucumber/cucumber');

Given('I visit the homepage', function () {
  console.log("Visiting homepage...");
});

Then('I should see {string}', function (text) {
  console.log("Expecting to see:", text);
});