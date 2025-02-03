import {Locator, Page} from "@playwright/test";

export class BlipPage{
    readonly url: string;
    readonly jobsRedirectLink: Locator;

    constructor (private page: Page){
        this.url = "https://www.blip.pt";
        this.jobsRedirectLink = page.locator("#nav-d-1231");
    }

    async goto(){
        await this.page.goto(this.url);
    }

    
}