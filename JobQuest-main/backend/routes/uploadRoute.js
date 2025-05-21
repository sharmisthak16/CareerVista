const express = require('express');
const uploadController = require('../controllers/uploadsController');
const upload = require('../middleware/multer');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Resume upload route
router.post('/upload', authMiddleware, upload.single("resume"), uploadController.upload);

// Job listing route - match the method used in frontend (POST)
router.post('/joblist', authMiddleware, uploadController.jobList);

module.exports = router;
