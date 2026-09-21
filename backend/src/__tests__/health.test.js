const request = require("supertest");
const app = require("../server");
describe("GET /api/health", () => {
    test("returns 200 and health status", async () => {
        const response = await request(app)
            .get("/api/health");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            success: true,
            message: "Sprint 12 backend is running",
        });
    });
});