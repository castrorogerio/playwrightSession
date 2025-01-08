import { Locator, Page } from "@playwright/test";


export class BingMapsPage {
    readonly url: string;
    readonly acceptCookies: Locator;
    readonly menuButton: Locator;
    readonly activeThemeRadioButton: Locator;
    readonly locateMeButton: Locator;
    readonly locationName: Locator;

    constructor(private page: Page) {
        this.url = "https://www.bing.com/maps";
        this.acceptCookies = page.locator("button#bnp_btn_accept");
        this.menuButton = page.locator("#id_sc");
        this.activeThemeRadioButton = page.locator("div#hbradiobtn > a[aria-checked='true'] span");
        this.locateMeButton = page.locator("button.locateMeBtn");
        this.locationName = page.locator("div.geochainContainer a[data-index='1']");

    }

    async goto() {
        await this.page.goto(this.url);
    }







}