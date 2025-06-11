import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MCQCard from "../components/MCQCard";
import API from "../api/api"; // use axios instance

// Import all your animation components here
import StackAnimation from "./Animations/StackAnimation";
// import QueueAnimation from "./Animations/QueueAnimation";
// Add more as you create them...

const animationComponents = {
  StackAnimation,
  
  // Add new animations here as needed
};

function CoursePage() {
  const { courseId, pageNumber } = useParams();
  const navigate = useNavigate();

  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [maxPage, setMaxPage] = useState(6);

  const currentPageNum = Number(pageNumber);
  const progressPercent = Math.min(100, Math.max(0, (currentPageNum / maxPage) * 100));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }

    setLoading(true);

    API.get(`/course/${courseId}/page/${pageNumber}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setPageData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        localStorage.removeItem("token");
        navigate("/login", { state: { from: window.location.pathname } });
      });

    // Optional: Fetch max pages dynamically here
  }, [courseId, pageNumber, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-[70px] text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-[70px] text-red-500 text-xl">
        Page not found
      </div>
    );
  }

  // Select animation component if specified and exists
  const AnimationComponent = pageData.animationComponent
    ? animationComponents[pageData.animationComponent]
    : null;

  return (
    <div
      className="min-h-screen bg-white px-4 sm:px-6 md:px-8 pb-10 flex justify-center"
      style={{ paddingTop: "82px" }}
    >
      <div className="w-full max-w-5xl bg-gray-100 rounded-lg p-4 sm:p-6 md:p-10 overflow-auto shadow-md">
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-300 rounded overflow-hidden mb-6">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <h1 className="text-blue-700 font-bold text-4xl mb-2">{pageData.title}</h1>

        {pageData.subtitle && (
          <h2 className="text-blue-600 text-xl font-medium mb-6">{pageData.subtitle}</h2>
        )}

        <p className="text-blue-900 text-lg leading-relaxed text-left break-words mb-8 whitespace-pre-wrap">
          {pageData.content}
        </p>

        {pageData.imageUrl && (
          <img
            src={pageData.imageUrl}
            alt="Course Illustration"
            className="w-full max-w-md mx-auto mb-6 rounded shadow"
          />
        )}

        {/* Render animation if available */}
        {AnimationComponent && (
          <div className="my-8">
            <AnimationComponent />
          </div>
        )}

        {pageData.bottomContent && (
          <p className="text-gray-800 text-base leading-relaxed mt-4 whitespace-pre-wrap">
            {pageData.bottomContent}
          </p>
        )}

        {pageData.mcqs?.length > 0 && (
          <div className="mt-8">
            {pageData.mcqs.map((mcq, idx) => (
              <MCQCard
                key={idx}
                question={mcq.question}
                options={mcq.options}
                correctAnswer={mcq.correctAnswer}
                explanation={mcq.explanation}
              />
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mt-10">
          {currentPageNum > 1 ? (
            <Link
              to={`/course/${courseId}/page/${currentPageNum - 1}`}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded transition"
            >
              ⬅ Prev
            </Link>
          ) : (
            <div />
          )}

          {currentPageNum < maxPage ? (
            <Link
              to={`/course/${courseId}/page/${currentPageNum + 1}`}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded transition"
            >
              Next ➡
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
