const asyncHandler = require("../middleware/asyncHandler");
const { getAreaSafetyStats } = require("../utils/safetyDataEngine");

// @route   GET /api/area-audit?locality=Koramangala&radiusKm=2
// @access  Public
// radiusKm is optional (defaults to 2) — controls how far to search for
// nearby crime records when computing safetyScore.
const getAreaAudit = asyncHandler(async (req, res) => {
  const { locality, radiusKm } = req.query;

  if (!locality || !locality.trim()) {
    res.status(400);
    throw new Error("Query param 'locality' is required, e.g. /api/area-audit?locality=Koramangala");
  }

  let radius = 2;
  if (radiusKm !== undefined) {
    radius = parseFloat(radiusKm);
    if (Number.isNaN(radius) || radius <= 0) {
      res.status(400);
      throw new Error("'radiusKm' must be a positive number");
    }
  }

  const stats = await getAreaSafetyStats(locality.trim(), radius);
  res.status(200).json(stats);
});

module.exports = { getAreaAudit };
