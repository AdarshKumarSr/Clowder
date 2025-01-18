const express = require('express');
const router = express.Router();
const {runTests} = require('../controllers/codingProblem.submision.handler');

// Routes for running tests during submition of a problem
router.post('/:problem_no', async (req, res) => {
    try {
      console.log('--- Running Tests ---');
      console.log('Problem Number:', req.params.problem_no);
      console.log('Received Code:', req.body.code);
  
      const result = await runTests(req.params.problem_no, req.body.code);
      console.log('Test Results:', result);
  
      res.status(200).json({ success: true, result });
    } catch (err) {
      console.error('Error in /runtests route:', err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  });
  
module.exports = router;
