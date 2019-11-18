Feature: End-to-End Proctracter tests

  @navigation
  Scenario Outline: As a visitor, I should verify all the important links
    Given I am on homepage
    When I click on "<menuItem>" from navigation menu
    Then I verify url to have "<menuItem>"
  Examples:
  |menuItem|
  |city|
  |guide|
  |api|
  |price|
  |stations|
