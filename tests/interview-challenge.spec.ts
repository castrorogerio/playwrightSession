import test, { BrowserContext, Page } from "@playwright/test";
import { FourSourcePage } from "../page-objects/four-souce-page";
import { PricingPage } from "../page-objects/pricing-page";
import { SignUpPage } from "../page-objects/signUpForm";

const formData = {
    firstName: "Sara",
    lastName: "Batista",
    email: "teste@teste.com",
    phoneNumber: "916739918",
    companyName: "teste",
    jobTitle: "QA"
}

test.describe ('Challenge Interview', () => {
    let context: BrowserContext;
    let page: Page;
    let fourSoucePage: FourSourcePage;
    let pricingPage : PricingPage;
    let signupPage: SignUpPage;

    test.beforeEach(async ({browser}) => {
    context = await browser.newContext();
    page = await context.newPage();
    fourSoucePage = new FourSourcePage (page);  
    pricingPage = new PricingPage(page);
    signupPage = new SignUpPage(page);
    
    await fourSoucePage.goto();
    await fourSoucePage.pricingRedirectLink.click();
    await pricingPage.validateURL(page.url());
    })

    test ("Submit the form and email validation", async ({}) => {
        await pricingPage.forBuyersToggle.click();
        await pricingPage.freeJoinButton.click();

        await signupPage.firstName.fill(formData.firstName);
        await signupPage.lastName.fill(formData.lastName);
        await signupPage.email.fill(formData.email);

        await signupPage.selectCountry("Portugal");
        await signupPage.selectPhoneCode("Portugal (+351)");
        await signupPage.phoneNumber.fill(formData.phoneNumber);

        await signupPage.companyName.fill(formData.companyName);
        await signupPage.selectCompanyType("Agency or Trading House");
        await signupPage.selectProducts(["Accessories", "Apparel", "Fabrics"]);

        await signupPage.jobTitle.fill(formData.jobTitle);
        await signupPage.selectArea(["Human Resources"]);

        await signupPage.checkbox.click();
        await signupPage.joinUsButton.click();

        await signupPage.validateConfirmationEmail(formData.email);

    })
})