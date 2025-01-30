import { Locator, Page } from "@playwright/test";

export class blipWebsite {
    readonly url: string;
    
    constructor(private page: Page) {
        this.url = "www.blip.pt";
    }
}