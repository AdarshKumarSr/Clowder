// python tuple component

const parseTuple = (input) => {
  if (!input || typeof input !== "string") return [];

  console.log("Raw Tuple Input:", input); // Debugging

  // Convert "(1, 2, 3)" to a valid JSON-like "[1, 2, 3]"
  const formatted = input
    .replace(/'/g, '"') // Convert single quotes to double quotes
    .replace(/^\(/, "[") // Change ( to [
    .replace(/\)$/, "]"); // Change ) to ]

  try {
    return JSON.parse(formatted); // Convert to an array
  } catch (error) {
    console.error("Error parsing tuple:", error, "Input:", input);
    return [];
  }
};

const TuplesComponent = ({ input = "()" }) => {
  const values = parseTuple(input);

  return (
    <div style={{ marginTop: "10px", textAlign: "left" }}>
      <p style={{ margin: "2px" }}>tuple</p>
      {values.length > 0 ? (
        <table style={{ borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              {values.map((value, index) => (
                <td key={index} style={{ border: "1px solid #aaa", padding: "5px", fontSize: "14px" }}>
                  <div style={{ textAlign: "center" }}>
                    <span style={{ color: "#666", fontSize: "12px" }}>{index}</span>
                    <br />
                    <span>{JSON.stringify(value)}</span>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      ) : (
        <p style={{ color: "red" }}>Empty Tuple</p>
      )}
    </div>
  );
};

export default TuplesComponent;
