// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoltEWUHuFiVcxYnhFLFiRhP7OUhOXci4",
  authDomain: "checkoff-d6b55.firebaseapp.com",
  projectId: "checkoff-d6b55",
  storageBucket: "checkoff-d6b55.appspot.com",
  messagingSenderId: "8509363258",
  appId: "1:8509363258:web:fbb236f5049b983382d103",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
