import { APIRequestContext } from "@playwright/test";

export class ApiClient {
    private requestContext: APIRequestContext;

    constructor(requestContext: APIRequestContext) {
        this.requestContext = requestContext;
    }

    async getTodos(id: number) {
        return await this.requestContext.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
    }

    async createPost(title: string, body: string, userid: number) {
        return await this.requestContext.post(`https://jsonplaceholder.typicode.com/posts`, {
            data: {
                title: title,
                body: body,
                userId: userid
            },
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        });
    }

    async getPost(id: number) {
        return await this.requestContext.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    }
}