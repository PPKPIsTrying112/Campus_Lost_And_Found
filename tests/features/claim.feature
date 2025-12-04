@claim
Feature: Claim An Item

  Scenario: User sees error when claiming an already claimed item
    Given I am on the homepage
    When I click the "Login" button in the header
    And I enter email "kirby@gmail.com" and password "Passwordtocreate112#"
    And I click the Login submit button
    Then I should be logged in successfully
    When I click "Found Items" in the navigation
    Then I should be on the found items page
    When I click on the first item card
    Then I should see the item detail page
    When I click the "Claim This Item" button
    Then I should see the claim modal
    When I fill in the security answer with "test answer"
    And I click the "Submit Claim" button
    Then I should see the error message "You already submitted a claim for this item"