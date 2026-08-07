const Visitor = require("../models/Visitor");
const ActivityHistory = require("../models/ActivityHistory");

// ===============================
// Activity Logger
// ===============================
const logActivity = async (
  visitorId,
  action,
  userId,
  remarks = ""
) => {
  await ActivityHistory.create({
    visitorId,
    action,
    performedBy: userId,
    remarks,
  });
};

// ===============================
// Register Visitor
// ===============================
exports.registerVisitor = async (req, res) => {
  try {
    const {
      name,
      mobile,
      email,
      company,
      employeeToVisit,
      visitDate,
      expectedArrivalTime,
      purpose,
    } = req.body;

    // Required field validation
    if (
      !name ||
      !mobile ||
      !email ||
      !employeeToVisit ||
      !visitDate ||
      !expectedArrivalTime ||
      !purpose
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // Normalize visit date
    const selectedDate = new Date(visitDate);
    selectedDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Date validation
    if (selectedDate < today) {
      return res.status(400).json({
        message: "Visit date cannot be earlier than today",
      });
    }

    // Duplicate visitor check
    const startOfDay = new Date(selectedDate);
    const endOfDay = new Date(selectedDate);

    endOfDay.setHours(23, 59, 59, 999);

    const existingVisitor = await Visitor.findOne({
      mobile,
      visitDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      status: {
        $ne: "CANCELLED",
      },
    });

    if (existingVisitor) {
      return res.status(400).json({
        message: "Duplicate visitor registration for this date",
      });
    }

    // Employee pending request limit
    const pendingCount = await Visitor.countDocuments({
      employeeToVisit,
      status: "PENDING",
    });

    if (pendingCount >= 3) {
      return res.status(400).json({
        message:
          "Employee already has 3 pending visitor requests",
      });
    }

    // Create visitor
    const visitor = await Visitor.create({
      name,
      mobile,
      email,
      company,
      employeeToVisit,
      visitDate: selectedDate,
      expectedArrivalTime,
      purpose,
      status: "PENDING",
    });

    // Activity log
    await logActivity(
      visitor._id,
      "CREATED",
      req.user._id,
      "Visitor registered"
    );

    const populatedVisitor = await Visitor.findById(visitor._id)
      .populate("employeeToVisit");

    res.status(201).json(populatedVisitor);
  } catch (error) {
    console.error("Register Visitor Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Approve / Reject Visitor
// ===============================
exports.updateStatus = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        message: "Visitor not found",
      });
    }

    const allowedStatus = [
      "APPROVED",
      "REJECTED",
      "CANCELLED",
    ];

    const { status, remarks } = req.body;

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    // Only pending visitors can be approved/rejected
    if (
      status === "APPROVED" ||
      status === "REJECTED"
    ) {
      if (visitor.status !== "PENDING") {
        return res.status(400).json({
          message:
            "Only pending visitors can be approved or rejected",
        });
      }
    }

    // Employee can only manage visitors assigned to them
    if (req.user.role === "Employee") {
      if (
        !req.user.employeeId ||
        visitor.employeeToVisit.toString() !==
          req.user.employeeId.toString()
      ) {
        return res.status(403).json({
          message:
            "You can only manage visitors assigned to you",
        });
      }
    }

    visitor.status = status;
    visitor.remarks = remarks || "";

    await visitor.save();

    // Activity log
    await logActivity(
      visitor._id,
      status,
      req.user._id,
      remarks || `Visitor ${status.toLowerCase()}`
    );

    const populatedVisitor = await Visitor.findById(visitor._id)
      .populate("employeeToVisit");

    res.json(populatedVisitor);
  } catch (error) {
    console.error("Update Visitor Status Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Check In Visitor
// ===============================
exports.checkIn = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        message: "Visitor not found",
      });
    }

    // Must be approved
    if (visitor.status !== "APPROVED") {
      return res.status(400).json({
        message: "Visitor must be approved first",
      });
    }

    // Check-in time
    visitor.status = "CHECKED_IN";
    visitor.checkInTime = new Date();

    await visitor.save();

    // Activity log
    await logActivity(
      visitor._id,
      "CHECKED_IN",
      req.user._id,
      "Visitor checked in"
    );

    const populatedVisitor = await Visitor.findById(visitor._id)
      .populate("employeeToVisit");

    res.json(populatedVisitor);
  } catch (error) {
    console.error("Check In Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Check Out Visitor
// ===============================
exports.checkOut = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        message: "Visitor not found",
      });
    }

    // Must be checked in
    if (visitor.status !== "CHECKED_IN") {
      return res.status(400).json({
        message: "Visitor is not checked in",
      });
    }

    visitor.status = "CHECKED_OUT";
    visitor.checkOutTime = new Date();

    await visitor.save();

    // Activity log
    await logActivity(
      visitor._id,
      "CHECKED_OUT",
      req.user._id,
      "Visitor checked out"
    );

    const populatedVisitor = await Visitor.findById(visitor._id)
      .populate("employeeToVisit");

    res.json(populatedVisitor);
  } catch (error) {
    console.error("Check Out Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Get All Visitors
// ===============================
exports.getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find()
      .populate("employeeToVisit")
      .sort({
        createdAt: -1,
      });

    res.json(visitors);
  } catch (error) {
    console.error("Get Visitors Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};