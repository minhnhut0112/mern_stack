const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const { authorityMiddleware } = require("../middleware/authorityMiddleware");

router.post("/create", authorityMiddleware, productController.createProduct);
router.put("/update/:id", authorityMiddleware, productController.updateProduct);
router.delete(
  "/delete-product/:id",
  authorityMiddleware,
  productController.deleteProduct
);
router.get("/getAll", productController.getAllProduct);
router.get("/get-details/:id", productController.getDetailsProduct);
router.get("/get-all-type", productController.getAllType);

module.exports = router;
