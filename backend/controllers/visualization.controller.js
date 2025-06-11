const { loadPyodide } = require("pyodide");

// Function to execute Python code and generate execution steps
async function executePythonCode(code) {
    const pyodide = await loadPyodide();

    // Load the tracing function into Pyodide
    await pyodide.runPythonAsync(`
import sys
import json
import types

execution_steps = []

def make_json_serializable(value):
    """ Convert objects into JSON-safe string representations. """
    if isinstance(value, (int, float, bool, type(None), str)):
        return str(value)
    elif isinstance(value, (tuple, set)):
        return str(value)  
    elif isinstance(value, dict):
        return value
    elif isinstance(value, list):
        return [{k: make_json_serializable(v) for k, v in x.__dict__.items()} if hasattr(x, '__dict__') else x for x in value]
    elif hasattr(value, '__dict__'):
        obj = {k: make_json_serializable(v) for k, v in value.__dict__.items()}
        obj['type'] = type(value).__name__
        return obj  # Objects
    else:
        return str(value)  # any other unsupported types 


def trace_function(frame, event, arg):
    if event == "line":
        local_vars = frame.f_locals # this gets all the local variables that are in the frame
        line_no = frame.f_lineno # this gets the line number 
        function_name = frame.f_code.co_name # this gets the function name if i am not wrong

        serializable_vars = []
        for var, value in local_vars.items():
            if var.startswith('__') or isinstance(value, (types.BuiltinFunctionType, type)):
                continue
            try:
                serializable_vars.append({
                    "name": var,
                    "value": make_json_serializable(value),
                    "type": type(value).__name__
                })
            except Exception:
                pass  # Avoid serialization errors
        
        execution_steps.append({
            "line": line_no,
            "function": function_name,
            "local_vars": serializable_vars,
            "description": f"Executing line {line_no} in {function_name}"
        })

    return trace_function

def execute_code(user_code):
    global execution_steps
    execution_steps = []
    local_scope = {}
    try:
        sys.settrace(trace_function)
        exec(user_code, {}, local_scope)
    except Exception as e:
        execution_steps.append({"error": str(e)})
    finally:
        sys.settrace(None)
    return json.dumps(execution_steps, indent=4)
    `);

    try {
        // Pass the code correctly as a string argument
        const traceResults = await pyodide.runPythonAsync(`execute_code(${JSON.stringify(code)})`);
        return JSON.parse(traceResults);
    } catch (error) {
        throw new Error(`Execution error: ${error.message}`);
    }
}

module.exports = {
    executePythonCode,
};