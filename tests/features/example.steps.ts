import { expect } from '../config/helpers/chai-imports';
import { defineSupportCode } from 'cucumber';
import { homePageInstance } from "../pageObjects/homePage";

defineSupportCode(({ Given, When, Then }) => {
    Given(/^I am on homepage$/, givenVisitHomepage);
    function givenVisitHomepage() {
        homePageInstance.loadBaseUrl();
    }

    When(/^I enter "([^"]*)" as city name to search$/, searchInvalid);
    function searchInvalid(cityName: string) {
        homePageInstance.enterCityToSearch(cityName);
    }

    When(/^I click on "([^"]*)" from navigation menu$/, verifyNavigationbar);
    function verifyNavigationbar(menuItem: string) {
        homePageInstance.clickOnMenuItems(menuItem);
    }

    Then(/^I verify url to have "([^"]*)"$/, verifyUrlToHave);
    function verifyUrlToHave(menuItem: string) {
        homePageInstance.getCurrentUrl().then((text) => {
            expect(text.toLowerCase()).to.have.string(menuItem.toLowerCase());
        });
    }

    Then(/^I verify "([^"]*)" message is shown$/, verifyCityNotFound);
    function verifyCityNotFound(errorMessage: string) {
        homePageInstance.verifyMessageDisplayed().then((text) => {
            expect(text).to.be.equal(errorMessage.toLowerCase());
        });
    }

    Then(/^I verify searched city "([^"]*)" is shown$/, verifyCityFound);
    function verifyCityFound(cityName: string) {
        homePageInstance.verifyCityNameDiplayed().then((text) => {
            expect(text).to.have.string(cityName.toLowerCase());
        });
    }

}); 
