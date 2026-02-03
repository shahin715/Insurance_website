const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const upload = require("../config/multer");
const sharp = require("sharp");

// ✅ auto create folders
fs.mkdirSync(path.join(__dirname, "../../uploads/tmp"), { recursive: true });
fs.mkdirSync(path.join(__dirname, "../../uploads/hero"), { recursive: true });

router.post("/hero", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const tmpPath = req.file.path;

    const filename = "hero_" + Date.now() + ".webp";
    const finalPath = path.join(__dirname, "../../uploads/hero", filename);

    // ✅ resize + compress + convert
    await sharp(tmpPath)
      .resize({ width: 1920 })
      .webp({ quality: 82 })
      .toFile(finalPath);

    // ✅ delete temp file
    fs.unlinkSync(tmpPath);

    res.json({
      url: `/uploads/hero/${filename}`
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: "image processing failed" });
  }
});

module.exports = router;


