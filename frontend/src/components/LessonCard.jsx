import React from "react";
import PropTypes from "prop-types";

const CustomCard = ({
  width = 500,
  height = 243,
  heading = "Card Heading",
  listItems = [],
}) => {
  const cardStyle = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: "#2D2E2E",
    borderRadius: "10px",
    padding: "20px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const headingStyle = {
    fontSize: "32px",
    fontFamily: "Imprima, sans-serif",
    color: "#8364BC",
    marginTop: "23px", // Reduced from 35px
    marginBottom: "13px", // Reduced from 20px
    textAlign: "center",
  };

  const lineBreakStyle = {
    width: "90%",
    height: "2px",
    backgroundColor: "#F8F4FF",
    margin: "7px 0", // Reduced from 10px
  };

  const listContainerStyle = {
    width: "90%", // Matches the line break width
    marginTop: "7px", // Reduced from 10px
    textAlign: "left",
  };

  const listStyle = {
    listStyleType: "none", // Remove default bullets
    margin: "0",
    padding: "0",
    fontSize: "16px",
    fontFamily: "Imprima, sans-serif",
    color: "#8364BC",
  };

  const listItemStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px", // Reduced from 8px
  };

  const bulletStyle = {
    display: "inline-block",
    width: "17px",
    height: "16px",
    backgroundColor: "#F8F4FF",
    marginRight: "7px", // Reduced from 10px
    borderRadius: "2px"
  };

  return (
    <div style={cardStyle}>
      <h2 style={headingStyle}>{heading}</h2>
      <div style={lineBreakStyle}></div>
      <div style={listContainerStyle}>
        <ul style={listStyle}>
          {listItems.map((item, index) => (
            <li key={index} style={listItemStyle}>
              <span style={bulletStyle}></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

CustomCard.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  heading: PropTypes.string,
  listItems: PropTypes.arrayOf(PropTypes.string),
};

export default CustomCard;
