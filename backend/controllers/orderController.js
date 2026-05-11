const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;

    const order = await Order.create({
      user: req.user,
      items,
      total,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user,
    }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
};