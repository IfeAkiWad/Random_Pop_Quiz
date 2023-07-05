import React, { useState } from 'react'
import quizData from './quizData.json'

function Question() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestionData = quizData[currentQuestion];
  const question = currentQuestionData.question;
  const options = currentQuestionData.options;
  const correctAnswer = currentQuestionData.correctAnswer;

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedOption === correctAnswer) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setShowResult(false);
    setSelectedOption('');
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      // Quiz finished
      alert("You've reached the end of the quiz");
      setCurrentQuestion(0);
      alert(`You scored ${score} out of ${quizData.length}`);
    }
  };

  return (
    <div className="question">
      <form className="form" onSubmit={handleSubmit}>
        <p>{question}</p>
        <ul className="options-list">
          {options.map((option, index) => {
            const isCorrect = option === correctAnswer;
            const isSelected = option === selectedOption;
            let className = '';
            if (showResult) {
              if (isCorrect) {
                className = 'correct-answer';
              } else if (isSelected) {
                className = 'incorrect-answer';
              }
            }
            return (
              <li className={`options ${className}`} key={index}>
                <label>
                  <input
                    className="radio-input"
                    type="radio"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                    disabled={showResult}
                  />
                  {option}
                </label>
              </li>
            );
          })}
        </ul>
        {!showResult && (
          <button type="submit">Submit</button>
        )}
        {showResult && (
          <div>
            <p>
              {selectedOption === correctAnswer ? 'Correct!' : 'Incorrect!'}
            </p>
            <button onClick={handleNextQuestion} type="button">
              Next Question
            </button>
          </div>
        )}
        <p>Question {currentQuestion + 1} of {quizData.length}</p>
      </form>
    </div>
  );
}

export default Question