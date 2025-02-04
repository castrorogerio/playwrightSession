import { BrowserContext, expect, Page, test } from "@playwright/test";
import { blipWebsite } from "../../page-objects/marco-challenge-last";

test.describe('Last Challenge', () => {
    let context: BrowserContext;
    let page: Page;
    let blipPage: blipWebsite;

    test.beforeEach(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        blipPage = new blipWebsite(page);

        await blipPage.goToPage();
    })

    test("0 - Challenge Proposed - Search QA Jobs on United Kingdom", async () => {
        await blipPage.goToJobs();
        // First option: Text to search, Second option: Country between Portugal or United Kingdom
        await blipPage.search('QA', 'United Kingdom');

        const resultsUnitedKingdom = page.locator('#results');
        await expect(resultsUnitedKingdom).toBeVisible();
        await expect(resultsUnitedKingdom).toContainText('Sorry, no jobs were found matching your criteria.'); // Check no results on search
    });

    test.only('1 - Challenge Search QA Jobs in Portugal', async () => {
        await blipPage.goToJobs();
        // First option: Text to search, Second option: Country between Portugal or United Kingdom
        await blipPage.search('QA', 'Portugal');

        const jobsResults = page.locator('#js-job-search-results');
        await expect(jobsResults).toBeVisible();

        const jobCard1 = page.locator('.card-body').first();
        await expect(jobCard1).toContainText('Portugal');

        // Save some result on fav jobs
        const save = page.locator('.btn-add-job ').first();
        await save.click();
        await page.waitForTimeout(1500);

        // Check the save jobs to see if there is any item
        const savedJobsPage = page.locator('#js-saved-jobs-page');
        await savedJobsPage.click();

        const titlePage = page.locator('.hero-heading');
        await expect(titlePage).toBeVisible();

        // Check if there is any card, if so it means some job was saved
        const jobSaved = page.locator('.card-body');
        await expect(jobSaved).toBeVisible();

        // remove all and check to assert the action was successful
        await page.locator('#btn-remove-all-jobs').click();

        await expect(jobSaved).not.toBeVisible();

        const noJobs = page.locator('#js-no-saved-jobs');
        await expect(noJobs).toBeVisible();
        await expect(noJobs).toContainText("You don't currently have any saved jobs.")
    })

    
});