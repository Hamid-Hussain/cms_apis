import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../../models/";
const { JWT_SECRET } = process.env;

const SignIn = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { err: "Incorrect password" };

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
  return { token, user };
};

export default SignIn;
