import { test, expect, type Page, BrowserContext } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { randomInt } from "crypto";
import { FourSourcePage } from "../page-objects/main";
import { PricingPage } from "../page-objects/princing";
import { FormPage } from "../page-objects/form";
import { Platform } from "../page-objects/platform";

const testUser = {
  firstName: faker.person.firstName().toLowerCase(),
  lastName: faker.person.lastName().toLowerCase(),
  email: faker.internet.email().toLowerCase(),
  country: faker.location.country(),
  phoneNumber: randomInt(1000000000, 9999999999).toString(),
  companyName: faker.company.name().toLowerCase(),
  jobTitle: faker.person.jobTitle().toLowerCase()
};

test.describe("Challenge", () => {
  let context: BrowserContext;
  let page: Page;
  let foursourcePage: FourSourcePage;
  let pricingPage: PricingPage;
  let formPage: FormPage;
  let platformPage: Platform;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    foursourcePage = new FourSourcePage(page);
    pricingPage = new PricingPage(page);
    formPage = new FormPage(page);
    platformPage = new Platform(page);
    await foursourcePage.goto();
  });

  test("go to page Foursource and submit the Form", async () => {
    await expect(foursourcePage.titleFoursource).toBeVisible();

    //click on Pricing
    await foursourcePage.clickPricing();
    await expect(pricingPage.titlePricing).toBeVisible();

    //click on For Buyers
    await pricingPage.clickForBuyers();

    //confirm that For Buyers is selected
    expect(pricingPage.selectForSuppliers()).toBeTruthy();

    //confirm that the Free, Explorer, and Business plans are visible
    await expect(pricingPage.freePlan).toBeVisible();
    await expect(pricingPage.explorerPlan).toBeVisible();
    await expect(pricingPage.businessPlan).toBeVisible();

    //click on Join Now
    await pricingPage.clickJoinNow();
    await expect(formPage.titleForm).toBeVisible();

    await formPage.fillForm(testUser);

    //confirm that the email has been submitted correctly
    await expect(platformPage.title).toBeVisible();
    await platformPage.validateEmail(testUser.email);
  });

  test.afterEach(async () => {
    await context.close();
  });
});


