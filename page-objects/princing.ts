import { Locator, Page } from '@playwright/test';

export class PricingPage {
private readonly url : string;
readonly titlePricing :Locator;
readonly toggleBuyer :Locator;
readonly freePlan :Locator;
readonly explorerPlan :Locator;
readonly businessPlan :Locator;
readonly joinNow :Locator;

constructor(private page: Page) {

    this.url = 'https://www.foursource.com/pricing/';
    this.titlePricing = page.getByRole('heading', {name: 'Start Flexible Plans'});
    this.toggleBuyer = page.getByRole('tab', { name: 'For Buyers' });
    this.freePlan = page.getByRole('heading', {name: 'Free'}); 
    this.explorerPlan = page.getByRole('heading', {name: 'Explorer'});
    this.businessPlan = page.getByRole('heading', {name: 'Business'});
    this.joinNow = page.getByRole("banner").getByRole('link', {name: 'Join now'});
}
    
async goto() {
    await this.page.goto(this.url);
};

async clickForBuyers() {
    await this.toggleBuyer.click();   
};

async selectForSuppliers() {
    await this.toggleBuyer.getAttribute("aria-selected=true");
};

async clickJoinNow() {
    await this.joinNow.click();
};
}

