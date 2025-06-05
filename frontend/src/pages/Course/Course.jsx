// this is the http://localhost:5173/courses  api ~!! where al the courses will show case
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Course = () => {
  const navigate = useNavigate();
  

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-green-700">
        <div className="w-full h-full flex flex-col">

          {/* Top Section */}
          <div className="flex h-1/2 w-full bg-gray-400 mt-0">
            <div
              className="flex-1 bg-blue-500 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition"
              onClick={() => navigate("/course/intro-to-js/page/1")}
            >
              DSA
            </div>
            <div className="flex-1 bg-yellow-400 flex items-center justify-center">
              Right
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex h-1/2 w-full bg-red-900">
            <div className="flex-1 bg-red-400 m-4 rounded-xl flex items-center justify-center">
              Box 1
            </div>
            <div className="flex-1 bg-green-400 m-4 rounded-xl flex items-center justify-center">
              Box 2
            </div>
            <div className="flex-1 bg-blue-400 m-4 rounded-xl flex items-center justify-center">
              Box 3
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Course;
