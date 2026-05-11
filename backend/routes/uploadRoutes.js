const express = require("express");

const router = express.Router();

const multer = require("multer");

const cloudinary = require("../config/cloudinary");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

router.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    try {
      const file = req.file;

      const result =
        await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString(
            "base64"
          )}`
        );

      res.json({
        imageUrl: result.secure_url,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;
