const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const token =
    req.header("Authorization") && req.header("Authorization").split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access token is missing or invalid" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }
    console.log("user in jwt", user);
    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
