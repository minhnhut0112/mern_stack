const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { use } = require("../routes/UserRouter");
dotenv.config();

const genneralAccessToken = async (payload) => {
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "30s" }
  );

  return access_token;
};

const genneralRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    {
      ...payload,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: "365d" }
  );

  return refresh_token;
};

const refreshToken = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, async function (err, user) {
        if (err) {
          console.log("err", err);
          resolve({
            status: "Err",
            message: "The authentication user is not success",
          });
        }
        const access_token = await genneralAccessToken({
          id: user?.id,
          isAdmin: user?.isAdmin,
        });
        console.log("access_token", access_token);
        resolve({
          status: "Ok",
          message: "success",
          access_token,
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  genneralAccessToken,
  genneralRefreshToken,
  refreshToken,
};
