import React from "react";
import CourseTimeline from "../components/CourseTimeline";

const course = {
  title: "React for Beginners",
  description: "Learn the basics of React.js, including components, state, and hooks.",
  progress: 65,
  rating: 4,
};

const lessons = [
  { title: "Introduction to React", points: ["What is React?", "Why use React?", "Setting up the environment"] },
  { title: "Components", points: ["Class vs Functional Components", "Props and State", "Component Lifecycle"] },
  { title: "Hooks", points: ["useState", "useEffect", "Custom Hooks"] },
];

const App = () => {
  return (
    <div>
      <CourseTimeline course={course} lessons={lessons} />
    </div>
  );
};

export default App;
