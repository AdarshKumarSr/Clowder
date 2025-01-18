import React, { useState, useRef } from "react";
import AceEditor from "react-ace";
import axios from "axios";
import "../assets/css/compiler.css";

// Import ACE themes and modes
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/ext-language_tools";

const Compiler = () => {
  const [code, setCode] = useState(`# Write your Python code here\nprint("Dude! at least write one line of code!")`);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [complexity, setComplexity] = useState({ timeComplexity: "", spaceComplexity: "" });
  const [steps, setSteps] = useState([]); // For visualization steps
  const [currentStepIndex, setCurrentStepIndex] = useState(0); // Current step index for visualization
  const editorRef = useRef(null); // Ref to access AceEditor instance
  const [highlightMarker, setHighlightMarker] = useState(null); // Store marker ID for highlighting

  const runCode = async () => {
    setError("");
    setOutput("Running...");
    try {
      const response = await axios.post("http://localhost:5000/api/compiler/run", { code });
      setOutput(response.data.output || "Code executed successfully with no output.");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while running the code.");
      setOutput("");
    }
  };

  const analyzeCode = async () => {
    setComplexity({ timeComplexity: "Analyzing...", spaceComplexity: "Analyzing..." });
    try {
      const response = await axios.post("http://localhost:5000/api/complexity/analyze", { code });
      setComplexity({
        timeComplexity: response.data.timeComplexity || "N/A",
        spaceComplexity: response.data.spaceComplexity || "N/A",
      });
    } catch (err) {
      setComplexity({ timeComplexity: "Error", spaceComplexity: "Error" });
      console.error(err);
    }
  };

  const visualizeCode = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/visualize/getsteps", { code });
      const fetchedSteps = Array.isArray(response.data) ? response.data : [];

      if (fetchedSteps.length > 0) {
        setSteps(fetchedSteps);
        setCurrentStepIndex(0); // Reset to the first step
        setError(""); // Clear any error
        highlightLine(fetchedSteps[0]?.line); // Highlight the first step's line
      } else {
        setError("No steps returned from the API.");
        setSteps([]);
        removeHighlight(); // Clear any highlights
      }
    } catch (err) {
      setError("Failed to fetch steps for visualization.");
      console.error(err);
      setSteps([]);
      removeHighlight(); // Clear any highlights
    }
  };

  const clearEditor = () => {
    setCode("");
    setOutput("");
    setError("");
    setComplexity({ timeComplexity: "", spaceComplexity: "" });
    setSteps([]);
    setCurrentStepIndex(0);
    removeHighlight(); // Clear any highlights
  };

  const highlightLine = (lineNumber) => {
    if (editorRef.current && lineNumber) {
      const editor = editorRef.current.editor; // Access AceEditor instance
      const session = editor.getSession();

      // Convert 1-based line number to 0-based index
      const lineIndex = lineNumber - 1;

      // Remove previous marker
      if (highlightMarker !== null) {
        session.removeGutterDecoration(highlightMarker, "highlighted-line");
      }

      // Highlight the specified line
      session.addGutterDecoration(lineIndex, "highlighted-line");
      setHighlightMarker(lineIndex);
    }
  };

  const removeHighlight = () => {
    if (editorRef.current && highlightMarker !== null) {
      const editor = editorRef.current.editor;
      const session = editor.getSession();
      session.removeGutterDecoration(highlightMarker, "highlighted-line");
      setHighlightMarker(null);
    }
  };

  const showNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      const nextStepIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextStepIndex);
      highlightLine(steps[nextStepIndex]?.line);
    }
  };

  const showPreviousStep = () => {
    if (currentStepIndex > 0) {
      const previousStepIndex = currentStepIndex - 1;
      setCurrentStepIndex(previousStepIndex);
      highlightLine(steps[previousStepIndex]?.line);
    }
  };

  return (
    <div className="compiler-container">
      <h1>Python Online Compiler</h1>
      <div className="editor-output-container">
        <div className="editor-container">
          <AceEditor
            mode="python"
            theme="monokai"
            name="python-editor"
            value={code}
            onChange={(newCode) => setCode(newCode)}
            fontSize={14}
            showPrintMargin={false}
            setOptions={{ useWorker: false }}
            style={{ width: "100%", height: "400px" }}
            ref={editorRef}
          />
          <div className="button-group">
            <button onClick={()=>{runCode(), analyzeCode()}} className="run-btn">Run Code</button>
            {/* <button onClick={analyzeCode} className="analyze-btn">Analyze Code</button> */}
            <button onClick={visualizeCode} className="visualize-btn">Visualize</button>
            <button onClick={clearEditor} className="clear-btn">Clear Editor</button>
          </div>
        </div>

        <div className="output-container">
          <h3>Output</h3>
          <pre id="output">{output}</pre>
          {error && <pre id="error" style={{ color: "red" }}>{error}</pre>}
        </div>
      </div>

      <div className="complexity-container">
        <h3>Complexity Analysis</h3>
        <p>Time Complexity: {complexity.timeComplexity}</p>
        <p>Space Complexity: {complexity.spaceComplexity}</p>
      </div>

      {/* Visualization Section */}
      {steps.length > 0 && (
        <div className="visualization-container">
          <h3>Visualization Steps</h3>
          <p> {/* yaha pe */}
            <strong>Step {steps[currentStepIndex]?.stepNumber}:</strong>{" "}
            {steps[currentStepIndex]?.description}
          </p>
          {steps[currentStepIndex]?.local_vars && (
            <div> {/* yaha pe */}
              <strong>Local Variables:</strong>
              <pre>{JSON.stringify(steps[currentStepIndex].local_vars, null, 2)}</pre>
            </div>
          )}
          {steps[currentStepIndex]?.line && (
            <div> {/* yaha pe */}
              <strong>Line Number:</strong> {steps[currentStepIndex].line}
            </div>
          )}
          <div className="button-group">
            <button onClick={showPreviousStep} disabled={currentStepIndex === 0}>Previous</button>
            <button onClick={showNextStep} disabled={currentStepIndex === steps.length - 1}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compiler;
