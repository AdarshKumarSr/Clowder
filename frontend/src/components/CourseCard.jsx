import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourseDetail = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div style={styles.container}>
      {courses.length > 0 ? (
        courses.map((course) => (
          <div key={course._id} style={styles.card}>
            <h1 style={styles.title}>{course.courseName}</h1>
            <p style={styles.description}>{course.courseDescription}</p>
            <div style={styles.details}>
              <p><strong>Price:</strong> ${course.price}</p>
              <p><strong>Created At:</strong> {new Date(course.createdAt).toLocaleDateString()}</p>
            </div>
            <button style={styles.button}>Enroll Now</button>
          </div>
        ))
      ) : (
        <p>No courses available</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '50px auto',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    width: '300px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.5em',
    marginBottom: '15px',
    color: '#747bff',
  },
  description: {
    fontSize: '1em',
    marginBottom: '15px',
    color: '#555',
  },
  details: {
    marginBottom: '20px',
    color: '#666',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1em',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default CourseDetail;
