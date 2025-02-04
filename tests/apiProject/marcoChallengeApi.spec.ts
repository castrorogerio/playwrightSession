import { test, request } from "@playwright/test";
import { ApiMarco } from "../../clients/ApiMarcoChallenge";

test.describe('Challenge Api Marco', () => {
    let api: ApiMarco;

    test.beforeAll(async () => {
        const requestContext = await request.newContext();
        api = new ApiMarco(requestContext);
    });

    test('Test requests to api, check details of info, and check title on specific element', async () => {
        await api.checkAnimeFields();
        await api.validateAnimeTitle();
    });
})