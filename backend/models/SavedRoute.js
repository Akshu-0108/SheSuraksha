const mongoose = require("mongoose");

const savedRouteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    routeId: { type: String, required: true },
    routeName: { type: String, required: true, trim: true },
    origin: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    distanceKm: { type: Number, min: 0 },
    estimatedTimeMinutes: { type: Number, min: 0 },
    safetyScore: { type: Number, min: 0, max: 100 },
    riskLevel: { type: String, enum: ["low", "moderate", "high"], default: "moderate" },
  },
  { timestamps: true }
);

savedRouteSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("SavedRoute", savedRouteSchema);
