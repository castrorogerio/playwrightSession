import { Locator, Page } from '@playwright/test';

export class PricingPage {
private readonly url : string;
readonly titlePricing :Locator;
private readonly toggleBuyer :Locator;
readonly freePlan :Locator;
readonly explorerPlan :Locator;
readonly businessPlan :Locator;
private readonly joinNow :Locator;

constructor(private page: Page) {

    this.url = 'https://www.foursource.com/pricing/';
    this.titlePricing = page.getByRole('heading', {name: 'Start Flexible Plans'});
    this.toggleBuyer = page.getByRole('tab', { name: 'For Buyers' });
    this.freePlan = page.getByRole('heading', {name: 'Free'}); 
    this.explorerPlan = page.getByRole('heading', {name: 'Explorer'});
    this.businessPlan = page.getByRole('heading', {name: 'Business'});
    this.joinNow = page.locator("h3:has-text('Free') + p + div + a");
}

    async goto() {
        await this.page.goto(this.url);
    };

    async clickForBuyers() {
        await this.page.waitForTimeout(1000);
        await this.toggleBuyer.click();
    };

    async selectForSuppliers() {
        await this.toggleBuyer.getAttribute("aria-selected=true");
    };

    async clickJoinNow() {
        await this.joinNow.click();
    };
    
}

