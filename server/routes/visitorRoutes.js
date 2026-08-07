const express = require('express');
const router = express.Router();


const {
  registerVisitor,
  updateStatus,
  checkIn,
  checkOut,
  getAllVisitors
} = require('../controllers/visitorController');


const {
  protect,
  authorize
} = require('../middleware/authMiddleware');




// Get all visitors

router.get(
  '/',
  protect,
  getAllVisitors
);




// Register visitor

router.post(
  '/',
  protect,
  authorize(
    'Receptionist',
    'Administrator'
  ),
  registerVisitor
);




// Employee approve/reject

router.put(
  '/:id/status',
  protect,
  authorize(
    'Employee',
    'Administrator'
  ),
  updateStatus
);




// Check in

router.put(
  '/:id/checkin',
  protect,
  authorize(
    'Receptionist',
    'Administrator'
  ),
  checkIn
);




// Check out

router.put(
  '/:id/checkout',
  protect,
  authorize(
    'Receptionist',
    'Administrator'
  ),
  checkOut
);



module.exports = router;