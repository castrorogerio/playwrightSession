import { Locator, Page } from '@playwright/test';

export class FourSourcePage {
private readonly url : string;
readonly titleFoursource :Locator;
readonly pricing :Locator;

constructor(private page: Page) {

    this.url = 'https://www.foursource.com/';
    this.titleFoursource = page.getByRole('heading', {name: 'The one-stop platform for apparel and textile sourcing.'});
    this.pricing = page.getByRole('link', {name: 'Pricing'});
}
    
async goto() {
    await this.page.goto(this.url);
};

async clickPricing() {
    await this.pricing.click();   
};
}

