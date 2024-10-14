const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    units: {
      type: String,
      required: true,
    },
    GST: {
      type: Number,
    },
    DOM: {
      type: Date,
    },
    DOE: {
      type: Date,
    },
    printName: { type: String },
    pricePerKg: {
      type: Number,
    },
    price: { type: Number, required: true },
    totalStock: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
