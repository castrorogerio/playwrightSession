import { Locator, Page } from "@playwright/test";

export class FormPage {
  private readonly url: string;
  readonly titleForm: Locator;
  readonly firstName: Locator;
  readonly lastname: Locator;
  readonly mail: Locator;
  readonly countryAndTerritory: Locator;
  readonly phoneAreaCode: Locator;
  readonly phoneNumber: Locator;
  readonly companyName: Locator;
  readonly companyType: Locator;
  readonly products: Locator;
  readonly jobTitle: Locator;
  readonly areasOfWork: Locator;
  readonly checkboxTermsandConditions: Locator;
  readonly joinUs: Locator;

  constructor(private page: Page) {
    this.url =
      "https://platform.foursource.com/signup?_ga=2.105681283.189040680.1734110867-2096396957.1734110867";
    this.titleForm = page.getByRole("heading", {
      name: "Sign up to Foursource",
    });
    this.firstName = page.locator('//*[@id="mat-input-0"]');
    this.lastname = page.locator('//*[@id="mat-input-1"]');
    this.mail = page.locator('//*[@id="mat-input-2"]');
    this.countryAndTerritory = page.locator('//*[@data-qa-id="country-input"]');
    this.phoneAreaCode = page.locator('//*[@data-qa-id="phone-prefix-input"]');
    this.phoneNumber = page.locator('//*[@id="mat-input-3"]');
    this.companyName = page.locator('//*[@id="mat-input-4"]');
    this.companyType = page.locator('//*[@data-qa-id="company-sector-input"]');
    this.products = page.locator('//*[@id="mat-select-2"]');  
    this.jobTitle = page.getByRole("textbox", { name: "Job Title" });
    this.areasOfWork = page.locator('//*[@data-qa-id="areas-of-work-input"]');
    this.checkboxTermsandConditions = page.locator(
      '//*[@data-qa-id="terms-checkbox"]'
    );
    this.joinUs = page.locator('//*[@data-qa-id="submit-button"]');
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async selectCountryAndTerritory(country: string) {
    await this.countryAndTerritory.click();
    await this.countryAndTerritory
      .getByRole("option", { name: country })
      .click();
  }

  async randomOption() {
    const options = await this.page.locator("mat-option").all();
    const randomIndex = Math.floor(Math.random() * options.length);
    await options[randomIndex].click();
}

  async selectPhoneAreaCode() {
    await this.phoneAreaCode.click();
    const options = await this.page.locator("role=option").all();
    const randomIndex = Math.floor(Math.random() * options.length);
    await options[randomIndex].click();
  }

  async selectCompanyType() {
    await this.companyType.click();
    await this.randomOption();
  }

  async selectProducts() {
    await this.products.click();
    await this.randomOption();
    await this.page.keyboard.press('Escape'); //close the options
  }

  async selectAreasOfWork() {
    await this.areasOfWork.click();
    await this.randomOption();
    await this.page.keyboard.press('Escape'); //close the options
  }

  async selectTermsAndConditions() {
    await this.checkboxTermsandConditions.click();
  }

  async clickJoinUs() {
    await this.joinUs.click();
  }

  async fillForm(testUser: any) {
    //fill the form and submit
    await this.firstName.fill(testUser.firstName);
    await this.lastname.fill(testUser.lastName);
    await this.mail.fill(testUser.email);
    await this.selectCountryAndTerritory(testUser.country);
    await this.selectPhoneAreaCode();
    await this.phoneNumber.fill(testUser.phoneNumber);
    await this.companyName.fill(testUser.companyName);
    await this.selectCompanyType();
    await this.selectProducts();
    await this.jobTitle.fill(testUser.jobTitle);
    await this.selectAreasOfWork();
    await this.selectTermsAndConditions();
    await this.clickJoinUs();
};
}
