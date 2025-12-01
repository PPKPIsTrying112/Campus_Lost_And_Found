Feature: InitialHomepage feature

@homepage
  Scenario: Open the lost and found site
    Given I visit the homepage
    Then I should see "Reconnect with your belongings"
