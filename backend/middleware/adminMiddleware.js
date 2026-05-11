const User = require("../models/User");

const admin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    if (user && user.role === "admin") {
      next();
    } else {
      res.status(401).json({
        message: "Admin only",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = admin;