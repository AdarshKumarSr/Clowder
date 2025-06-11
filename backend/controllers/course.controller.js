const jsCourse = require("../models/course.model.js");

exports.getCoursePage = (req, res) => {
  const { courseId, pageNumber } = req.params;

  // Ensure pageNumber is treated as a number
  const pageNum = parseInt(pageNumber, 10);

  // Find the matching page
  const page = jsCourse.find(
    (p) => p.courseId === courseId && p.pageNumber === pageNum
  );

  // Handle not found
  if (!page) {
    return res.status(404).json({ error: "Page not found" });
  }

  // Return page data
  return res.status(200).json(page);
};