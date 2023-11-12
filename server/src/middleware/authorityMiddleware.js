const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authorityMiddleware = (req, res, next) => {
  const tokenHeader = req.headers.token;

  if (!tokenHeader) {
    return res.status(401).json({
      status: "Err",
      message: "Token not provided",
    });
  }

  const [bearer, token] = tokenHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({
      status: "Err",
      message: "Invalid token format",
    });
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN,
    { ignoreExpiration: true },
    function (err, user) {
      if (err) {
        return res.status(401).json({
          status: "Err",
          message: "Authentication failed",
        });
      }

      if (user?.isAdmin) {
        next();
      } else {
        return res.status(403).json({
          status: "Err",
          message: "Insufficient privileges",
        });
      }
    }
  );
};

const authorityUserMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        status: "Err",
        message: "The authentication user is not success",
      });
    }
    if (user?.isAdmin || user?._id === userId) {
      next();
    } else {
      return res.status(404).json({
        status: "Err",
        message: "The authentication user user is not success",
      });
    }
  });
};

module.exports = {
  authorityMiddleware,
  authorityUserMiddleware,
};
