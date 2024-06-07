import express from "express";
import { getBlogs } from "../controllers/blog";
import create from "../controllers/blog/create";
const authenticateJWT = require("../middlewares/auth");
const router = express.Router();

router.get("/get-all-blogs", authenticateJWT, getBlogs);

// router.post("/create", authenticateJWT, create);

export default router;
