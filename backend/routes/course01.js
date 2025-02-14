// routes/Course01.route.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/Course01.controller');

// POST: Create Course
router.post('/', courseController.createCourse);

// GET: Fetch Courses (Optional)
router.get('/', courseController.getCourses);

module.exports = router;
