const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const {
  authorityUserMiddleware,
  authorityMiddleware,
} = require("../middleware/authorityMiddleware");

router.post(
  "/create/:id",
  authorityUserMiddleware,
  OrderController.createOrder
);
router.get(
  "/get-all-order/:id",
  authorityUserMiddleware,
  OrderController.getAllOrderDetails
);
router.get("/get-details-order/:id", OrderController.getDetailsOrder);
router.delete(
  "/cancel-order/:id",
  authorityUserMiddleware,
  OrderController.cancelOrderDetails
);
router.get("/get-all-order", authorityMiddleware, OrderController.getAllOrder);

router.put("/update/:id", authorityMiddleware, OrderController.updateOrder);

module.exports = router;
