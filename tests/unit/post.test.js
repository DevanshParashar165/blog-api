import request from "supertest";
import app from "../../src/app.js";
import mongoose from "mongoose";

let token;
let postId;

describe("UNIT: Post API", () => {

  beforeAll(async () => {
    // Register user
    await request(app)
      .post("/api/auth/register")
      .send({
        username: "postuser",
        email: "postuser@test.com",
        password: "password123",
      });

    // Login user
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "postuser@test.com",
        password: "password123",
      });

    token = loginRes.body.data.accessToken;
  });

  it("should create a post", async () => {
    const res = await request(app)
      .post("/api/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Unit Test Post",
        content: "This is valid post content with more than fifty characters.",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    postId = res.body.data._id;
  });

  it("should fetch all posts", async () => {
    const res = await request(app)
      .get("/api/posts")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should fetch single post", async () => {
    const res = await request(app)
      .get(`/api/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data._id).toBe(postId);
  });

  it("should update post", async () => {
    const res = await request(app)
      .put(`/api/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Post",
        content: "Updated content with more than fifty characters.",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe("Updated Post");
  });

  it("should delete post", async () => {
    const res = await request(app)
      .delete(`/api/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

});
