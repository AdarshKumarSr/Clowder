const express = require('express');
const router = express.Router();

// Import controller functions
const { register, login, logout } = require('../controllers/auth.controller');

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

router.post('logout', logout);

module.exports = router;
