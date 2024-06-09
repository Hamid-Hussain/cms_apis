import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

import { User } from "../../models/";

const SignUp = async ({ username, email, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return { res, user };
  } catch (err) {
    return { err: { error: err.message } };
  }
};

export default SignUp;
