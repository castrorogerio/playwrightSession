import { APIRequestContext, expect } from "@playwright/test";
import { throws } from "assert";

export class ApiMarco {
    private requestContext: APIRequestContext;
    constructor(requestContext: APIRequestContext) {
        this.requestContext = requestContext;
    }

    url = "https://api.jikan.moe/v4/";
    endpoint = "anime/1011/episodes";

    async getAnimes() {
        return await this.requestContext.get(`${this.url}${this.endpoint}`);
    }

    async validateAnimeTitle() {
        const animes = await this.getAnimes();
        const list = await animes.json();

        let animeTarget;

        if (list.data && Array.isArray(list.data)) {
            for (const i of list.data) {
                if (i.title === 'Cursed Tunnel of Lost Love') {
                    animeTarget = i.mal_id;
                    break;
                }
                
            }
        } else if (!animeTarget) {
            throw new Error('Anime or title does not exist!!');
        }
    }

    async checkAnimeFields() {
        const response = await this.getAnimes();
        expect(response.ok()).toBeTruthy();

        const bodyResponse = await response.json();

        bodyResponse.data.forEach((anime: any) => {
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
}