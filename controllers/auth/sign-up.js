// import Users from "../../models/users";
// import { generateTokenResponse } from "../../middlewares/auth";
const { sequelize, User } = require("../../models/");
const bcrypt = require("bcryptjs");
const { query, validationResult } = require("express-validator");

//chat gpt
const SignUp = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const SignUp = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   const {
//     body: { username, email, password },
//   } = req;

//   let user = await User.findOne({ where: { email } });
//   if (user) {
//     return res.status(400).json("email already exist");
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   try {
//     const user = await User.create({
//       username,
//       email,
//       password: hashedPassword,
//     });
//     res.json(user);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
export default SignUp;
