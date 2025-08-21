const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../config/.env") });

const JWT_SECRET = process.env.JWT_SECRET;

function authUser(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer")) {
    res.status(403).json({
      message: "Invalid / No authorization header passed",
    });
    return;
  }

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(403).json({
      message: "User authentication failed",
      error: error,
    });
    return;
  }
}

module.exports = authUser;
