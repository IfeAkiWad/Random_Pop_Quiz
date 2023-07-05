import React, { useState } from 'react'
import quizData from './quizData.json'

function Question() {
const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);

  const currentQuestionData = quizData[currentQuestion];
  const question = currentQuestionData.question;
  const options = currentQuestionData.options;
  const correctAnswer = currentQuestionData.correctAnswer;

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Selected Option:', selectedOption);

    if (selectedOption === correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else if (nextQuestion === quizData.length) {
      // Quiz finished
      alert("You've reached the end of the quiz");
      setCurrentQuestion(0);
      alert(`You scored ${score} out of ${quizData.length}`)
    }
  };

  return (
    <div className="question">
      <form className="form" 
      onSubmit={handleSubmit}>
        {question}
        <ul className='options-list'>
          {options.map((option, index) => (
            <li className="options"
            key={index}>
              <label>
                <input
                  className='radio-input'
                  type="radio"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
        <button type="submit">Submit</button>
        <p>Question {currentQuestion + 1} of {quizData.length}</p>
      </form>
    </div>
  );
}

export default Question