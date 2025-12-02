@login
Feature: Login

  @login
  Scenario: User logs in successfully
    Given I have an account with email "test@gmail.com" and password "Aa1!aaaa"
    When I enter my email "test@gmail.com" and password "Aa1!aaaa"
    And I click the login button
    Then I should be redirected to the homepage

@logout
  Scenario: User logs out successfully
    Given I am logged in as "test@gmail.com" with password "Aa1!aaaa"
    When I click the logout button
    Then I should be redirected to the initial homepage