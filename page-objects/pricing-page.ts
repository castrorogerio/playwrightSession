import {expect, Locator, Page} from "@playwright/test";

export class PricingPage{
    readonly url: string;
    readonly forBuyersToggle: Locator;
    readonly freeJoinButton: Locator;

    constructor (private page: Page){
        this.url = "https://www.foursource.com/pricing/";
        this.forBuyersToggle = page.getByRole("tab", {name: "For Buyers"});
        this.freeJoinButton = page.locator("//div[h3[text()='Free']]//a[text()='Join now']");

    }

    async validateURL(expectUrl: string){
       expect(this.url).toBe(expectUrl)
    }
}