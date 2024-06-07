// blogController.test.js
import request from "supertest";
import express from "express";
import { getBlogs } from "./index.js";
import { Blog } from "../../models/";

const app = express();
app.get("/blogs", getBlogs);

jest.mock("../../models/", () => ({
  Blog: {
    findAll: jest.fn(),
  },
}));

describe("GET /blogs", () => {
  it("should return 200 and the list of blogs", async () => {
    const blogs = [
      { id: 1, title: "First Blog", body: "This is the first blog" },
      { id: 2, title: "Second Blog", body: "This is the second blog" },
    ];

    Blog.findAll.mockResolvedValue(blogs);

    const response = await request(app).get("/blogs");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(blogs);
  });

  it("should return 400 if there is an error", async () => {
    Blog.findAll.mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/blogs");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Database error" });
  });
});
