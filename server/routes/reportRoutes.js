const express = require('express');
const router = express.Router();


const {
  getStats
} = require('../controllers/reportController');


const {
  protect,
  authorize
} = require('../middleware/authMiddleware');



// Dashboard statistics
router.get(
  '/stats',
  protect,
  authorize(
    'Administrator',
    'Receptionist'
  ),
  getStats
);


module.exports = router;