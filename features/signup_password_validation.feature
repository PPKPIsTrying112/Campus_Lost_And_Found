@auth @password
Feature: Signup password validation
  In order to protect account security
  As a new user
  I want my password to meet strong security requirements

  Background:
    Given I am on the Signup page

  Scenario: Reject password shorter than 8 characters
    When I enter "Test User" into the "name" field
    And I enter "validemail" into the "email" field
    And I enter "Aa1!" into the "password" field
    And I submit the signup form
    Then I should see an error message containing "Password must be at least 8 characters"

  Scenario: Reject password without uppercase letters
    When I enter "Test User" into the "name" field
    And I enter "validemail" into the "email" field
    And I enter "aaaaaaaa1!" into the "password" field
    And I submit the signup form
    Then I should see an error message containing "Password must contain an uppercase letter"

  Scenario: Reject password without lowercase letters
    When I enter "Test User" into the "name" field
    And I enter "validemail" into the "email" field
    And I enter "AAAAAAA1!" into the "password" field
    And I submit the signup form
    Then I should see an error message containing "Password must contain a lowercase letter"

  Scenario: Reject password without numbers
    When I enter "Test User" into the "name" field
    And I enter "validemail" into the "email" field
    And I enter "Aa!!!!!!" into the "password" field
    And I submit the signup form
    Then I should see an error message containing "Password must contain a number"

  Scenario: Reject password without special characters
    When I enter "Test User" into the "name" field
    And I enter "validemail" into the "email" field
    And I enter "Aa123456" into the "password" field
    And I submit the signup form
    Then I should see an error message containing "Password must contain a special character (!@#$%^&*)"

  Scenario: Accept a valid password
    When I enter "Test User" into the "name" field
    And I enter "validemail" into the "email" field
    And I enter "Aa1!aaaa" into the "password" field
    And I submit the signup form
    Then I should see a success message containing "Account created"
