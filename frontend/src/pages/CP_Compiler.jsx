import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import axios from "axios";
import { useParams } from "react-router-dom";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-python";
import "../assets/css/cp_compiler.css";

const Compiler = () => {
  const { problem_no } = useParams(); // Get the problem_no from URL parameters
  const [problem, setProblem] = useState(null); // Store the problem details
  const [code, setCode] = useState(""); // User's Python code
  const [output, setOutput] = useState(""); // Output of the executed code
  const [error, setError] = useState(""); // Errors (if any)
  const [testResults, setTestResults] = useState([]); // Store test case results
  const [complexity, setComplexity] = useState({
    timeComplexity: "",
    spaceComplexity: "",
  }); // Complexity analysis results

  // Fetch problem details on mount
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/problems/${problem_no}`
        );
        if (response.data.success) {
          const fetchedProblem = response.data.problem[0]; // Assuming the response returns an array
          setProblem(fetchedProblem);
          console.log(fetchedProblem);

          // Check if there's saved code for this problem
          const savedCode = localStorage.getItem(`problem_code_${problem_no}`);

          // Use saved code if available, otherwise use boiler_code from the problem
          if (savedCode) {
            setCode(savedCode);
          } else {
            setCode(fetchedProblem.boiler_code); // Set the boiler code
          }
        } else {
          setError("Failed to load problem details.");
        }
      } catch (err) {
        console.error("Error fetching problem:", err);
        setError("Error loading problem details.");
      }
    };
    fetchProblem();
  }, [problem_no]);

  // Save code to localStorage on every change
  const handleCodeChange = (newCode) => {
    setCode(newCode);
    localStorage.setItem(`problem_code_${problem_no}`, newCode); // Save to localStorage
  };

  // Run the code
  const runCode = async () => {
    setError("");
    setOutput("Running...");
    try {
      const response = await axios.post(`http://localhost:5000/api/compiler/run`, { code });
      setOutput(response.data.output || "Code executed successfully with no output.");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while running the code.");
      setOutput("");
    }
  };

  // Run test cases
  const runTests = async () => {
    setError("");
    try {
      const response = await axios.post(
        `http://localhost:5000/api/runtests/${problem_no}`,
        { code }
      );

      if (response.data.success) {
        // Filter the results to show only the first failed test case or "All tests passed"
        const filteredResults = response.data.result.filter(result => !result.passed);

        // Show only the first failed test case, or if no test fails, show all passed
        if (filteredResults.length > 0) {
          setTestResults([filteredResults[0]]); // Show only first failed test
        } else {
          setTestResults([{ input: "All tests passed", passed: true }]);
        }
      } else {
        setError("Error in running tests: " + response.data.error);
      }
    } catch (err) {
      console.error("Error running tests:", err.response || err);
      setError("Failed to fetch or execute test cases.");
    }
  };

  // Analyze time and space complexity
  const analyzeComplexity = async () => {
    setComplexity({ timeComplexity: "Analyzing...", spaceComplexity: "Analyzing..." });
    try {
      const response = await axios.post(
        `http://localhost:5000/api/complexity/analyze`,
        { code }
      );
      setComplexity({
        timeComplexity: response.data.timeComplexity || "N/A",
        spaceComplexity: response.data.spaceComplexity || "N/A",
      });
    } catch (err) {
      console.error("Error analyzing complexity:", err.response || err);
      setComplexity({ timeComplexity: "Error", spaceComplexity: "Error" });
    }
  };

  // Clear the editor and reset everything
  const clearEditor = () => {
    setCode("");
    setOutput("");
    setError("");
    setTestResults([]);
    setComplexity({ timeComplexity: "", spaceComplexity: "" });
    localStorage.removeItem(`problem_code_${problem_no}`);
  };

  return (
    <div className="cp-compiler-container">
      {problem && (
        <div className="problem-statement">
          <h1>Problem {problem_no}</h1>
          <p>{problem.problem_statement}</p>
        </div>
      )}

      <div className="cp-editor-output">
        <div className="cp-editor-container">
          <AceEditor
            mode="python"
            theme="monokai"
            name="python-editor"
            value={code}
            onChange={handleCodeChange} // Save code changes locally
            fontSize={14}
            showPrintMargin={false}
            setOptions={{ useWorker: false }}
            style={{ width: "100%", height: "100%" }}
          />
          <div className="button-group">
            <button onClick={() => { runCode(); analyzeComplexity(); }}>Run Code</button>
            <button onClick={runTests}>Run Tests</button>
            <button onClick={clearEditor}>Clear Editor</button>
          </div>
        </div>

        <div className="cp-output-container">
          <h3>Output</h3>
          <pre>{output}</pre>
          {error && <pre style={{ color: "red" }}>{error}</pre>}

          <h3>Test Results</h3>
          {testResults.length === 1 && testResults[0].passed && (
            <p style={{ color: "green", fontSize: "1.2rem" }}>All Tests Passed!</p>
          )}
          {testResults.length > 0 && testResults[0].input !== "All tests passed" && (
            testResults.map((result, index) => (
              <div key={index}>
                <p>Input: {JSON.stringify(result.input)}</p>
                <p>Expected Output: {result.expected_output}</p>
                <p>User Output: {result.user_output}</p>
                <p style={{ color: result.passed ? "green" : "red" }}>
                  {result.passed ? "Passed" : "Failed"}
                </p>
                <hr />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Compiler;
