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

    test('1 - Challenge Search QA Jobs in Portugal', async () => {
        await blipPage.goToJobs();
        // First option: Text to search, Second option: Country between Portugal or United Kingdom
        await blipPage.search('QA', 'Portugal');

        const jobsResults = page.locator('#js-job-search-results');
        await expect(jobsResults).toBeVisible();

        const jobCard1 = page.locator('.card-body').first();
        await expect(jobCard1).toContainText('Portugal');
    })

    
});