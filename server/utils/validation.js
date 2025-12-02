const PASSWORD_REGEX = {
  length: /.{8,}/,
  upper: /[A-Z]/,
  lower: /[a-z]/,
  number: /[0-9]/,
  special: /[!@#$%^&*]/,
};

function validatePassword(password) {
  if (!PASSWORD_REGEX.length.test(password))
    return "Password must be at least 8 characters";

  if (!PASSWORD_REGEX.upper.test(password))
    return "Password must contain an uppercase letter";

  if (!PASSWORD_REGEX.lower.test(password))
    return "Password must contain a lowercase letter";

  if (!PASSWORD_REGEX.number.test(password))
    return "Password must contain a number";

  if (!PASSWORD_REGEX.special.test(password))
    return "Password must contain a special character (!@#$%^&*)";

  return null; // valid
}

function validateEmail(email) {
  // Simple regex matching your Cucumber tests
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!EMAIL_REGEX.test(email)) {
    return "Invalid email";
  }

  return null;
}

module.exports = { validatePassword, validateEmail };
