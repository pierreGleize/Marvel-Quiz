import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
// const config = {
//   apiKey: "AIzaSyBY2hGcCjB11UQ5itp5v2MOdEUgwbrvmss",
//   authDomain: "marvel-quiz-a2e39.firebaseapp.com",
//   projectId: "marvel-quiz-a2e39",
//   storageBucket: "marvel-quiz-a2e39.appspot.com",
//   messagingSenderId: "890714303388",
//   appId: "1:890714303388:web:5c0c59871a897a4e4f3659",
// };

const app = initializeApp(config);

export const auth = getAuth(app);

export const firestore = getFirestore();

export const user = (uid) => doc(firestore, `users/${uid}`);
