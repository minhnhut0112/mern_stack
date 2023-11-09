const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

router.post("/create", productController.createProduct);
router.put("/update/:id", productController.updateProduct);
router.delete("/delete-product/:id", productController.deleteProduct);
router.get("/getAll", productController.getAllProduct);
router.get("/get-details/:id", productController.getDetailsProduct);
router.get("/get-all-type", productController.getAllType);

module.exports = router;
