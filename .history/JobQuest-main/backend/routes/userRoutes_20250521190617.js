const express = require('express');
const { register, login, forgotPassword, logout } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Change route names to avoid ad blocker detection
router.post('/user-creation', register);  // Changed from '/register'
router.post('/user-auth', login);         // Changed from '/login'
router.post('/password-reset', forgotPassword); // Changed from '/resetpassword'
router.post('/user-signout', authMiddleware, logout); // Changed from '/logout'

module.exports = router;
