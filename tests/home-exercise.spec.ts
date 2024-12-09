import { expect, test, type Page }from "@playwright/test";
import { faker } from '@faker-js/faker';

const testUser = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    birthdate: faker.date.past(),
    phone: faker.phone.phoneNumber(),
    street1: faker.address.streetName(),
    street2: faker.address.secondaryAddress(),
    city: faker.address.city(),
    stateProvince: faker.address.state(),
    postalCode: faker.address.zipCode(),
    country: faker.address.country()
};

test.describe("Contact List App Tests", () => {

    test.beforeEach("register", async ({ page }) => {

        // go to the page
        await page.goto("https://thinking-tester-contact-list.herokuapp.com/login");
        await expect(page.locator("h1")).toHaveText("Contact List App");

        // create locator for new signup and click
        const signUp = page.getByRole("button", {name: "Sign up"});
        await signUp.click();

        //create user and submit
        await expect(page.locator("h1")).toHaveText("Add User");
        await page.getByRole("textbox", {name: "First Name"}).fill(testUser.firstName);
        await page.getByRole("textbox", {name: "Last Name"}).fill(testUser.lastName);
        await page.getByRole("textbox", {name: "Email"}).fill(testUser.email);
        await page.getByRole("textbox", {name: "Password"}).fill(testUser.password);

        await page.getByRole("button", { name: "Submit" }).click();

        await expect(page.locator("h1")).toHaveText("Contact List");
    });

    test("should be able to logout", async ({ page }) => {
        await page.getByRole("button", { name: "Logout" }).click();
        await expect(page.locator("h1")).toHaveText("Contact List App");
    });

    test("should be able to insert one contact and Validate that contact", async ({ page }) => {
        //Insert one row
        await page.getByRole("button", {name: "Add a New Contact"}).click();
        await expect(page.locator("h1")).toHaveText("Add Contact");

        // fill contact form
        await page.getByRole("textbox", {name: "First Name"}).fill(testUser.firstName);
        await page.getByRole("textbox", {name: "Last Name"}).fill(testUser.lastName);
        await page.getByRole("textbox", {name: "Date of Birth:"}).fill(testUser.birthdate);
        await page.getByRole("textbox", {name: "Email"}).fill(testUser.email);
        await page.getByRole("textbox", {name: "Phone"}).fill(testUser.phone);
        await page.getByRole("textbox", {name: "Address 1"}).fill(testUser.street1);
        await page.getByRole("textbox", {name: "City"}).fill(testUser.stateProvince);
        await page.getByRole("textbox", {name: "State or Province"}).fill(testUser.city);
        await page.getByRole("textbox", {name: "Postal Code"}).fill(testUser.postalCode);
        await page.getByRole("textbox", {name: "Country"}).fill(testUser.country);

        //Submit row

        await page.getByRole("button", { name: "Submit" }).click();
        await expect(page.locator("h1")).toHaveText("Contact List");

        // Click row
        const rowName = page.getByRole('cell', { name: testUser.firstName });
        await rowName.click();

        // Validate row
        await expect(page.locator("h1")).toHaveText("Contact Details");

        await expect(page.locator('#firstName')).toHaveText(testUser.firstName);
        await expect(page.locator('#lastName')).toHaveText(testUser.lastName);
        await expect(page.locator('#birthdate')).toHaveText(testUser.birthdate);
        await expect(page.locator('#email')).toHaveText(testUser.email);
        await expect(page.locator('#phone')).toHaveText(testUser.phone);
        await expect(page.locator('#street1')).toHaveText(testUser.street1);
        await expect(page.locator('#street2')).toHaveText(testUser.street2);
        await expect(page.locator('#city')).toHaveText(testUser.city);
        await expect(page.locator('#stateProvince')).toHaveText(testUser.stateProvince);
        await expect(page.locator('#postalCode')).toHaveText(testUser.postalCode);
        await expect(page.locator('#country')).toHaveText(testUser.country);
    });
});