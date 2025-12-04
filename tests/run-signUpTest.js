import { execSync } from 'node:child_process';

try {
  execSync(
    'npx cucumber-js tests/features/signup.feature --require tests/step_definitions --require tests/support/signupHooks.js',
    { stdio: 'inherit' }
  );
} catch (err) {
  process.exit(1);
}
