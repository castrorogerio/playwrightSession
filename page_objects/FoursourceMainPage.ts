import { expect, Locator, Page } from '@playwright/test';

export class FoursourceMainPage {
    readonly pricingLocator : Locator;
    readonly pricingPageHeader : Locator

    constructor(private page: Page) {
        this.pricingLocator = page.locator('//a[contains(text(), "Pricing")]');
        this.pricingPageHeader = page.locator('//h2[contains(text(), "Start Flexible Plans")]');
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