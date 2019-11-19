Feature: Sign In test cases

Scenario: As a user, I should not be logged if I enter invalid user credentials
Given I am on Sign In Page
When I submit "username" and "password"
Then I should verify "Invalid Email or password." message displayed