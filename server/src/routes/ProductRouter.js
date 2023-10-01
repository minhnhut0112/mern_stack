const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

router.post("/create", productController.createProduct);

module.exports = router;
