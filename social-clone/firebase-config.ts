// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth/cordova";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDS6Nge76R5K7LRfBSHBK8MQmH_nRxQrLM",
  authDomain: "social-app-81639.firebaseapp.com",
  projectId: "social-app-81639",
  storageBucket: "social-app-81639.appspot.com",
  messagingSenderId: "784117015970",
  appId: "1:784117015970:web:5f63f66d8768152dd7fefb",
  measurementId: "G-BWC66Z80YN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const GoogleProvider = new GoogleAuthProvider()
export const FacebookProvider = new FacebookAuthProvider()
export const db = getFirestore(app);

