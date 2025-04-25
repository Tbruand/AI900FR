// src/components/Quiz.jsx
import { useEffect, useState } from "react";
import { questions as originalQuestions } from "../questions";

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Quiz = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const randomized = shuffleArray(originalQuestions).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setShuffledQuestions(randomized);
  }, []);

  const handleAnswer = (option) => {
    setSelected(option);
    const currentQuestion = shuffledQuestions[current];
    if (option.startsWith(currentQuestion.answer)) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (current + 1 < shuffledQuestions.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    const randomized = shuffleArray(originalQuestions).map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setShuffledQuestions(randomized);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
  };

  if (shuffledQuestions.length === 0) {
    return <div className="text-white text-center p-10">Chargement du quiz...</div>;
  }

  const currentQuestion = shuffledQuestions[current];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-2xl bg-gray-800 shadow-lg rounded-2xl p-8 text-white">
        {showResult ? (
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-green-400">🎉 Résultat</h2>
            <p className="text-lg">Tu as obtenu {score} sur {shuffledQuestions.length} ✅</p>
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition duration-300"
            >
              Rejouer 🔁
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-xl md:text-2xl font-semibold text-indigo-400 mb-6">
              Question {current + 1} / {shuffledQuestions.length}
            </h1>
            <p className="text-gray-200 mb-6">{currentQuestion.question}</p>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isCorrect = option.startsWith(currentQuestion.answer);
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
                            ? "bg-green-600 border-green-500 text-white"
                            : "bg-red-600 border-red-500 text-white"
                          : "bg-gray-700 hover:bg-indigo-700 border-gray-600"
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
