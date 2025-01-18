const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

class CodeRunner {
  async runPythonCode(req, res) {
    const { code } = req.body;

    // Create a temporary Python file with the code
    const filePath = path.join(__dirname, 'temp_script.py');
    fs.writeFileSync(filePath, code); // Write the code to a temporary file

    try {
      const pythonProcess = spawn('python', [filePath]);

      let output = '';
      let error = '';

      pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        error += data.toString();
      });

      pythonProcess.on('close', (code) => {
        // Remove the temporary file after execution
        fs.unlinkSync(filePath);

        if (code !== 0) {
          res.status(500).json({ error: `Error code: ${code}, stderr: ${error}` });
        } else {
          res.status(200).json({ output });
        }
      });

    } catch (err) {
      res.status(500).json({ error: 'An error occurred while executing the code.' });
    }
  }
}

module.exports = CodeRunner;
