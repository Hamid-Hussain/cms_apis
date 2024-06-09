import { Blog } from "../../models/";
import Sequelize from "sequelize";

const getBlogs = async ({ title }) => {
  try {
    let blogs = [];
    if (title) {
      blogs = await Blog.findAll({
        where: {
          title: {
            [Sequelize.Op.like]: `%${title}%`,
          },
        },
      });
    } else {
      blogs = await Blog.findAll();
    }
    return { blogs };
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const create = async ({ title, author, publication_date, body, userId }) => {
  try {
    const blog = await Blog.create({
      title,
      body,
      author,
      publication_date,
      author_id: userId,
    });
    return { blog, statusCode: 201 };
  } catch (error) {
    return { err: error };
  }
};

const update = async ({ title, body, author, publication_date, id }) => {
  try {
    const article = await Blog.findByPk(id);
    article.title = title;
    article.body = body;
    article.author = author;
    article.publication_date = publication_date;
    await article.save();

    return { article };
  } catch (error) {
    return { err: { error: error.message } };
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const article = await Blog.findByPk(req.params.id);
    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ error: "Article not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const article = await Blog.findByPk(req.params.id);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    if (!isAuthorized(req.user.userId, article.author_id)) {
      return res
        .status(403)
        .json({ error: "Only the author can delete this article" });
    }

    await article.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: "An unexpected error occurred while deleting the article",
    });
  }
};

// Helper function to check authorization
const isAuthorized = (userId, authorId) => {
  return userId === authorId;
};
export { getBlogs, create, update, getSingleBlog, deleteBlog };
