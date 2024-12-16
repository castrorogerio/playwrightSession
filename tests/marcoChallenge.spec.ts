import { faker, ur } from "@faker-js/faker";
import {test, expect, Page} from "@playwright/test";
import { randomInt } from "crypto";
import { Platform } from "../pages/platform";

const userTest = {
    name: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phoneNum: randomInt(100000000, 999999999 ).toString(),
    company: faker.company.name(),
    job: faker.person.jobTitle(),
};

test.describe('Challenge number 1', () => {
    let page: Page
    let platformPage: Platform
    const url = 'https://www.foursource.com';

    test.beforeEach( async ({ browser }) => {
        page = await browser.newPage();
        platformPage = new Platform(page)

        await page.goto(url);
    })

    test('', async ({ }) => {
        await platformPage.pricingPage();
        await page.waitForTimeout(2000);

        await platformPage.buyers();
        await page.waitForTimeout(1000);

        await platformPage.gotoForm();
        await page.waitForTimeout(1000);

        await platformPage.fillForm(userTest.name, userTest.lastName, userTest.email, userTest.phoneNum, userTest.company, userTest.job);
        await page.waitForTimeout(1500);

        await platformPage.checkJoin(userTest.email);
    });
})
