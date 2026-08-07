const express = require('express');
const router = express.Router();

const {
  login,
  getProfile
} = require('../controllers/authController');

const {
  protect
} = require('../middleware/authMiddleware');


// Login
router.post('/login', login);


// Profile
router.get('/profile', protect, getProfile);


module.exports = router;