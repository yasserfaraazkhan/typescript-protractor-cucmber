import { browser, by, element, ElementFinder } from 'protractor';

class HomePage {

    private BASE_URL: string = "https://openweathermap.org/";
    private searchCityTextBox: ElementFinder = element(by.xpath('//*[@placeholder="Your city name"]'));
    private searchCityButton: ElementFinder = element(by.css('button.btn.btn-orange'));
    private invalidSearchMessage : ElementFinder = element(by.css('div.alert.alert-warning'));
    private cityNameSearchResult : ElementFinder =  element(by.xpath("//*[@id='forecast_list_ul']/descendant::a[contains(@href,'city')]"));

    async loadBaseUrl() {
        await browser.get(this.BASE_URL);
    }
    /**
     * enterCityToSearch
        cityName: string
     */
    enterCityToSearch(cityName: string) {
        this.searchCityTextBox.sendKeys(cityName);
        this.searchCityButton.click();
    }

    clickOnMenuItems(menuItem: string): void {
        element(by.xpath(`//a[@href='/${menuItem}']`)).click();
    }

    async getCurrentUrl(): Promise<string> {
        const currentUrl: string = await browser.getCurrentUrl();
        return currentUrl;
    }

    async verifyMessageDisplayed(): Promise<string>{
        const displayedText = await element(by.css('div.alert.alert-warning')).getText();
        return displayedText.toLowerCase();
    }

    async verifyCityNameDiplayed(): Promise<string>{
        const text: string = await this.cityNameSearchResult.getText();
        return text.toLowerCase();
    }
}

export const homePageInstance = new HomePage()