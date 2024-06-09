import request from "supertest";
import express from "express";
import { getBlogs, create, update, getSingleBlog } from "./index";
import { Blog } from "../../models/";

const app = express();
app.use(express.json());

app.get("/blogs", getBlogs);
app.post("/blogs", create);
app.put("/blogs/:id", update);
app.get("/blogs/:id", getSingleBlog);

jest.mock("../../models/", () => ({
  Blog: {
    findAll: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
  },
}));

describe("Blog Controller", () => {
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

    it("should return 200 and the filtered list of blogs", async () => {
      const blogs = [
        { id: 1, title: "Test Blog", body: "This is a test blog" },
      ];

      Blog.findAll.mockResolvedValue(blogs);

      const response = await request(app).get("/blogs?title=Test");

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

  describe("POST /blogs", () => {
    it("should create a blog and return 201 status code", async () => {
      const blog = {
        id: 1,
        title: "Test Title",
        body: "Test Body",
        author: "Test Author",
        publication_date: "2024-06-08",
      };

      Blog.create.mockResolvedValue(blog);

      const response = await request(app).post("/blogs").send({
        title: "Test Title",
        body: "Test Body",
        author: "Test Author",
        publication_date: "2024-06-08",
      });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(blog);
      expect(Blog.create).toHaveBeenCalledWith({
        title: "Test Title",
        body: "Test Body",
        author: "Test Author",
        publication_date: "2024-06-08",
      });
    });

    it("should handle errors and return 400 status code", async () => {
      Blog.create.mockRejectedValue(new Error("Error creating blog"));

      const response = await request(app).post("/blogs").send({
        title: "Test Title",
        body: "Test Body",
        author: "Test Author",
        publication_date: "2024-06-08",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Error creating blog" });
    });
  });

  describe("PUT /blogs/:id", () => {
    it("should update a blog and return 200 status code", async () => {
      const article = {
        id: 1,
        title: "Updated Title",
        body: "Updated Body",
        author: "Updated Author",
        publication_date: "2024-06-08",
        save: jest.fn(),
      };

      Blog.findByPk.mockResolvedValue(article);

      const response = await request(app).put("/blogs/1").send({
        title: "Updated Title",
        body: "Updated Body",
        author: "Updated Author",
        publication_date: "2024-06-08",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        title: "Updated Title",
        body: "Updated Body",
        author: "Updated Author",
        publication_date: "2024-06-08",
      });
      expect(article.save).toHaveBeenCalled();
    });

    it("should return 404 if blog is not found", async () => {
      Blog.findByPk.mockResolvedValue(null);

      const response = await request(app).put("/blogs/1").send({
        title: "Updated Title",
        body: "Updated Body",
        author: "Updated Author",
        publication_date: "2024-06-08",
      });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Article not found" });
    });

    it("should handle errors and return 400 status code", async () => {
      Blog.findByPk.mockRejectedValue(new Error("Error updating blog"));

      const response = await request(app).put("/blogs/1").send({
        title: "Updated Title",
        body: "Updated Body",
        author: "Updated Author",
        publication_date: "2024-06-08",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Error updating blog" });
    });
  });

  describe("GET /blogs/:id", () => {
    it("should return a blog if found", async () => {
      const article = {
        id: 1,
        title: "Test Blog",
        body: "This is a test blog",
      };

      Blog.findByPk.mockResolvedValue(article);

      const response = await request(app).get("/blogs/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(article);
    });

    it("should return 404 if blog is not found", async () => {
      Blog.findByPk.mockResolvedValue(null);

      const response = await request(app).get("/blogs/1");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Article not found" });
    });

    it("should handle errors and return 400 status code", async () => {
      Blog.findByPk.mockRejectedValue(new Error("Error fetching blog"));

      const response = await request(app).get("/blogs/1");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Error fetching blog" });
    });
  });
});
