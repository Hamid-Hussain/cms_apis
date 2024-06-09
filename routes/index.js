import express from "express";

import auth from "./auth";
import blog from "./blog";

const router = express.Router();

router.use("/auth", auth);
router.use("/blog", blog);

export default router;
