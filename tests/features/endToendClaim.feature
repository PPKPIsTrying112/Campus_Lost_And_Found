@claim
Feature: Claim An Item

  Scenario: User logs in, sees error when claiming an already claimed item, logs out
    Given I log in as "test2@gmail.com"
    When I click "Found Items" in the navigation
    Then I should be on the found items page
    When I click on the first item card
    Then I should see the item detail page
    When I click the "Claim This Item" button
    Then I should see the claim modal
    When I fill in the claim security answer with "answer"
    When I fill in the claim security answers with:
      | answer1        | test answer 1 |
      | answer2        | test answer 2 |
      | answer3        | test answer 3 |
    And I click the "Submit Claim" button in the modal
    Then I should see the error message "You already submitted a claim for this item"
    When I click the logout button
    Then I should be redirected to the initial homepage