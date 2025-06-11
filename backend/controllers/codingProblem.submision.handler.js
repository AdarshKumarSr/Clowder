const AdvancedCodeRunner = require('./AdvanceCodeRunner');
const { TestCase } = require('../models/coding_problems.model');

const executeCode = new AdvancedCodeRunner();

class ExecutionTimedOutError extends Error {
    constructor(message) {
        super(message);
        this.name = "ExecutionTimedOutError";
    }
}

const runTests = async(problem_no, userCode) => {
    const testCases = await TestCase.find({ problem_no });
    const start_time = performance.now();
    const results = await Promise.all(
        testCases.map(async(test) => {
            try {
                const start = performance.now();
                const output = await executeCode.runPythonCodeWithInput(userCode, test.input);

                // Normalize the expected and user outputs
                const normalizedExpectedOutput = String(test.expected_output).trim();
                const normalizedUserOutput = String(output).trim();

                // Compare the normalized outputs
                const passed = normalizedUserOutput === normalizedExpectedOutput;
                const end = performance.now();
                console.log(`The test ${test.input} took ${end-start} ms.`)
                if (end - start > 1400) {
                    throw new ExecutionTimedOutError("Execution Timeout");
                }
                return {
                    input: test.input,
                    expected_output: normalizedExpectedOutput,
                    user_output: normalizedUserOutput,
                    passed: passed,
                    execution_time: end - start
                };
            } catch (error) {
                if (error instanceof ExecutionTimedOutError) {
                    return {
                        input: test.input,
                        expected_output: test.expected_output,
                        user_output: error.error,
                        passed: false,
                        error: error.message
                    }
                }
                return {
                    input: test.input,
                    expected_output: test.expected_output,
                    user_output: error.error,
                    passed: false
                };
            }
        })
    );
    const end_time = performance.now();
    const total_time_to_execute = end_time - start_time;
    results.push(total_time_to_execute);
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

module.exports = { runTests };