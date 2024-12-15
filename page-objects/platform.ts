import { Locator, Page } from "@playwright/test";

export class Platform {
  private readonly url: string;
  readonly title: Locator;
  readonly mail: Locator;

  constructor(private page: Page) {
    this.url =
      `https:\/\/platform.foursource.com\/signup\/verify\/\/([-a-zA-Z0-9]{2,})$?email=${this.mail}`;
    this.title = page.getByRole('heading', {name: 'Please verify your e-mail'});
    this.mail = page.locator('//*[@data-qa-id="signup-verify-description1"]');
  }

  async goto() {
    await this.page.goto(this.url);
  }
  
  async verifyEmail(email: string) {
    this.mail.getByText(email);
  }
}
