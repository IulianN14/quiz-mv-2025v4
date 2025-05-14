import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy 
} from "firebase/firestore";

// Configurația Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Inițializăm Firebase
const app = initializeApp(firebaseConfig);
// Inițializăm Analytics doar în browser, nu în SSR
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
const db = getFirestore(app);

// Funcții pentru interacțiunea cu Firebase

export async function getSections() {
  try {
    const sectionsRef = collection(db, "sections");
    const q = query(sectionsRef, orderBy("order", "asc"));
    const querySnapshot = await getDocs(q);
    
    const sections = [];
    querySnapshot.forEach((doc) => {
      sections.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return sections;
  } catch (error) {
    console.error("Error getting sections:", error);
    throw error;
  }
}

export async function getQuestionsForSection(sectionId) {
  try {
    // Obținem întrebările pentru secțiunea specificată
    const questionsRef = collection(db, "questions");
    const q = query(questionsRef, where("section_id", "==", sectionId));
    const querySnapshot = await getDocs(q);
    
    const questions = [];
    
    // Pentru fiecare întrebare, obținem și răspunsurile asociate
    for (const docSnap of querySnapshot.docs) {
      const question = {
        id: docSnap.id,
        ...docSnap.data(),
        answers: []
      };
      
      // Obținem răspunsurile pentru această întrebare
      const answersRef = collection(db, "answers");
      const answersQuery = query(answersRef, where("question_id", "==", question.id));
      const answersSnapshot = await getDocs(answersQuery);
      
      answersSnapshot.forEach((answerDoc) => {
        question.answers.push({
          id: answerDoc.id,
          ...answerDoc.data()
        });
      });
      
      questions.push(question);
    }
    
    return questions;
  } catch (error) {
    console.error("Error getting questions:", error);
    throw error;
  }
}

export async function createSection(section) {
  try {
    if (section.id) {
      // Actualizăm o secțiune existentă
      const sectionRef = doc(db, "sections", section.id);
      const { id, ...updateData } = section;
      await updateDoc(sectionRef, updateData);
      return section;
    } else {
      // Creăm o secțiune nouă
      const docRef = await addDoc(collection(db, "sections"), section);
      return {
        id: docRef.id,
        ...section
      };
    }
  } catch (error) {
    console.error("Error creating/updating section:", error);
    throw error;
  }
}

export async function updateSection(id, updates) {
  try {
    const sectionRef = doc(db, "sections", id);
    await updateDoc(sectionRef, updates);
    return {
      id,
      ...updates
    };
  } catch (error) {
    console.error("Error updating section:", error);
    throw error;
  }
}

export async function createQuestion(question) {
  try {
    const docRef = await addDoc(collection(db, "questions"), question);
    return {
      id: docRef.id,
      ...question
    };
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
}

export async function createAnswer(answer) {
  try {
    const docRef = await addDoc(collection(db, "answers"), answer);
    return {
      id: docRef.id,
      ...answer
    };
  } catch (error) {
    console.error("Error creating answer:", error);
    throw error;
  }
}

export async function updateSectionOrder(sections) {
  try {
    const batch = [];
    
    sections.forEach((section, index) => {
      const sectionRef = doc(db, "sections", section.id);
      batch.push(updateDoc(sectionRef, { order: index }));
    });
    
    await Promise.all(batch);
    return true;
  } catch (error) {
    console.error("Error updating section order:", error);
    throw error;
  }
}

export { app, analytics };
