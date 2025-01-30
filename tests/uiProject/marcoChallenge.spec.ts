import { BrowserContext, Page, test } from "@playwright/test";
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
});