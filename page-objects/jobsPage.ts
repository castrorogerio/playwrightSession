import { expect, Locator, Page } from "@playwright/test";

export class JobsPage {
  readonly url: string;
  readonly jobsTitle: Locator;
  readonly searchJobsKeyword: Locator;
  readonly findButton: Locator;
  readonly applyFiltersButton: Locator;
  readonly getJobsResults: Locator;
  readonly firstJobNumber: Locator;
  readonly lastJobNumber: Locator;
  readonly totalJobs: Locator;
  readonly searchJobsCountry: Locator;
  readonly searchJobsCountrySelection: Locator;
  readonly messageNoJobs: Locator;
  readonly removeCountry: Locator;
  readonly countryResultsFromList: Locator;
  readonly titleJobResultFromList: Locator;
  readonly saveJobResult: Locator;
  readonly saveJobButton: Locator;

  constructor(private page: Page, text: string) {
    this.url = "https://www.blip.pt/jobs/";
    this.jobsTitle = page.getByRole("heading", { name: `Deploy your future` });
    this.searchJobsKeyword = page.locator('input[name="search"]');
    this.findButton = page.getByRole("button", { name: "Find" });
    this.applyFiltersButton = page.getByRole("button", {
      name: "Apply filters",
    });
    this.getJobsResults = page.locator("#results > div.row > div > p");
    this.firstJobNumber = this.getJobsResults.locator("strong").nth(0);
    this.lastJobNumber = this.getJobsResults.locator("strong").nth(1);
    this.totalJobs = this.getJobsResults.locator("strong").nth(2);
    this.searchJobsCountry = page.getByRole("combobox");
    this.searchJobsCountrySelection = page
      .getByRole("listbox")
      .getByRole("option", { name: `${text}` });
    this.messageNoJobs = page.getByRole("heading", {
      name: "Sorry, no jobs were found matching your criteria.",
      exact: true,
    });
    this.removeCountry = page.locator('button[aria-label="Remove item"]');
    this.countryResultsFromList = page.locator(
      `#js-job-search-results > div > div > ul > li`
    );
    this.titleJobResultFromList = page.locator(
      `#js-job-search-results > div > div > h2 > a`
    );
    this.saveJobResult = page.locator('button[title="Save"]');
    this.saveJobButton = page.locator('#js-saved-jobs-page');
  }

  async validateUrl(expectUrl: string) {
    expect(this.url).toBe(expectUrl);
  }

  async validateJobsTitle() {
    expect(this.jobsTitle).toBeVisible();
  }

  async searchJobs(text: string) {
    await this.searchJobsKeyword.fill(text);
    await this.findButton.click();
  }

  async expectJobsResults(fisrt: number, last: number, total: number) {
    expect(this.firstJobNumber).toHaveText(`${fisrt}`);
    expect(this.lastJobNumber).toHaveText(`${last}`);
    expect(this.totalJobs).toHaveText(`${total}`);
  }

  async searchAndSelectCountry(text: string) {
    await this.searchJobsCountry.click();
    await this.page
      .getByRole("listbox")
      .getByRole("option", { name: text })
      .click();
    await this.applyFiltersButton.click();
  }

  async selectCountry(text: string) {
    await this.page
      .getByRole("listbox")
      .getByRole("option", { name: text })
      .click();
    await this.applyFiltersButton.click();
  }

  async expectNoSeachJobs() {
    expect(this.messageNoJobs).toBeVisible();
  }

  async removeCountryFilter() {
    await this.removeCountry.click();
  }

  async expectJobsResultsCountry(text: string) {
    const totalJobsNumber = await this.totalJobs.count();

    for (let i = 0; i < totalJobsNumber; i++) {
      expect(this.countryResultsFromList.nth(i)).toContainText(text);
    }
  }

  async expectJobsResultsTitle(text: string) {
    const totalJobsNumber = await this.totalJobs.count();

    for (let i = 0; i < totalJobsNumber; i++) {
      expect(this.titleJobResultFromList.nth(i)).toContainText(text);

      if (text === "QA Engineer") {
        await this.saveJobResult.nth(i).click();
      }
    }
  }

  async clickSaveJobResult() {
    await this.saveJobResult.click();
  }

    async saveJob() {
        await this.saveJobButton.click();
    }
}
