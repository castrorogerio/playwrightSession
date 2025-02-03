import {expect, Locator, Page} from "@playwright/test";

export class SavedJobsPage{
    readonly url: string;
    readonly searchKeyword: Locator;
    readonly savedJob: Locator;
    readonly removeJob: Locator;
    readonly savedJobsSection: Locator;


    constructor (private page: Page){
        this.url = "https://www.blip.pt/jobs/saved-jobs/";
        this.savedJob = page.locator("[data-jobtitle='QA Engineer (Backend)']");
        this.removeJob = page.locator("//button[@id='btn-remove-all-jobs']");
        this.savedJobsSection = page.locator("#js-saved-jobs");
    }

    async goto(){
        await this.page.goto(this.url);
    }

    async validateURL(expectUrl: string){
        expect(this.url).toBe(expectUrl)
     } 


    async assertSavedJob() {
        await expect(this.savedJob).toBeVisible(); 
    }

     async assertNoSavedJobs() {
        await expect(this.savedJobsSection).toHaveClass(/d-none/); 
    }    
}