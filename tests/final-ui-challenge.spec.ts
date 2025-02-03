import test, { BrowserContext, Page } from "@playwright/test";
import { BlipPage } from "../page-objects/blip-page";
import { faker } from "@faker-js/faker";
import { JobsPage } from "../page-objects/jobs-page";
import { SavedJobsPage } from "../page-objects/saved-jobs-page";

const formData = {
    searchKeyword: "QA"
}

test.describe('Final Challenge', () => {
    let context: BrowserContext;
    let page: Page;
    let blipPage: BlipPage;
    let jobsPage: JobsPage;
    let savedJobsPage: SavedJobsPage;

    test.beforeEach(async ({ browser }) => {
        context = await browser.newContext({
            viewport: { width: 1024, height: 768 }
        });
        page = await context.newPage();
        blipPage = new BlipPage(page);
        jobsPage = new JobsPage(page);
        savedJobsPage = new SavedJobsPage(page);

        await blipPage.goto();
    })

    test("Blip jobs search", async ({}) => {
        await blipPage.jobsRedirectLink.click();
        await page.waitForTimeout(2000);
        await jobsPage.validateURL(page.url());

        await page.waitForTimeout(2000);
        await jobsPage.searchKeyword.fill(formData.searchKeyword);
        await jobsPage.findButton.click();
        await jobsPage.selectCountry("United Kingdom");
        await jobsPage.findButton.click();
        await jobsPage.assertNoJobListings();
        await jobsPage.removeCountry.click();
        await jobsPage.selectCountry("Portugal");
        await page.waitForTimeout(2000);
        await jobsPage.applyFiltersButton.click();
        await jobsPage.qaEngineerSave.click();
        await jobsPage.savedJobs.click();
        await page.waitForTimeout(2000);

        await savedJobsPage.validateURL(page.url());
        await savedJobsPage.assertSavedJob();

        await savedJobsPage.removeJob.click();
        await savedJobsPage.assertNoSavedJobs();
    })

    
})