import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import quizQuestions from "../data/quizQuestions";
import { Link } from "react-router-dom";
import "./QuizPage.css";

const QuizPage = () => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const current = quizQuestions[step];

  const handleSelect = (option) => setSelected(option);

  const handleNext = () => {
    if (selected === current.answer) setScore(score + 1);
    if (step + 1 < quizQuestions.length) {
      setStep(step + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="quiz-wrapper">
      <Link to="/home" className="back-button">← Back to Home</Link>

      {showResult ? (
        <motion.div
          className="quiz-result"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Quiz Complete ✅</h2>
          <p>You scored <strong>{score}</strong> out of <strong>{quizQuestions.length}</strong></p>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="quiz-card"
          >
            <h2 className="quiz-question">{current.question}</h2>
            <div className="quiz-options">
              {current.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className={`quiz-option ${selected === opt ? "selected" : ""}`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <button
              className="quiz-next"
              onClick={handleNext}
              disabled={!selected}
            >
              {step + 1 === quizQuestions.length ? "Finish Quiz" : "Next"}
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default QuizPage;
