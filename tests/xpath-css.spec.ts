import { BrowserContext, expect, test, type Page } from '@playwright/test';

test.describe ( 'XPath and CSS', () => {
    let context: BrowserContext;
    let batatas: Page, cebolas: Page;

    test.beforeEach(async ({browser}) => {
        context = await browser.newContext();
    });

    test("use xpath", async () => {
        batatas = await context.newPage();
        await batatas.goto("https://dsportalapp.herokuapp.com/home");
        await expect(batatas.locator('//h5[@class="card-title"][contains(text(), "Array")]/following-sibling::a[1]')).toHaveText('Get Started');
    });

    test("use css", async () => {
        cebolas = await context.newPage();
        await cebolas.goto("https://dsportalapp.herokuapp.com/home");
        await expect(cebolas.locator('h5.card-title:has-text("Array") + p + a')).toHaveText('Get Started');
    });

    test.afterEach(async () => {
        await context.close();
    });
});