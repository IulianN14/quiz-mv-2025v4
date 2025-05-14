import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAdmin();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const success = await login(password);
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('Parolă incorectă. Vă rugăm să încercați din nou.');
      }
    } catch (err) {
      setError('A apărut o eroare. Vă rugăm să încercați din nou.');
      console.error(err);
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      <div className="quiz-card">
        <div className="text-center mb-6">
          <div className="bg-primary inline-flex rounded-full p-3 mb-4">
            <FaLock className="text-white text-xl" />
          </div>
          <h1 className="text-2xl font-bold">Administrare Quiz</h1>
          <p className="text-gray-600 mt-1">
            Introduceți parola pentru a accesa interfața de administrare
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Parolă
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Introduceți parola"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary w-full"
          >
            Autentificare
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
