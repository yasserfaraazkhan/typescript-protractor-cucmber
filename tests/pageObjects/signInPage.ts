import { browser, by, element, ElementFinder, ElementHelper } from 'protractor';

class SignInPage {

    private signInLink: ElementFinder = element(by.xpath("//*[contains(@href,'/users/sign_in')]"));
    private userEmailTextBox: ElementFinder = element(by.xpath("//*[contains(@class,'input-group-addon')]/following-sibling::input[@id='user_email']"));
    private passwordTextBox: ElementFinder = element(by.xpath("//*[contains(@class,'input-group-addon')]/following-sibling::input[@id='user_password']"));
    private submitButton: ElementFinder = element(by.xpath("//div[contains(@class,'user_remember_me')]/following-sibling::input[contains(@type,'submit')]"));
    private alertLabel: ElementFinder = element(by.css("div.panel-body"));

    async clickOnSignInLink(){
        await this.signInLink.click();
    }

    async submitUserCredentials(username: string, password: string) {
        await this.userEmailTextBox.sendKeys(username);
        await this.passwordTextBox.sendKeys(password);
        await this.submitButton.click(); 
    }

    async getErrorMessageDisplayed(): Promise<string>{
        const text = await this.alertLabel.getText();
        return text.toLowerCase();
    }
}

export const signInPageInstance = new SignInPage();