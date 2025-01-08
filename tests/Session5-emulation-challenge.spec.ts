import { test, BrowserContext, type Page, expect } from "@playwright/test";
import { BingMapsPage } from "../page-objects/Session5-emulation-challenge";

test.describe("Test Emulation", () => {
    let context:BrowserContext;
    let page: Page;
    let bingMapsPage: BingMapsPage;

    test.beforeAll(async ({browser}) => {
        context = await browser.newContext({
            viewport: { width: 1728, height: 871},
            locale: "fr-FR",
            timezoneId: "Europe/Paris",
            permissions: ["geolocation", "notifications"],
            geolocation: { longitude: -76.632515, latitude: 25.506975},
            colorScheme: "light"
        });
        page = await context.newPage();
        bingMapsPage = new BingMapsPage(page);
    });

    test("Bing Locate Me page", async () => {
        await bingMapsPage.goto();
        await bingMapsPage.acceptCookies.click();
        await bingMapsPage.menuButton.click();
        await page.waitForTimeout(2000);
        expect(await bingMapsPage.activeThemeRadioButton.innerText()).toBe("Clair");
        await bingMapsPage.activeThemeRadioButton.press("Escape");
        await bingMapsPage.locateMeButton.click();
        await page.waitForTimeout(5000);
        expect (await bingMapsPage.locationName.innerText()).toContain("Harbour Island");
    });

    test.afterAll(async () => {
        await context.close();
    });

});