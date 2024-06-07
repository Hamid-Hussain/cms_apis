import express from "express";

import SignIn from "../controllers/auth/sign-in";
import SignUp from "../controllers/auth/sign-up";
const router = express.Router();
const { query, check } = require("express-validator");

router.post(
  "/register",

  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").exists(),
    check("username", "username is requried").exists(),
  ],

  SignUp
);

router.post("/login", SignIn);

export default router;
