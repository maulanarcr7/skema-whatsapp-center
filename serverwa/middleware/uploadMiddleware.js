const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Filter file untuk memastikan hanya gambar yang diizinkan
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('File type not allowed'), false);
    }
};

// Inisialisasi multer dengan konfigurasi penyimpanan dan filter file
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // Batas ukuran file 10MB
});

module.exports = upload.single('image');