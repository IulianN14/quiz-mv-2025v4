import React, { useState } from 'react';
import { FaCheck, FaTimes, FaArrowRight } from 'react-icons/fa';

function Question({ question, onNextQuestion, isLast }) {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  
  const handleAnswerSelect = (answerId) => {
    if (isChecked) return; // Nu permitem selectarea după verificare
    
    setSelectedAnswers(prev => {
      if (prev.includes(answerId)) {
        return prev.filter(id => id !== answerId);
      } else {
        return [...prev, answerId];
      }
    });
  };
  
  const checkAnswer = () => {
    setIsChecked(true);
  };
  
  const handleNext = () => {
    setIsChecked(false);
    setSelectedAnswers([]);
    onNextQuestion();
  };
  
  // Determinăm dacă un răspuns este corect sau incorect după verificare
  const getAnswerClass = (answer) => {
    if (!isChecked) {
      return selectedAnswers.includes(answer.id) ? 'bg-gray-100 border-primary' : '';
    }
    
    if (answer.is_correct) {
      return 'option-correct';
    }
    
    if (!answer.is_correct && selectedAnswers.includes(answer.id)) {
      return 'option-incorrect';
    }
    
    return '';
  };
  
  return (
    <div className="quiz-card">
      <h3 className="text-xl font-medium mb-4">{question.question_text}</h3>
      
      <div className="space-y-3 mb-6">
        {question.answers.map(answer => (
          <div 
            key={answer.id}
            className={`border rounded-md p-3 cursor-pointer transition-colors flex items-center ${getAnswerClass(answer)}`}
            onClick={() => handleAnswerSelect(answer.id)}
          >
            <div className="w-6 h-6 border rounded-md flex items-center justify-center mr-3">
              {selectedAnswers.includes(answer.id) && <div className="w-3 h-3 bg-primary rounded-sm"></div>}
            </div>
            <span>{answer.answer_text}</span>
            
            {isChecked && answer.is_correct && (
              <FaCheck className="ml-auto text-green-600" />
            )}
            
            {isChecked && !answer.is_correct && selectedAnswers.includes(answer.id) && (
              <FaTimes className="ml-auto text-red-600" />
            )}
          </div>
        ))}
      </div>
      
      <div className="flex justify-between">
        {!isChecked ? (
          <button 
            className="btn btn-primary"
            onClick={checkAnswer}
            disabled={selectedAnswers.length === 0}
          >
            Verifică răspunsul
          </button>
        ) : (
          <button 
            className="btn btn-secondary flex items-center"
            onClick={handleNext}
          >
            {isLast ? 'Finalizează' : 'Următoarea întrebare'} <FaArrowRight className="ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Question;
