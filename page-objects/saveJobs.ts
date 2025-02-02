import { expect, Locator, Page } from "@playwright/test";

export class SaveJobPage {
  readonly url: string;
  readonly saveJobsTitle: Locator;
  readonly titleJobSaved: Locator;
  readonly removeAllButton: Locator;
  readonly messageNoJobs: Locator;

  constructor(private page: Page) {
    this.url = "https://www.blip.pt/jobs/saved-jobs/";
    this.saveJobsTitle = page.getByRole("heading", { name: `Saved Jobs` });
    this.titleJobSaved = page.locator("#js-job-list > div > div > h2 > a");
    this.removeAllButton = page.locator('button[aria-label="Remove all"]');
    this.messageNoJobs = page.getByText("You don't currently have any saved jobs. But don't worry - you can save any job when you view it to this list.");
  }

  async validateUrl(expectUrl: string) {
    expect(this.url).toBe(expectUrl);
  }

  async validateJobsTitle() {
    expect(this.saveJobsTitle).toBeVisible();
  }

  async expectSavedJob(text: string) {
    expect(this.titleJobSaved).toContainText(text);
  }

    async removeAllJobs() {
        await this.removeAllButton.click();
    }

    async expectNoSavedJobs() {
        expect(this.messageNoJobs).toBeVisible();
    }
}
