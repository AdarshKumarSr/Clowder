import React, { useState } from 'react';

const DynamicCourseBuilder = () => {
    const [pages, setPages] = useState([{ id: 1, content: '' }]);

    const handleAddPage = () => {
        const newPage = { id: pages.length + 1, content: '' };
        setPages([...pages, newPage]);
    };

    const handleChange = (id, value) => {
        const updatedPages = pages.map(page => 
            page.id === id ? { ...page, content: value } : page
        );
        setPages(updatedPages);
    };

    const handleSave = (id) => {
        const page = pages.find(page => page.id === id);
        alert(`Page ${id} saved with content: ${page.content}`);
    };

    return (
        <div className="course-builder">
            {pages.map(page => (
                <div key={page.id} className="page">
                    <h3>Page {page.id}</h3>
                    <textarea
                        value={page.content}
                        onChange={(e) => handleChange(page.id, e.target.value)}
                        placeholder="Enter page content"
                    />
                </div>
            ))}
            <div className="save-add-btns">
                <button className="save-btn" onClick={() => pages.forEach(page => handleSave(page.id))}>Save All Pages</button>
                <button className="add-btn" onClick={handleAddPage}>Add New Page</button>
            </div>

            <style>
                {`
                .course-builder {
                    position: relative;
                    top: 60px; /* Adjust based on navbar height */
                    width: 100%;
                    height: calc(100vh - 60px);
                    padding: 20px;
                    box-sizing: border-box;
                    background-color: #f0f2f5;
                    overflow-y: auto;
                }

                .page {
                    margin-bottom: 30px;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    background-color: #fff;
                }

                .page h3 {
                    margin-bottom: 10px;
                    color: #333;
                }

                .page textarea {
                    width: 100%;
                    height: 150px;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    resize: vertical;
                    margin-bottom: 10px;
                }

                .save-add-btns {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin-top: 20px;
                }

                .save-btn, .add-btn {
                    padding: 14px 22px;
                    color: #fff;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                .save-btn {
                    background-color: rgb(19, 90, 34);
                }

                .save-btn:hover {
                    background-color: #218838;
                }

                .add-btn {
                    background-color: #007BFF;
                }

                .add-btn:hover {
                    background-color: #0056b3;
                }
                `}
            </style>
        </div>
    );
};

export default DynamicCourseBuilder;