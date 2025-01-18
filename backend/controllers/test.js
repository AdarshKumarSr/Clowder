const AdvancedCodeRunner = require('./AdvanceCodeRunner');

const runner = new AdvancedCodeRunner();

const userCode = `
class Sol:
    def find_closest_to_zero(self, nums):
        return min(nums, key=lambda x: (abs(x), -x))
`;

const testCaseInput = `nums = [4, 2, 1, -4, 7]\nobj = Sol()\nprint(obj.find_closest_to_zero(nums))
`;

runner.runPythonCodeWithInput(userCode, testCaseInput)
  .then((output) => console.log('Output:', output))
  .catch((error) => console.error('Error:', error));
