const request = require("supertest");
import { app } from "../src/server/app.js";

describe("Testing the root path for express server", () => {
    test("return GET method 200", async() => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});