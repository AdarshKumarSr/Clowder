import React from 'react';
import CourseCard from '../components/CourseCard';

const Course = () => {
  return (
    <div style={styles.container}>
      <CourseCard />
    </div>
  );
};

const styles = {
  container: {
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Course;