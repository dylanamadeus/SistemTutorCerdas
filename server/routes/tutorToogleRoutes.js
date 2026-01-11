const express = require("express");
const router = express.Router();
const tutorController = require("../controllers/tutorController");

router.post("/:courseId", tutorController.createTutor);
router.get("/:courseId", tutorController.getTutorStatus);
router.put("/:courseId/status", tutorController.toggleTutor);
router.post("/:courseId/rebuild", tutorController.rebuildVector);

module.exports = router;
