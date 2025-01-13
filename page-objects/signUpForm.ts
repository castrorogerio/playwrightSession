import {expect, Locator, Page} from "@playwright/test";

export class SignUpPage{
    readonly url: string;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly country: Locator;
    readonly phoneCode: Locator;
    readonly phoneNumber: Locator;
    readonly companyName: Locator;
    readonly companyType: Locator;
    readonly products: Locator;
    readonly jobTitle: Locator;
    readonly areasWork: Locator;
    readonly checkbox: Locator;
    readonly joinUsButton: Locator;
    readonly emailConfirmation: Locator;

    constructor (private page: Page){
        this.url = "https://platform.foursource.com/signup";
        this.firstName = page.locator("[formcontrolname='first_name']");
        this.lastName = page.locator("[formcontrolname='last_name']");
        this.email = page.locator("[formcontrolname='email']");
        this.country = page.locator("[formcontrolname='country']");
        this.phoneCode = page.locator("[formcontrolname='prefix_phone_number']");
        this.phoneNumber = page.locator("[formcontrolname='phone_number']");
        this.companyName = page.locator("[formcontrolname='company_name']");
        this.companyType = page.locator("[formcontrolname='company_sector']");
        this.products = page.locator("[formcontrolname='products']");
        this.jobTitle = page.locator("[formcontrolname='job_title']");
        this.areasWork = page.locator("[formcontrolname='areas']");
        this.checkbox = page.locator("[class='mat-checkbox-inner-container']");
        this.joinUsButton = page.locator("//button[@data-qa-id='submit-button']");
        this.emailConfirmation = page.locator("h3[data-qa-id='signup-verify-description1'] strong");

    }

    async validateURL(expectUrl: string){
       expect(this.url).toBe(expectUrl)
    }

    async selectCountry(countryName: string) {
        await this.country.click();
        await this.page.getByRole("option", { name: countryName }).click();
    }

    async selectPhoneCode(phoneCodeName: string) {
        await this.phoneCode.click();
        await this.page.getByRole("option", { name: phoneCodeName }).click();
    }

    async selectCompanyType(companyType: string) {
        await this.companyType.click();
        await this.page.getByRole("option", { name: companyType }).click();
    }

    async selectProducts(options: string[]) {
        await this.products.click();
        for (const option of options) {
            await this.page.getByRole("option", { name: option }).click();
        }
        await this.page.keyboard.press("Escape");
    }

    async selectArea(options: string[]) {
        await this.areasWork.click();
        for (const option of options) {
            await this.page.getByRole("option", { name: option }).click();
        }
        await this.page.keyboard.press("Escape");
    }

    async validateConfirmationEmail(expectedEmail: string) {
        await expect(this.emailConfirmation).toHaveText(expectedEmail);
    }
    

}