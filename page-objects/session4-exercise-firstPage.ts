import { Locator, Page } from "@playwright/test";

export class FirstPage {
    readonly url: string;
    readonly continueButton: Locator;

    constructor(private page: Page) {
        this.url = "https://playwrightrogerio.w3spaces.com/";
        this.continueButton = page.locator("#continue-btn");
    }

    async goto() {
        await this.page.goto(this.url);
    }
}