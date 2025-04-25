// src/components/Quiz.jsx
import { useState } from "react";
import { questions } from "../questions";

const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    setSelected(option);
    if (option.startsWith(questions[current].answer)) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8">
        {showResult ? (
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-green-600">🎉 Résultat</h2>
            <p className="text-lg">Tu as obtenu {score} sur {questions.length} ✅</p>
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition duration-300"
            >
              Rejouer 🔁
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              Question {current + 1} / {questions.length}
            </h1>
            <p className="text-gray-700 mb-6">{questions[current].question}</p>
            <div className="space-y-3">
              {questions[current].options.map((option, index) => {
                const isCorrect = option.startsWith(questions[current].answer);
                const isSelected = selected === option;
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={!!selected}
                    className={`w-full text-left px-5 py-3 rounded-lg border transition duration-300
                      ${
                        isSelected
                          ? isCorrect
                            ? "bg-green-100 border-green-400"
                            : "bg-red-100 border-red-400"
                          : "hover:bg-indigo-50 border-gray-300"
                      }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
