import Users from '../../models/users';
import { generateTokenResponse } from '../../middlewares/auth';

const ForgetPassword = async (req, res) => {
  try {
    const { body: { email } } = req;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json('email not found');
    }
    const token = generateTokenResponse(user);
    res.status(200).json('email sent');
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
export default ForgetPassword;
