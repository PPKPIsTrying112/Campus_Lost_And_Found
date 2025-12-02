@signup @email
Feature: Signup email validation
  In order to ensure real users sign up
  As a new user
  I want emails to be validated

  Background:
    Given I am on the Signup page

  @signup @email
  Scenario Outline: Reject invalid email formats
    When I enter "Test User" into the "name" field
    And I enter "<email>" into the "email" field
    And I enter "Aa1!aaaa" into the "password" field
    And I submit the signup form
    Then I should see an error message containing "Invalid email"

    Examples:
      | email           |
      | test            |
      | test@           |
      | test@com        |
      | @gmail.com      |
      | test@gmail      |
      | test@gmail,com  |

  @signup @email
Scenario: Accept a valid email
  When I enter "Test User" into the "name" field
  And I enter "validemail" into the "email" field
  And I enter "Aa1!aaaa" into the "password" field
  And I submit the signup form
  Then I should see a success message containing "Account created"

