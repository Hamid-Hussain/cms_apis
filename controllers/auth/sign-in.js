// import { generateTokenResponse } from '../../middlewares/auth';
const { sequelize, User } = require("../../models/");
const bcrypt = require("bcryptjs");
// const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "1234567890";
// const SignIn = async (req, res) => {
//   try {
//     if (req.error) return res.status(401).json(req.error);
//     const token = generateTokenResponse(req.user);
//     return res.status(200).json({
//       token,
//       user: req.user
//     });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };

const SignIn = async (req, res) => {
  const { email, password } = req.body;
  console.log("reqqqq", email, password);
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "Incorrect password" });
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};
export default SignIn;
