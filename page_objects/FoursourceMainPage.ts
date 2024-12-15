import { expect, type Locator, type Page } from '@playwright/test';

export class FoursourceMainPage {
    private  page : Page;
    readonly pricingLocator : Locator;
    readonly pricingPageHeader : Locator

    constructor(page: Page) {
        this.page = page;
        this.pricingLocator = this.page.locator('//a[contains(text(), "Pricing")]');
        this.pricingPageHeader = this.page.locator('//h2[contains(text(), "Start Flexible Plans")]');
    }

    async goto() {
        await this.page.goto('https://www.foursource.com');
        await expect(this.pricingLocator).toBeVisible();
    }

    async openPricing() {
        await this.pricingLocator.click();
        await expect(this.pricingPageHeader).toBeVisible();
    }

}