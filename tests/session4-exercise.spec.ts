import { BrowserContext, expect, test, Page } from '@playwright/test';
import { FirstPage } from '../page-objects/session4-exercise-firstPage';
import { MainPage } from '../page-objects/session4-exercise-mainPage';

const userData = {
    firstName: "Rogerio",
    lastName: "Castro",
    password: "123456",
    dob: "01/01/2000",
};

async function tomorrowDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toLocaleDateString();
}

test.describe('Test', () => {
    let context: BrowserContext;
    let alhos: Page;
    let firstPage: FirstPage;
    let mainPage: MainPage;

    test.beforeEach(async ({browser}) => {
        context = await browser.newContext();
        alhos = await context.newPage();
        firstPage = new FirstPage(alhos);
        mainPage = new MainPage(alhos);
        await firstPage.goto();
        await firstPage.continueButton.click();
    });

    test("exercicio", async () => {
        await mainPage.validateUrl(alhos.url());
        await mainPage.iframe1FirstName.fill(userData.firstName);
        await mainPage.iframe1LastName.fill(userData.lastName);

        await mainPage.iframe2Password.fill(userData.password);
        await mainPage.iframe2Dob.fill(userData.dob);
        await mainPage.iframe2TomorrowDate.fill(await tomorrowDate());
        await mainPage.iframe3SubmitButton.click();

        await mainPage.validateSuccessMessage("That's all for Today! :D", "rgb(0, 128, 0)");
    });

    test.afterEach(async () => {
        await context.close();
    });

});