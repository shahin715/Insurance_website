const multer = require("multer");
const path = require("path");
const fs = require("fs");

fs.mkdirSync("uploads/tmp", { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/tmp");
  },
  filename: (req, file, cb) => {
    const name = Date.now() + path.extname(file.originalname);
    cb(null, name);
  }
});

function fileFilter(req, file, cb) {
  const allowed = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "application/pdf"
  ];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images and PDF allowed"), false);
  }
}

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 12 * 1024 * 1024 // 12MB
  }
});

