import {expect, Locator, Page} from "@playwright/test";

export class JobsPage{
    readonly url: string;
    readonly searchKeyword: Locator;
    readonly findButton: Locator;
    readonly countryCombo: Locator;
    readonly applyFiltersButton: Locator;
    readonly noResultsMessage: Locator;
    readonly jobListings: Locator;
    readonly removeCountry: Locator;
    readonly qaEngineerSave: Locator;
    readonly savedJobs: Locator


    constructor (private page: Page){
        this.url = "https://www.blip.pt/jobs/";
        this.searchKeyword = page.locator("#l-search");
        this.findButton = page.locator('#js-main-job-search')
        this.countryCombo = page.getByRole("combobox");
        this.applyFiltersButton = page.getByText("Apply filters");
        this.noResultsMessage = page.locator("div.grid.job-listing.cms-content > h3");
        this.jobListings = page.locator(".grid.job-listing.cms-content > div");
        this.removeCountry = page.locator("[aria-label='Remove item']");
        this.qaEngineerSave = page.locator("[data-jobtitle='QA Engineer (Backend)']");
        this.savedJobs = page.locator("#js-saved-jobs-page");
    }

    async goto(){
        await this.page.goto(this.url);
    }

    async validateURL(expectUrl: string){
        expect(this.url).toBe(expectUrl)
     }    

     async selectCountry(country: string) {
        await this.countryCombo.click();
        await this.page.getByRole("option", { name: country }).click();
    }

    async assertNoJobListings() {
        await expect(this.jobListings).toHaveCount(0); 
        await expect(this.noResultsMessage).toHaveText('Sorry, no jobs were found matching your criteria.');
    }

    

    
}