import { execSync } from 'child_process';

execSync(
  'npx cucumber-js tests/features/endToendClaim.feature --require tests/step_definitions/endToendClaimSteps.js --require tests/support',
  { stdio: 'inherit' }
);