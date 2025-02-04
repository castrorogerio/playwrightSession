import { BrowserContext, expect, Page, test } from "@playwright/test";


test.describe('Challenge Mock', async () => {
    let page: Page;
    let context: BrowserContext;

    test.beforeEach(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
    });

    test('Mock API response for a new title', async () => {
        const title = 'UMDOISTRES'

        await page.route("https://api.jikan.moe/v4/anime/1011/episodes", async (route) => {
            const mockItUp = {
                pagination: {
                    last_visible_pages: 1,
                    has_next_page: false,
                },
                data: [
                    {
                        mal_id: 1,
                        url: null,
                        title: title,
                        title_japanese: "劇作家は最高だ",
                        title_romanji: "ABRAKADABRA",
                        aired: "2025-02-04T00:00:00+00:00",
                        score: 9.0,
                        filler: false,
                        recap: false,
                        forum_url: "https://www.youtube.com/watch?v=mmeLCAP74KA",
                    },
                ],
            };
            await route.fulfill({ json: mockItUp});
        });


        const verifica = await page.goto("https://api.jikan.moe/v4/anime/1011/episodes");
        const bodyResponse = await verifica?.json();

        console.log(bodyResponse);
        expect(bodyResponse.data[0].title.length).toBe(10);
    });
})