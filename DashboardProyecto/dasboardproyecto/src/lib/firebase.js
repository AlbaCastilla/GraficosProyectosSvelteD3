// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByxUW5eagrzo26f2Ut4nlB4MPBrIIoeTI",
  authDomain: "intermodular-26c92.firebaseapp.com",
  projectId: "intermodular-26c92",
  storageBucket: "intermodular-26c92.firebasestorage.app",
  messagingSenderId: "508747488825",
  appId: "1:508747488825:android:e718f1b5038182f71937e8"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs };
