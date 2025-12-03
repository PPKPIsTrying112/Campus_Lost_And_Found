Feature: Post Found Item

  Scenario: Successfully creating a found item post
    Given I am logged in
    When I navigate to the create found item page
    And I fill out the found item form correctly
    And I submit the form
    Then I should be redirected to the found items page
    And I should see my newly created item in the list
