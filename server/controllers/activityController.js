const ActivityHistory = require('../models/ActivityHistory');

exports.getActivityHistory = async (req, res) => {
  try {
    const activities = await ActivityHistory.find()
      .populate('visitorId')
      .populate('performedBy', 'name email role')
      .sort({ timestamp: -1 });

    res.json(activities);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};