import { expect, test } from '@playwright/test';

test.describe ( 'XPath and CSS', () => {

    test("interact with iframe", async ({ page }) => {
        await page.goto("https://www.w3schools.com/html/html_iframe.asp");
        const iframLocator = page.frameLocator('iframe[src="default.asp"]');
        await expect(iframLocator.locator('#exercisecontainer')).toHaveCount(1);
        await expect(page.locator('#exercisecontainer')).toHaveCount(1);
    });

    test("interact with shadow dom", async ({ page }) => {
        await page.goto("http://uitestingplayground.com/shadowdom");
        await page.locator("button#buttonGenerate").click();
    });
});