const express = require('express');
const router = express.Router();
const { CodingProblem, TestCase } = require('../models/coding_problems.model');

// Route to fetch a problem by problem_no
router.get('/:problem_no', async (req, res) => {
  try {
    const problemNumber = req.params.problem_no;
    const problem = await CodingProblem.find({ problem_no: problemNumber });
    res.status(200).json({ success: true, problem });
  } catch (err) {
    console.error("Error fetching problem:", err);
    res.status(500).json({ success: false, error: err });
  }
});

// Route to insert a problem and its test cases
router.post('/insert', async (req, res) => {
    const { problem, test_cases } = req.body;
  
    if (
      !problem ||
      !problem.problem_no ||
      !problem.boiler_code || 
      !problem.problem_statement ||
      !problem.output ||
      !problem.difficulty_level ||
      !problem.related_to ||
      !Array.isArray(test_cases)
    ) {
      return res.status(400).json({ success: false, message: "Invalid data. Please provide all required fields." });
    }
  
    try {
      // Insert the problem
      const newProblem = new CodingProblem(problem);
      await newProblem.save();
  
      // Insert associated test cases
      const testCasesData = test_cases.map((testCase) => ({
        problem_no: problem.problem_no,
        input: testCase.input,
        expected_output: testCase.expected_output,
      }));
      await TestCase.insertMany(testCasesData);
  
      res.status(201).json({ success: true, message: "Problem and test cases inserted successfully." });
    } catch (error) {
      console.error("Error inserting problem or test cases:", error);
      res.status(500).json({ success: false, message: "Server error. Please try again." });
    }
  });
  
module.exports = router;
