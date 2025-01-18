const express = require("express");
const router = express.Router();
const CodeRunner = require("../controllers/compiler.controller");  // Importing the function


const codeRunner = new CodeRunner();
// Define POST route for running Python code
router.post("/run", codeRunner.runPythonCode);  // This should work as long as the function is correctly exported

module.exports = router;
