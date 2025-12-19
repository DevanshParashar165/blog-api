import request from "supertest";
import app from "../../src/app.js";

describe("INTEGRATION: Auth Flow", () => {

  const user = {
    username: "integrationUser",
    email: "integration@test.com",
    password: "password123",
  };

  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(user);

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it("should login user and return token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: user.email,
        password: user.password,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.accessToken).toBeDefined();
  });

  it("should not login with wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: user.email,
        password: "wrongpassword",
      });

    expect(res.statusCode).toBe(401);
  });

});
