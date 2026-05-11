const express = require("express");

const router = express.Router();

const {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");

// PUBLIC
router.get("/", getProducts);

// ADMIN
router.post(
  "/",
  protect,
  admin,
  addProduct
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteProduct
);

router.put(
  "/:id",
  protect,
  admin,
  updateProduct
);

module.exports = router;