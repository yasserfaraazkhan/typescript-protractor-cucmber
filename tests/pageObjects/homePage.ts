import { browser, by, element, ElementFinder } from 'protractor';

class HomePage {

    private BASE_URL: string = "https://openweathermap.org/";
    private searchCityTextBox: ElementFinder= element(by.xpath('//*[@placeholder="Your city name"]'));
    private searchCityButton: ElementFinder = element(by.css('button.btn.btn-orange'));

    async loadBaseUrl() {
        await browser.get(this.BASE_URL);
    }
    /**
     * enterCityToSearch
        cityName: string
     */
    public async enterCityToSearch(cityName: string) {
        this.searchCityTextBox.sendKeys(cityName);
        this.searchCityButton.click();
    }

}

export const homePageInstance = new HomePage()