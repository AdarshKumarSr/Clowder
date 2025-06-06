import React, { useState } from "react";

function MCQCard({ question, options, correctAnswer, correctAnswers, explanation }) {
  const isMultiple = Array.isArray(correctAnswers);
  const [selected, setSelected] = useState(isMultiple ? [] : "");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleSelect = (option) => {
    if (isMultiple) {
      setSelected((prev) =>
        prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
      );
    } else {
      setSelected(option);
    }
  };

  const checkAnswer = () => {
    if (isMultiple) {
      const sortedSelected = [...selected].sort().join(",");
      const sortedCorrect = [...correctAnswers].sort().join(",");
      setIsCorrect(sortedSelected === sortedCorrect);
    } else {
      setIsCorrect(selected === correctAnswer);
    }
    setSubmitted(true);
  };

  const isOptionCorrect = (option) => {
    if (!submitted) return "";
    const correctSet = isMultiple ? correctAnswers : [correctAnswer];
    if (correctSet.includes(option)) return "text-green-600 font-semibold";
    if (
      (isMultiple && selected.includes(option) && !correctSet.includes(option)) ||
      (!isMultiple && selected === option && selected !== correctAnswer)
    ) {
      return "text-red-600 line-through";
    }
    return "";
  };

  return (
    <div className="border rounded-lg bg-white p-4 shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-3">{question}</h3>

      <div className="space-y-2">
        {options.map((option, idx) => (
          <label
            key={idx}
            className={`block border px-4 py-2 rounded cursor-pointer transition ${
              isOptionCorrect(option)
            }`}
          >
            <input
              type={isMultiple ? "checkbox" : "radio"}
              name={question}
              value={option}
              checked={
                isMultiple ? selected.includes(option) : selected === option
              }
              onChange={() => handleSelect(option)}
              className="mr-2"
              disabled={submitted}
            />
            {option}
          </label>
        ))}
      </div>

      {!submitted ? (
        <button
          onClick={checkAnswer}
          className="mt-4 px-4 py-2 bg-blue-600 text-pink-300 rounded hover:bg-blue-700 transition"
        >
          Submit Answer
        </button>
      ) : (
        <div className={`mt-4 font-medium ${isCorrect ? "text-green-600" : "text-red-600"}`}>
          {isCorrect ? "✅ Correct!" : "❌ Incorrect."}
          {explanation && <p className="mt-2 text-sm text-gray-700">{explanation}</p>}
        </div>
      )}
    </div>
  );
}

export default MCQCard;
