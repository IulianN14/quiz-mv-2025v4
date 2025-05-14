import React, { createContext, useContext, useState, useCallback } from 'react';
import { 
  getSections, 
  getQuestionsForSection, 
  createSection, 
  updateSection,
  updateSectionOrder,
  createQuestion,
  createAnswer
} from '../lib/firebase';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sections, setSections] = useState([]);
  
  const login = useCallback(async (password) => {
    // Într-o implementare reală, am verifica parola pe server
    // Aici folosim o abordare simplificată pentru demo
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin1234';
    
    if (password === adminPassword) {
      setIsAuthenticated(true);
      return true;
    }
    
    return false;
  }, []);
  
  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);
  
  const loadSections = useCallback(async () => {
    try {
      const sectionsData = await getSections();
      setSections(sectionsData);
      return sectionsData;
    } catch (error) {
      console.error('Error loading sections:', error);
      return [];
    }
  }, []);
  
  const loadQuestionsForSection = useCallback(async (sectionId) => {
    try {
      const questionsData = await getQuestionsForSection(sectionId);
      return questionsData;
    } catch (error) {
      console.error('Error loading questions:', error);
      return [];
    }
  }, []);
  
  const handleCreateSection = useCallback(async (section) => {
    try {
      return await createSection(section);
    } catch (error) {
      console.error('Error creating/updating section:', error);
      throw error;
    }
  }, []);
  
  const handleUpdateSectionOrder = useCallback(async (sections) => {
    try {
      await updateSectionOrder(sections);
      return true;
    } catch (error) {
      console.error('Error updating section order:', error);
      throw error;
    }
  }, []);
  
  const handleCreateQuestion = useCallback(async (question) => {
    try {
      return await createQuestion(question);
    } catch (error) {
      console.error('Error creating question:', error);
      throw error;
    }
  }, []);
  
  const handleCreateAnswer = useCallback(async (answer) => {
    try {
      return await createAnswer(answer);
    } catch (error) {
      console.error('Error creating answer:', error);
      throw error;
    }
  }, []);
  
  const value = {
    isAuthenticated,
    sections,
    login,
    logout,
    loadSections,
    loadQuestionsForSection,
    createSection: handleCreateSection,
    updateSectionOrder: handleUpdateSectionOrder,
    createQuestion: handleCreateQuestion,
    createAnswer: handleCreateAnswer
  };
  
  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
