import React from "react";
import LessonCard from "./LessonCard";

const CourseTimeline = ({ course, lessons }) => {
  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    height: "100vh", // Full viewport height
    backgroundColor: "#1E1F1F",
    color: "#F8F4FF",
    padding: "20px",
    boxSizing: "border-box",
  };

  const lessonListStyle = {
    width: "40%",
    height: "calc(100vh - 40px)", // Full height minus padding
    overflowY: "auto", // Enables vertical scrolling for timeline
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingRight: "15px", // Remove scrollbar visibility
    scrollbarWidth: "none", // Firefox
    WebkitOverflowScrolling: "touch", // iOS
  };

  const courseCardStyle = {
    width: "50%",
    padding: "30px", // Increased padding for better spacing
    backgroundColor: "#2D2E2E",
    borderRadius: "20px", // Soft rounded corners for the card
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    position: "sticky",
    top: "20px",
    maxHeight: "calc(100vh - 40px)", // Adjusted max-height for a more reasonable size
    overflowY: "auto", // Allow scroll inside the course card if needed
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)", // Soft shadow for depth
    transition: "all 0.3s ease-in-out", // Smooth hover effect
  };

  const courseCardHoverStyle = {
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)", // Darker shadow on hover
    transform: "scale(1.02)", // Slight zoom on hover
  };

  const timelineLineStyle = {
    position: "absolute",
    left: "50%",
    width: "4px",
    height: "100%",
    backgroundColor: "#8364BC",
  };

  const diamondStyle = {
    width: "16px",
    height: "16px",
    backgroundColor: "#8364BC",
    transform: "rotate(45deg)",
    position: "absolute",
  };

  const progressBarContainerStyle = {
    width: "100%",
    backgroundColor: "#4A4A4A",
    borderRadius: "10px",
    height: "12px",
    overflow: "hidden",
    marginTop: "15px",
    position: "relative",
  };

  const progressBarStyle = (percentage) => ({
    width: `${percentage}%`,
    backgroundColor: "#8364BC",
    height: "100%",
    borderRadius: "10px",
  });

  const starStyle = (isFilled) => ({
    fontSize: "20px",
    color: isFilled ? "#F8F4FF" : "#4A4A4A",
  });

  return (
    <div style={containerStyle}>
      {/* Left Timeline */}
      <div style={lessonListStyle}>
        <div style={{ ...diamondStyle, top: "-8px" }}></div>
        <div style={timelineLineStyle}></div>
        {lessons.map((lesson, index) => (
          <div key={index} style={{ marginBottom: "20px", position: "relative" }}>
            <LessonCard heading={lesson.title} listItems={lesson.points} />
          </div>
        ))}
        <div style={{ ...diamondStyle, bottom: "-8px" }}></div>
      </div>

      {/* Course Overview Card */}
      <div
        style={{
          ...courseCardStyle,
          ":hover": courseCardHoverStyle, // Apply hover effect
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            fontFamily: "Imprima, sans-serif",
            color: "#8364BC",
            marginBottom: "15px",
            fontWeight: "bold",
          }}
        >
          {course.title}
        </h2>
        <p
          style={{
            fontSize: "16px",
            fontFamily: "Imprima, sans-serif",
            color: "#F8F4FF",
            marginBottom: "20px",
            lineHeight: "1.6", // Improved readability
          }}
        >
          {course.description}
        </p>
        <div style={progressBarContainerStyle}>
          <div style={progressBarStyle(course.progress)}></div>
        </div>
        <span
          style={{
            marginTop: "10px",
            fontSize: "16px",
            color: "#F8F4FF",
            fontFamily: "Imprima, sans-serif",
          }}
        >
          {course.progress}%
        </span>
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {[...Array(5)].map((_, i) => (
            <span key={i} style={starStyle(i < course.rating)}>
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseTimeline;
