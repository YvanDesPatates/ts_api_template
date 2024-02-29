import request from "supertest";

import app from "../src/app";

describe("Test app.ts", () => {
    test("Catch-all route", async () => {
        const res = await request(app).get("/")
            .expect("Content-Type", /text/)
            .expect(200)
            .expect(new RegExp("^Hello World!$"));
    });
});