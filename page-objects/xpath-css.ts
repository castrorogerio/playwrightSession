import { Locator, Page } from "@playwright/test";

export class DsportalappPage {
    private readonly url: string;
    readonly getStarterButtonXpath: Locator;
    readonly getStarterButtonCss: Locator;

    constructor(private page: Page) {
        this.url = "https://dsportalapp.herokuapp.com/home";
        this.getStarterButtonXpath = page.locator('//h5[@class="card-title"][contains(text(), "Array")]/following-sibling::a[1]');
        this.getStarterButtonCss = page.locator('h5.card-title:has-text("Array") + p + a');
    }

    async goto() {
        await this.page.goto(this.url);
    };
}