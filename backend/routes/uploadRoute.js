const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        // Appending timestamp to prevent name collisions
        cb(null, 'vehicle-' + Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }
        // Send back the local file URL
        const fileUrl = `/uploads/${req.file.filename}`;
        res.json({ url: fileUrl });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: 'Error uploading file', error });
    }
});

module.exports = router;
