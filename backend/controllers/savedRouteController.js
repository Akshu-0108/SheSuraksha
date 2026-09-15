const asyncHandler = require("../middleware/asyncHandler");
const SavedRoute = require("../models/SavedRoute");

const riskForScore = (score) => (score >= 82 ? "low" : score >= 65 ? "moderate" : "high");

const serialize = (route) => ({
  savedRouteId: route._id,
  routeId: route.routeId,
  routeName: route.routeName,
  origin: route.origin,
  destination: route.destination,
  distanceKm: route.distanceKm,
  estimatedTimeMinutes: route.estimatedTimeMinutes,
  safetyScore: route.safetyScore,
  riskLevel: route.riskLevel,
  createdAt: route.createdAt,
});

const createSavedRoute = asyncHandler(async (req, res) => {
  const { routeId, routeName, origin, destination, distanceKm, estimatedTimeMinutes, safetyScore } = req.body;
  if (!routeId || !routeName || !origin || !destination || !Number.isFinite(distanceKm) || !Number.isFinite(estimatedTimeMinutes) || !Number.isFinite(safetyScore)) {
    res.status(400);
    throw new Error("routeId, routeName, origin, destination, distanceKm, estimatedTimeMinutes, and safetyScore are required");
  }
  const route = await SavedRoute.create({ user: req.user._id, routeId, routeName, origin, destination, distanceKm, estimatedTimeMinutes, safetyScore, riskLevel: riskForScore(safetyScore) });
  res.status(201).json(serialize(route));
});

const getSavedRoutes = asyncHandler(async (req, res) => {
  const routes = await SavedRoute.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ routes: routes.map(serialize) });
});

const deleteSavedRoute = asyncHandler(async (req, res) => {
  const route = await SavedRoute.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!route) { res.status(404); throw new Error("Saved route not found"); }
  res.status(204).send();
});

module.exports = { createSavedRoute, getSavedRoutes, deleteSavedRoute };
