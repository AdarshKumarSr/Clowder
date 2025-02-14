// controllers/Course01.controller.js
const Course = require('../models/course01.model');

// Create Course
exports.createCourse = async (req, res) => {
  try {
    const { courseName, courseDescription, price } = req.body; // Correct field names
    const newCourse = new Course({ courseName, courseDescription, price }); // Correct model fields
    await newCourse.save();
    res.status(201).json({ message: 'Course created successfully', course: newCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create course' });
  }
};

// Get All Courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};
