import { test, expect, type Page, BrowserContext } from '@playwright/test';
import { FoursourceMainPage } from '../page_objects/FoursourceMainPage';
import { FoursourcePricingPage } from '../page_objects/FoursourcePricingPage';
import { FoursourceSignUpPage } from '../page_objects/FoursourceSignUp';

test.describe('FourSource Challenge',() => {
    let context: BrowserContext;
    let page: Page;
    let mainPage: FoursourceMainPage;
    let pricingPage: FoursourcePricingPage;
    let signupPage: FoursourceSignUpPage;

    test.beforeEach(async ({browser}) => {
        context = await browser.newContext();
        page = await context.newPage();
        mainPage = new FoursourceMainPage(page);
        pricingPage = new FoursourcePricingPage(page);
        signupPage = new FoursourceSignUpPage(page);
    });

    test('Pricing', async ({}) => {

        //Open Pricing Page
        await mainPage.goto();
        await mainPage.openPricing();

        //Toggle Buyer Mode
        await pricingPage.toggleBuyers();
        await pricingPage.clickFreeJoin();

        //Fill Form & validate
        await signupPage.subscribe();
    });

    test.afterEach(async ({}) => {
        await page.close();
        await context.close();
    });
});