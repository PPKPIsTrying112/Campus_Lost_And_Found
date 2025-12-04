import { execSync } from 'child_process';

execSync(
  'npx cucumber-js tests/features/claim.feature --require tests/step_definitions --require tests/support --tags "@claim"',
  { stdio: 'inherit' }
);