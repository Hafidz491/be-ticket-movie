const multer = require("multer");
const path = require("path");

// Konfigurasi Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // Tempat penyimpanan gambar
  },
  filename: function (req, file, cb) {
    // Menentukan nama file
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
