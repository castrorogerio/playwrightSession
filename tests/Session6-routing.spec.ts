import { BrowserContext, expect, Page, test } from "@playwright/test";

test.describe('Test Mocks', () => {
    let context: BrowserContext;
    let page: Page;

    test.beforeEach(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
    });

    test("Listen to Requests", async () => {
        page.on('request', request =>  console.log(request.url()));
        page.on('response', response => console.log(response.url()));
        await page.goto('https://www.letsgetchecked.com/');
    });

    test("Block Images", async () => {
        await page.route('**/*.{png,jpg,jpeg,svg}', route => route.abort());
        await page.goto('https://www.google.com/');
    });

    test("block css", async () => {
        await page.route('**/*.css', route => route.abort());
        await page.goto('https://www.letsgetchecked.com/');
    });

    test("Access request data", async () => {

        await page.route('**/v4/top/anime', route => {
            console.log(route.request().url());
            route.continue();
        });

        await page.goto('https://playwrightrogerio.w3spaces.com/anime.html');
        await page.click("#continue-btn");
    });

    test("Mock request data", async () => {
        const narutoData  = require('../json/naruto.json');
        await page.route('**/v4/top/anime', route => {
            route.fulfill({
                status: 404,
                body: JSON.stringify(narutoData)
            });
        });
        await page.goto('https://playwrightrogerio.w3spaces.com/anime.html');
        await page.click("#continue-btn");
        expect(await page.locator('.anime-card > h2').textContent()).toContain('Naruto');
    });

    test("block rquest data", async () => {
        await page.route('**/v4/top/anime', route => route.abort());
        await page.goto('https://playwrightrogerio.w3spaces.com/anime.html');
        await page.click("#continue-btn");
        expect(await page.locator('.anime-card > h2').textContent()).toContain('Naruto');
    });

    test.afterEach(async () => {
        await page.close();
        await context.close();
    });

});