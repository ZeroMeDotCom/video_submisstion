const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../db');

const router = express.Router();

// ✅ Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Saving file to /uploads");
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    console.log("Saving file as:", uniqueName);
    cb(null, uniqueName);
  }
});

// ✅ Configure Multer middleware with limits and type filtering
const upload = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('video/')) {
      console.log('❌ Rejected file type:', file.mimetype);
      return cb(new Error('Only video files are allowed'));
    }
    cb(null, true);
  }
});

// ✅ POST /api/video route with Multer error handling
router.post('/video', (req, res) => {
  upload.single('video')(req, res, function (err) {
    // 🔴 Multer error: file too large
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        console.log('❌ File too large');
        return res.status(413).json({ error: 'File exceeds 10MB limit' });
      }
      return res.status(400).json({ error: err.message });
    }

    // 🔴 Other unknown error
    if (err) {
      console.log('❌ Multer Error:', err.message);
      return res.status(400).json({ error: err.message });
    }

    // 🔴 No file uploaded
    if (!req.file) {
      console.log('❌ No file received');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('✅ Received file:', req.file);

    const videoPath = req.file.path;
    const sql = 'INSERT INTO videos (filename, path, uploaded_at) VALUES (?, ?, NOW())';

    db.query(sql, [req.file.filename, videoPath], (err, result) => {
      if (err) {
        console.error('❌ MySQL Error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      console.log('✅ Video uploaded and saved to DB');
      res.status(200).json({ message: 'Video uploaded successfully!' });
    });
  });
});

module.exports = router;
