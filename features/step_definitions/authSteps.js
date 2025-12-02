import { Given, When, Then, Before } from "@cucumber/cucumber";
import assert from "assert";
import request from "supertest";
import app from "../../server/index.js"; // your Express app

let response;
let signupData = {};

// ------------------ HOOKS ------------------

// Reset before each scenario
Before(() => {
  signupData = {};
  response = null;
});

// ------------------ SIGNUP STEPS ------------------

// Fill in a field
When("I enter {string} into the {string} field", function (value, field) {
  if (!signupData) signupData = {};
  const key = field.toLowerCase();

  if (key === "name") {
    signupData.name = value;
  } else if (key === "email") {
    // Only modify email if explicitly marked as "valid" in the scenario
    // Invalid emails remain unmodified to trigger validation errors
    if (value.toLowerCase().includes("validemail")) {
      signupData.email = `${Date.now()}-${value.replace("validemail", "test")}@example.com`;
    } else {
      signupData.email = value;
    }
  } else if (key === "password") {
    signupData.password = value;
  } else {
    throw new Error(`Unknown field: ${field}`);
  }
});

// Submit the signup form via API
When("I submit the signup form", async function () {
  response = await request(app).post("/api/auth/signup").send(signupData);
});

// ------------------ ASSERTIONS ------------------

// Expect an error
Then("I should see an error message containing {string}", function (msg) {
  assert(response, "No response received yet");
  assert.strictEqual(response.status, 400, `Expected 400 but got ${response.status}`);
  assert(
    response.body.message.includes(msg),
    `Expected error message to include "${msg}" but got "${response.body.message}"`
  );
});

// Expect success
Then("I should see a success message containing {string}", function (msg) {
  assert(response, "No response received yet");
  assert.strictEqual(response.status, 200, `Expected 200 but got ${response.status}`);
  assert(response.body.success, "Expected signup success to be true");
  assert(
    response.body.message.includes(msg),
    `Expected message to include "${msg}" but got "${response.body.message}"`
  );
});

// Optional background alias
Given("I am on the Signup page", function () {
  return true; // No-op for API
});
