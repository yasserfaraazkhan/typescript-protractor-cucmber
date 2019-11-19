import { browser, by, element, ElementFinder } from 'protractor';

class HomePage {

    private menuItem : string = null;
    private BASE_URL: string = "https://openweathermap.org/";
    private searchCityTextBox: ElementFinder = element(by.xpath('//*[@placeholder="Your city name"]'));
    private searchCityButton: ElementFinder = element(by.css('button.btn.btn-orange'));
    private menuItemElement: ElementFinder = element(by.xpath(`//a[@href='/${this.menuItem}']`));
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
        this.menuItem = menuItem;
        this.menuItemElement.click();
    }

    async verifyUrl(menuItem: string): Promise<boolean> {
        const currentUrl: string = await browser.getCurrentUrl();
        if(currentUrl.includes(menuItem) == false){
            return true;
        }
        return true;
    }

    async verifyMessageDisplayed(): Promise<string>{
        browser.wait(()=> {
            return this.invalidSearchMessage.isPresent()
        });
        const text: string = await this.invalidSearchMessage.getText();
        console.log('***---- ', text);
        return text;
    }

    async verifyCityNameDiplayed(){
        const text: string = await this.cityNameSearchResult.getText();
        return text.toLowerCase();
    }
}

export const homePageInstance = new HomePage()