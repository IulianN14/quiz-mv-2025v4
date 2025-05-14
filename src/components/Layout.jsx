import React from 'react';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Quiz MV 2025
          </Link>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-gray-100 text-gray-600">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <p>Quiz MV 2025 - Platformă de testare</p>
          </div>
        </div>
        <div className="bg-gray-200 py-2">
          <div className="container mx-auto px-4 text-center text-sm text-gray-600">
            AI-powered development by Biela.dev, powered by TeachMeCode® Institute
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
