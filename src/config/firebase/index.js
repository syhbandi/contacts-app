import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6QtHeUn-xdaotGZTWpXQfm_ya87M23Q8",
  authDomain: "react-contacts-app-26e7e.firebaseapp.com",
  projectId: "react-contacts-app-26e7e",
  storageBucket: "react-contacts-app-26e7e.appspot.com",
  messagingSenderId: "741494620086",
  appId: "1:741494620086:web:01bd3f42b1b823c67d0b17",
  measurementId: "G-TKQXNYDXLQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
