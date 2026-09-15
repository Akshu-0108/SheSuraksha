const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createSavedRoute, getSavedRoutes, deleteSavedRoute } = require("../controllers/savedRouteController");
const router = express.Router();
router.use(protect);
router.route("/").get(getSavedRoutes).post(createSavedRoute);
router.delete("/:id", deleteSavedRoute);
module.exports = router;
