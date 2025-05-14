/**
 * Amestecă aleatoriu elementele unui array
 * 
 * @param {Array} array - Array-ul care va fi amestecat
 * @returns {Array} Un nou array cu elementele amestecate
 */
export function shuffleArray(array) {
  // Creăm o copie a array-ului pentru a nu modifica originalul
  const shuffled = [...array];
  
  // Algoritmul Fisher-Yates (sau Knuth) shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Alegem un element random de la 0 la i
    const j = Math.floor(Math.random() * (i + 1));
    // Schimbăm elementele între ele
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}
