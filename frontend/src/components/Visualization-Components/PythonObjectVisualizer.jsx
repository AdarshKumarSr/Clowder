import React from "react";
import { ArcherElement } from "react-archer";
import ListComponent from "./List_component";
import SetComponent from "./Set_component";
import TuplesComponent from "./Tuples_component";


const ArcherGenericObjectNode = ({ data, nodeId, type }) => {
  const childKeys = Object.keys(data).filter(
    (key) => key !== "type" && data[key] && typeof data[key] === "object"
  );

  const rows = Object.entries(data)
    .filter(([key]) => key !== "type")
    .map(([key, value]) => {
      let componentType = null;
      if (typeof value === "string") {
        if (value.startsWith("[")) componentType = "list";
        else if (value.startsWith("(")) componentType = "tuple";
        else if (value.startsWith("{")) componentType = "set";
      }

      if (componentType) {
        return (
          <tr key={key}>
            <td style={{ border: "1px solid #333", padding: "4px" }}>{key}</td>
            <td
              style={{
                border: "1px solid #333",
                padding: "4px",
                textAlign: "center",
              }}
            >
              <ArcherElement
                id={`source-${nodeId}-${key}`}
                relations={[
                  {
                    targetId: `${componentType}-${nodeId}-${key}`,
                    targetAnchor: "left",
                    sourceAnchor: "right",
                    style: { strokeColor: "black", strokeWidth: 1 },
                  },
                ]}
              >
                <span
                  style={{
                    color: "black",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  {componentType === "list" ? "[List]" : componentType === "tuple" ? "(Tuple)" : "{Set}"}
                </span>
              </ArcherElement>
            </td>
          </tr>
        );
      } else if (value && typeof value === "object") {
        return (
          <tr key={key}>
            <td style={{ border: "1px solid #333", padding: "4px" }}>{key}</td>
            <td
              style={{
                border: "1px solid #333",
                padding: "4px",
                textAlign: "center",
              }}
            >
              <ArcherElement
                id={`source-${nodeId}-${key}`}
                relations={[
                  {
                    targetId: `child-${nodeId}-${key}`,
                    targetAnchor: "left",
                    sourceAnchor: "right",
                    style: { strokeColor: "black", strokeWidth: 1 },
                  },
                ]}
              >
                <span
                  style={{
                    color: "black",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  [Object]
                </span>
              </ArcherElement>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={key}>
            <td style={{ border: "1px solid #333", padding: "4px" }}>{key}</td>
            <td style={{ border: "1px solid #333", padding: "4px" }}>
              {String(value)}
            </td>
          </tr>
        );
      }
    });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        marginBottom: "20px",
      }}
    >
      <div>
        <div style={{ fontWeight: "bold", padding: "4px 0" }}>
          {type || "Object"}
        </div>
        <table style={{ borderCollapse: "collapse", minWidth: "150px" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #333", padding: "4px" }}>Key</th>
              <th style={{ border: "1px solid #333", padding: "4px" }}>Value</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>

      <div
        style={{
          marginLeft: "50px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Render Lists, Tuples, and Sets in a separate column */}
        {Object.entries(data)
          .filter(([_, value]) => typeof value === "string" && (value.startsWith("[") || value.startsWith("(") || value.startsWith("{")))
          .map(([key, value]) => {
            let Component = value.startsWith("[")
              ? ListComponent
              : value.startsWith("(")
              ? TuplesComponent
              : SetComponent;

            return (
              <ArcherElement id={`${value.startsWith("[") ? "list" : value.startsWith("(") ? "tuple" : "set"}-${nodeId}-${key}`} key={key}>
                <div
                  style={{
                    padding: "10px",
                    border: "1px solid #fff",
                    backgroundColor: "#fff",
                  }}
                >
                  <Component input={value} />
                </div>
              </ArcherElement>
            );
          })}

        {/* Render Objects in a separate column */}
        {childKeys.map((childKey) => (
          <ArcherElement id={`child-${nodeId}-${childKey}`} key={childKey}>
            <div
              style={{
                padding: "10px",
                border: "1px solid #fff",
                backgroundColor: "#fff",
              }}
            >
              <ArcherGenericObjectNode
                data={data[childKey]}
                nodeId={`child-${nodeId}-${childKey}`}
                type={(data[childKey] && data[childKey].type) || type}
              />
            </div>
          </ArcherElement>
        ))}
      </div>
    </div>
  );
};

export default ArcherGenericObjectNode;
