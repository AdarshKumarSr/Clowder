const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { v4: uuidv4 } = require('uuid'); // For unique file names

class AdvancedCodeRunner {
  /**
   * Executes Python code with given input.
   * @param {string} code - The user's Python code.
   * @param {string} input - The input to append to the code.
   * @returns {Promise<string>} - The output of the Python script.
   */
  async runPythonCodeWithInput(code, input) {
    const combinedCode = `${code.trim()}\n${input.trim()}`;
    console.log('--- Combined Code to Execute ---\n', combinedCode);

    // Create a unique temporary file
    const uniqueFileName = `temp_script_${uuidv4()}.py`;
    const filePath = path.join(__dirname, uniqueFileName);
    fs.writeFileSync(filePath, combinedCode);
    console.log('Temporary Python File Path:', filePath);

    return new Promise((resolve, reject) => {
      const pythonProcess = spawn('python', [filePath]);

      let output = '';
      let error = '';

      pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
        console.log('Python STDOUT:', data.toString());
      });

      pythonProcess.stderr.on('data', (data) => {
        error += data.toString();
        console.error('Python STDERR:', data.toString());
      });

      pythonProcess.on('close', (exitCode) => {
        // Safely delete the temporary file
        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
          } catch (unlinkError) {
            console.error('Error deleting file:', unlinkError.message);
          }
        }

        console.log('--- Python Execution Logs ---');
        console.log('Exit Code:', exitCode);
        console.log('Standard Output:', output.trim());
        console.error('Standard Error:', error.trim());

        if (exitCode !== 0) {
          reject({
            error: `Execution Error: Exit code ${exitCode}`,
            details: error.trim(),
          });
        } else {
          resolve(output.trim());
        }
      });

      pythonProcess.on('error', (err) => {
        console.error('Process Error:', err);
        reject({ error: 'Execution Error', details: err.message });
      });
    });
  }
}

module.exports = AdvancedCodeRunner;
