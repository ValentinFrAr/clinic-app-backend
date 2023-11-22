const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.private = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });

    jwt.verify(token, process.env.jwtSecret, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
