const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: {
      img1: { type: String, required: true },
      img2: { type: String, required: true },
      img3: { type: String, required: true },
      img4: { type: String, required: true },
    },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    discount: { type: Number },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
