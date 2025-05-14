import React, { useEffect } from 'react';
import { Navigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaListAlt, FaHome, FaQuestionCircle } from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext';
import SectionManager from './SectionManager';
import QuestionManager from './QuestionManager';

function AdminDashboard() {
  const { isAuthenticated, loadSections } = useAdmin();
  const location = useLocation();
  
  useEffect(() => {
    if (isAuthenticated) {
      loadSections();
    }
  }, [isAuthenticated, loadSections]);
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="md:w-64 mb-6 md:mb-0">
          <div className="quiz-card">
            <h2 className="text-xl font-bold mb-4">Administrare</h2>
            <nav className="space-y-2">
              <Link 
                to="/admin/dashboard" 
                className={`flex items-center p-2 rounded hover:bg-gray-100 ${
                  location.pathname === '/admin/dashboard' ? 'bg-gray-100 text-primary' : 'text-gray-700'
                }`}
              >
                <FaHome className="mr-2" /> Panou Principal
              </Link>
              <Link 
                to="/admin/dashboard/sections" 
                className={`flex items-center p-2 rounded hover:bg-gray-100 ${
                  location.pathname === '/admin/dashboard/sections' ? 'bg-gray-100 text-primary' : 'text-gray-700'
                }`}
              >
                <FaListAlt className="mr-2" /> Secțiuni
              </Link>
              <Link 
                to="/" 
                className="flex items-center p-2 rounded hover:bg-gray-100 text-gray-700"
              >
                <FaHome className="mr-2" /> Înapoi la Quiz
              </Link>
            </nav>
          </div>
        </div>
        
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/sections" element={<SectionManager />} />
            <Route path="/sections/:sectionId" element={<QuestionManager />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function AdminHome() {
  return (
    <div className="quiz-card">
      <h1 className="text-2xl font-bold mb-6">Panou de Administrare Quiz MV 2025</h1>
      
      <div className="bg-blue-50 border-l-4 border-primary p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <FaQuestionCircle className="h-5 w-5 text-primary" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Bine ați venit în panoul de administrare al Quiz-ului MV 2025.
              Utilizați meniul din stânga pentru a gestiona secțiunile și întrebările.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <h3 className="font-bold text-lg mb-2 text-primary flex items-center">
            <FaListAlt className="mr-2" /> Gestionare Secțiuni
          </h3>
          <p className="text-gray-600 mb-4">
            Adăugați, editați și reordonați secțiunile quiz-ului
          </p>
          <Link 
            to="/admin/dashboard/sections" 
            className="btn btn-outline btn-sm"
          >
            Accesează Secțiuni
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
