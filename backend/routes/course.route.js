const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");

router.get("/:courseId/page/:pageNumber", courseController.getCoursePage);

module.exports = router;
