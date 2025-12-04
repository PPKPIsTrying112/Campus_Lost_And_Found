@signup
Feature: Sign Up

  Scenario: User signs up successfully
    Given I have not signed up yet
    When I enter my name "New User", email "newuser@gmail.com", and password "Password123!"
    And I click the sign up button
    Then I should be redirected to the homepage after signing up
