@login

Feature: Login

  Scenario: User logs in successfully
    Given I have an account with email "test@gmail.com" and password "Password"
    When I enter my email "test@gmail.com" and password "Password"
    And I click the login button
    Then I should be redirected to the homepage