import {Locator, Page} from "@playwright/test";

export class FourSourcePage{
    readonly url: string;
    readonly pricingRedirectLink: Locator;

    constructor (private page: Page){
        this.url = "https://www.foursource.com/";
        this.pricingRedirectLink = page.locator("//a[text()='Pricing']");
    }

    async goto(){
        await this.page.goto(this.url);
    }
}