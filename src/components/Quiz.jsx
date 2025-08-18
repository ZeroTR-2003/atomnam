import React, { useState } from "react";
import questions from "../data/questions";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "./Quiz.css";

const Quiz = ({ stage = "yellowcake", showBack = true }) => {
  const stageQuestions = questions.filter(q => q.stage === stage);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleAnswer = (index) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === stageQuestions[current].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      const next = current + 1;
      if (next < stageQuestions.length) {
        setCurrent(next);
        setSelected(null);
      } else {
        setCompleted(true);
      }
    }, 1000);
  };

  const currentQ = stageQuestions[current];

  return (
    <div className="quiz-wrapper">
      {showBack && <Link to="/quiz" className="back-button">← Back to All Quizzes</Link>}

      {completed ? (
        <motion.div
          className="quiz-result"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Stage Complete ✅</h2>
          <p>
            You scored <strong>{score}</strong> out of <strong>{stageQuestions.length}</strong>
          </p>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="quiz-box"
          >
            <h3>{currentQ.question}</h3>
            <ul>
              {currentQ.options.map((option, i) => (
                <li
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={
                    selected === null
                      ? ""
                      : i === currentQ.answer
                      ? "correct"
                      : selected === i
                      ? "wrong"
                      : ""
                  }
                >
                  {option}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Quiz;
