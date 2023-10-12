const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
  authorityMiddleware,
  authorityUserMiddleware,
} = require("../middleware/authorityMiddleware");

router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.post("/log-out", userController.logoutUser);
router.put(
  "/update-user/:id",
  authorityUserMiddleware,
  userController.updateUser
);
router.delete(
  "/delete-user/:id",
  authorityMiddleware,
  userController.deleteUser
);
router.get(
  "/get-details/:id",
  authorityUserMiddleware,
  userController.getdetailsUser
);
router.get("/getAll", authorityMiddleware, userController.getAllUser);

router.post("/refresh-token", userController.refreshToken);

module.exports = router;
