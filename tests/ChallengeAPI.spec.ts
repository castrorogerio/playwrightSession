import { test, request } from "@playwright/test";
import { ApiClient } from "../clients/ApiClient";

test.describe("API Testing", () => {
  let apiClient: ApiClient;

  test.beforeAll(async () => {
    const requestContext = await request.newContext();
    apiClient = new ApiClient(requestContext);
  });

  test("GET All Animes", async () => {
    await apiClient.expectAnimesFieldsNotEmpty();
    await apiClient.getAnimeTitle();
  });
});
