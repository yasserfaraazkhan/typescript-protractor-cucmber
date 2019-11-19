import { expect } from '../config/helpers/chai-imports';
import { defineSupportCode } from 'cucumber';
import { signInPageInstance } from "../pageObjects/signInPage";
import { homePageInstance } from "../pageObjects/homePage";

defineSupportCode(({Given, When, Then}) => {
    Given('I am on Sign In Page', function () {
        homePageInstance.loadBaseUrl();
        signInPageInstance.clickOnSignInLink();
      });

    When(/^I submit "([^"]*)" and "([^"]*)"$/, enterCredentials);
     function enterCredentials(username: string, password: string) {
        signInPageInstance.submitUserCredentials(username, password);
    }

    Then('I should verify {string} message displayed', async function (errorMessage: string) {
        await signInPageInstance.getErrorMessageDisplayed().then((text)=> {
            expect(text).to.have.string(errorMessage.toLowerCase());
      });
    });
});