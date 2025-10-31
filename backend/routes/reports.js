const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure multer for image uploads (memory storage for Supabase)
const storage = multer.memoryStorage();

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

const { createReport, getAllReports, getReportById, updateReportStatus, deleteReport } = require('../controllers/reportController');

// Routes
router.post('/', upload.single('image'), createReport);
router.get('/', getAllReports);
router.get('/:id', getReportById);
router.patch('/:id/status', updateReportStatus);
router.delete('/:id', deleteReport);

module.exports = router;
