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

    async search(roleToSearch: any, country: any) {
        // Fill the search box with whatever you want and select the country
        await this.page.locator('#l-search').click();
        await this.page.locator('#l-search').fill(roleToSearch);

        await this.page.getByPlaceholder('Country').click();
        await this.page.waitForTimeout(1500);

        if (country === 'Portugal') {
            await this.page.getByRole('option', { name: 'Portugal' }).click();
        } else if (country === 'United Kingdom') {
            await this.page.getByRole('option', { name: 'United Kingdom' }).click();;
        } else {
            const error = new Error('Invalid option'); 
            console.error(error); 
            throw error;
        }

        await this.page.locator('#js-main-job-search').click();
    }
}