import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    readonly url: string;
    readonly blipTitle: Locator;
    readonly jobsLink: Locator;
    readonly getCookies: Locator;
    readonly allowCookies: Locator;
    readonly confirmMyChoices: Locator;

    constructor(private page: Page) {
        this.url = "https://www.blip.pt/";
        this.blipTitle = page.getByRole('heading', {name: `code for_ [greatness]`});
        this.jobsLink = page.getByRole('link', { name: 'Jobs', exact: true })
        this.allowCookies = page.getByRole('button', { name: 'Allow necessary cookies only' })
        this.confirmMyChoices = page.getByRole('button', {name: 'Confirm my choices'});
        this.getCookies = page.getByRole("alertdialog", {name: 'We value your privacy'});
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async expectBlipPage(expectUrl: string) {
        expect(this.url).toBe(expectUrl);
    }

    async expectBlipTitle() {
        expect(this.blipTitle).toBeVisible();
    }

    async clickJobsButton() {
        await this.jobsLink.click();
    }

    async acceptCookies() {
        await this.getCookies.waitFor({state: 'visible'});
        await this.allowCookies.click();
        //await this.confirmMyChoices.click();
    }
}