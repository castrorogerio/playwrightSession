import { expect, Locator, Page } from "@playwright/test";

export class MainPage {
    readonly url: string;
    readonly iframe1FirstName: Locator;
    readonly iframe1LastName: Locator;
    readonly iframe2Password: Locator;
    readonly iframe2Dob: Locator;
    readonly iframe2TomorrowDate: Locator;
    readonly iframe3SubmitButton: Locator;
    readonly iframe3Success: Locator;

    constructor(private page: Page) {
        this.url = "https://playwrightrogerio.w3spaces.com/";
        const iframe1 = page.frameLocator("#iframe1");
        this.iframe1FirstName = iframe1.locator("[data-testid='firstName'] + br + input");
        this.iframe1LastName = iframe1.locator("[data-testid='lastName'] + br + input");
        const iframe2 = page.frameLocator("#iframe2");
        this.iframe2Password = iframe2.locator("[placeholder='PasswordHere']");
        this.iframe2Dob = iframe2.locator('//label[@id="dob"]/following-sibling::input[1]');
        this.iframe2TomorrowDate = iframe2.getByTestId("tomorrowDate");
        const iframe3 = page.frameLocator("#iframe3");
        this.iframe3SubmitButton = iframe3.getByRole("button", {name:"Submit"});
        this.iframe3Success = page.locator("#success");
    }

    async validateUrl(expectUrl: string) {
        expect(this.url).toBe(expectUrl);
    };

    async validateSuccessMessage(text: string, color: string) {
        await expect(this.iframe3Success).toBeVisible();
        await expect(this.iframe3Success).toHaveText(text);
        await expect(this.iframe3Success).toHaveCSS("color", color);
    }
}