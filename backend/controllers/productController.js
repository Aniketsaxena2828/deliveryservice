const Product = require("../models/Product");

// GET PRODUCTS
const getProducts = async (req, res) => {
  const products = await Product.find();

  res.json(products);
};

// ADD PRODUCT
const addProduct = async (req, res) => {
  const product = await Product.create(req.body);

  res.json(product);
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const product =
      await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.name =
      req.body.name || product.name;

    product.price =
      req.body.price || product.price;

    product.image =
      req.body.image || product.image;

    const updatedProduct =
      await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
};