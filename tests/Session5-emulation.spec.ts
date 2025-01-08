import { test, BrowserContext, type Page } from "@playwright/test";

test.describe("Test Emulation", () => {
    let context:BrowserContext;
    let page: Page;

    test.beforeAll(async ({browser}) => {
        context = await browser.newContext({
            viewport: { width: 1920, height: 1080},
            locale: "en-GB",
            timezoneId: "Europe/Paris",
            permissions: ["geolocation", "notifications"],
            geolocation: { longitude: -43.182365, latitude: -22.970722},
            colorScheme: "dark",
            javaScriptEnabled: true
        });
        page = await context.newPage();
    });

    test("emulation google ", async () => {
        await page.goto("https://maps.google.com");
        await page.getByLabel("Accept all").first().click();
        await page.getByLabel("Show Your Location").click();
        await page.waitForTimeout(5000);
    });

    test.afterAll(async () => {
        await context.close();
    });
});