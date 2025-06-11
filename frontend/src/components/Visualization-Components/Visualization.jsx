import { useState } from "react";
import axios from "axios";
import LocalFrameComponent from "./Local_vars_frame";
import "../../assets/css/visualization.css";

const VisualizationComponent = ({ code }) => {
  const [data, setData] = useState([]);
  const [currStep, setCurrStep] = useState(null);
  const [currStepNo, setCurrStepNo] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [memeUrl, setMemeUrl] = useState("");

  const highlightLine = (line) => {
    if (line !== undefined) {
      console.log(`Highlighting line: ${line}`);
    }
  };

  const removeHighlight = () => {
    console.log("Removing highlights");
  };

  const getRandomMeme = async () => {
    try {
      const response = await axios.get("https://meme-api.com/gimme");
      if (response.data && response.data.url) {
        setMemeUrl(response.data.url);
      }
    } catch (error) {
      console.error("Error fetching meme:", error);
    }
  };

  const getSteps = async () => {
    // getRandomMeme(); // Uncomment if you want to load meme first
    setLoading(true);
    setError("");
    setMemeUrl("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/visualize/getsteps",
        { code }
      );

      const fetchedSteps = Array.isArray(response.data)
        ? response.data
        : JSON.parse(response.data || "[]");

      if (fetchedSteps.length > 0) {
        setData(fetchedSteps);
        setCurrStepNo(0);
        setCurrStep(fetchedSteps[0]);
        highlightLine(fetchedSteps[0]?.line);
      } else {
        setError("No steps returned from the API.");
        setData([]);
        setCurrStep(null);
        removeHighlight();
      }
    } catch (error) {
      setError("Failed to fetch steps for visualization.");
      console.error("Error making request:", error);
      setData([]);
      setCurrStep(null);
      removeHighlight();
    } finally {
      setLoading(false);
    }
  };

  const prev = () => {
    if (currStepNo > 0) {
      const newStepNo = currStepNo - 1;
      setCurrStepNo(newStepNo);
      setCurrStep(data[newStepNo]);
      highlightLine(data[newStepNo]?.line);
    }
  };

  const next = () => {
    if (currStepNo < data.length - 1) {
      const newStepNo = currStepNo + 1;
      setCurrStepNo(newStepNo);
      setCurrStep(data[newStepNo]);
      highlightLine(data[newStepNo]?.line);
    }
  };

  return (
    <div className="visualization-wrapper">
      {/* Controls section */}
      <div className="controls-container">
        <button onClick={getSteps} disabled={loading}>
          Visualize
        </button>
        <button onClick={prev} disabled={currStepNo === 0 || data.length === 0}>
          Prev
        </button>
        <button
          onClick={next}
          disabled={currStepNo >= data.length - 1 || data.length === 0}
        >
          Next
        </button>
      </div>

      {/* Content section */}
      <div className="content-container">
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            {memeUrl && (
              <img src={memeUrl} alt="Loading Meme" className="meme-image" />
            )}
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {currStep && (
          <div className="current-step">
            <p>Current Step: {currStep.line}</p>
            <LocalFrameComponent step={currStep} />
          </div>
        )}
        
      </div>
    </div>
  );
};

export default VisualizationComponent;