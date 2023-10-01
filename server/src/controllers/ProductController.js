const ProductSevice = require("../services/ProductSevice");

const createProduct = async (req, res) => {
  try {
    const { name, image, type, price, countInStock } = req.body;

    if (!name || !image || !type || !price || !countInStock) {
      return res.status(200).json({
        status: "Err",
        message: "The input is required",
      });
    }
    const response = await ProductSevice.createProduct(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createProduct,
};
