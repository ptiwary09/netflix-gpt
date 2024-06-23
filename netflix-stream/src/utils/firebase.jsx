// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6BH1b96B2D2gZGTGU8WV-mdONzH1uq5g",
  authDomain: "netflixgpt-a7901.firebaseapp.com",
  projectId: "netflixgpt-a7901",
  storageBucket: "netflixgpt-a7901.appspot.com",
  messagingSenderId: "961437070060",
  appId: "1:961437070060:web:d52bee7310b20cd5866bc9",
  measurementId: "G-EZV3F1RFF2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

 export const auth=getAuth();