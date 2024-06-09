import express from "express";

import auth from "./auth";
import blog from "./blog";
// import { getBlogs } from "../controllers/blog";
// const Blog = require("../models/blog.js");

const router = express.Router();

// router.get("/all-blogs", async (req, res) => {
//   try {
//     console.log("requesttt in blogssss");
//     const blogs = await Aritcles.findAll();
//     res.status(200).json(blogs);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// router.post("/articles", async (req, res) => {
//   try {
//     // console.log("adddd", req.body);
//     const { title, body, author, publication_date } = req.body;
//     const blog = await Blog.create({
//       title,
//       body,
//       author,
//       publication_date,
//     });
//     res.status(201).json(blog);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });
router.use("/auth", auth);
router.use("/blog", blog);
// router.get("/blogs", getBlogs);

export default router;
