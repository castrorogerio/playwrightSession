import { test, request, expect} from "@playwright/test";
import { ApiClient } from "../clients/ApiClient";


test.describe("API Testing", () => {
    let apiClient: ApiClient;

    test.beforeAll(async () => {
        const requestContext = await request.newContext();
        apiClient = new ApiClient(requestContext);
    });

    test('GET request should return 200', async () => {
        const response = await apiClient.getTodos(1);
        console.log(await response.json());
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.id).toBe(1);
        expect(body.userId).toBe(1);
        expect(body.title).toBe("delectus aut autem");
        expect(body.completed).toBe(false);
    });

    test('Post Request shoud create new resource', async () => {
        const response = await apiClient.createPost("batatas", "gratinadas", 1);
        expect (response.status()).toBe(201);
        const body = await response.json();
        expect(body.title).toBe("batatas");
        expect(body.body).toBe("gratinadas");
        expect(body.userId).toBe(1);
        const id = body.id;

        const getResponse = await apiClient.getPost(100);
        expect(getResponse.status()).toBe(200);
        const getBody = await getResponse.json();

    });

});