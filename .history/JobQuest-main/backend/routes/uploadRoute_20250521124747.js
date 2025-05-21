const express = require('express');
const uploadController = require('../controllers/uploadsController');
const upload = require('../middleware/multer');

const router = express.Router();

router.post('/upload' , upload.single("resume"), uploadController.upload)
router.post('/joblist', uploadController.jobList)

module.exports = router;