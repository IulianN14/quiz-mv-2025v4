import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import QuizPage from './components/quiz/QuizPage';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { QuizProvider } from './context/QuizContext';
import { AdminProvider } from './context/AdminContext';
import Layout from './components/Layout';
import FirebaseSetup from './components/firebase-setup';

function App() {
  return (
    <AdminProvider>
      <QuizProvider>
        <Layout>
          <FirebaseSetup />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
          </Routes>
        </Layout>
      </QuizProvider>
    </AdminProvider>
  );
}

export default App;
