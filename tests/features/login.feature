@login
Feature: Login

  @login
  Scenario: User logs in successfully
    Given I am logged in as "test@gmail.com"
    Then I should be redirected to the homepage

  @logout
  Scenario: User logs out successfully
    Given I am logged in as "test@gmail.com"
    When I click the logout button
    Then I should be redirected to the initial homepage
