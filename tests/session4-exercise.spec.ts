import { expect, test } from '@playwright/test';

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

    test.beforeEach(async ({page}) => {
        await page.goto("https://playwrightrogerio.w3spaces.com/");
        await page.locator("#continue-btn").click();
    });

    test("exercicio", async ({page}) => {
        const iframe1 = page.frameLocator("#iframe1");
        await iframe1.locator("[data-testid='firstName'] + br + input").fill(userData.firstName);
        //await iframe1.locator('//label[@data-testid="firstName"]/following-sibling::input[1]').fill("Rogerio");
        await iframe1.locator("[data-testid='lastName'] + br + input").fill(userData.lastName);
        //await iframe1.locator('//label[@data-testid="lastName"]/following-sibling::input').fill("Castro");

        const iframe2 = page.frameLocator("#iframe2");
        await iframe2.getByPlaceholder("PasswordHere").fill(userData.password);
        await iframe2.locator('//label[@id="dob"]/following-sibling::input[1]').fill(userData.dob);
        //await iframe2.locator('#dob + br + input');
        await iframe2.getByTestId("tomorrowDate").fill(await tomorrowDate());

        const iframe3 = page.frameLocator("#iframe3");
        await iframe3.getByRole("button", {name:"Submit"}).click();

        await expect(page.locator("#success")).toBeVisible();
        await expect(page.locator("#success")).toHaveText("That's all for Today! :D");
        await expect(page.locator("#success")).toHaveCSS("color", "rgb(0, 128, 0)");
    });

    test.afterEach(async ({page}) => {
        await page.close();
    });

});