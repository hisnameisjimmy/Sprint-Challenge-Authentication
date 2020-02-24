const Users = require("../users/users-model.js");
const db = require("../database/dbConfig.js");
const request = require("supertest");
const server = require("../api/server.js");

describe('auth_router_model', () => {
    it('should be test environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    it("should register a user", async () => {
        await request(server)
            .post("/api/auth/register")
            .send({ username: "test", password: "123" })
            .then(res => {
                expect(res.status).toBe(201);
            });
    });

    it("should fail to register without all credentials", async () => {
        await request(server)
            .post("/api/auth/register")
            .send({ username: "justuser" })
            .then(res => {
                expect(res.status).toBe(400);
            });
    });

    it("shoudl log a user in successfully", async () => {
        await request(server)
            .post("/api/auth/login")
            .send({ username: "test", password: "123" })
            .then(res => {
                expect(res.status).toBe(200);
            });
    });

    it("should give a token back after login", async () => {
    await request(server)
        .post("/api/auth/login")
        .send({ username: "test", password: "123" })
        .then(res => {
        expect(res.body.token).toBeDefined();
        });
    });

    afterAll(async () => {
    await db("users").truncate();
    });
});