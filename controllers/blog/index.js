const { Blog } = require("../../models/");

// const getBlogs = async (req, res) => {
//   try {
//     // const blogs = await Blogs.findAll();
//     res.status(200).json([]);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    return res.status(200).json(blogs);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    // console.log("adddd", req.body);
    const { title, body, author, publication_date } = req.body;
    const blog = await Blog.create({
      title,
      body,
      author,
      publication_date,
    });
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// export default create;

export { getBlogs, create };
