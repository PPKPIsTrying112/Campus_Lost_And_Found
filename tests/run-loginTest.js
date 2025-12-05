import { execSync } from 'node:child_process';

try {
  execSync(
    'npx cucumber-js tests/features/login.feature --require tests/step_definitions/loginSteps.js --require tests/support',
    { stdio: 'inherit' }
  );
} catch (error) {
  process.exit(1);
}