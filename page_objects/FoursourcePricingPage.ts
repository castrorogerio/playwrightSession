import { expect, Locator, Page } from '@playwright/test';

export class FoursourcePricingPage {
    readonly buyersButton : Locator;
    readonly joinFreeHeader : Locator;

    constructor(private page: Page) {
        this.buyersButton = this.page.locator('//button[text()="For Buyers"]');
        //this.freeJoinButton = this.page.locator('//h3[contains(text(), "Free")]/following-sibling::a');
        this.joinFreeHeader = this.page.locator('//p[text()="START FOR FREE"]')
    }

    async toggleBuyers() {
        await expect(this.buyersButton).toHaveAttribute('aria-selected', "false" );
        await this.page.waitForTimeout(1000);
        await this.buyersButton.click();
        await expect(this.buyersButton).toHaveAttribute('aria-selected', "true" );
    }

    async clickFreeJoin() {
        //Having Problems with the button Visible test?
        let freeJoinButton = await this.page.locator('//h3[contains(text(), "Free")]/following-sibling::a');
        await expect(freeJoinButton).toBeVisible();
        await freeJoinButton.click();
        await expect(this.joinFreeHeader).toBeVisible();
    }

}