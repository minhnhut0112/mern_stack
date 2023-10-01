const Product = require("../models/ProductModel");
const bcrypt = require("bcrypt");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, price, countInStock } = newProduct;
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });
      if (checkProduct !== null) {
        resolve({
          status: "Err",
          message: "The name product is already",
        });
      }
      const newProduct = await Product.create({
        name,
        image,
        type,
        price,
        countInStock,
      });
      if (newProduct) {
        resolve({
          status: "True",
          message: "Create product success",
          data: newProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
};
