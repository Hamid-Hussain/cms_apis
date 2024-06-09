import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

import { User } from "../../models/";

//chat gpt
const SignUp = async ({ username, email, password }) => {
  // const errors = validationResult(req);

  // if (!errors.isEmpty())
  //   return res.status(400).json({ errors: errors.array() });

  try {
    // let user = await User.findOne({ where: { email } });
    // if (user) return res.status(400).json({ message: "Email already exists" });

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

export default SignUp;
