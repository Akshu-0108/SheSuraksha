const asyncHandler = require("../middleware/asyncHandler");
const SOSAlert = require("../models/SOSAlert");

// @route   POST /api/sos
// @access  Private
const createSOSAlert = asyncHandler(async (req, res) => {
  const { location, message, alertType } = req.body;

  if (!location || typeof location.lat !== "number" || typeof location.lng !== "number") {
    res.status(400);
    throw new Error("location.lat and location.lng (numbers) are required");
  }

  const alert = await SOSAlert.create({
    user: req.user._id,
    location,
    message: message || "",
    alertType: ["police", "guardian", "siren"].includes(alertType) ? alertType : "guardian",
  });

  res.status(201).json({
    sosId: alert._id,
    userId: alert.user,
    location: alert.location,
    message: alert.message,
    status: alert.status,
    alertType: alert.alertType,
    createdAt: alert.createdAt,
  });
});

// @route   GET /api/sos/:id
// @access  Private
const getSOSAlert = asyncHandler(async (req, res) => {
  const alert = await SOSAlert.findOne({ _id: req.params.id, user: req.user._id });

  if (!alert) {
    res.status(404);
    throw new Error("SOS alert not found");
  }

  res.status(200).json({
    sosId: alert._id,
    userId: alert.user,
    location: alert.location,
    message: alert.message,
    status: alert.status,
    alertType: alert.alertType,
    createdAt: alert.createdAt,
  });
});

// @route   GET /api/sos/history
// @access  Private
const getSOSHistory = asyncHandler(async (req, res) => {
  const alerts = await SOSAlert.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.status(200).json({
    alerts: alerts.map((a) => ({
      sosId: a._id,
      location: a.location,
      message: a.message,
      status: a.status,
      alertType: a.alertType,
      createdAt: a.createdAt,
    })),
  });
});

module.exports = { createSOSAlert, getSOSAlert, getSOSHistory };
