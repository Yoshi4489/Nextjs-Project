// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEACEok-1lrWn4Bh7Oy5Ec8LR_Lw-8O2I",
  authDomain: "e-commerce-d7025.firebaseapp.com",
  projectId: "e-commerce-d7025",
  storageBucket: "e-commerce-d7025.appspot.com",
  messagingSenderId: "770322177549",
  appId: "1:770322177549:web:abcf911e7c2fb085f77f44",
  measurementId: "G-WVDWT3JHEX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


export const db = getFirestore(app);