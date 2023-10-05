const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authorityMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        status: "Err",
        message: "The authentication is not success",
      });
    }
    if (user?.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        status: "Err",
        message: "The authentication is not success",
      });
    }
  });
};

const authorityUserMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        status: "Err",
        message: "The authentication is not success",
      });
    }
    if (user?.isAdmin || user?._id === userId) {
      next();
    } else {
      return res.status(404).json({
        status: "Err",
        message: "The authentication user is not success",
      });
    }
  });
};

module.exports = {
  authorityMiddleware,
  authorityUserMiddleware,
};
