const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    mobile: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    company: {
      type: String
    },

    employeeToVisit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },

    visitDate: {
      type: Date,
      required: true
    },

    expectedArrivalTime: {
      type: String,
      required: true
    },

    purpose: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: [
        'PENDING',
        'APPROVED',
        'REJECTED',
        'CHECKED_IN',
        'CHECKED_OUT',
        'CANCELLED'
      ],
      default: 'PENDING'
    },

    checkInTime: {
      type: Date
    },

    checkOutTime: {
      type: Date
    },

    remarks: {
      type: String
    }
  },
  {
    timestamps: true
  }
);


module.exports = mongoose.model('Visitor', visitorSchema);