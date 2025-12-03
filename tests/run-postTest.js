import { execSync } from 'child_process';

execSync(
  'npx cucumber-js tests/features --require tests/step_definitions --require tests/support',
  { stdio: 'inherit' }
);
