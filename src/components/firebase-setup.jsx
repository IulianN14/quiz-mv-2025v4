import React, { useEffect, useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

// Acest component este folosit pentru a verifica și configura Firebase
function FirebaseSetup() {
  const [isChecking, setIsChecking] = useState(true);
  const [isConfigured, setIsConfigured] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkFirebaseConfig = async () => {
      try {
        // Verificăm dacă toate variabilele de mediu necesare sunt setate
        const requiredEnvVars = [
          'VITE_FIREBASE_API_KEY',
          'VITE_FIREBASE_AUTH_DOMAIN',
          'VITE_FIREBASE_PROJECT_ID',
          'VITE_FIREBASE_STORAGE_BUCKET',
          'VITE_FIREBASE_MESSAGING_SENDER_ID',
          'VITE_FIREBASE_APP_ID'
        ];

        const missingVars = requiredEnvVars.filter(
          varName => !import.meta.env[varName]
        );

        if (missingVars.length > 0) {
          setError(`Lipsesc următoarele variabile de mediu: ${missingVars.join(', ')}`);
          setIsConfigured(false);
        } else {
          // Toate variabilele sunt setate, Firebase este configurat corect
          setIsConfigured(true);
        }
      } catch (err) {
        setError(`Eroare la verificarea configurației Firebase: ${err.message}`);
        setIsConfigured(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkFirebaseConfig();
  }, []);

  if (isChecking) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
          <p className="text-center text-gray-700">Se verifică configurația Firebase...</p>
        </div>
      </div>
    );
  }

  if (!isConfigured) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex items-center justify-center mb-4 text-red-500">
            <FaExclamationTriangle className="text-4xl" />
          </div>
          <h2 className="text-xl font-bold text-center mb-2">Configurație Firebase incompletă</h2>
          <p className="text-center text-gray-700 mb-4">
            {error || "Firebase nu este configurat corect. Verificați variabilele de mediu."}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Pentru a configura Firebase, adăugați variabilele necesare în fișierul .env:
          </p>
          <div className="bg-gray-100 p-3 rounded text-sm font-mono mb-4">
            VITE_FIREBASE_API_KEY=your_api_key<br />
            VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com<br />
            VITE_FIREBASE_PROJECT_ID=your_project_id<br />
            VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com<br />
            VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id<br />
            VITE_FIREBASE_APP_ID=your_app_id
          </div>
          <p className="text-sm text-gray-600">
            Aceste informații pot fi obținute din consola Firebase după crearea unui proiect.
          </p>
        </div>
      </div>
    );
  }

  // Dacă Firebase este configurat corect, nu afișăm nimic
  return null;
}

export default FirebaseSetup;
