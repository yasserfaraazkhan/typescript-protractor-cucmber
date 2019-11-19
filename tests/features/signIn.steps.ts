import { expect } from '../config/helpers/chai-imports';
import { defineSupportCode } from 'cucumber';
import { signInPageInstance } from "../pageObjects/signInPage";

defineSupportCode(({Given, When, Then}) => {
    Given(/ˆI am on Sign In Page$/, gotoSignInPage);
    function gotoSignInPage() {
        signInPageInstance.clickOnSignInLink();
    }
    When(/ˆI submit "([^"]*)" and "([^"]*)"$/,enterCredentials);
    function enterCredentials(username: string, password: string) {
        signInPageInstance.submitUserCredentials(username, password);
    }
    
    Then(/ˆI should verify "([^"]*)" message displayed$/, verifyErrorMessage);
    async function verifyErrorMessage(errorMessage: string) {
        await signInPageInstance.getErrorMessageDisplayed().then((text)=> {
            expect(text).to.have.string(errorMessage.toLowerCase());
        });
    }
});