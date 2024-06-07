import Users from '../../models/users';

export const ResetPassword = async (req, res) => {
  const { user: { email }, body: { password } } = req;
  try {
    const user = await Users.findOne({ email });
    user.password = password;
    await user.save();
    return res.json({
      message: 'Password updated succesfully'
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default ResetPassword;
