// python set component

const StrToSet = (input_str) => {
  return input_str
    .trim()
    .slice(1, input_str.length - 1)
    .split(",")
    .map((item) => item.trim().replace(/^'|'$/g, ""));
};

const SetComponent = ({ input }) => {
  const result = StrToSet(input);
  const rows = Math.ceil(Math.sqrt(result.length)); // Auto-calculate rows
  const cols = Math.ceil(result.length / rows); // Auto-calculate columns

  // Convert flat array into a 2D array for the table
  const tableData = Array.from({ length: rows }, (_, rowIndex) =>
    result.slice(rowIndex * cols, (rowIndex + 1) * cols)
  );

  return (
    <div style={{ marginTop: "10px", textAlign: "left" }}>
      <p style={{ margin: "2px" }}>set</p>
      <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, colIndex) => (
                <td key={colIndex} style={{ border: "1px solid #aaa", padding: "5px", fontSize: "14px" }}>
                  <div style={{ textAlign: "center" }}>
                    <span>{value}</span>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SetComponent;
