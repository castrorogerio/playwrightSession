import { test, Page, BrowserContext } from "@playwright/test";
import { HomePage } from "../page-objects/homePage";
import { JobsPage } from "../page-objects/jobsPage";
import { SaveJobPage } from "../page-objects/saveJobs";

test.describe("Challenge", () => {
  let context: BrowserContext;
  let page: Page;
  let homePage: HomePage;
  let jobsPage: JobsPage;
  let savedJobsPage: SaveJobPage;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    homePage = new HomePage(page);
    jobsPage = new JobsPage(page);
    savedJobsPage = new SaveJobPage(page);
    await homePage.goto();
    await homePage.acceptCookies();
    await homePage.expectBlipPage("https://www.blip.pt/");
    await homePage.expectBlipTitle();
  });

  test("Challenge", async () => {
    // Click on the "Jobs" tab in the header and validate the page
    await homePage.clickJobsButton();
    await jobsPage.validateUrl("https://www.blip.pt/jobs/");
    await jobsPage.validateJobsTitle();
    // Enter "QA" in the search bar
    await jobsPage.searchJobs("QA");
    // Get the search results
    await jobsPage.expectJobsResults(1, 6, 19);
    // Filter the results by United Kingdom
    await jobsPage.searchAndSelectCountry("United Kingdom");
    // Assert that there are no results displayed for United Kingdom
    await jobsPage.expectNoSeachJobs();
    //Change the filter to Portugal
    await jobsPage.removeCountryFilter();
    await jobsPage.selectCountry("Portugal");
    // Assert that the filtered results only contain jobs that are located in Portugal.
    await jobsPage.expectJobsResults(1, 6, 18);
    await jobsPage.expectJobsResultsCountry("Portugal");

    // Save "QA Engineer" role from the results
    await jobsPage.expectJobsResultsTitle("QA Engineer");
    // Go to the saved jobs page
    await jobsPage.saveJob();
    await savedJobsPage.validateUrl("https://www.blip.pt/jobs/saved-jobs/");
    await savedJobsPage.validateJobsTitle();
    // Assert that the saved job is displayed
    await savedJobsPage.expectSavedJob("QA Engineer");
    // Remove all saved jobs
    await savedJobsPage.removeAllJobs();
    await savedJobsPage.expectNoSavedJobs();
  });

  test.afterEach(async () => {
    await context.close();
  });
});
