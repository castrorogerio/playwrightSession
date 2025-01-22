import { APIRequestContext } from "@playwright/test";

export class ApiClientChallenge {

    private requestContext: APIRequestContext;

    constructor (requestContext: APIRequestContext) {
        this.requestContext = requestContext;
    }

    async getPosts() {
        return await this.requestContext.get(`https://jsonplaceholder.typicode.com/posts`);
    }

    async deletePost(postId: number) {
        return await this.requestContext.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    }

    async postNewPost(data: object) {
        return await this.requestContext.post(`https://jsonplaceholder.typicode.com/posts`, {
            data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }


}