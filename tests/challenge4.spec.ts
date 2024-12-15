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
    });

    test('Pricing', async ({}) => {

        //Open Pricing Page
        mainPage = new FoursourceMainPage(page);
        await mainPage.goto();
        await mainPage.openPricing();

        //Toggle Buyer Mode
        pricingPage = new FoursourcePricingPage(page);
        await pricingPage.toggleBuyers();
        await pricingPage.clickFreeJoin();

        //Fill Form & validate
        signupPage = new FoursourceSignUpPage(page);
        await signupPage.fillForm();
    });

    test.afterEach(async ({}) => {
        await page.close();
        await context.close();
    });
});