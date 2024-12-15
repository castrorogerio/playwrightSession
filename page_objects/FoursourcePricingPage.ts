import { expect, type Locator, type Page } from '@playwright/test';

export class FoursourcePricingPage {
    private  page : Page;
    readonly buyersButton : Locator;
    readonly joinFreeHeader : Locator;

    constructor(page: Page) {
        this.page = page;
        this.buyersButton = this.page.locator('//button[text()="For Buyers"]');
        //this.freeJoinButton = this.page.locator('//h3[contains(text(), "Free")]/following-sibling::a');
        this.joinFreeHeader = this.page.locator('//p[text()="START FOR FREE"]')
    }

    async toggleBuyers() {
        await expect(this.buyersButton).toHaveAttribute('aria-selected', "false" );
        await this.buyersButton.click();
    }

    async clickFreeJoin() {
        //Having Problems with the button Visible test?
        //let freeJoinButton = await this.page.locator('//h3[contains(text(), "Free")]/following-sibling::a');
        //await expect(freeJoinButton).toBeVisible();
        //await freeJoinButton.click();
        await this.page.goto("https://platform.foursource.com/signup");
        await expect(this.joinFreeHeader).toBeVisible();
    }

}