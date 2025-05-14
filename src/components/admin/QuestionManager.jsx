import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaQuestionCircle } from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext';

function QuestionManager() {
  const { sectionId } = useParams();
  const { 
    sections, 
    loadQuestionsForSection, 
    createQuestion, 
    createAnswer
  } = useAdmin();
  
  const [questions, setQuestions] = useState([]);
  const [currentSection, setCurrentSection] = useState(null);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question_text: '',
    answers: [
      { answer_text: '', is_correct: false },
      { answer_text: '', is_correct: false }
    ]
  });
  const [editQuestion, setEditQuestion] = useState(null);
  
  useEffect(() => {
    const loadData = async () => {
      const section = sections.find(s => s.id === sectionId);
      setCurrentSection(section);
      
      const sectionQuestions = await loadQuestionsForSection(sectionId);
      setQuestions(sectionQuestions);
    };
    
    if (sectionId && sections.length > 0) {
      loadData();
    }
  }, [sectionId, sections, loadQuestionsForSection]);
  
  const addAnswerField = () => {
    setNewQuestion({
      ...newQuestion,
      answers: [
        ...newQuestion.answers,
        { answer_text: '', is_correct: false }
      ]
    });
  };
  
  const addAnswerFieldEdit = () => {
    setEditQuestion({
      ...editQuestion,
      answers: [
        ...editQuestion.answers,
        { answer_text: '', is_correct: false }
      ]
    });
  };
  
  const removeAnswerField = (index) => {
    if (newQuestion.answers.length <= 2) return;
    
    setNewQuestion({
      ...newQuestion,
      answers: newQuestion.answers.filter((_, i) => i !== index)
    });
  };
  
  const removeAnswerFieldEdit = (index) => {
    if (editQuestion.answers.length <= 2) return;
    
    setEditQuestion({
      ...editQuestion,
      answers: editQuestion.answers.filter((_, i) => i !== index)
    });
  };
  
  const handleAnswerChange = (index, field, value) => {
    const updatedAnswers = [...newQuestion.answers];
    
    if (field === 'is_correct') {
      updatedAnswers[index].is_correct = !updatedAnswers[index].is_correct;
    } else {
      updatedAnswers[index].answer_text = value;
    }
    
    setNewQuestion({
      ...newQuestion,
      answers: updatedAnswers
    });
  };
  
  const handleAnswerChangeEdit = (index, field, value) => {
    const updatedAnswers = [...editQuestion.answers];
    
    if (field === 'is_correct') {
      updatedAnswers[index].is_correct = !updatedAnswers[index].is_correct;
    } else {
      updatedAnswers[index].answer_text = value;
    }
    
    setEditQuestion({
      ...editQuestion,
      answers: updatedAnswers
    });
  };
  
  const handleAddQuestion = async (e) => {
    e.preventDefault();
    
    try {
      if (!newQuestion.answers.some(a => a.is_correct)) {
        alert('Trebuie să marchezi cel puțin un răspuns corect!');
        return;
      }
      
      // Cream întrebarea
      const createdQuestion = await createQuestion({
        question_text: newQuestion.question_text,
        section_id: sectionId
      });
      
      // Cream răspunsurile asociate
      for (const answer of newQuestion.answers) {
        await createAnswer({
          ...answer,
          question_id: createdQuestion.id
        });
      }
      
      setNewQuestion({
        question_text: '',
        answers: [
          { answer_text: '', is_correct: false },
          { answer_text: '', is_correct: false }
        ]
      });
      
      setIsAddingQuestion(false);
      
      // Reîncărcăm întrebările
      const updatedQuestions = await loadQuestionsForSection(sectionId);
      setQuestions(updatedQuestions);
      
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };
  
  const handleEditQuestion = async (e) => {
    e.preventDefault();
    
    try {
      if (!editQuestion.answers.some(a => a.is_correct)) {
        alert('Trebuie să marchezi cel puțin un răspuns corect!');
        return;
      }
      
      // Aici ar trebui să implementăm logica de actualizare
      // Ar putea fi similar cu adăugarea, dar cu actualizări în loc de inserări
      // Pentru simplitate, vom presupune că există funcții de actualizare
      
      setIsEditingQuestion(false);
      setEditQuestion(null);
      
      // Reîncărcăm întrebările
      const updatedQuestions = await loadQuestionsForSection(sectionId);
      setQuestions(updatedQuestions);
      
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };
  
  if (!currentSection) {
    return (
      <div className="quiz-card text-center py-8">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4">Se încarcă secțiunea...</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="quiz-card mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Link 
              to="/admin/dashboard/sections" 
              className="text-primary hover:underline flex items-center text-sm mb-2"
            >
              <FaArrowLeft className="mr-1" /> Înapoi la secțiuni
            </Link>
            <h2 className="text-xl font-bold">{currentSection.title} - Gestionare Întrebări</h2>
            {currentSection.description && (
              <p className="text-gray-600 text-sm mt-1">{currentSection.description}</p>
            )}
          </div>
          
          {!isAddingQuestion && !isEditingQuestion && (
            <button 
              className="btn btn-primary btn-sm flex items-center"
              onClick={() => setIsAddingQuestion(true)}
            >
              <FaPlus className="mr-1" /> Adaugă Întrebare
            </button>
          )}
        </div>
        
        {isAddingQuestion && (
          <form onSubmit={handleAddQuestion} className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-bold mb-3">Adaugă Întrebare Nouă</h3>
            
            <div className="mb-4">
              <label htmlFor="questionText" className="block text-gray-700 font-medium mb-1">
                Text Întrebare *
              </label>
              <textarea
                id="questionText"
                className="input"
                value={newQuestion.question_text}
                onChange={(e) => setNewQuestion({...newQuestion, question_text: e.target.value})}
                rows="2"
                required
              />
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-700 font-medium">
                  Variante de Răspuns *
                </label>
                <button 
                  type="button"
                  className="text-primary text-sm hover:underline flex items-center"
                  onClick={addAnswerField}
                >
                  <FaPlus className="mr-1" /> Adaugă Răspuns
                </button>
              </div>
              
              {newQuestion.answers.map((answer, index) => (
                <div key={index} className="flex items-start mb-2">
                  <div className="flex-grow mr-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`answer-correct-${index}`}
                        checked={answer.is_correct}
                        onChange={() => handleAnswerChange(index, 'is_correct')}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor={`answer-correct-${index}`} className="text-sm text-gray-700">
                        Răspuns corect
                      </label>
                    </div>
                    <input
                      type="text"
                      value={answer.answer_text}
                      onChange={(e) => handleAnswerChange(index, 'answer_text', e.target.value)}
                      className="input mt-1"
                      placeholder="Text răspuns"
                      required
                    />
                  </div>
                  
                  {newQuestion.answers.length > 2 && (
                    <button 
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeAnswerField(index)}
                      title="Șterge răspuns"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-end space-x-2">
              <button 
                type="button" 
                className="btn btn-outline btn-sm"
                onClick={() => setIsAddingQuestion(false)}
              >
                Anulează
              </button>
              <button 
                type="submit" 
                className="btn btn-primary btn-sm"
              >
                Salvează Întrebare
              </button>
            </div>
          </form>
        )}
        
        {isEditingQuestion && editQuestion && (
          <form onSubmit={handleEditQuestion} className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-bold mb-3">Editare Întrebare</h3>
            
            <div className="mb-4">
              <label htmlFor="editQuestionText" className="block text-gray-700 font-medium mb-1">
                Text Întrebare *
              </label>
              <textarea
                id="editQuestionText"
                className="input"
                value={editQuestion.question_text}
                onChange={(e) => setEditQuestion({...editQuestion, question_text: e.target.value})}
                rows="2"
                required
              />
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-700 font-medium">
                  Variante de Răspuns *
                </label>
                <button 
                  type="button"
                  className="text-primary text-sm hover:underline flex items-center"
                  onClick={addAnswerFieldEdit}
                >
                  <FaPlus className="mr-1" /> Adaugă Răspuns
                </button>
              </div>
              
              {editQuestion.answers.map((answer, index) => (
                <div key={index} className="flex items-start mb-2">
                  <div className="flex-grow mr-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`edit-answer-correct-${index}`}
                        checked={answer.is_correct}
                        onChange={() => handleAnswerChangeEdit(index, 'is_correct')}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor={`edit-answer-correct-${index}`} className="text-sm text-gray-700">
                        Răspuns corect
                      </label>
                    </div>
                    <input
                      type="text"
                      value={answer.answer_text}
                      onChange={(e) => handleAnswerChangeEdit(index, 'answer_text', e.target.value)}
                      className="input mt-1"
                      placeholder="Text răspuns"
                      required
                    />
                  </div>
                  
                  {editQuestion.answers.length > 2 && (
                    <button 
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeAnswerFieldEdit(index)}
                      title="Șterge răspuns"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-end space-x-2">
              <button 
                type="button" 
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setIsEditingQuestion(false);
                  setEditQuestion(null);
                }}
              >
                Anulează
              </button>
              <button 
                type="submit" 
                className="btn btn-primary btn-sm"
              >
                Actualizează Întrebare
              </button>
            </div>
          </form>
        )}
        
        {questions.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <FaQuestionCircle className="mx-auto text-gray-400 text-4xl mb-2" />
            <p className="text-gray-500">Nu există întrebări în această secțiune. Adăugați prima întrebare.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((question) => (
              <div key={question.id} className="section-card">
                <div className="flex justify-between">
                  <h3 className="font-medium">{question.question_text}</h3>
                  
                  <div className="flex space-x-2">
                    <button 
                      className="text-gray-500 hover:text-primary"
                      onClick={() => {
                        setEditQuestion(question);
                        setIsEditingQuestion(true);
                      }}
                      title="Editează întrebare"
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
                
                <div className="mt-3 space-y-2">
                  {question.answers.map((answer, index) => (
                    <div 
                      key={answer.id} 
                      className={`p-2 text-sm rounded border ${
                        answer.is_correct ? 'border-green-400 bg-green-50 text-green-800' : 'border-gray-200'
                      }`}
                    >
                      {answer.answer_text}
                      {answer.is_correct && (
                        <span className="ml-2 text-green-600 text-xs font-medium">
                          Corect
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionManager;
