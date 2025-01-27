import { test, expect, type Page, BrowserContext } from '@playwright/test';

test.describe('Mocking an API call', () => {

    let context: BrowserContext;
    let page: Page;

    test.beforeEach(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
    });

    test('mocks a fruit ', async () => {
        await page.route('*/**/api/v1/fruits', async route => {
            const json = [{ name: 1, id: '1' }];
            await route.fulfill({status: 404, body: JSON.stringify(json)});
        });

        await page.goto('https://demo.playwright.dev/api-mocking');
        await expect(page.getByText('Strawberry')).toBeVisible();
    });
});

test.describe('Intercepting the request and modifying it', () => {

    test('gets the json from api and adds a new fruit', async ({ page }) => {
      // Get the response and add to it
      await page.route('*/**/api/v1/fruits', async (route) => {
        const response = await route.fetch();
        const json = await response.json();
        json.push({ name: 'Tomate', id: 100 });
        // Fulfill using the original response, while patching the response body
        // with the given JSON object.
        await route.fulfill({ response, json });
      });

      // Go to the page
      await page.goto('https://demo.playwright.dev/api-mocking');

      // Assert that the new fruit is visible
      await expect(page.getByText('Tomate', { exact: true })).toBeVisible();
    });
});

test.describe('Mocking with HAR files', () => {

    test('records or updates the HAR file', async ({ page }) => {
      // Get the response from the HAR file
      await page.routeFromHAR('./hars/fruits.har', {
        url: '*/**/api/v1/fruits',
        update: true,
      });

      // Go to the page
      await page.goto('https://demo.playwright.dev/api-mocking');

      // Assert that the Playwright fruit is visible
      await expect(page.getByText('Strawberry')).toBeVisible();
    });
  });
