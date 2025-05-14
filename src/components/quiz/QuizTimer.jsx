import React, { useState, useEffect } from 'react';

function QuizTimer({ timeInSeconds, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(timeInSeconds);
  const [isRunning, setIsRunning] = useState(true);
  
  useEffect(() => {
    if (!isRunning) return;
    
    if (timeLeft <= 0) {
      onTimeUp();
      setIsRunning(false);
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, isRunning, onTimeUp]);
  
  // Convertim secundele în ore, minute și secunde
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  
  // Formăm un string formatat pentru afișare
  const formatTime = (val) => val.toString().padStart(2, '0');
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 text-center">
      <h2 className="text-gray-600 font-medium mb-1">Timp rămas:</h2>
      <div className="text-2xl font-bold text-primary">
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </div>
    </div>
  );
}

export default QuizTimer;
