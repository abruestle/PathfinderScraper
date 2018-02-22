const router = require("express").Router();
const classRoutes = require("./classes");

// Class routes
router.use("/classes", classRoutes);

module.exports = router;
