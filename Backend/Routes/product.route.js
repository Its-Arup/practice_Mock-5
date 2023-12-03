const express = require("express");
const { ProductModel } = require("../Model/product.model");

const productRoute = express.Router();

productRoute.get("/getAllProducts", async (req, res) => {
  try {
    let { q, page } = req.query;
    page = page || 1;
    const limit = 5;
    const skip_Page = (page - 1) * limit;
    let quary = {};

    if (q) {
      quary.title = { $regex: q, $options: "i" };
    }

    const products = await ProductModel.find(quary)
      .skip(skip_Page)
      .limit(limit);

    res.status(200).send({ msg: "all products", products: products });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

productRoute.get("/sortAllProducts", async (req, res) => {
  try {
    const { order, sort } = req.query;
    const sortObj = {}
    const sortVal = sort
    const sortOrder = order === "asc" ? 1 : -1
    sortObj[sortVal] = sortOrder
    const products = await ProductModel.find().sort(sortObj);
    res.status(200).send({ msg: "all products", products: products });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

module.exports = {
  productRoute,
};
