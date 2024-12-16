import { expect, type Locator, type Page } from '@playwright/test';

interface FormData {
    firstName   : string,
    lastName    : string,
    email       : string,
    country     : string,
    phoneAreaCode   : string,
    phoneNumber     : string,
    companyName : string,
    companyType : string,
    products    : string,
    jobTitle    : string,
    areaWork    : string,
}

const filledData : FormData = {
    firstName   : "Jose",
    lastName    : "Silva",
    email       : "jose.silva.sony.ps4@gmail.com",
    country     : 'Portugal',
    phoneAreaCode   : 'Portugal',
    phoneNumber     : "999999990",
    companyName : "Sony Pictures",
    companyType : "Service Provider",
    products    : "Design",
    jobTitle    : "Janitor",
    areaWork    : "Sales",

}


export class FoursourceSignUpPage {
    private  page : Page;
    readonly firstNameLocator : Locator;
    readonly lastNameLocator : Locator;
    readonly emailLocator : Locator;
    readonly countryLocator : Locator;
    readonly phoneAreaCodeLocator : Locator;
    readonly phoneNumberLocator : Locator;
    readonly companyNameLocator : Locator;
    readonly companyTypeLocator : Locator;
    readonly productsLocator : Locator;
    readonly jobTitleLocator : Locator;
    readonly areaWorkLocator : Locator;
    readonly acceptTermsLocator: Locator;
    readonly joinButtonLocator: Locator;


    constructor(page: Page) {
        this.page = page;
        this.acceptTermsLocator = this.page.locator('//mat-checkbox[@formcontrolname="terms"]');
        this.joinButtonLocator = this.page.locator('//button[@type="submit"]');

        //Simple and Clean
        this.firstNameLocator = this.page.locator('//input[@id="mat-input-0"]');
        this.lastNameLocator = this.page.locator('//input[@id="mat-input-1"]');
        this.emailLocator = this.page.locator('//input[@id="mat-input-2"]');
        this.phoneNumberLocator = this.page.locator('//input[@id="mat-input-3"]');
        this.companyNameLocator = this.page.locator('//input[@id="mat-input-4"]');
        this.jobTitleLocator = this.page.locator('//input[@id="mat-input-5"]');

        this.companyTypeLocator = this.page.locator('//mat-select[@id="mat-select-0"]');
        this.productsLocator = this.page.locator('//mat-select[@id="mat-select-2"]');
        this.areaWorkLocator = this.page.locator('//mat-select[@id="mat-select-4"]');

        //Accurate and Dirty
        this.countryLocator = this.page.locator('//ng-select[@formcontrolname="country"]');
        this.phoneAreaCodeLocator = this.page.locator('//ng-select[@formcontrolname="prefix_phone_number"]');

    }

    async fillForm() {
        await this.firstNameLocator.fill(filledData.firstName);
        await this.lastNameLocator.fill(filledData.lastName);
        await this.emailLocator.fill(filledData.email);
        await this.phoneNumberLocator.fill(filledData.phoneNumber);

        await this.countryLocator.getByRole("textbox").fill(filledData.country);
        await this.countryLocator.getByRole("option").click();

        await this.phoneAreaCodeLocator.getByRole("textbox").fill(filledData.phoneAreaCode);
        await this.phoneAreaCodeLocator.getByRole("option").click();

        await this.companyNameLocator.fill(filledData.companyName);
        //let companyNameSelector = this.page.locator('//div[@id="mat-autocomplete-0"]/descendant::span[@class="mat-option-text"]/..');
        let companyNameSelector = await this.page.locator('mat-option:has-text("' + filledData.companyName + '")');
        await companyNameSelector.click();

        /*
        await this.companyTypeLocator.click();
        let companyTypeSelector = this.page.locator('//div[@id="mat-select-0-panel"]/descendant::span[text(), "'+ filledData.companyType +'")]');
        await companyTypeSelector.click();
        */
        
        await this.jobTitleLocator.fill(filledData.jobTitle);

        //await page.locator('mat-select').click();
        //await page.locator(`mat-option:has-text("${desiredValue}")`).click();

        await this.areaWorkLocator.click();
        let areaWorkSelector = await this.page.locator('mat-option:has-text("' + filledData.areaWork + '")');
        await areaWorkSelector.click();
        await this.page.mouse.click(100,0);

        await this.acceptTermsLocator.click();
        await this.joinButtonLocator.click();

    }

    async subscribe() {

        await this.fillForm();
        const captchaPresent = (await this.page.$(".g-recaptcha")) == null;
        if(captchaPresent) {
            this.page.reload(); 
            await this.subscribe();
        }
        else {
            //Verify Email
            let messageLocator = await this.page.locator('//strong');
            expect(messageLocator).toHaveText(filledData.email);
        };

    }
}