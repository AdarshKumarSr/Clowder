const AdvancedCodeRunner = require('./AdvanceCodeRunner');

const runner = new AdvancedCodeRunner();

const userCode = `
class Sol:
    def find_closest_to_zero(self, nums):
        return min(nums, key=lambda x: (abs(x), -x))
`;

const testCaseInput = `
import unittest
import timeit

class Sol:
    def find_closest_to_zero(self, lst):
        return min(lst, key=abs)

class TestCases(unittest.TestCase):
    def tests(self):
        test_case = [([4, 2, 1, -4, 7], 1), ([10, -10, 11, 12], 10)]
        for x in range(len(test_case)):
          try:
              users_out_put = Sol().find_closest_to_zero(test_case[x][0])
              self.assertEqual(Sol().find_closest_to_zero(test_case[x][0]), test_case[x][1])
          except AssertionError:
              print(f"Test did not pass SAD init!! Test Case Failed: {test_case[x][0]} Expected Output: {test_case[x][1]} Your Output: {users_out_put}")
TestCases().tests()
`;
console.time("MyTimer")
runner.runPythonCodeWithInput(userCode, testCaseInput)
    .then((output) => console.log('Output:', output))
    .catch((error) => console.error('Error:', error));
console.timeEnd("MyTimer");