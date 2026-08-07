const express = require('express');
const router = express.Router();


const {
  getActivityHistory
} = require('../controllers/activityController');


const {
  protect,
  authorize
} = require('../middleware/authMiddleware');



// Activity logs
router.get(
  '/',
  protect,
  authorize(
    'Administrator'
  ),
  getActivityHistory
);


module.exports = router;