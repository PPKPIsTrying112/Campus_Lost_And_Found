import { execSync } from "child_process";

execSync(
  'npx cucumber-js tests/features/postFoundItem.feature --require tests/step_definitions/postFoundItemSteps.js --require tests/support/hooks.js',
  { stdio: "inherit" }
);
