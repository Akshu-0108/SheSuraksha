const mongoose = require("mongoose");

const safeHavenSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    locality: { type: String, required: true, trim: true, index: true },
    category: { type: String, required: true },
    hours: { type: String, required: true },
    phone: { type: String, required: true },
    verified: { type: Boolean, default: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SafeHaven", safeHavenSchema);
