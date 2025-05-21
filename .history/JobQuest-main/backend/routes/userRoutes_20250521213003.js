const express = require('express');
const { register, login, forgotPassword, logout } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/onboard', register);
router.post('/login', login);
router.post('/resetpassword', forgotPassword);
router.post("/logout", authMiddleware, logout);

module.exports = router;