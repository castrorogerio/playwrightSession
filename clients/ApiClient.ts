import { APIRequestContext, expect } from "@playwright/test";

export class ApiClient {
  private requestContext: APIRequestContext;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }

  BaseURL = "https://api.jikan.moe/v4/";
  ApiAnimeEpisodeData = "anime/1011/episodes";

  async getAnimes() {
    return await this.requestContext.get(
      `${this.BaseURL}${this.ApiAnimeEpisodeData}`
    );
  }

  async expectAnimesFieldsNotEmpty() {
    const response = await this.getAnimes();

    expect(response.status()).toBe(200);
    const body = await response.json();

    body.data.forEach((anime: any) => {
      expect(anime.mal_id).toBeTruthy();
      expect(anime.title).toBeTruthy();
      expect(anime.title_japanese).toBeTruthy();
      expect(anime.title_romanji).toBeTruthy();
      expect(anime.aired).toBeTruthy();
      expect(anime.score).toBeTruthy();
      expect(anime.filler).toBeDefined();
      expect(anime.recap).toBeDefined();
      expect(anime.forum_url).toBeTruthy();
    });
  }

  async getAnimeTitle() {
    const animes = await this.getAnimes();
    const body = await animes.json();
    let animeId;

    if (body.data && Array.isArray(body.data)) {
      for (const anime of body.data) {
        if (anime.title === "Cursed Tunnel of Lost Love") {
          animeId = anime.mal_id;
          break;
        }
      }
    }

    if (!animeId) {
      throw new Error("Title not found");
    }

    console.log("animeId: ", animeId);
  }
}

