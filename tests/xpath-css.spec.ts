import { expect, test } from '@playwright/test';

test.describe ( 'XPath and CSS', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://dsportalapp.herokuapp.com/home");
    });

    test("use xpath", async ({ page }) => {
        await expect(page.locator('//h5[@class="card-title"][contains(text(), "Array")]/following-sibling::a[1]')).toHaveText('Get Started');
    });

    test("use css", async ({ page }) => {
        await expect(page.locator('h5.card-title:has-text("Array") + p + a')).toHaveText('Get Started');
    });
});