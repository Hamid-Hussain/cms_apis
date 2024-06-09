import express from "express";

import { SignIn, SignUp } from "../controllers/auth/";

import { User } from "../models/";
import { handleResponse, handleError } from "../utils/handle-response";
import { validationResult } from "express-validator";

const router = express.Router();
const { query, check } = require("express-validator");

const signupCheck = [
  check("email", "email is required").isEmail(),
  check("password", "password is required").exists(),
  check("username", "username is requried").exists(),
];

router.post("/register", signupCheck, async (req, res) => {
  try {
    const {
      body: { username, email, password },
    } = req || { body: {} };
    console.log({ body: req.body });
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return handleError({ res, err: errors.array(), statusCode: 400 });
    let user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ message: "Email already exists" });
    const data = await SignUp({ username, email, password });
    handleResponse({ res, data });
  } catch (err) {
    handleError({ err, res });
  }
});
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The hashed password of the user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was last updated
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *                       location:
 *                         type: string
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/login", async (req, res) => {
  try {
    const {
      body: { email, password },
    } = req || { body: {} };

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return handleError({
        res,
        err: { message: "User not found" },
        statusCode: 400,
      });
    }
    const data = await SignIn({ email, password });

    if (data.err)
      return handleError({
        res,
        err: { message: data.err },
        statusCode: 400,
      });
    handleResponse({ res, data });
  } catch (err) {
    handleError({ res, err });
  }
});
/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: The JWT token
 *         user:
 *           $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Sign in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Incorrect password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

export default router;
