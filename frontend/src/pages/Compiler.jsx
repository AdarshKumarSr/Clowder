import { useState, useRef } from "react";
import AceEditor from "react-ace";
import axios from "axios";
import "../assets/css/compiler.css";

// Import ACE themes and modes
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/ext-language_tools";
import VisualizationComponent from "../components/Visualization-Components/Visualization";

import { InstagramIcon, Linkedin, GithubIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a
          href="https://www.instagram.com/im__jayesh_"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "flex" }}
        >
          <InstagramIcon />{" "}
          <span style={{ padding: "0px 5px" }}>Instagram</span>
        </a>
        <a
          href="https://www.linkedin.com/in/jayesh-suthar-07a1322b5/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "flex" }}
        >
          <Linkedin />{" "}
          <span style={{ padding: "0px 5px" }}>LinkedIn</span>
        </a>
        <a
          href="https://github.com/Im-Jayesh"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "flex" }}
        >
          <GithubIcon />{" "}
          <span style={{ padding: "0px 5px" }}>GitHub</span>
        </a>
      </div>
      <p style={{ margin: "2px" }}>
        © {new Date().getFullYear()} Clowder | All Rights Reserved
      </p>
      <p className="beta-disclaimer" style={{ margin: "2px" }}>
        This product is currently in **beta version** and may not work with all
        provided codes.
      </p>
    </footer>
  );
};

