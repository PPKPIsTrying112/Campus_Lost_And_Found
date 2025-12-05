@login @post
Feature: Full user flow—login, create post, verify it, log out

  Scenario: User logs in, creates a found item post, sees it, and logs out
    Given I log in as "test@gmail.com"
    When I navigate to the create found item page
    And I fill out the found item form correctly
    And I submit the form
    Then I should be redirected to the found items page
    And I should see my newly created item in the list
    When I click the logout button
    Then I should be redirected to the initial homepage
