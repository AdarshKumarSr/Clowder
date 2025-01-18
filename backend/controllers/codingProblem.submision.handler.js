const AdvancedCodeRunner = require('./AdvanceCodeRunner');
const { TestCase } = require('../models/coding_problems.model');

const executeCode = new AdvancedCodeRunner();

const runTests = async (problem_no, userCode) => {
  const testCases = await TestCase.find({ problem_no });
  const results = await Promise.all(
    testCases.map(async (test) => {
      try {
        const output = await executeCode.runPythonCodeWithInput(userCode, test.input);

        // Normalize the expected and user outputs
        const normalizedExpectedOutput = String(test.expected_output).trim();
        const normalizedUserOutput = String(output).trim();

        // Compare the normalized outputs
        const passed = normalizedUserOutput === normalizedExpectedOutput;

        return {
          input: test.input,
          expected_output: normalizedExpectedOutput,
          user_output: normalizedUserOutput,
          passed: passed
        };
      } catch (error) {
        return {
          input: test.input,
          expected_output: test.expected_output,
          user_output: error.error,
          passed: false
        };
      }
    })
  );
  return results;
};


// async function runTests(problem_no, userCode) {
//   const testCases = await TestCase.find({ problem_no });
//   const results = await Promise.all(testCases.map(async (test) => {
//     try {
//       const output = await executeCode.runPythonCodeWithInput(userCode, test.input);
//       return {
//         input: test.input,
//         expected_output: test.expected_output,
//         user_output: output,
//         passed: output == test.expected_output
//       };
//     } catch (error) {
//       return {
//         input: test.input,
//         expected_output: test.expected_output,
//         user_output: error.error,
//         passed: false
//       };
//     }
//   }));
//   return results;
// }

module.exports = {runTests};
