const mongoose = require('mongoose');

const activityHistorySchema = new mongoose.Schema(
  {
    visitorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Visitor',
      required: true
    },

    action: {
      type: String,
      required: true
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    remarks: {
      type: String
    },

    timestamp: {
      type: Date,
      default: Date.now
    }
  }
);


module.exports = mongoose.model(
  'ActivityHistory',
  activityHistorySchema
);