Feature: Proractor E2E test cases

@invalidSearch
  Scenario: As a visitor, I should see error message on invalid
    Given I am on homepage
    When I enter "12@1" as city name to search
    Then I verify "Not found" message is shown

@validSearch
  Scenario: As a visitor, I should see results when I do a valid search
    Given I am on homepage
    When I enter "Bangalore" as city name to search
    Then I verify searched city "Bangalore" is shown
  
@navigation
  Scenario Outline: As a visitor, I should verify all the important links
    Given I am on homepage
    When I click on "<menuItem>" from navigation menu
    Then I verify url to have "<menuItem>"
  Examples:
  |menuItem|
  |guide|
  |api|
  |price|
  |examples|
  |weathermap|
