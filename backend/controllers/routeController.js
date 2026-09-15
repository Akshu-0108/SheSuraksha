const asyncHandler = require("../middleware/asyncHandler");
const { getRouteOptions } = require("../utils/safetyDataEngine");
const { getGoogleRouteEstimates } = require("../utils/googleRoutes");

// @route   POST /api/routes/plan
// @access  Public
const planRoute = asyncHandler(async (req, res) => {
  const { origin, destination } = req.body;

  if (!origin || !destination) {
    res.status(400);
    throw new Error("Both 'origin' and 'destination' are required in the request body");
  }

  const cleanOrigin = origin.trim();
  const cleanDestination = destination.trim();
  const result = getRouteOptions(cleanOrigin, cleanDestination);
  const googleEstimates = await getGoogleRouteEstimates(cleanOrigin, cleanDestination);
  result.routes = result.routes.map((route, index) => ({
    ...route,
    ...(googleEstimates[index] || {}),
    riskLevel: route.safetyScore >= 82 ? "low" : route.safetyScore >= 65 ? "moderate" : "high",
    label: index === 0 ? "Safest" : index === result.routes.length - 1 ? "Fastest" : "Middle ground",
    durationSource: googleEstimates[index] ? "google_maps" : "estimated",
  }));
  res.status(200).json(result);
});

module.exports = { planRoute };
