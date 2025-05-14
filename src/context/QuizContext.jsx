import React, { createContext, useContext, useState, useCallback } from 'react';
import { getSections, getQuestionsForSection } from '../lib/firebase';
import { shuffleArray } from '../utils/shuffleArray';

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [sections, setSections] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const loadQuiz = useCallback(async () => {
    setLoading(true);
    try {
      // Obținem secțiunile în ordinea definită
      const sectionsData = await getSections();
      setSections(sectionsData);
      
      // Încărcăm întrebările pentru fiecare secțiune
      let allQuestions = [];
      
      for (const section of sectionsData) {
        const sectionQuestions = await getQuestionsForSection(section.id);
        
        // Amestecăm întrebările pentru fiecare secțiune
        const shuffledQuestions = shuffleArray(sectionQuestions).map(question => ({
          ...question,
          // Amestecăm și răspunsurile pentru fiecare întrebare
          answers: shuffleArray(question.answers)
        }));
        
        allQuestions = [...allQuestions, ...shuffledQuestions];
      }
      
      setQuestions(allQuestions);
    } catch (error) {
      console.error('Error loading quiz data:', error);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const resetQuiz = useCallback(async () => {
    setLoading(true);
    try {
      // Păstrăm secțiunile în ordinea definită
      const sectionsData = sections;
      
      // Reîncărcăm și reamestecăm întrebările pentru fiecare secțiune
      let allQuestions = [];
      
      for (const section of sectionsData) {
        const sectionQuestions = await getQuestionsForSection(section.id);
        
        // Amestecăm întrebările pentru fiecare secțiune
        const shuffledQuestions = shuffleArray(sectionQuestions).map(question => ({
          ...question,
          // Amestecăm și răspunsurile pentru fiecare întrebare
          answers: shuffleArray(question.answers)
        }));
        
        allQuestions = [...allQuestions, ...shuffledQuestions];
      }
      
      setQuestions(allQuestions);
    } catch (error) {
      console.error('Error resetting quiz data:', error);
    } finally {
      setLoading(false);
    }
  }, [sections]);
  
  const value = {
    sections,
    questions,
    loading,
    loadQuiz,
    resetQuiz
  };
  
  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
