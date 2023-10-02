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

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    if (!productId) {
      return res.status(200).json({
        status: "Err",
        message: "The product id is required",
      });
    }
    const response = await ProductSevice.updateProduct(productId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "Err",
        message: "The product id is required",
      });
    }
    const response = await ProductSevice.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const response = await ProductSevice.getAllProduct();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailsProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "Err",
        message: "The productId is required",
      });
    }
    const response = await ProductSevice.getdetailsProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getDetailsProduct,
};
