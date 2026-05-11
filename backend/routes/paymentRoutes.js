const express = require("express");

const router = express.Router();

const Razorpay = require("razorpay");

// CHECK ENV VARIABLES
console.log(
  process.env.RAZORPAY_KEY_ID
);

console.log(
  process.env.RAZORPAY_KEY_SECRET
);

// CREATE INSTANCE
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret:
    process.env.RAZORPAY_KEY_SECRET,
});

// CREATE ORDER
router.post(
  "/create-order",
  async (req, res) => {
    try {
      console.log("PAYMENT HIT");

      const options = {
        amount: Number(req.body.amount) * 100,
        currency: "INR",
      };

      const order =
        await razorpay.orders.create(
          options
        );

      res.json(order);
    } catch (error) {
      console.log(
        "RAZORPAY ERROR:"
      );

      console.log(error);

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;