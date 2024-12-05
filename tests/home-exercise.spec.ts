import { expect, test, type Page }from "@playwright/test";
import { faker } from '@faker-js/faker';

/*
NOTAS INTERESSANTES:
- Uso de objectos para guardar dados de testes
- Uso de funções para encapsular ações
- Faker para gerar dados de teste

MELHORIAS:
- Uso de before each para registo evita erro na validaçao da row (falha na segunda execuçao)
*/

const testUser = {
    firstName: "Snoopy",
    lastName: "Dog",
    email: faker.internet.email(),
    password: "Snoopy123"
};

const testContact = {
    firstName: "Snoopy",
    lastName: "Dog",
    birthdate: "1997-12-25",
    email: "kemokox372@ikowat.com",
    phone: "258741963",
    street1: "Rua Nova 4",
    street2: "",
    city: "Porto",
    stateProvince: "Porto",
    postalCode: "12345",
    country: "Portugal"
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
        await page.getByRole("textbox", {name: "First Name"}).fill(testContact.firstName);
        await page.getByRole("textbox", {name: "Last Name"}).fill(testContact.lastName);
        await page.getByRole("textbox", {name: "Date of Birth:"}).fill(testContact.birthdate);
        await page.getByRole("textbox", {name: "Email"}).fill(testContact.email);
        await page.getByRole("textbox", {name: "Phone"}).fill(testContact.phone);
        await page.getByRole("textbox", {name: "Address 1"}).fill(testContact.street1);
        await page.getByRole("textbox", {name: "City"}).fill(testContact.stateProvince);
        await page.getByRole("textbox", {name: "State or Province"}).fill(testContact.city);
        await page.getByRole("textbox", {name: "Postal Code"}).fill(testContact.postalCode);
        await page.getByRole("textbox", {name: "Country"}).fill(testContact.country);

        //Submit row

        await page.getByRole("button", { name: "Submit" }).click();
        await expect(page.locator("h1")).toHaveText("Contact List");

        // Click row
        const rowName = page.getByRole('cell', { name: testContact.firstName });
        await rowName.click();

        // Validate row
        await expect(page.locator("h1")).toHaveText("Contact Details");

        await expect(page.locator('#firstName')).toHaveText(testContact.firstName);
        await expect(page.locator('#lastName')).toHaveText(testContact.lastName);
        await expect(page.locator('#birthdate')).toHaveText(testContact.birthdate);
        await expect(page.locator('#email')).toHaveText(testContact.email);
        await expect(page.locator('#phone')).toHaveText(testContact.phone);
        await expect(page.locator('#street1')).toHaveText(testContact.street1);
        await expect(page.locator('#street2')).toHaveText(testContact.street2);
        await expect(page.locator('#city')).toHaveText(testContact.city);
        await expect(page.locator('#stateProvince')).toHaveText(testContact.stateProvince);
        await expect(page.locator('#postalCode')).toHaveText(testContact.postalCode);
        await expect(page.locator('#country')).toHaveText(testContact.country);
    });
});