const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
  rate: Number,
  count: Number,
});

const productSchema = mongoose.Schema({
  title: String,
  name: String,
  price: Number,
  rating: ratingSchema,
  description: String,
  image: String,
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = {
  ProductModel,
};
