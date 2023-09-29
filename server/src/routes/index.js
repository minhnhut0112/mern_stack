const userRouter = require("./UserRouter");

const routes = (app) => {
  app.use("/api/user", userRouter);
};

module.exports = routes;
