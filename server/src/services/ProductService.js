const Product = require("../models/ProductModel");

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

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "Ok",
          message: "The product is not defined",
        });
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });

      resolve({
        status: "Ok",
        message: "Updated product success",
        data: updatedProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "Ok",
          message: "The product is not defined",
        });
      }

      await Product.findByIdAndDelete(id);

      resolve({
        status: "Ok",
        message: "Delete product success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProduct = (limit, page, sort) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.count();
      const allProduct = await Product.find()
        .limit(limit)
        .skip(page * limit)
        .sort({ name: sort });
      resolve({
        status: "Ok",
        message: "Get all product success",
        data: allProduct,
        total: totalProduct,
        pageCurrent: Number(page + 1),
        toatlPage: Math.ceil(totalProduct / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getdetailsProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        _id: id,
      });
      if (product === null) {
        resolve({
          status: "Ok",
          message: "The product is not defined in db",
        });
      }
      resolve({
        status: "Ok",
        message: "Get details product success",
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getdetailsProduct,
};
