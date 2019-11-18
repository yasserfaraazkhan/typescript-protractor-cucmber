Feature: End-to-End Proctracter tests
#  Background:
#     Given I am on homepage

  @invalidSearch
  Scenario: As a visitor, I should see error message on invalid
    Given I am on homepage
    When I enter "12@1" as city name to search
    Then I verify "Not found" message is shown
  
  