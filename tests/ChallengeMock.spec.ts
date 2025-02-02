import { BrowserContext, expect, Page, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Test Mocks", () => {
  let context: BrowserContext;
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
  });

  test("Mock API response with random title", async () => {
    const randomTitle = faker.word.adjective(10);

    await page.route(
      "https://api.jikan.moe/v4/anime/1011/episodes",
      async (route) => {
        const mockResponse = {
          pagination: {
            last_visible_page: 1,
            has_next_page: false,
          },
          data: [
            {
              mal_id: 1,
              url: null,
              title: randomTitle,
              title_japanese: "ランダムタイトル",
              title_romanji: "Random Title",
              aired: "2025-02-02T00:00:00+00:00",
              score: 5.0,
              filler: faker.datatype.boolean(),
              recap: faker.datatype.boolean(),
              forum_url: faker.internet.url(),
            },
          ],
        };
        await route.fulfill({ json: mockResponse });
      }
    );

    const response = await page.goto(
      "https://api.jikan.moe/v4/anime/1011/episodes"
    );
    const body = await response.json();
    console.log("Mocked response:", body);
    expect(body.data[0].title.length).toBe(10);
  });
});
