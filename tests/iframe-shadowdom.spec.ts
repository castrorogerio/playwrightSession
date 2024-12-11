import { expect, test, type Page }from "@playwright/test";

test.describe("Test", () => {

    test("interact with iframe", async ({ page }) => {
        await page.goto("https://www.w3schools.com/html/html_iframe.asp");
        const iframe = page.frameLocator('iframe[src="default.asp"]');
        await expect(iframe.locator('#exercisecontainer')).toBeVisible();

    });

    test("iframe exercise", async ({ page }) => {
        await page.goto("https://www.dezlearn.com/nested-iframes-example/");

        // first iframe with button
        const parentIframe = page.frameLocator('#parent_iframe');
        await expect(parentIframe.locator("#processing")).not.toBeVisible();
        await parentIframe.getByRole("button", { name: "Click Here" }).click();
        await expect(parentIframe.locator("#processing")).toBeVisible();
        await expect(parentIframe.locator("#processing")).toHaveText("Hooray..! You clicked the button from iframe 1")

        // nested iframe
        const childIframe = parentIframe.frameLocator('#iframe1');
        await expect(childIframe.locator("#processing")).not.toBeVisible();
        await childIframe.getByRole("button", { name: "Click Here" }).click();
        await expect(childIframe.locator("#processing")).toBeVisible();
        await expect(childIframe.locator("#processing")).toHaveText("Hooray..! You clicked the button from iframe 2")
    });

    test("interact with shadow dom", async ({ page }) => {
        await page.goto("http://uitestingplayground.com/shadowdom");
        await page.locator("#shadow-host > button#my-btn").click();
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});