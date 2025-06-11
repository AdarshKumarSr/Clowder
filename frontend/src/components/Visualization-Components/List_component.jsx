import { useState, useEffect } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import DictComponent from "./Dict_component";

// Process the input 
const processInput = (input) => {
  if (!input || !Array.isArray(input)) return [];
  return input;
};

const ListComponent = ({ input = [] }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(processInput(input));
  }, [input]);

  return (
    <ArcherContainer strokeColor="black">
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {/* Left Column: Main Table */}
        <div>
          <p style={{ margin: "2px" }}>List</p>
          <table style={{ borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                {data.map((item, idx) => (
                  <td key={idx} style={{ border: "1px solid #aaa", padding: "5px" }}>
                    {typeof item === "object" && item !== null ? (
                      // Wrap object with ArcherElement to create a clickable label with arrow
                      <ArcherElement
                        id={`source-${idx}`}
                        relations={[
                          {
                            targetId: `child-${idx}`,
                            targetAnchor: "left",
                            sourceAnchor: "right",
                            style: { strokeColor: "black", strokeWidth: 1 },
                          },
                        ]}
                      >
                        <span style={{ textDecoration: "underline", cursor: "pointer" }}>
                          {idx} <br/>
                          [Object]
                        </span>
                      </ArcherElement>
                    ) : (
                      // Render primitive values directly
                      <div>
<span style={{color:"grey", fontSize:"13px"}}>{idx}</span> <br/>
{String(item)}
                      </div>
                      
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right Column: Render nested objects */}
        <div style={{ marginLeft: "50px" }}>
          {data.map((item, idx) =>
            typeof item === "object" && item !== null ? (
              <ArcherElement id={`child-${idx}`} key={`child-${idx}`}>
                <div
                  style={{
                    padding: "10px",
                    border: "1px solid #aaa",
                    backgroundColor: "#fff",
                    marginBottom: "20px",
                  }}
                >
                  <DictComponent input={item} />
                </div>
              </ArcherElement>
            ) : null
          )}
        </div>
      </div>
    </ArcherContainer>
  );
};

export default ListComponent;
