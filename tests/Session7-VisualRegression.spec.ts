import { BrowserContext, expect, Page, test } from "@playwright/test";

test.describe("Testing visual regression", () => {
    let context: BrowserContext;
    let page: Page;

    test.beforeEach(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
    });

    test("Visual comparison of homepage", async () => {
        await page.goto("https://www.foursource.com/");
        await expect(page).toHaveScreenshot({
            mask: [page.locator('[aria-roledescription="carousel"]')]
        });
    });

    test("Visual comparison of login", async () => {
        await page.goto("https://platform.foursource.com/auth");
        await expect(page).toHaveScreenshot({
            mask: [page.locator('#fc_frame')]
        });
    });

});