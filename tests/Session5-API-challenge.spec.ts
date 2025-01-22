import { expect, test, request } from "@playwright/test";
import { ApiClientChallenge } from "../clients/ApiClientChallenge";
import exp from "constants";

test.describe("API Testing", () => {
    let apiClient: ApiClientChallenge;

    test.beforeAll(async ({}) => {
        const requestContext = await request.newContext();
        apiClient = new ApiClientChallenge(requestContext);
    });

    test("GET REQUEST should return posts", async () => {
        const getResponse = await apiClient.getPosts();
        //expect(response.status()).toBe(200);
        expect(getResponse.ok()).toBeTruthy();

        const posts = await getResponse.json();
        console.log(posts);
        let postId;

        for (const post of posts) {
            if (post.title === "qui est esse") {
                postId = post.id;
                break;
            }
        }

        if (!postId) {
            throw new Error("Post not found");
        }

        console.log("postId: ", postId);

        const deleteResponse = await apiClient.deletePost(postId);
        expect(deleteResponse.ok()).toBeTruthy();

        const data = [{
            title: "batatas",
            body: "gratinadas",
            userId: 1
        }]

        const postResponse = await apiClient.postNewPost(data);
        expect(postResponse.ok()).toBeTruthy();

    });

});