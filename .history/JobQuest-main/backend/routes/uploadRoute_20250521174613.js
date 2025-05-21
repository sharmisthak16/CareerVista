const express = require('express');
const uploadController = require('../controllers/uploadsController.js');
const upload = require('../middleware/multer');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Add authMiddleware to protect these routes
router.post('/upload', authMiddleware, upload.single("resume"), uploadController.upload);
router.get('/jobs', authMiddleware, uploadController.jobList); // Changed to GET and renamed to match frontend

module.exports = router;
