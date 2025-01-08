import { expect, Locator, Page } from "@playwright/test";
import exp from "constants";

export class Platform  {
    readonly title: Locator;
    readonly pricingLink: Locator;
    readonly forBuyers: Locator;
    readonly joinButton: Locator;

    readonly name: Locator;
    readonly lastname: Locator;
    readonly email: Locator;
    readonly countryAndTerritory: Locator;
    readonly phoneAreaCode: Locator;
    readonly phoneNumber: Locator;
    readonly companyName: Locator;
    readonly companyType: Locator;
    readonly products: Locator;
    readonly jobTitle: Locator;
    readonly areasOfWork: Locator;
    readonly checkboxTermsandConditions: Locator;
    readonly joinUs: Locator;

    readonly checker: Locator
    readonly batatas: Locator;

    constructor(private page: Page) {
        this.pricingLink = page.getByRole('link', {name: 'Pricing'});
        this.forBuyers = page.getByRole('tab', { name: 'For Buyers' });
        this.joinButton = page.getByRole('link', { name: 'Join now' }).nth(1);

        this.name = page.locator('//*[@id="mat-input-0"]');
        this.lastname = page.locator('//*[@id="mat-input-1"]');
        this.email = page.locator('//*[@id="mat-input-2"]');
        this.countryAndTerritory = page.locator('//*[@data-qa-id="country-input"]');
        this.phoneAreaCode = page.locator('//*[@data-qa-id="phone-prefix-input"]');
        this.phoneNumber = page.locator('//*[@id="mat-input-3"]');
        this.companyName = page.locator('//*[@id="mat-input-4"]');
        this.companyType = page.locator('//*[@data-qa-id="company-sector-input"]');
        this.products = page.locator('//*[@id="mat-select-2"]');
        this.jobTitle = page.getByRole("textbox", { name: "Job Title" });
        this.areasOfWork = page.locator('//*[@data-qa-id="areas-of-work-input"]');
        this.checkboxTermsandConditions = page.locator('//*[@data-qa-id="terms-checkbox"]');
        this.joinUs = page.locator('//*[@data-qa-id="submit-button"]');

        this.checker = page.locator('//*[@data-qa-id="signup-verify-description1"]');

        this.batatas = page.locator('button.Mui-selected', { hasText: 'For Buyers' });
    }

    async pricingPage() {
        await this.pricingLink.click();

        // Verification
        const curruntUrl = this.page.url();
        const expectedUrl = 'https://www.foursource.com/pricing/';

        await expect(curruntUrl).toBe(expectedUrl);
    }

    async buyers() {
        await this.forBuyers.click();
        expect(this.batatas).toHaveAttribute("aria-selected", "true")
    }

    async gotoForm() {
        await this.joinButton.click();

        const title = await this.page.getByRole('heading', { name: 'Sign up to Foursource' });
        await expect(title).toBeVisible();
    }

    async fillForm(firstName, lastname, email, number, compName, jobrole) {
        await this.name.fill(firstName);
        await this.lastname.fill(lastname);
        await this.email.fill(email);

        await this.countryAndTerritory.click();
        await this.countryAndTerritory.getByRole("option", { name: 'Portugal' }).click();

        await this.phoneAreaCode.click();
        await this.phoneAreaCode.getByRole('option', { name: 'PT Portugal (+351)' }).click();

        await this.phoneNumber.fill(number);
        await this.companyName.fill(compName);

        await this.companyType.click();
        await this.page.getByText('Agency or Trading House', { exact: true }).click();
        await this.page.keyboard.press('Escape');

        await this.products.click();
        await this.page.getByText('Accessories').click();
        await this.page.keyboard.press('Escape');

        await this.jobTitle.fill(jobrole);

        await this.areasOfWork.click();
        await this.page.getByText('Accounting & Finance').click();
        await this.page.keyboard.press('Escape');

        await this.checkboxTermsandConditions.click();

        await this.joinUs.click();
    }

    async checkJoin(email) {
        await expect(this.checker).toContainText(email);
    }
}