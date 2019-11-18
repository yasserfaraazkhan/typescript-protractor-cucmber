Feature: Sign up test case

Scenario: As a new user, I should be able to successfully be able to create an account
Given I am on Sign up page
When I enter a valid username as "new_user"
And I enter a valid email address as "email@address.com"
And I enter a valid password as "password"
And I check terms and condition checkbox
And I verify I am not a robot
And I click on create account button
Then I should see a successfull message displayed
