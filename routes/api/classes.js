const router = require("express").Router();
const classesController = require("../../controllers/classesController");

// Matches with "/api/classes"
router.route("/")
  .get(classesController.findAll)
  .post(classesController.create);

// Matches with "/api/classes/:id"
router
  .route("/:id")
  .get(classesController.findById)
  .put(classesController.update)
  .delete(classesController.remove);

module.exports = router;
