import test, { expect } from "@playwright/test";

const userData = {
    firstName: "Daniel",
    lastName: "Paiva",
    email: "dab@ep.pt",
    country: "Portugal",
    areaCode: "Portugal (+351)",
    phoneNum: "9182712937",
    companyName: "asdfghjk",
    companyType: "qwertyui",
    products: "qwertyuio",
    jobTitle: "qwertyui",
    areasOfWork: "qwertyui",
};

test.describe("Challenge", () => {
    test("Click Pricing", async ({ page }) => {
        await page.goto("https://www.foursource.com/");


        // TODO:: Optimize code repetition
        const pricing = page.locator(".mt-s-12 > a:has-text('Pricing')");
        await pricing.click();

        const buyers = page.locator("button:has-text('For Buyers')");
        await page.waitForTimeout(1000); // This fixes an issue that does not happen on debug
        await buyers.click();

        const freeSignUp = page.locator("h3:has-text('Free') + p + div + a");
        await freeSignUp.click();
        
        // TODO:: select all items in the form and fill with "userData"

        const emailText = page.locator("h3:has-text(' We've emailed a verification link to: ') > strong");
        await expect(emailText).toHaveText(userData.email);
    });
});