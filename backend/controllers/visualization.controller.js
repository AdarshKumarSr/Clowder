const { loadPyodide } = require("pyodide");

// Function to execute Python code and generate execution steps
async function executePythonCode(code) {
    const pyodide = await loadPyodide();

    // Load the tracing function into Pyodide
    await pyodide.runPythonAsync(`
    import sys
    import json
    import types

    def trace_function(frame, event, arg):
        if event == "line":
            local_vars = frame.f_locals
            line_no = frame.f_lineno
            function_name = frame.f_code.co_name

            serializable_vars = {}
            for var, value in local_vars.items():
                if var.startswith('__') or isinstance(value, (types.BuiltinFunctionType, type)):
                    continue
                try:
                    serializable_vars[var] = str(value)
                except Exception:
                    serializable_vars[var] = str(type(value))

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
        try:
            sys.settrace(trace_function)
            exec(user_code, {})
        except Exception as e:
            execution_steps.append({"error": str(e)})
        finally:
            sys.settrace(None)
        return json.dumps(execution_steps)
  `);

    try {
        // Escape the code properly for embedding
        const escapedCode = code
            .replace(/\\/g, '\\\\') // Escape backslashes
            .replace(/'/g, "\\'") // Escape single quotes
            .replace(/"/g, '\\"'); // Escape double quotes

        // Pass the escaped code to Pyodide's exec
        const traceResults = await pyodide.runPythonAsync(`execute_code('''${escapedCode}''')`);
        return JSON.parse(traceResults);
    } catch (error) {

        throw new Error(`Execution error: ${error.message}`);
    }
}

module.exports = {
    executePythonCode,
};