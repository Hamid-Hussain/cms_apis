import express from "express";
import {
  getBlogs,
  create,
  update,
  getSingleBlog,
  deleteBlog,
} from "../controllers/blog";
import { handleError, handleResponse } from "../utils/handle-response";
import { Blog } from "../models";
const authenticateJWT = require("../middlewares/auth");
const router = express.Router();

// authenticateJWT
router.get("/get-blogs", async (req, res) => {
  try {
    const { title } = req.query;

    const data = await getBlogs({ title });
    handleResponse({ res, data });
  } catch (err) {
    handleError({ err, res });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - body
 *         - author
 *         - publication_date
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the blog
 *         title:
 *           type: string
 *           description: The title of the blog
 *         body:
 *           type: string
 *           description: The body of the blog
 *         author:
 *           type: string
 *           description: The author of the blog
 *         publication_date:
 *           type: string
 *           format: date-time
 *           description: The publication date of the blog
 *         author_id:
 *           type: integer
 *           description: The id of the author
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the blog was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the blog was last updated
 */

/**
 * @swagger
 * /blog/get-blogs:
 *   get:
 *     summary: Get blogs
 *     tags: [Blog]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: The title of the blog to filter by
 *     responses:
 *       200:
 *         description: A list of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

// authenticateJWT
router.post("/create", authenticateJWT, async (req, res) => {
  try {
    const {
      body: { title, author, publication_date, body },
    } = req || { body: {} };
    const {
      user: { userId },
    } = req || { user: {} };

    const data = await create({
      title,
      author,
      publication_date,
      body,
      userId,
    });
    handleResponse({ res, data });
  } catch (err) {
    handleError({ err, res });
  }
});

/**
 * @swagger
 * /blog/create:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *               - author
 *               - publication_date
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the blog
 *               body:
 *                 type: string
 *                 description: The body of the blog
 *               author:
 *                 type: string
 *                 description: The author of the blog
 *               publication_date:
 *                 type: string
 *                 format: date
 *                 description: The publication date of the blog
 *     responses:
 *       201:
 *         description: The created blog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.put("/update", authenticateJWT, async (req, res) => {
  try {
    const { title, body, author, publication_date, id } = req.body;
    const article = await Blog.findByPk(id);
    if (article) {
      const data = await update({ title, body, author, publication_date, id });
      if (data.err)
        return handleError({
          res,
          err: { message: data.err },
          statusCode: 400,
        });
      handleResponse({ res, data });
    } else {
      handleError({
        res,
        err: { message: "Article not found" },
        statusCode: 404,
      });
    }
  } catch (err) {
    handleError({ res, err });
  }
});
/**
 * @swagger
 * /blog/update:
 *   put:
 *     summary: Update an existing blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the blog
 *               body:
 *                 type: string
 *                 description: The body of the blog
 *               author:
 *                 type: string
 *                 description: The author of the blog
 *               publication_date:
 *                 type: string
 *                 format: date
 *                 description: The publication date of the blog
 *     responses:
 *       200:
 *         description: The updated blog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: Blog not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get("/:id", getSingleBlog);
/**
 * @swagger
 * /blog/{id}:
 *   get:
 *     summary: Get a single blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The blog ID
 *     responses:
 *       200:
 *         description: The blog information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 body:
 *                   type: string
 *                 author:
 *                   type: string
 *                 publication_date:
 *                   type: string
 *                   format: date
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Blog not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.delete("/:id", authenticateJWT, deleteBlog);
/**
 * @swagger
 * /blog/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     description: Deletes a blog post if the authenticated user is the author.
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog ID
 *     responses:
 *       204:
 *         description: No Content. Successfully deleted the blog.
 *       403:
 *         description: Forbidden. Only the author can delete this article.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: Not Found. The blog ID does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error. An unexpected error occurred while deleting the article.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

export default router;
