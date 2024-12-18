import { expect, Locator, Page } from "@playwright/test";

export class Platform {
  private readonly url: string;
  readonly title: Locator;
  readonly mail: Locator;
  readonly validateEmailField: Locator;

  constructor(private page: Page) {
    this.url =
      `https:\/\/platform.foursource.com\/signup\/verify\/\/([-a-zA-Z0-9]{2,})$?email=${this.mail}`;
    this.title = page.getByRole('heading', {name: 'Please verify your e-mail'});
    this.mail = page.locator('//*[@data-qa-id="signup-verify-description1"]');
    this.validateEmailField = page.locator('[data-qa-id="signup-verify-description1"] strong');
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async validateEmail(text: string) {
    await expect(this.validateEmailField).toHaveText(text.toLowerCase());
 }
}
