const fs = require("fs");
const path = require("path");
const router = require("express").Router();
const upload = require("../config/multer");
const sharp = require("sharp");

const ensure = (p) => fs.mkdirSync(p, { recursive: true });

router.post("/:folder", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "no file" });
    }

    const folder = req.params.folder;
    const tmpPath = req.file.path;
    const mime = req.file.mimetype;

    const finalDir = path.join(__dirname, "../../uploads", folder);
    ensure(finalDir);

    // ---------- IMAGE ----------
    if (mime.startsWith("image/")) {
      const filename = folder + "_" + Date.now() + ".webp";
      const finalPath = path.join(finalDir, filename);

      await sharp(tmpPath)
        .resize({ width: 1600 })
        .webp({ quality: 82 })
        .toFile(finalPath);

      fs.unlinkSync(tmpPath);

      return res.json({
        url: `/uploads/${folder}/${filename}`,
        type: "image"
      });
    }

    // ---------- PDF / OTHER FILE ----------
    const ext = path.extname(req.file.originalname);
    const filename = folder + "_" + Date.now() + ext;
    const finalPath = path.join(finalDir, filename);

    fs.renameSync(tmpPath, finalPath);

    return res.json({
      url: `/uploads/${folder}/${filename}`,
      type: "file"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "upload failed" });
  }
});

module.exports = router;
