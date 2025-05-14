import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaCog } from 'react-icons/fa';

function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Bun venit la Quiz MV 2025
        </h1>
        <p className="text-lg text-gray-600">
          Testează-ți cunoștințele și pregătește-te pentru examenul MV 2025
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="quiz-card flex flex-col items-center text-center">
          <div className="bg-primary-light rounded-full p-6 mb-4">
            <FaPlay className="text-white text-3xl" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Începe Quiz-ul</h2>
          <p className="text-gray-600 mb-6">
            Testează-ți cunoștințele cu întrebări din toate secțiunile
          </p>
          <Link 
            to="/quiz" 
            className="btn btn-primary w-full"
          >
            Începe acum
          </Link>
        </div>
        
        <div className="quiz-card flex flex-col items-center text-center">
          <div className="bg-secondary-light rounded-full p-6 mb-4">
            <FaCog className="text-white text-3xl" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Administrare Quiz</h2>
          <p className="text-gray-600 mb-6">
            Accesează interfața de administrare pentru a gestiona întrebările și secțiunile
          </p>
          <Link 
            to="/admin/login" 
            className="btn btn-outline w-full"
          >
            Administrare
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
