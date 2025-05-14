import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizTimer from './QuizTimer';
import Question from './Question';
import { useQuiz } from '../../context/QuizContext';
import { FaRedo } from 'react-icons/fa';

function QuizPage() {
  const navigate = useNavigate();
  const { sections, questions, loadQuiz, resetQuiz } = useQuiz();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  
  // 3 ore în secunde
  const quizTime = 3 * 60 * 60;
  
  useEffect(() => {
    // Încărcăm quiz-ul la prima randare
    loadQuiz();
  }, [loadQuiz]);
  
  const startQuiz = () => {
    setQuizStarted(true);
  };
  
  const handleTimeUp = () => {
    setQuizFinished(true);
  };
  
  const handleNextQuestion = () => {
    const currentSection = sections[currentSectionIndex];
    const sectionQuestions = questions.filter(q => q.section_id === currentSection.id);
    
    if (currentQuestionIndex < sectionQuestions.length - 1) {
      // Trecem la următoarea întrebare din secțiunea curentă
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSectionIndex < sections.length - 1) {
      // Trecem la prima întrebare din următoarea secțiune
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      // Am terminat toate întrebările
      setQuizFinished(true);
    }
  };
  
  const handleResetQuiz = () => {
    resetQuiz();
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setQuizFinished(false);
    setQuizStarted(true);
  };
  
  // Dacă quiz-ul nu a fost încărcat încă, afișăm un indicator de încărcare
  if (sections.length === 0 || questions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-lg">Se încarcă quiz-ul...</p>
      </div>
    );
  }
  
  // Pagina de start quiz
  if (!quizStarted) {
    return (
      <div className="max-w-2xl mx-auto quiz-card text-center">
        <h1 className="text-3xl font-bold mb-6">Quiz MV 2025</h1>
        <p className="mb-8 text-gray-600">
          Ești pregătit să începi? Vei avea la dispoziție 3 ore pentru a răspunde la toate întrebările.
        </p>
        <button 
          className="btn btn-primary px-8 py-3 text-lg"
          onClick={startQuiz}
        >
          Începe Quiz-ul
        </button>
      </div>
    );
  }
  
  // Pagina de finalizare quiz
  if (quizFinished) {
    return (
      <div className="max-w-2xl mx-auto quiz-card text-center">
        <h1 className="text-3xl font-bold mb-6">Quiz Finalizat!</h1>
        <p className="mb-8 text-gray-600">
          Felicitări! Ai terminat quiz-ul MV 2025.
        </p>
        <div className="flex justify-center space-x-4">
          <button 
            className="btn btn-primary flex items-center"
            onClick={handleResetQuiz}
          >
            <FaRedo className="mr-2" /> Reîncepe Quiz-ul
          </button>
          <button 
            className="btn btn-outline"
            onClick={() => navigate('/')}
          >
            Înapoi la pagina principală
          </button>
        </div>
      </div>
    );
  }
  
  // Afișăm quiz-ul în desfășurare
  const currentSection = sections[currentSectionIndex];
  const sectionQuestions = questions.filter(q => q.section_id === currentSection.id);
  const currentQuestion = sectionQuestions[currentQuestionIndex];
  const isLastQuestion = currentSectionIndex === sections.length - 1 && 
                         currentQuestionIndex === sectionQuestions.length - 1;
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Quiz MV 2025</h1>
          <div className="text-gray-600">
            Secțiunea: <span className="font-medium">{currentSection.title}</span>
          </div>
          <div className="text-sm text-gray-500">
            Întrebarea {currentQuestionIndex + 1} din {sectionQuestions.length}
          </div>
        </div>
        
        <QuizTimer timeInSeconds={quizTime} onTimeUp={handleTimeUp} />
      </div>
      
      <Question 
        question={currentQuestion} 
        onNextQuestion={handleNextQuestion}
        isLast={isLastQuestion}
      />
      
      <div className="mt-6 flex justify-end">
        <button 
          className="btn btn-outline flex items-center"
          onClick={handleResetQuiz}
        >
          <FaRedo className="mr-2" /> Resetează Quiz
        </button>
      </div>
    </div>
  );
}

export default QuizPage;
