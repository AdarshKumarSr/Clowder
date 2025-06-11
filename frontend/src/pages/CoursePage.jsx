import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MCQCard from "../components/MCQCard";

function CoursePage() {
  const { courseId, pageNumber } = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [maxPage, setMaxPage] = useState(5); // Default to 5 if unknown

  const currentPageNum = Number(pageNumber);
  const progressPercent = Math.min(
    100,
    Math.max(0, (currentPageNum / maxPage) * 100)
  );

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:5000/api/course/${courseId}/page/${pageNumber}`)
      .then((res) => res.json())
      .then((data) => {
        setPageData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setPageData(null);
        setLoading(false);
      });

    // Optional: If you want to dynamically fetch all pages to set maxPage:
    // fetch(`http://localhost:5000/api/course/${courseId}/all`)
    //   .then(res => res.json())
    //   .then(data => setMaxPage(data.length));
  }, [courseId, pageNumber]);

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

        {pageData.bottomContent && (
          <p className="text-gray-800 text-base leading-relaxed mt-4 whitespace-pre-wrap">
            {pageData.bottomContent}
          </p>
        )}
        {pageData.mcqs && pageData.mcqs.length > 0 && (
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
          ) : <div />}

          {currentPageNum < maxPage ? (
            <Link
              to={`/course/${courseId}/page/${currentPageNum + 1}`}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded transition"
            >
              Next ➡
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
