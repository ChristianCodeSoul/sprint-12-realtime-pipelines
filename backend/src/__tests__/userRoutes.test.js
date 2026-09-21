const request = require("supertest");
const app = require("../server");
const User = require("../models/User");
jest.mock("../models/User");

describe("User API", () => {
    test("POST /api/users creates a user successfully", async () => {
        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue({
            _id: "user-2",
            name: "New User",
            email: "new@example.com",
        });
        const response = await request(app)
            .post("/api/users")
            .send({
                name: "New User",
                email: "new@example.com",
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.name).toBe("New User");
        expect(response.body.data.email).toBe(
            "new@example.com"
        );
        expect(User.create).toHaveBeenCalledWith({
            name: "New User",
            email: "new@example.com",
        });
    });
    test("POST /api/users returns 409 when email already exists", async () => {
        User.findOne.mockResolvedValue({
            _id: "existing-user",
            name: "Existing User",
            email: "existing@example.com",
        });
        const response = await request(app)
            .post("/api/users")
            .send({
                name: "Another User",
                email: "existing@example.com",
            });
        expect(response.statusCode).toBe(409);
        expect(response.body).toEqual({
            success: false,
            message: "User with this email already exists",
        });
        expect(User.create).not.toHaveBeenCalled();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("GET /api/users returns 200 with users", async () => {
        User.find.mockReturnValue({
            sort: jest.fn().mockResolvedValue([
                {
                    _id: "user-1",
                    name: "Test User",
                    email: "test@example.com",
                },
            ]),
        });

        const response = await request(app)
            .get("/api/users");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.count).toBe(1);
        expect(response.body.data).toHaveLength(1);
    });
    test("GET /api/users/:id returns 400 for invalid user ID", async () => {
        User.findById.mockRejectedValue(
            new Error("Invalid ID")
        );
        const response = await request(app)
            .get("/api/users/invalid-id");

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            success: false,
            message: "Invalid user ID",
        });
    });
    test("POST /api/users returns 400 when name or email is missing", async () => {
        const response = await request(app)
            .post("/api/users")
            .send({
                name: "Test User",
            });
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
            success: false,
            message: "Name and email are required",
        });
    });
    test("GET /api/users returns 500 when database fails", async () => {
        User.find.mockReturnValue({
            sort: jest.fn().mockRejectedValue(
                new Error("Database error")
            ),
        });
        const response = await request(app)
            .get("/api/users");
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({
            success: false,
            message: "Failed to fetch users",
        });
    });
});