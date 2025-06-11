import React from 'react';

const Profile = () => {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
  }

  return (
    <div className="h-screen flex items-center justify-center p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
      <h1 className="text-6xl font-extrabold text-blue-400 animate-pulse">
        Heyyy, {user?.name || "Guest"}!!
      </h1>
    </div>
  );
};

export default Profile;
