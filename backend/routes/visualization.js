const express = require('express');
const router = express.Router();
const { executePythonCode } = require('../controllers/visualization.controller');

router.post('/getsteps', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, error: "Code is required." });
  }

  try {
    const steps =JSON.stringify( await executePythonCode(code), null, 2)
    // console.log(JSON.stringify(steps, null, 2));
    console.log(steps);
    
    return res.json(steps);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
