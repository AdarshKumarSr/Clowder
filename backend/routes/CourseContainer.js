const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');

router.get('/courses', authenticate, (req, res) => {
  res.json({
    message: 'Courses fetched successfully',
    user: req.user, // contains id and email
    courses: ['Intro to JS', 'Advanced React', 'Node Basics'],
  });
});

module.exports = router;
