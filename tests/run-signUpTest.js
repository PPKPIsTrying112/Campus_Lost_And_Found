import { execSync } from "child_process";

execSync(
  `npx cucumber-js tests/features/signup.feature --require tests/step_definitions/signUpSteps.js --require tests/support/signupHooks.js`,
  { stdio: "inherit" }
);
