// the local vars table
import "../../assets/css/local-frame.css";
import { ArcherContainer, ArcherElement } from "react-archer";
import DictComponent from "./Dict_component";
import ListComponent from "./List_component";
import SetComponent from "./Set_component";
import TuplesComponent from "./Tuples_component";
import PythonObjectVisualizer from "./PythonObjectVisualizer";

const LocalFrameComponent = ({ step }) => {
  const local_vars = step.local_vars || [];
  const primary_types = [
    "str",
    "bool",
    "float",
    "int",
    "char"
  ];

  // Filter out the non-primary (complex) variables.
  const complexVars = local_vars.filter(
    (element) => !primary_types.includes(element.type)
  );

  return (
    <ArcherContainer strokeColor="black" strokeWidth={1}>
      <div className="local-frame-container">
        {/* Left side: Main table with all variables */}
        <div className="local-frame-left">
          <h2>Local Variables</h2>
          <table className="local-frame-table">
            <thead>
              <tr>
                <th>Variable Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {local_vars.length > 0 ? (
                local_vars.map((element, index) => {
                  const isPrimary = primary_types.includes(element.type);
                  if (isPrimary) {
                    return (
                      <tr key={index}>
                        <td>{element.name}</td>
                        <td>
                          {element.type === "str"
                            ? `"${element.value}"`
                            : element.value.toString()}
                        </td>
                      </tr>
                    );
                  } else {
                    // Determine the index within the complex variables list.
                    const complexIndex = complexVars.findIndex(
                      (item) => item === element
                    );
                    return (
                      <tr key={index}>
                        <td>{element.name}</td>
                        <td>
                          <ArcherElement
                            id={`arrow-source-${complexIndex}`}
                            relations={[
                              {
                                targetId: `arrow-target-${complexIndex}`,
                                targetAnchor: "left",
                                sourceAnchor: "right"
                              }
                            ]}
                          >
                            <div className="complex-arrow">•</div>
                          </ArcherElement>
                        </td>
                      </tr>
                    );
                  }
                })
              ) : (
                <tr>
                  <td colSpan="2">No local variables to display.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Right side: Complex values table */}
        <div className="local-frame-right">
          {complexVars.length > 0 && (
            <>
              <table className="complex-values-table">
                <tbody>
                  {complexVars.map((element, idx) => (
                    <tr key={idx}>
                      <td>
                        <ArcherElement id={`arrow-target-${idx}`}>
                          <div>
                            {element.type === "dict" ? (
                              <DictComponent input={element.value} />
                            ) : element.type === "list" ? (
                              <ListComponent input={element.value} />
                            ) : element.type === "set" ? (
                              <SetComponent input={element.value} />
                            ) : element.type === "tuple" ? (
                              <TuplesComponent input={element.value} />
                            ) : (
                              // JSON.stringify(element.value)
                              (<PythonObjectVisualizer data={element.value} type={element.type}/>)
                            )}
                          </div>
                        </ArcherElement>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </ArcherContainer>
  );
};

export default LocalFrameComponent;
