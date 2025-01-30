import { expect, Locator, Page } from "@playwright/test";

export class blipWebsite {
    readonly url: string;

    constructor(private page: Page) {
        this.url = "https://www.blip.pt";
    }

    async goToPage() {
        await this.page.goto(this.url);
    }

    async goToJobs() {
        await this.page.locator('#nav-d-1231').click();

        const searchForJob = this.page.locator('#job-filter');
        await expect(searchForJob).toBeVisible();
    }
}