import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Course01 = () => {
    const [formData, setFormData] = useState({
        courseName: '',
        courseDescription: '',
        price: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/create-course', formData);
            alert(response.data.message);
            setFormData({ courseName: '', courseDescription: '', price: '' });
        } catch (error) {
            console.error('Failed to create course:', error);
            alert('Failed to create course');
        }
    };

    // Navigate to /create-course01
    const handleRedirect = () => {
        navigate('/create-course01');
    };

    return (
        <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ width: '100%', maxWidth: '450px', padding: '40px', boxShadow: '0 6px 8px rgba(0, 0, 0, 0.2)', borderRadius: '12px', backgroundColor: '#ffffff' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#007BFF' }}>Create a New Course</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', color: '#333', fontWeight: 'bold' }}>Course Name:</label>
                        <input 
                            type="text" 
                            name="courseName"
                            value={formData.courseName}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1em' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', color: '#333', fontWeight: 'bold' }}>Course Description:</label>
                        <input 
                            type="text" 
                            name="courseDescription"
                            value={formData.courseDescription}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1em' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', color: '#333', fontWeight: 'bold' }}>Price:</label>
                        <input 
                            type="number" 
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            required
                            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1em' }}
                        />
                    </div>
                    <button 
                        type="submit"
                        style={{
                            backgroundColor: '#007BFF',
                            color: 'white',
                            padding: '14px',
                            marginTop: '15px',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '1em',
                            transition: 'background-color 0.3s'
                        }}
                    >
                        Create Course
                    </button>
                    <button 
                        type="button"
                        onClick={handleRedirect}
                        style={{
                            backgroundColor: '#28a745',
                            color: 'white',
                            padding: '14px',
                            marginTop: '10px',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '1em',
                            transition: 'background-color 0.3s'
                        }}
                    >
                    Let's Move Forward 
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Course01;
