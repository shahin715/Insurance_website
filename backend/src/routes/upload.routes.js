const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const upload = require("../config/multer");
const sharp = require("sharp");

// auto create folders
const ensure = (p) => fs.mkdirSync(p, { recursive: true });

router.post("/:folder", upload.single("file"), async (req, res) => {
  try {
    const folder = req.params.folder;   // hero / about / sections
    const tmpPath = req.file.path;

    const finalDir = path.join(__dirname, "../../uploads", folder);
    ensure(finalDir);

    const filename = folder + "_" + Date.now() + ".webp";
    const finalPath = path.join(finalDir, filename);

    await sharp(tmpPath)
      .resize({ width: 1600 })
      .webp({ quality: 82 })
      .toFile(finalPath);

    fs.unlinkSync(tmpPath);

    res.json({
      url: `/uploads/${folder}/${filename}`
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "upload failed" });
  }
});

module.exports = router;



