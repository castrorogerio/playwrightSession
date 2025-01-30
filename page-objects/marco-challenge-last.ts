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
        await this.page.getByRole('combobox').click();

        const allResults = this.page.locator('#select2-l-country-results');

        if (country === 'Portugal') {
            await allResults.locator('text="Portugal"').click();
        } else if (country === 'United Kingdom') {
            await allResults.locator('text="United Kingdom"').click();
        } else {
            const error = new Error('Invalid option'); 
            console.error(error); 
            throw error;
        }
        
        await this.page.locator('#js-main-job-search').click();

        const results = await this.page.locator('#js-job-search-results');
        await expect(results).toBeVisible();
    }
}