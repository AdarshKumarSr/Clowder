const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");
const authenticate = require("../middlewares/authMiddleware")

router.get("/:courseId/page/:pageNumber", authenticate, courseController.getCoursePage);

module.exports = router;
