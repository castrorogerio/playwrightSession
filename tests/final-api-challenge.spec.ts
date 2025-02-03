import { test, expect, APIRequestContext, request, Page, BrowserContext } from '@playwright/test';
import { ApiClient } from '../clients/ApiClient';


test.describe('API final challenge', () => {
    let apiClient: ApiClient;
    let context: BrowserContext;
    let page: Page;

    test.beforeEach(async ({ browser }) => {
        const requestContext = await request.newContext();
        apiClient = new ApiClient(requestContext);
        context = await browser.newContext();
        page = await context.newPage();
    })

    test('Validate API response fields', async () => {
        const response = await apiClient.getAnimeEpisodes();

        const responseBody = await response.json();
        const requiredFields = ["mal_id", "url", "title", "title_japanese", "title_romanji", "aired", "filler", "recap"];

        for (const field of requiredFields) {
            expect(responseBody.data[field]).not.toBeNull();
            if (typeof responseBody.data[field] === "string") {
                expect(responseBody.data[field].trim().length).toBeGreaterThan(0);
            }
        }

        expect(responseBody.data.title).toBe("Cursed Tunnel of Lost Love");
    });


    test('Mock response with random title', async ({ }) => {
        const randomTitle = Math.random().toString(36).substring(2, 12);
        // Mock da API
        await page.route("https://api.jikan.moe/v4/anime/1011/episodes/1", async route => {
            const json = { data: [{ title: randomTitle }] };
            route.fulfill({ json });
        });

        /*  const response = await apiClient.getAnimeEpisodes();
          const jsonResponse = await response.json();
          expect(jsonResponse.data.title).toBe(randomTitle);*/

        await page.goto('https://api.jikan.moe/v4/anime/1011/episodes/1');
        await expect(page.getByText(randomTitle)).toBeVisible();
        expect(randomTitle.length).toBe(10);
    })

})