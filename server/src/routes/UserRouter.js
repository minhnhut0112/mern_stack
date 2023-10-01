const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { authorityMiddleware } = require("../middleware/authorityMiddleware");

router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);
router.put("/update-user/:id", userController.updateUser);
router.delete(
  "/delete-user/:id",
  authorityMiddleware,
  userController.deleteUser
);
router.get("/getAll", authorityMiddleware, userController.getAllUser);
router.get("/get-details/:id", userController.getdetailsUser);

module.exports = router;
