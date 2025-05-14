# Quiz MV 2025

Aplicație de quiz pentru pregătirea examenului MV 2025, dezvoltată cu React, Vite și Firebase.

## Caracteristici

- Interfață intuitivă pentru utilizatori
- Cronometru pentru limita de timp de 3 ore
- Secțiuni organizate cu întrebări amestecate
- Variante de răspuns amestecate
- Panou de administrare protejat cu parolă
- Gestionare completă a secțiunilor și întrebărilor
- Stocare date în Firebase

## Configurare Firebase

Pentru a configura Firebase, creați un fișier `.env` în directorul rădăcină al proiectului cu următoarele variabile:

```
VITE_ADMIN_PASSWORD=your_admin_password
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Instalare și rulare

1. Clonați repository-ul
2. Instalați dependențele: `npm install`
3. Configurați Firebase (vezi secțiunea de mai sus)
4. Rulați aplicația în modul dezvoltare: `npm run dev`
5. Construiți pentru producție: `npm run build`

## Structura bazei de date Firebase

Aplicația folosește următoarele colecții în Firestore:

- **sections**: Secțiunile quiz-ului
  - id: string (generat automat)
  - title: string
  - description: string (opțional)
  - order: number

- **questions**: Întrebările din quiz
  - id: string (generat automat)
  - section_id: string (referință la secțiune)
  - question_text: string
  - created_at: timestamp

- **answers**: Răspunsurile pentru întrebări
  - id: string (generat automat)
  - question_id: string (referință la întrebare)
  - answer_text: string
  - is_correct: boolean
  - created_at: timestamp

## Utilizare

### Modul Quiz
- Accesați pagina principală și apăsați "Începe Quiz"
- Răspundeți la întrebări și verificați răspunsurile
- Navigați între întrebări cu butonul "Următoarea întrebare"
- Resetați quiz-ul oricând cu butonul "Resetează Quiz"

### Modul Administrare
- Accesați "/admin/login" și introduceți parola
- Gestionați secțiunile: adăugare, editare, reordonare
- Gestionați întrebările pentru fiecare secțiune
- Adăugați variante de răspuns și marcați răspunsurile corecte
