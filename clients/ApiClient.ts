import { APIRequestContext } from "@playwright/test";

export class ApiClient {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getAnimeEpisodes() {
        const BASE_URL = "https://api.jikan.moe/v4/";
        const ENDPOINT = "anime/1011/episodes/1";
        return await this.request.get(`${BASE_URL}${ENDPOINT}`);
    }
}
