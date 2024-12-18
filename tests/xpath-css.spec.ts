import { BrowserContext, expect, test, type Page } from '@playwright/test';
import { DsportalappPage } from '../page-objects/xpath-css';

test.describe ( 'XPath and CSS', () => {
    let context: BrowserContext;
    let batatas: Page;
    let alhos: DsportalappPage;

    test.beforeEach(async ({browser}) => {
        context = await browser.newContext();
        batatas = await context.newPage();
        alhos = new DsportalappPage(batatas);
        await alhos.goto();
    });

    test("use xpath", async () => {
        await expect(alhos.getStarterButtonXpath).toHaveText('Get Started');
    });

    test("use css", async () => {
        await expect(alhos.getStarterButtonCss).toHaveText('Get Started');
    });

    test.afterEach(async () => {
        await context.close();
    });
});