const Compiler = () => {
  const boiler_says = [
    "Hey! ain't got nothing to code or what",
    "You compleate twat! code!!",
    "Slay! CODE! CODE!",
    "Let's get this bread, coder!",
    "No cap, you need to code!",
    "Time to flex those coding skills!",
    "Yeet that code into existence!",
    "Coding vibes only, fam!",
    "Don't ghost your code, fam!",
    "Keep it 100 and code!",
    "Low-key, you should be coding!",
    "Big brain time, start coding!",
    "Code like a boss!",
    "Don't sleep on your code!",
    "Let's vibe and code!"
];

  const [code, setCode] = useState(`# Write your Python code here\nprint("${boiler_says[Math.floor(Math.random() * boiler_says.length)]}")`);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [complexity, setComplexity] = useState({ timeComplexity: "", spaceComplexity: "" });
  const [showVisualization, setShowVisualization] = useState(false); // Toggle visibility
  const editorRef = useRef(null); // Ref to access AceEditor instance

  const runCode = async () => {
    if(showVisualization){
      setShowVisualization(!showVisualization);
    }
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
    if(showVisualization === false){
      setShowVisualization(!showVisualization);
    }
  };

const ButtonGroup = () => {
  return (
    <div className="button-group">
                    <svg className="run-btn" onClick={()=>{runCode(); analyzeCode();}} viewBox="0 0 51 55" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M45.8428 19.2415C51.9526 22.6453 52.0151 31.4124 45.9544 34.9029L13.7608 53.4439C7.78549 56.8852 0.318536 52.6043 0.269389 45.709L0.00836506 9.0877C-0.040782 2.19242 7.36439 -2.19452 13.3882 1.16128L45.8428 19.2415Z" fill="#FBFBFB"/>
            </svg>
                    <button onClick={()=>{visualizeCode();}} className="visualize-btn"><svg className="vis-eye" width="197" height="32" viewBox="0 0 197 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.4 4.864L8.28 22H6.12L0 4.864H2.256L6.12 15.856C6.296 16.32 6.448 16.768 6.576 17.2C6.704 17.632 6.816 18.048 6.912 18.448C7.024 18.832 7.12 19.216 7.2 19.6C7.28 19.216 7.368 18.824 7.464 18.424C7.576 18.024 7.696 17.608 7.824 17.176C7.968 16.744 8.12 16.288 8.28 15.808L12.12 4.864H14.4ZM21.5426 22H15.3506V20.752L17.3666 20.296V6.592L15.3506 6.112V4.864H21.5426V6.112L19.5266 6.592V20.296L21.5426 20.752V22ZM34.5714 17.416C34.5714 18.44 34.3234 19.312 33.8274 20.032C33.3314 20.736 32.6194 21.28 31.6914 21.664C30.7794 22.048 29.6994 22.24 28.4514 22.24C27.8114 22.24 27.1954 22.208 26.6034 22.144C26.0274 22.08 25.4994 21.992 25.0194 21.88C24.5394 21.752 24.1154 21.6 23.7474 21.424V19.36C24.3234 19.616 25.0354 19.848 25.8834 20.056C26.7474 20.264 27.6354 20.368 28.5474 20.368C29.3954 20.368 30.1074 20.256 30.6834 20.032C31.2594 19.808 31.6914 19.488 31.9794 19.072C32.2674 18.656 32.4114 18.168 32.4114 17.608C32.4114 17.048 32.2914 16.576 32.0514 16.192C31.8114 15.808 31.3954 15.456 30.8034 15.136C30.2274 14.8 29.4194 14.448 28.3794 14.08C27.6434 13.808 26.9954 13.52 26.4354 13.216C25.8914 12.896 25.4354 12.536 25.0674 12.136C24.6994 11.736 24.4194 11.28 24.2274 10.768C24.0514 10.256 23.9634 9.664 23.9634 8.992C23.9634 8.08 24.1954 7.304 24.6594 6.664C25.1234 6.008 25.7634 5.504 26.5794 5.152C27.4114 4.8 28.3634 4.624 29.4354 4.624C30.3794 4.624 31.2434 4.712 32.0274 4.888C32.8114 5.064 33.5234 5.296 34.1634 5.584L33.4914 7.432C32.8994 7.176 32.2514 6.96 31.5474 6.784C30.8594 6.608 30.1394 6.52 29.3874 6.52C28.6674 6.52 28.0674 6.624 27.5874 6.832C27.1074 7.04 26.7474 7.336 26.5074 7.72C26.2674 8.088 26.1474 8.52 26.1474 9.016C26.1474 9.592 26.2674 10.072 26.5074 10.456C26.7474 10.84 27.1394 11.184 27.6834 11.488C28.2274 11.792 28.9634 12.12 29.8914 12.472C30.8994 12.84 31.7474 13.24 32.4354 13.672C33.1394 14.088 33.6674 14.592 34.0194 15.184C34.3874 15.776 34.5714 16.52 34.5714 17.416ZM51.0553 15.952C51.0553 17.136 50.8153 18.208 50.3353 19.168C49.8553 20.112 49.1193 20.864 48.1273 21.424C47.1513 21.968 45.9033 22.24 44.3833 22.24C42.2553 22.24 40.6313 21.664 39.5113 20.512C38.4073 19.344 37.8553 17.808 37.8553 15.904V4.864H40.0153V15.976C40.0153 17.368 40.3833 18.448 41.1193 19.216C41.8713 19.984 42.9993 20.368 44.5033 20.368C45.5433 20.368 46.3833 20.184 47.0233 19.816C47.6793 19.432 48.1593 18.912 48.4633 18.256C48.7673 17.584 48.9193 16.816 48.9193 15.952V4.864H51.0553V15.952ZM66.0956 22L64.0316 16.696H57.2396L55.1996 22H53.0156L59.7116 4.792H61.6556L68.3276 22H66.0956ZM61.4636 9.592C61.4156 9.464 61.3356 9.232 61.2236 8.896C61.1116 8.56 60.9996 8.216 60.8876 7.864C60.7916 7.496 60.7116 7.216 60.6476 7.024C60.5676 7.344 60.4796 7.672 60.3836 8.008C60.3036 8.328 60.2156 8.624 60.1196 8.896C60.0396 9.168 59.9676 9.4 59.9036 9.592L57.9596 14.776H63.3836L61.4636 9.592ZM70.6718 22V4.864H72.8318V20.08H80.3198V22H70.6718ZM88.0817 22H81.8897V20.752L83.9057 20.296V6.592L81.8897 6.112V4.864H88.0817V6.112L86.0657 6.592V20.296L88.0817 20.752V22ZM101.855 22H89.9745V20.368L98.9985 6.784H90.2625V4.864H101.615V6.496L92.5905 20.08H101.855V22ZM114.701 22H105.125V4.864H114.701V6.76H107.285V12.112H114.269V13.984H107.285V20.104H114.701V22Z" fill="black"/>
            <path d="M153.097 2C162.935 21.076 181.154 21.4653 188.077 2" stroke="black" stroke-width="3" stroke-linecap="round"/>
            <path d="M195 16.015L189.534 11.3434" stroke="black" stroke-width="3" stroke-linecap="round"/>
            <path d="M148 19.9127L154.551 13.6747" stroke="black" stroke-width="3" stroke-linecap="round"/>
            <path d="M158.117 28.0099L162.672 19.9962" stroke="black" stroke-width="3" stroke-linecap="round"/>
            <path d="M187.001 24.3853L183.417 17.9616" stroke="black" stroke-width="3" stroke-linecap="round"/>
            <path d="M173.377 30.1359L172.662 21.076" stroke="black" stroke-width="3" stroke-linecap="round"/>
            </svg>

            </button>
        </div>
  )
}

const CodeAnalisis = () => {
  return (
                    <div className="output-complexity-container">
                  <div className="output-bar"><h3>{'Terminal^'}</h3></div>
                  <pre id="output">{output}</pre>
                  {error && <pre id="error" style={{ color: "red" }}>{error}</pre>}
                  <div className="output-bar"><h3>{'Complexities:'}</h3></div>
                  <div className="comp">
                  <p>Time Complexity: {complexity.timeComplexity}</p>
                  <p>Space Complexity: {complexity.spaceComplexity}</p>
                </div>
                
            </div>
  )
}

  return (
    <>
    
    <div className="compiler-container">
      <div className="button-editor-output-container">
          <ButtonGroup />
        <div className="editor-output-container">
          <div className="editor-container">
                        <AceEditor
                          mode="python"
                          theme="monokai"
                          name="python-editor"
                          value={code}
                          onChange={(newCode) => setCode(newCode)}
                          fontSize={18}
                          showPrintMargin={false}
                          editorProps={{ $blockScrolling: true }}
                          setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            fontSize: "18px",
                            wrap: true,
                          }}
                          style={{ width: "100%", height: "100vh", borderRadius: "0px" }}
                          ref={editorRef}
                        />
          </div>
            {showVisualization ? (
              <VisualizationComponent code={code} />
            ) : (
              <div>
                  {!showVisualization && (
                    <CodeAnalisis />
                  )}
              </div>
            )}
        </div>
      </div>
    </div>
      <Footer />
    </>
  );

};

export default Compiler;