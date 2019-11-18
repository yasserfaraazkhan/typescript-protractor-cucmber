import { expect } from '../config/helpers/chai-imports';
import { defineSupportCode } from 'cucumber';
import { browser, by, element } from 'protractor';

class HomePage {

    private searchCityTextBox = element(by.xpath('//*[@placeholder="Your city name"]'));
    /**
     * enterCityToSearch
        cityName: string
     */
    public async enterCityToSearch(cityName: string) {
        this.searchCityTextBox.sendKeys(cityName);
        await element(by.css('button.btn.btn-orange')).click();
    }
}

export const homePageInstance = new HomePage()